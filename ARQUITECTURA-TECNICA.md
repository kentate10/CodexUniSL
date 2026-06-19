# Arquitectura Técnica — USL Occidente Website Redesign

**Proyecto:** Rediseño completo del sitio web Universidad Santa Lucía – Sede Occidente  
**Versión:** 1.0  
**Fecha:** Junio 2026  

---

## Tabla de Contenidos

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Estructura de Directorios](#3-estructura-de-directorios)
4. [Arquitectura de Rutas](#4-arquitectura-de-rutas)
5. [Sistema de Datos](#5-sistema-de-datos)
6. [Componentes Clave](#6-componentes-clave)
7. [SEO y Metadata](#7-seo-y-metadata)
8. [Performance](#8-performance)
9. [Accesibilidad](#9-accesibilidad)
10. [Tailwind Config](#10-tailwind-config)
11. [Integraciones](#11-integraciones)
12. [Redirects 301](#12-redirects-301)
13. [Plan de Implementación](#13-plan-de-implementación)
14. [Diagramas](#14-diagramas)
15. [Riesgos](#15-riesgos)

---

## 1. Resumen Ejecutivo

### Contexto
Sitio actual con arquitectura híbrida (WordPress + HTML legacy), no responsive, sin flujo de conversión, SEO bloqueado, errores ortográficos en URLs.

### Objetivos
- Mobile-first obligatorio
- Lighthouse ≥90 en todas las métricas
- WCAG 2.2 AA completo
- Flujo claro hacia matrícula/contacto

### Stack Principal
- **Framework:** Next.js 14+ (App Router) + TypeScript
- **Estilos:** Tailwind CSS + shadcn/ui
- **Hosting:** Vercel

---

## 2. Stack Tecnológico

### Core
- **Next.js 14+:** App Router, SSG/ISR, Server Components
- **TypeScript 5+:** Type-safety, mejor DX
- **React 18+:** Concurrent features

### UI y Estilos
- **Tailwind CSS 3.4+:** Utility-first, purge automático
- **shadcn/ui:** Componentes accesibles basados en Radix UI
- **Framer Motion 11+:** Animaciones con soporte reduced-motion

### Formularios y Validación
- **React Hook Form 7+:** Performance optimizado
- **Zod 3+:** Schema validation type-safe

### Imágenes
- **next/image:** AVIF/WebP automático, lazy loading

### Dev Tools
- **ESLint + Prettier:** Code quality
- **Husky + lint-staged:** Pre-commit hooks
- **Jest + RTL + Playwright:** Testing (recomendado)

---

## 3. Estructura de Directorios

```
usl-occidente/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── carreras/
│   │   ├── sedes/
│   │   └── testimonios/
│   ├── favicon.ico
│   └── manifest.json
│
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx                    # Home
│   │   │   ├── carreras/
│   │   │   │   ├── page.tsx                # Catálogo
│   │   │   │   └── [slug]/page.tsx         # Detalle
│   │   │   ├── sedes/
│   │   │   │   ├── alajuela/page.tsx
│   │   │   │   └── san-carlos/page.tsx
│   │   │   ├── admisiones/page.tsx
│   │   │   ├── financiamiento/page.tsx
│   │   │   ├── nosotros/page.tsx
│   │   │   ├── noticias/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   └── contacto/page.tsx
│   │   ├── legal/
│   │   │   ├── privacidad/page.tsx
│   │   │   └── cookies/page.tsx
│   │   ├── api/
│   │   │   ├── contact/route.ts
│   │   │   └── preinscripcion/route.ts
│   │   ├── layout.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   │
│   ├── components/
│   │   ├── ui/                             # shadcn/ui
│   │   ├── layout/                         # Header, Footer
│   │   ├── sections/                       # Hero, Carreras, etc.
│   │   ├── forms/                          # Formularios
│   │   └── shared/                         # Compartidos
│   │
│   ├── lib/
│   │   ├── validations/                    # Zod schemas
│   │   ├── seo/                            # Metadata, Schema.org
│   │   └── api/                            # Email, rate-limit
│   │
│   ├── types/                              # TypeScript interfaces
│   ├── data/                               # Datos estáticos
│   ├── styles/                             # CSS global
│   └── config/                             # Configuración
│
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 4. Arquitectura de Rutas

### Mapa de Rutas

| Ruta | Tipo | Metadata |
|------|------|----------|
| `/` | SSG | Home - USL Occidente |
| `/carreras` | SSG | Carreras - USL Occidente |
| `/carreras/[slug]` | SSG Dynamic | {Carrera} - USL Occidente |
| `/sedes/alajuela` | SSG | Sede Alajuela - USL Occidente |
| `/sedes/san-carlos` | SSG | Sede San Carlos - USL Occidente |
| `/admisiones` | SSG | Admisiones - USL Occidente |
| `/financiamiento` | SSG | Financiamiento - USL Occidente |
| `/nosotros` | SSG | Nosotros - USL Occidente |
| `/noticias` | SSG | Noticias - USL Occidente |
| `/noticias/[slug]` | SSG Dynamic | {Noticia} - USL Occidente |
| `/contacto` | SSG | Contacto - USL Occidente |

### Estrategia de Generación

**SSG (Static Site Generation):**
- Todas las páginas generadas en build time
- ISR con revalidación cada 24 horas
- `export const revalidate = 86400;`

**Dynamic SSG:**
```typescript
// app/(marketing)/carreras/[slug]/page.tsx
export async function generateStaticParams() {
  const carreras = getCarreras();
  return carreras.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const carrera = getCarrera(params.slug);
  return {
    title: `${carrera.nombre} - ${carrera.nivel} | USL Occidente`,
    description: carrera.descripcionCorta,
  };
}
```

---

## 5. Sistema de Datos

### Interfaces TypeScript

```typescript
// types/carrera.ts
export interface Carrera {
  id: string;
  slug: string;
  nombre: string;
  nivel: 'tecnico' | 'bachillerato' | 'licenciatura' | 'maestria';
  area: 'salud' | 'administracion' | 'tecnologia' | 'educacion';
  descripcionCorta: string;
  descripcionLarga: string;
  duracion: string;
  modalidad: 'presencial' | 'virtual' | 'hibrida';
  sedes: ('alajuela' | 'san-carlos')[];
  planEstudios: { cuatrimestre: number; materias: string[] }[];
  requisitos: string[];
  perfilEgreso: string[];
  campoLaboral: string[];
  costoMatricula: number;
  costoMensualidad: number;
  costoTotal: number;
  imagen: string;
  imagenHero: string;
  destacada: boolean;
  orden: number;
  createdAt: Date;
  updatedAt: Date;
}

// types/sede.ts
export interface Sede {
  id: 'alajuela' | 'san-carlos';
  nombre: string;
  direccion: string;
  coordenadas: { lat: number; lng: number };
  telefono: string;
  whatsapp: string;
  email: string;
  horarios: { dias: string; horas: string }[];
  imagenes: string[];
  googleMapsUrl: string;
  wazeUrl: string;
  carreras: string[];
}

// types/noticia.ts
export interface Noticia {
  id: string;
  slug: string;
  titulo: string;
  resumen: string;
  contenido: string;
  categoria: 'promocion' | 'evento' | 'comunicado' | 'logro';
  imagenDestacada: string;
  autor: string;
  fechaPublicacion: Date;
  publicada: boolean;
  destacada: boolean;
}

// types/testimonio.ts
export interface Testimonio {
  id: string;
  nombre: string;
  carrera: string;
  graduacion: number;
  foto: string;
  texto: string;
  destacado: boolean;
}
```

### Almacenamiento

**Fase 1 (MVP):** Archivos TypeScript en `/src/data/`
```typescript
// data/carreras.ts
export const carreras: Carrera[] = [
  {
    id: 'tecnico-diseno-desarrollo-web',
    slug: 'tecnico-en-diseno-y-desarrollo-web',
    nombre: 'Técnico en Diseño y Desarrollo Web',
    nivel: 'tecnico',
    // ... más campos
  },
];

export function getCarreras(): Carrera[] {
  return carreras;
}

export function getCarrera(slug: string): Carrera | undefined {
  return carreras.find(c => c.slug === slug);
}
```

**Fase 2 (Futuro):** CMS Headless (Sanity/Contentful) con webhooks para revalidación

---

## 6. Componentes Clave

### Layout

**Header:**
```typescript
// components/layout/header.tsx
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <NavMenu />
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/contacto">Contacto</Link>
          </Button>
          <Button asChild>
            <Link href="/admisiones">Matriculate</Link>
          </Button>
          <MobileNavToggle />
        </div>
      </div>
    </header>
  );
}
```

**Footer:**
```typescript
// components/layout/footer.tsx
export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-slate-50">
      <div className="container py-12">
        {/* Contenido del footer */}
        <p className="text-sm text-muted-foreground">
          © {currentYear} Universidad Santa Lucía - Sede Occidente
        </p>
      </div>
    </footer>
  );
}
```

### Sections

**CarreraCard:**
```typescript
// components/shared/carrera-card.tsx
export function CarreraCard({ carrera }: { carrera: Carrera }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={carrera.imagen}
          alt={carrera.nombre}
          fill
          className="object-cover"
        />
        <Badge className="absolute top-4 right-4">{carrera.nivel}</Badge>
      </div>
      <CardHeader>
        <CardTitle>{carrera.nombre}</CardTitle>
        <CardDescription>{carrera.descripcionCorta}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{carrera.duracion}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{carrera.sedes.join(', ')}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/carreras/${carrera.slug}`}>Ver detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Forms

**ContactForm:**
```typescript
// components/forms/contact-form.tsx
export function ContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });
  
  async function onSubmit(data: ContactFormData) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      // Mostrar éxito
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name="nombre" />
        <FormField name="email" />
        <FormField name="telefono" />
        <FormField name="mensaje" />
        <input type="text" name="website" className="hidden" />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
```

---

## 7. SEO y Metadata

### Metadata Global

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://www.usloccidente.com'),
  title: {
    default: 'Universidad Santa Lucía - Sede Occidente',
    template: '%s | USL Occidente',
  },
  description: '30 años formando profesionales. +25,000 egresados.',
  keywords: ['universidad', 'Costa Rica', 'Alajuela', 'San Carlos'],
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    siteName: 'USL Occidente',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### Schema.org

```typescript
// lib/seo/schema.ts
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Universidad Santa Lucía - Sede Occidente',
    url: 'https://www.usloccidente.com',
    logo: 'https://www.usloccidente.com/logo.png',
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Alajuela',
        addressCountry: 'CR',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+506-8484-7884',
      contactType: 'Admissions',
    },
  };
}

export function getCourseSchema(carrera: Carrera) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: carrera.nombre,
    description: carrera.descripcionLarga,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Universidad Santa Lucía - Sede Occidente',
    },
  };
}
```

### Archivos Técnicos

```typescript
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://www.usloccidente.com/sitemap.xml',
  };
}

// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.usloccidente.com';
  const carreras = getCarreras();
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...carreras.map((c) => ({
      url: `${baseUrl}/carreras/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
```

---

## 8. Performance

### Optimizaciones

**Imágenes:**
- Formato AVIF primero, WebP fallback
- Lazy loading por defecto
- Placeholder blur
- `priority` para hero images

**Código:**
- Code splitting automático por ruta
- Dynamic imports para componentes pesados
- Server Components reducen JavaScript cliente

**Fuentes:**
```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});
```

**Configuración Next.js:**
```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
```

### Métricas Objetivo

- **LCP:** < 2.5s
- **CLS:** < 0.1
- **INP:** < 200ms
- **Lighthouse:** ≥ 90 en todas las categorías

---

## 9. Accesibilidad

### Checklist WCAG 2.2 AA

- [x] Contraste ≥ 4.5:1
- [x] Navegación por teclado completa
- [x] Focus visible
- [x] Alt text en imágenes
- [x] Labels en inputs
- [x] Jerarquía de headings (h1 → h6)
- [x] `lang="es-CR"` en HTML
- [x] ARIA labels apropiados
- [x] Skip to content link
- [x] Respeto a `prefers-reduced-motion`

### Implementación

**Skip to Content:**
```typescript
// components/layout/skip-to-content.tsx
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground"
    >
      Saltar al contenido principal
    </a>
  );
}
```

**Reduced Motion:**
```typescript
// lib/hooks/use-accessible-motion.ts
import { useReducedMotion } from 'framer-motion';

export function useAccessibleMotion() {
  const shouldReduceMotion = useReducedMotion();
  
  return {
    initial: shouldReduceMotion ? {} : { opacity: 0, y: 20 },
    animate: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.5 },
  };
}
```

---

## 10. Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(221.2 83.2% 53.3%)', // Azul USL
          foreground: 'hsl(210 40% 98%)',
        },
        secondary: {
          DEFAULT: 'hsl(38 92% 50%)', // Naranja/Ámbar
          foreground: 'hsl(222.2 47.4% 11.2%)',
        },
        accent: {
          DEFAULT: 'hsl(174 72% 56%)', // Verde turquesa
          foreground: 'hsl(222.2 47.4% 11.2%)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

---

## 11. Integraciones

### WhatsApp

```typescript
// components/shared/whatsapp-button.tsx
export function WhatsAppButton() {
  const message = encodeURIComponent(
    '¡Hola! Me gustaría recibir información sobre USL Occidente.'
  );
  const url = `https://wa.me/5068484788 4?text=${message}`;
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition-transform"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
```

### Formularios

```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';
import { sendEmail } from '@/lib/api/email';
import { rateLimit } from '@/lib/api/rate-limit';

export async function POST(request: Request) {
  const identifier = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await rateLimit(identifier);
  
  if (!success) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes' },
      { status: 429 }
    );
  }
  
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);
    
    // Honeypot check
    if (data.website) {
      return NextResponse.json({ success: true });
    }
    
    await sendEmail({
      to: 'admisiones@usloccidente.com',
      subject: `Nuevo contacto: ${data.nombre}`,
      html: `<p><strong>Nombre:</strong> ${data.nombre}</p>...`,
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al enviar' },
      { status: 500 }
    );
  }
}
```

### Google Maps

```typescript
// components/shared/map-embed.tsx
export function MapEmbed({ lat, lng, title }: MapEmbedProps) {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${lat},${lng}`;
  
  return (
    <iframe
      src={mapUrl}
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      title={`Mapa de ${title}`}
    />
  );
}
```

---

## 12. Redirects 301

```javascript
// next.config.js
module.exports = {
  async redirects() {
    return [
      // Corrección de errores ortográficos
      {
        source: '/tecnico-en-diseno-y-desarollo-web',
        destination: '/carreras/tecnico-en-diseno-y-desarrollo-web',
        permanent: true,
      },
      // Corrección de slugs incorrectos
      {
        source: '/tecnico-en-diseno-y-desarollo-web-2',
        destination: '/carreras/tecnico-en-asistente-administrativo',
        permanent: true,
      },
      // Páginas legacy HTML
      {
        source: '/Financiamiento.html',
        destination: '/financiamiento',
        permanent: true,
      },
      {
        source: '/MaestriaAdministracionServiciosSalud.html',
        destination: '/carreras/maestria-en-administracion-de-servicios-de-salud',
        permanent: true,
      },
      // Información institucional
      {
        source: '/informacion',
        destination: '/nosotros',
        permanent: true,
      },
      // Sedes
      {
        source: '/sede-alajuela',
        destination: '/sedes/alajuela',
        permanent: true,
      },
      {
        source: '/sede-san-carlos',
        destination: '/sedes/san-carlos',
        permanent: true,
      },
      // Wildcard para páginas HTML legacy
      {
        source: '/:path*.html',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
};
```

---

## 13. Plan de Implementación

### Fase 1: Fundación (Semanas 1-2)
- [ ] Setup proyecto Next.js + TypeScript
- [ ] Configurar Tailwind + shadcn/ui
- [ ] Layout base (Header, Footer)
- [ ] Navegación responsive
- [ ] Componentes UI base

### Fase 2: Páginas Core (Semanas 3-4)
- [ ] Interfaces TypeScript
- [ ] Datos de carreras y sedes
- [ ] Página Home
- [ ] Catálogo de carreras
- [ ] Detalle de carrera
- [ ] Páginas de sedes

### Fase 3: Funcionalidades (Semanas 5-6)
- [ ] Formulario de contacto
- [ ] Formulario de preinscripción
- [ ] Buscador y filtros
- [ ] WhatsApp button
- [ ] Google Maps
- [ ] Rate limiting y honeypot

### Fase 4: Contenido (Semanas 7-8)
- [ ] Página Admisiones
- [ ] Página Financiamiento
- [ ] Página Nosotros
- [ ] Sistema de noticias
- [ ] Testimonios
- [ ] Páginas legales

### Fase 5: Optimización (Semanas 9-10)
- [ ] Schema.org completo
- [ ] Optimización de imágenes
- [ ] Sitemap y robots.txt
- [ ] Auditoría de accesibilidad
- [ ] Lighthouse audit (≥90)
- [ ] Testing cross-browser

### Fase 6: Lanzamiento (Semanas 11-12)
- [ ] Configurar redirects 301
- [ ] Migrar contenido final
- [ ] Configurar dominio y SSL
- [ ] Setup analytics y Search Console
- [ ] Deploy a producción
- [ ] Monitoreo post-launch

---

## 14. Diagramas

### Arquitectura General

```
Usuario
   ↓
Vercel CDN (Global)
   ↓
Next.js 14 App
   ├── SSG/ISR
   ├── Server Components
   └── API Routes
       ├── Email Service
       ├── Google Maps
       └── WhatsApp
```

### Flujo de Datos

```
data/carreras.ts → generateStaticParams() → Static HTML → CDN → Usuario
```

### Flujo de Formulario

```
Usuario → Validación Client → API Route → Rate Limit → Honeypot → Validación Server → Email → Admisiones
```

---

## 15. Riesgos

### Riesgos Técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Datos incompletos | Alta | Alto | Placeholders claros, documentar faltantes |
| Performance móvil | Media | Alto | Testing continuo, optimización agresiva |
| Problemas redirects | Media | Alto | Testing exhaustivo de URLs viejas |
| Spam en formularios | Alta | Medio | Honeypot + rate limiting |

### Riesgos de Proyecto

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Retrasos en aprobación | Alta | Alto | Trabajar con placeholders, entregas iterativas |
| Cambios de alcance | Media | Alto | Documentación clara, change requests |
| Falta de assets | Alta | Medio | Stock photos temporales, lista de assets |

### Plan de Contingencia

**Si hay problemas post-launch:**
1. Rollback inmediato al sitio viejo
2. Identificar y documentar problema
3. Fix en staging + testing
4. Re-deploy

**Monitoreo Post-Launch:**
- Errores 24/7 (Sentry)
- Google Search Console diario
- Analytics (tráfico, conversiones)
- Testing de formularios diario

---

## Resumen de Decisiones Clave

1. **Next.js 14 + TypeScript:** Framework moderno, type-safe, optimizado para SEO
2. **Tailwind + shadcn/ui:** Desarrollo rápido, componentes accesibles
3. **SSG + ISR:** Performance máximo, contenido actualizable
4. **Mobile-First:** Prioridad absoluta en diseño responsive
5. **WCAG 2.2 AA:** Accesibilidad completa desde el inicio
6. **Redirects 301:** Preservar SEO del sitio actual
7. **Implementación por fases:** Entregas iterativas, testing continuo

---

**Próximas Acciones Recomendadas:**

1. Revisar y aprobar este documento de arquitectura
2. Recopilar datos faltantes (carreras, costos, fotos)
3. Crear repositorio Git y configurar CI/CD
4. Iniciar Fase 1: Fundación del proyecto
5. Establecer proceso de revisión y aprobación de entregas

---

**Documento creado:** Junio 2026  
**Última actualización:** Junio 2026  
**Versión:** 1.0