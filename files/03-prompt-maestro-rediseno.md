# Prompt Maestro — Rediseño Completo del Sitio USL Occidente

> **Cómo usar este archivo:** copiá el bloque de "PROMPT" en tu herramienta de generación (Claude / Claude Code / v0 / Lovable, etc.). Está escrito para producir un sitio **moderno, mobile-first, accesible y orientado a conversión**, corrigiendo todos los errores del sitio actual. Ajustá los datos entre `<<corchetes>>` con la información oficial de la universidad.

---

## CONTEXTO PARA QUIEN GENERA (no borrar)

Estás reconstruyendo desde cero el sitio de la **Universidad Santa Lucía – Sede Occidente (USL Occidente)**, Costa Rica. El sitio viejo (usloccidente.com) tenía estos problemas que **NO se deben repetir**: dos sistemas conviviendo (WordPress + páginas estáticas `.html` viejas), no responsive, sin camino claro a matrícula, errores de ortografía ("prioriodad"→"prioridad"), URLs con typos ("desarollo"→"desarrollo"), slugs equivocados, footers con años inconsistentes (2021 vs 2025), SEO pobre y bloqueo de buscadores. El nuevo sitio debe ser **una sola plataforma coherente**, impecable en celular y pensado para convertir interesados en estudiantes matriculados.

---

## ═══════════════ PROMPT ═══════════════

**Rol:** Actuá como un equipo senior de diseño y desarrollo web (UX/UI + Full-Stack + SEO + Accesibilidad).

**Objetivo:** Diseñá y construí el sitio web nuevo de la **Universidad Santa Lucía – Sede Occidente (USL Occidente)**, una universidad privada de Costa Rica con sedes en **Alajuela** y **San Carlos**, +25.000 egresados y 30 años de trayectoria. El sitio debe ser moderno, llamativo, profesional, **mobile-first**, rápido, accesible (WCAG 2.2 AA) y diseñado para **captar estudiantes** (matrícula / solicitud de información).

### 1. Stack técnico

- **Framework:** Next.js (App Router) + React + TypeScript.
- **Estilos:** Tailwind CSS. Componentes accesibles (Radix UI o shadcn/ui).
- **Animación:** Framer Motion, sutil y con buen rendimiento (respetar `prefers-reduced-motion`).
- **Imágenes:** `next/image`, formato WebP/AVIF, lazy-load.
- **Formularios:** validación con React Hook Form + Zod; envío a `<<endpoint/correo de admisiones>>`; protección anti-spam (honeypot + rate limit).
- **Idioma:** español de Costa Rica (`lang="es-CR"`), tono cercano y voseo costarricense en CTAs ("Matriculate", "Solicitá información").
- **Alternativa si piden WordPress:** un solo tema headless o un tema moderno limpio (sin builder pesado), un único sistema (sin páginas `.html` sueltas), mismas reglas de SEO/accesibilidad/performance.

### 2. Identidad visual

- **Marca:** Universidad Santa Lucía – Sede Occidente. Mantener seriedad institucional + frescura juvenil.
- **Paleta:** derivar de la marca USL `<<insertar colores oficiales>>`. Si no se proveen, usar un azul institucional profundo + un acento cálido (dorado/ámbar) para CTAs, con buen contraste.
- **Tipografía:** una sans moderna y legible (p. ej. Inter / Poppins para títulos, system stack para cuerpo). Tamaño base 16px+, jerarquía clara.
- **Estética:** limpia, con aire, tarjetas con bordes suaves, fotografía real de las sedes y estudiantes, microinteracciones sutiles. Evitar plantilla genérica: que se sienta una pieza diseñada a propósito.
- **Tagline destacado:** "Educación con Excelencia para Todos".

### 3. Arquitectura de información (mapa del sitio)

```
/ (Home)
/carreras                    → Catálogo filtrable (Técnicos | Bachilleratos | Licenciaturas | Maestrías)
/carreras/[slug]             → Detalle de cada programa (plan, perfil, salidas, requisitos, costo, CTA)
/sedes/alajuela              → Sede Alajuela (mapa, dirección, horarios, contacto, fotos)
/sedes/san-carlos            → Sede San Carlos (idem)
/financiamiento              → Becas, descuentos y formas de pago (reemplaza Financiamiento.html)
/admisiones                  → Proceso de matrícula paso a paso + formulario de preinscripción
/nosotros                    → Historia, misión, visión, valores, acreditaciones (reemplaza /informacion/)
/noticias                    → Blog de noticias y promociones
/noticias/[slug]             → Nota individual
/contacto                    → Formulario + WhatsApp + mapas + redes
/legal/privacidad            → Aviso de privacidad (Ley 8968 CR) y política de cookies
```

**Reglas de URL:** español, minúsculas, sin tildes en slugs, **sin errores ortográficos**, descriptivas. Implementar **redirecciones 301** de todas las URLs viejas a las nuevas (incluidas las `.html` legacy y los slugs con typo).

### 4. Página de inicio (Home) — secciones en orden

