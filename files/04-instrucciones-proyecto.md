# Instrucciones del Proyecto — Setup y Flujo de Trabajo

> Guía práctica para arrancar el proyecto, organizarlo y trabajarlo con Claude. Pensado para que cualquiera del equipo (o vos dentro de unos meses) pueda retomarlo.

---

## 1. Archivos de este paquete

| Archivo | Para qué sirve | Para quién |
|---|---|---|
| `01-informe-tecnico-QA.md` | Auditoría técnica completa y checklist QA | Vos / equipo dev |
| `02-informe-ejecutivo-director.md` | Diagnóstico sin tecnicismos | Dirección de la universidad |
| `03-prompt-maestro-rediseno.md` | Prompt para generar el sitio nuevo | Vos / herramienta de IA |
| `CLAUDE.md` | Contexto permanente para Claude | Va en la raíz del repo |
| `04-instrucciones-proyecto.md` | Este archivo | Equipo |

## 2. Cómo montar el proyecto en Claude (Proyectos)

1. Creá un **Proyecto** nuevo en Claude llamado "USL Occidente – Sitio Web".
2. En las **instrucciones del proyecto** (Project Instructions / "Custom Instructions"), pegá un resumen corto: rol, objetivo, stack y los "Principios que NUNCA se rompen" del `CLAUDE.md`.
3. Subí a la **base de conocimiento del proyecto** estos archivos:
   - `01-informe-tecnico-QA.md`
   - `03-prompt-maestro-rediseno.md`
   - El catálogo oficial de carreras y el manual de marca cuando los tengás.
4. Si usás **Claude Code**, dejá el archivo `CLAUDE.md` en la **raíz del repositorio**: se carga solo en cada sesión.

## 3. Setup técnico (si vas con Next.js)

```bash
# 1. Crear el proyecto
npx create-next-app@latest usl-occidente --typescript --tailwind --app --eslint

cd usl-occidente

# 2. Dependencias base
npm install framer-motion react-hook-form zod @hookform/resolvers
npx shadcn@latest init

# 3. Colocar CLAUDE.md en la raíz y configurar redirects en next.config.js

# 4. Levantar entorno local
npm run dev
```

Estructura sugerida de carpetas:

```
/app            → rutas (App Router)
/components     → componentes reutilizables (ui/, sections/, forms/)
/content        → datos de carreras, sedes, noticias (JSON/MDX)
/lib            → utilidades, schema SEO, config
/public         → imágenes, favicon, manifest, sitemap, robots.txt
CLAUDE.md
next.config.js  → tabla de redirects 301
```

## 4. Flujo de trabajo recomendado (fases)

**Fase 0 — Insumos (bloqueante).** Recolectar de la universidad: logo, manual de marca, catálogo de carreras con costos/requisitos, fotos con permisos, contactos/horarios por sede, destino de los formularios. Sin esto se usa placeholder, pero hay que cerrarlo antes de publicar.

**Fase 1 — Fundaciones.** Tema (colores/tipografía), layout, header con menú móvil, footer unificado, botón flotante de WhatsApp, configuración SEO base, robots/sitemap, 301.

**Fase 2 — Páginas núcleo.** Home, Carreras (catálogo + detalle), Sedes, Admisiones, Financiamiento, Contacto.

**Fase 3 — Contenido dinámico.** Noticias/promos, banner de promociones configurable, testimonios.

**Fase 4 — QA y lanzamiento.** Correr el checklist del informe técnico (§8), Lighthouse, pruebas en dispositivos reales, validar formularios, revisar 301, enviar sitemap a Search Console.

## 5. Tablero de tareas sugerido (Kanban)

- **Backlog → En curso → QA → Hecho.**
- Etiquetas: `p0`, `p1`, `p2`, `seo`, `a11y`, `perf`, `contenido`.
- Regla: nada pasa a **Hecho** sin cumplir la *Definition of Done* del `CLAUDE.md`.

## 6. Datos pendientes por confirmar con la universidad

- [ ] Paleta y logo oficiales (manual de marca).
- [ ] Catálogo completo de carreras (nivel, duración, perfil, requisitos, **costos**).
- [ ] Fotos reales de sedes/estudiantes con permisos de uso.
- [ ] Horarios y datos de contacto definitivos por sede.
- [ ] Correo/WhatsApp/persona a donde llegan las solicitudes.
- [ ] Acreditaciones (CONESUP u otras) a mostrar.
- [ ] ¿Existe matrícula en línea / campus virtual a enlazar?
- [ ] Confirmar número WhatsApp en formato internacional para `wa.me`.

## 7. Antes de publicar (pre-launch checklist)

- [ ] Todas las URLs viejas con 301 a las nuevas (probar las del informe técnico).
- [ ] Cero contenido `PENDIENTE` visible en producción.
- [ ] Formularios llegan a destino y tienen antispam + aviso de privacidad (Ley 8968).
- [ ] Lighthouse ≥ 90 en las 4 categorías, en móvil.
- [ ] Revisión ortográfica final del copy (sin "prioriodad" ni similares).
- [ ] Favicon, OG y vista previa en redes verificados.
- [ ] Backup del sitio viejo + plan de rollback.
- [ ] HTTPS forzado y una sola versión canónica del dominio.

## 8. Consejo de uso con Claude

Trabajá **por componentes/páginas**, no "todo el sitio de una". Pedile a Claude que cumpla un criterio del informe a la vez (p. ej. "implementá el catálogo filtrable y pasá los criterios de §5"). Al final de cada bloque, pedile que **audite contra la Definition of Done** antes de avanzar.
