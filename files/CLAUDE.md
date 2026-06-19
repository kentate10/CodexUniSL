# CLAUDE.md — USL Occidente (Sitio Web)

> Este archivo le da contexto permanente a Claude (Claude Code / Proyectos) sobre este repositorio. Colocalo en la **raíz del proyecto**. Claude lo lee automáticamente en cada sesión.

---

## Qué es este proyecto

Rediseño desde cero del sitio web de la **Universidad Santa Lucía – Sede Occidente (USL Occidente)**, Costa Rica. Sedes: **Alajuela** y **San Carlos**. Reemplaza el sitio antiguo (usloccidente.com), que era un híbrido de WordPress + páginas estáticas `.html` legacy, no responsive y sin flujo de conversión.

**Objetivo de negocio:** captar estudiantes (matrícula / solicitud de información). Cada decisión de UX debe servir a ese objetivo.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS + shadcn/ui (Radix) para accesibilidad
- Framer Motion (animación sutil; respetar `prefers-reduced-motion`)
- React Hook Form + Zod para formularios
- `next/image` para imágenes (WebP/AVIF, lazy)

## Principios que NUNCA se rompen

1. **Mobile-first.** Diseñá y probá primero en 360px. La mayoría del tráfico es móvil.
2. **Un solo sistema.** Prohibido reintroducir páginas estáticas sueltas o duplicar contenido. Una sola fuente de verdad por dato.
3. **Conversión visible.** CTAs "Matriculate" y "Solicitá información" (WhatsApp) accesibles desde cualquier página.
4. **Accesibilidad WCAG 2.2 AA** y **Lighthouse ≥ 90** en las 4 categorías. No se mergea nada por debajo.
5. **SEO técnico** en cada página: `<title>`/`description` únicos, OG/Twitter, schema, slug limpio en español sin tildes ni typos.
6. **Año dinámico** en footer (`new Date().getFullYear()`). Nunca hardcodear años.
7. **No inventar datos.** Costos, requisitos, acreditaciones y fechas solo si están confirmados. Si faltan, usar `{/* PENDIENTE: ... */}` visible.
8. **Español de Costa Rica** (voseo en CTAs). Revisar ortografía: el sitio viejo decía "prioriodad"; acá se escribe **"prioridad"**.

## Convenciones de código

- Componentes en `PascalCase`, hooks en `useCamelCase`, archivos de ruta según App Router.
- Tailwind con tokens de tema (colores de marca en `tailwind.config`); no hardcodear hex sueltos.
- Cada componente reutilizable documentado con un comentario de propósito + props.
- Commits en español, formato Conventional Commits: `feat:`, `fix:`, `seo:`, `a11y:`, `perf:`.
- Sin dependencias pesadas innecesarias (cuidar el bundle).

## Estructura de rutas (canónica)

```
/                       /carreras            /carreras/[slug]
/sedes/alajuela         /sedes/san-carlos    /financiamiento
/admisiones             /nosotros            /noticias  /noticias/[slug]
/contacto               /legal/privacidad
```

## Redirecciones obligatorias (301)

Mantener actualizada la tabla `redirects` en `next.config.js`. Toda URL del sitio viejo debe redirigir a su equivalente nuevo. Ejemplos:
- `/informacion/` → `/nosotros`
- `/Financiamiento.html` → `/financiamiento`
- `/MaestriaAdministracionServiciosSalud.html` → `/carreras/maestria-administracion-servicios-de-salud`
- `/tecnico-en-diseno-y-desarollo-web/` → `/carreras/tecnico-en-diseno-y-desarrollo-web`
- `/tecnico-en-diseno-y-desarollo-web-2/` → `/carreras/tecnico-en-asistente-administrativo`
- `/sede-alajuela/` → `/sedes/alajuela`
- `/sede-san-carlos/` → `/sedes/san-carlos`

## Datos de la institución (rellenar y mantener)

- WhatsApp: **8484-7884** → `wa.me/506XXXXXXXX`
- Sede Alajuela: City Mall, entrada sur (Polideportivo Monserrat), 1er piso.
- Sede San Carlos: Quesada, 2ª planta Edificio Coopesancarlos R.L.
- Razón social: Sequoia Dos Mil Ocho S.A.
- Tagline: "Educación con Excelencia para Todos".
- `<<PENDIENTE: paleta de marca, logo, catálogo de carreras con costos, fotos, acreditaciones, correo de admisiones>>`

## Definición de "Hecho" (Definition of Done)

Una tarea está terminada solo si: funciona en 360/768/1024/1440 px, pasa Lighthouse ≥ 90 (las 4), tiene meta/OG/schema, es navegable por teclado con foco visible, no rompe ningún 301 existente, y el copy está revisado ortográficamente.

## Cómo pedirle cosas a Claude en este repo (ejemplos)

- "Creá la página `/carreras/[slug]` con plantilla de detalle de programa siguiendo el §5 del prompt maestro."
- "Audita la home con criterios de §8 y dame los fixes priorizados."
- "Agregá una carrera nueva: Técnico en X. Generá su ruta, schema `Course` y entrada en el catálogo."
- "Revisá accesibilidad del formulario de contacto y corregí lo que falle WCAG AA."