1. **Hero** con propuesta de valor, foto real, y **dos CTAs primarios**: "Matriculate" y "Solicitá información" (WhatsApp `wa.me/506<<numero>>`).
2. **Barra de confianza:** 30 años · +25.000 egresados · 2 sedes · acreditaciones.
3. **Carreras destacadas** (carrusel/grid de tarjetas con foto, nivel, duración, CTA).
4. **Por qué USL** (4–6 beneficios con íconos: horarios flexibles, financiamiento, enfoque práctico, etc.).
5. **Sedes** con mapa y acceso rápido a cada una.
6. **Financiamiento y becas** (bloque llamativo con CTA).
7. **Testimonios** de egresados (con foto y carrera).
8. **Noticias/Promos recientes** (3 últimas).
9. **CTA final fuerte** + formulario corto de contacto.
10. **Footer** unificado (ver §7).

### 5. Componentes y "extras" que el sitio actual NO tiene y debería tener

- ✅ **Botón flotante de WhatsApp** persistente en móvil (con `wa.me` y mensaje pre-cargado).
- ✅ **CTA pegajoso** en móvil ("Matriculate") en la parte inferior.
- ✅ **Catálogo de carreras filtrable** por nivel, área y sede + buscador.
- ✅ **Formulario de preinscripción/solicitud de información** que llega a admisiones, con confirmación y antispam.
- ✅ **Banner de promociones** configurable (para "Días USL", descuentos, matrícula gratis, etc.).
- ✅ **Mapas embebidos** por sede + enlaces a Google Maps / Waze.
- ✅ **Calculadora/tabla de costos y financiamiento** clara por carrera.
- ✅ **Sección de noticias** tipo blog con categorías (Promociones, Eventos, Comunicados).
- ✅ **Open Graph + Twitter Cards** (vista previa atractiva al compartir en redes).
- ✅ **Favicon, manifest y meta theme-color** (icono correcto en móvil / PWA básica).
- ✅ **Schema.org**: `EducationalOrganization`, `Course` por carrera, `BreadcrumbList`.
- ✅ **Migas de pan (breadcrumbs)** en páginas internas.
- ✅ **Banner de cookies/consentimiento** ligero y conforme a la Ley 8968 (CR).
- ✅ **Modo de carga rápida**: imágenes optimizadas, code-splitting, fuentes con `display: swap`.
- ✅ **Página 404 personalizada** con buscador y enlaces útiles.
- ✅ **Integración de redes** (Instagram/Facebook/LinkedIn) y feed opcional.
- ✅ (Opcional) **Portal/enlace a matrícula en línea** y al campus virtual si existe.

### 6. Correcciones obligatorias (heredadas del sitio viejo)

- Corregir **"prioriodad" → "prioridad"** y revisar toda la ortografía/gramática del copy.
- Slugs correctos: `/carreras/tecnico-en-diseno-y-desarrollo-web` (con doble r) y cada carrera con su slug real (no reutilizar slugs).
- **Eliminar** todas las páginas estáticas `.html` legacy; su contenido migra a las nuevas rutas con 301.
- **Footer centralizado** y con año dinámico (`new Date().getFullYear()`), nunca hardcodeado.
- `robots.txt` que **permita** a buscadores (bloquear solo `/admin`/rutas privadas) + `sitemap.xml`.
- `<title>` y `meta description` **únicos por página**, sin el dominio dentro del título.

### 7. Footer (unificado, una sola fuente de verdad)

Incluir: logo USL, breve descripción, enlaces rápidos (Carreras, Sedes, Admisiones, Financiamiento, Noticias, Contacto), datos de contacto y WhatsApp, ubicación de ambas sedes, redes sociales, enlace a privacidad/cookies, y línea de copyright con **año dinámico**: "© {año actual} Universidad Santa Lucía – Sede Occidente. Todos los derechos reservados."

### 8. Rendimiento, SEO y accesibilidad (criterios de aceptación)

- **Core Web Vitals:** LCP < 2.5s, CLS < 0.1, INP < 200ms en 4G móvil.
- **Lighthouse:** ≥ 90 en Performance, SEO, Best Practices y Accessibility.
- **Responsive:** breakpoints 360/768/1024/1440 sin scroll horizontal; targets táctiles ≥ 44px.
- **Accesibilidad WCAG 2.2 AA:** contraste ≥ 4.5:1, navegación por teclado, foco visible, `alt` en imágenes, labels en formularios, jerarquía de headings, `lang="es-CR"`.
- **SEO:** sitemap, robots correcto, OG/Twitter, schema, URLs limpias, 301 de URLs viejas.

### 9. Entregables

1. Código del sitio (componentes reutilizables y documentados).
2. `README.md` con instrucciones de instalación, ejecución y despliegue.
3. Lista de **datos pendientes** que la universidad debe entregar (carreras, costos, fotos, contactos).
4. Tabla de **redirecciones 301** (URL vieja → URL nueva).
5. Guía rápida de cómo cargar una **noticia/promoción** y una **carrera** nueva.

**Importante:** Mientras falten datos oficiales, usá **placeholders claramente marcados** (`<<PENDIENTE: …>>`) — nunca inventes costos, requisitos ni acreditaciones.

## ═══════════════ FIN DEL PROMPT ═══════════════

---

## Variables a completar antes de generar

| Variable | Valor a poner |
|---|---|
| `<<colores oficiales>>` | Paleta del manual de marca USL |
| `<<numero WhatsApp>>` | 8484-7884 → formato `wa.me/5068484XXXX` |
| `<<endpoint/correo de admisiones>>` | Correo o API donde llegan las solicitudes |
| `<<listado de carreras oficial>>` | Catálogo con costos y requisitos |
| `<<fotos>>` | Imágenes reales con permisos de uso |
| `<<acreditaciones>>` | CONESUP u otras, si aplica |
