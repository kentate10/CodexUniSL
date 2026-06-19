# USL Occidente - Rediseño inicial

Prototipo Next.js de una página para la Universidad Santa Lucía - Sede Occidente, construido con la información pública extraída de `https://www.usloccidente.com/` y las instrucciones del paquete del proyecto.

## Ejecutar

```bash
pnpm install
pnpm dev
```

## Hostear en Netlify

1. Subí este proyecto a un repositorio GitHub/GitLab/Bitbucket.
2. En Netlify: **Add new project** -> **Import an existing project**.
3. Seleccioná el repositorio.
4. Build settings:
   - Build command: `pnpm build`
   - Base directory: dejar vacío si este proyecto está en la raíz del repo.
   - Publish directory: dejar que Netlify lo detecte para Next.js.
5. Confirmá que Netlify use Node 20. Este repo incluye `netlify.toml` con `NODE_VERSION = "20"`.
6. Deploy.
7. Cuando tengas dominio final: **Domain management** -> agregá el dominio y seguí las instrucciones DNS de Netlify.

Netlify soporta Next.js App Router sin configuración extra mediante su adapter automático. No se fijó `@netlify/plugin-nextjs` para evitar bloquear futuras actualizaciones del adapter.

## Incluye

- Home mobile-first con hero, CTAs, barra de confianza y contenido institucional.
- Catálogo filtrable de técnicos, bachilleratos, licenciaturas y maestrías.
- Sedes Alajuela y San Carlos con horarios, teléfonos, correos y mapas.
- Bloques de financiamiento, admisiones, noticias y redirecciones 301.
- `robots.ts`, `sitemap.ts`, metadata Open Graph y schema `EducationalOrganization`.

## Datos pendientes antes de producción

- Paleta y logo oficiales del manual de marca.
- Catálogo final aprobado con costos, requisitos, sedes y duración por carrera.
- Fotos reales con permisos de uso.
- Endpoint/correo definitivo para formularios.
- Acreditaciones oficiales a mostrar.
- Política de privacidad/cookies final conforme a Ley 8968.

## Scripts de research

- `scripts/extract-site.mjs`: consulta la API pública de WordPress y lista páginas/posts con contenido resumido.
- `scripts/list-assets.mjs`: lista imágenes públicas usadas como referencia visual.
