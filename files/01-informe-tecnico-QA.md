# Informe Técnico / Auditoría QA — usloccidente.com

**Proyecto:** Rediseño del sitio web de la Universidad Santa Lucía – Sede Occidente (USL Occidente)
**Rol del autor:** QA + PM Técnico + Full-Stack Dev
**Fecha de auditoría:** Junio 2026
**Sitio auditado:** https://www.usloccidente.com/

---

## 0. Nota de transparencia sobre el método de research

El sitio **bloquea el acceso automatizado mediante `robots.txt`** (el rastreador devuelve `ROBOTS_DISALLOWED`). Por eso esta auditoría se construyó a partir de:

1. El **índice público del sitio** (todas las URLs indexadas por buscadores).
2. **Contenido renderizado** capturado por los buscadores (textos, footers, slugs, títulos).
3. Inferencia técnica a partir de la estructura de URLs, footers y patrones de la plataforma.

**Lo que falta y se recomienda completar con auditoría en vivo** (Lighthouse / DevTools / pruebas en dispositivo real):
- Métricas exactas de rendimiento (Core Web Vitals: LCP, CLS, INP).
- Peso real de imágenes y orden de carga.
- Pruebas de responsive en breakpoints reales.
- Validación de accesibilidad automática (axe) + manual (lector de pantalla).

> **Acción sugerida:** si conectás el navegador (Claude en Chrome), puedo correr la auditoría en vivo página por página y completar las métricas exactas. Este informe ya es accionable sin eso.

---

## 1. Identidad y contexto del sitio

| Dato | Valor |
|---|---|
| Institución | Universidad Santa Lucía – Sede Occidente (USL Occidente) |
| Sedes | **Alajuela** (City Mall, entrada sur) y **San Carlos** (Quesada, Edificio Coopesancarlos R.L.) |
| Tagline | "Educación Con Excelencia Para Todos" |
| Trayectoria | +25.000 egresados / 30 años de operación |
| Contacto principal | WhatsApp 8484-7884 |
| Razón social | Sequoia Dos Mil Ocho S.A. |
| Desarrollado por | Voyager Comunicación |
| Sitio institucional matriz | usl.ac.cr (entidad nacional, separada de Occidente) |

**Observación estratégica:** existen **dos sitios de la misma marca** (usl.ac.cr y usloccidente.com) con diseño, copy y arquitectura distintos. El sitio matriz **sí tiene matrícula en línea**; el de Occidente parece orientado a marketing/noticias y **no expone un flujo de matrícula claro**. Esto genera confusión de marca y fuga de conversiones.

---

## 2. Stack técnico (inferido)

- **CMS:** WordPress (estructura de permalinks `/nombre-del-post/`, taxonomías de posts/categorías, footer "Desarrollado por Voyager Comunicación").
- **Page builder probable:** plantilla/tema comercial con builder (Elementor/WPBakery o similar), típico de agencias.
- **Hosting/CDN:** no confirmado; recomendable validar TTFB y CDN.
- **Convivencia con sitio estático legacy:** se detectan páginas `.html` en CamelCase (ver §3) → el sitio actual es un **híbrido** de un sitio viejo estático + un WordPress nuevo montado encima.

---

## 3. Hallazgos críticos (bugs y deuda técnica)

### 🔴 CRÍTICO-1 — Dos sistemas conviviendo (WordPress + estático legacy)
Coexisten URLs modernas de WordPress con páginas estáticas antiguas:

| Tipo | Ejemplo de URL |
|---|---|
| WordPress (nuevo) | `/informacion/`, `/sede-alajuela/`, `/sede-san-carlos/` |
| Estático legacy (viejo) | `/Financiamiento.html`, `/MaestriaAdministracionServiciosSalud.html` |

**Impacto:** diseño inconsistente entre páginas, contenido duplicado, doble mantenimiento, riesgo de información desactualizada/contradictoria, y daño SEO por duplicidad. Es la causa raíz de la mayoría de los problemas.

### 🔴 CRÍTICO-2 — `robots.txt` bloquea el rastreo
El sitio no permite el acceso de rastreadores automatizados. Esto perjudica:
- Indexación y posicionamiento en Google/Bing.
- Archivado histórico.
- Vista previa en redes sociales (si además faltan Open Graph tags).

**Acción:** revisar y abrir `robots.txt` a buscadores legítimos; bloquear solo rutas administrativas (`/wp-admin/`).

### 🔴 CRÍTICO-3 — Errores ortográficos en URLs/slugs (daño SEO permanente)
- `/tecnico-en-diseno-y-desarollo-web/` → **"desarollo"** está mal escrito (correcto: "desarrollo").
- `/tecnico-en-diseno-y-desarollo-web-2/` → **esta URL corresponde al Técnico en Asistente Administrativo**, no a Diseño Web. Es un slug heredado de copiar/pegar una página y no renombrar la URL.

**Impacto:** URLs no descriptivas, confusión de IA (arquitectura de información), pérdida de relevancia SEO y mala experiencia al compartir enlaces.

### 🟠 ALTO-1 — Errores ortográficos en el contenido
- **"prioriodad"** (debe ser "prioridad") aparece repetido en varias páginas ("Nuestra prioriodad es la excelencia académica…"). Es texto compartido entre usl.ac.cr y usloccidente.com → error replicado.

**Impacto:** afecta credibilidad de una institución educativa (donde la calidad del lenguaje es parte de la marca).

### 🟠 ALTO-2 — Footers inconsistentes (años de copyright distintos)
- Unas páginas muestran "Copyright (c) 2021", otras "2025", otras "Copyright 2025 Universidad Santa Lucía".

**Impacto:** evidencia de footers hardcodeados y no centralizados en plantilla; señal de abandono/desactualización ante el visitante.

### 🟠 ALTO-3 — Probable falta de optimización móvil
Las páginas legacy `.html` (estáticas y antiguas) casi con seguridad **no son responsive**. El propio encargo del proyecto parte de que el sitio no es amigable en teléfono.

**Impacto:** la mayoría del tráfico de una universidad privada llega por celular (campañas en Instagram/Facebook/WhatsApp). Un sitio no responsive mata la conversión.

### 🟠 ALTO-4 — Títulos `<title>` y meta deficientes para SEO
- Títulos del tipo "**usloccidente.com** - Educación Con Excelencia Para Todos" → meter el dominio dentro del `<title>` es mala práctica.
- Falta de títulos únicos y descriptivos por carrera/sede.

### 🟡 MEDIO — Otros hallazgos a confirmar en vivo
- Open Graph / Twitter Cards (vista previa al compartir en redes).
- Favicon y manifest (PWA / icono en móvil).
- Compresión y formato moderno de imágenes (WebP/AVIF).
- Lazy-loading de imágenes.
- Certificado SSL y redirección 301 de `http`→`https` y de `usloccidente.com`→`www` (o viceversa, una sola canónica).
- Sitemap.xml presente y enviado a Search Console.
- Schema.org (`EducationalOrganization`, `Course`) para rich snippets.
- Política de privacidad / cookies (cumplimiento, sobre todo con formularios de datos).

---

## 4. Arquitectura de información (IA) actual reconstruida

Mapa de secciones detectadas en el índice:

```
/                                          Home
├── /informacion/                          Información institucional
├── /sede-alajuela/                        Sede Alajuela
├── /sede-san-carlos/                      Sede San Carlos
├── /Financiamiento.html        [LEGACY]   Financiamiento
├── /MaestriaAdministracionServiciosSalud.html  [LEGACY]  Maestría
├── Programas técnicos
│   ├── /tecnico-en-diseno-y-desarollo-web/      (slug con typo)
│   └── /tecnico-en-diseno-y-desarollo-web-2/    (en realidad = Asistente Administrativo)
└── Noticias / Promociones (posts)
    ├── /dias-usl-2024/
    ├── /promociones-matricula-i-cuatrimestre-2026-san-carlos/
    ├── /primera-promocion-matricula-i-cuatrimestre-2026-alajuela/
    ├── /sorteo-de-campos-clinicos-iii-cuatrimestre-2024/
    └── /reglamento-oficial-de-la-dinamica-rifa-futbolera-usl/
```

**Problemas de IA:**
- No hay una sección **"Carreras/Programas"** clara y unificada con su catálogo (técnicos, bachilleratos, licenciaturas, maestrías). Los programas están dispersos entre WordPress y `.html` legacy.
- Las **noticias/promos** y los **programas académicos** se mezclan sin jerarquía clara.
- No hay un **CTA de conversión** consistente (matrícula / solicitar información) presente en toda la navegación.

---

## 5. Catálogo académico detectado (a consolidar)

> Confirmar y completar con la institución. Detectado de forma parcial:

- **Técnicos:** Diseño y Desarrollo Web, Asistente Administrativo, Auxiliar/Técnico en Enfermería, Secretario Ejecutivo (otras sedes).
- **Bachilleratos / Licenciaturas:** Enfermería, Administración (Contaduría, Mercadeo, RR.HH., Gestión Municipal), Registros y Sistemas de Información en Salud, Ciencias de la Educación.
- **Maestrías:** Administración de Servicios de Salud, Salud Pública con énfasis en Epidemiología.

---

## 6. Riesgos de seguridad y cumplimiento a verificar

- **Formularios de datos personales** (matrícula/contacto) → requieren HTTPS, validación, protección anti-spam (honeypot/reCAPTCHA) y aviso de tratamiento de datos.
- **WordPress desactualizado** (núcleo/plugins/tema) es el principal vector de hackeo de universidades. Verificar versiones y plugins abandonados.
- **Backups** automáticos y plan de restauración.
- **Cumplimiento Ley 8968** (Protección de la Persona frente al tratamiento de sus datos personales, Costa Rica) para los formularios.

---

## 7. Priorización (matriz impacto × esfuerzo)

| Prioridad | Hallazgo | Impacto | Esfuerzo |
|---|---|---|---|
| P0 | Unificar en un solo sistema (eliminar legacy `.html`) | Alto | Medio |
| P0 | Responsive / mobile-first | Alto | Medio |
| P0 | Flujo de matrícula / "Solicitar información" | Alto | Medio |
| P1 | Corregir slugs y redirecciones 301 | Alto | Bajo |
| P1 | Corregir ortografía de contenido | Medio | Bajo |
| P1 | SEO técnico (titles, OG, sitemap, schema) | Alto | Bajo-Medio |
| P1 | `robots.txt` correcto | Medio | Bajo |
| P2 | Footer centralizado y consistente | Bajo | Bajo |
| P2 | Optimización de imágenes (WebP, lazy) | Medio | Bajo |
| P2 | Accesibilidad WCAG 2.2 AA | Medio | Medio |

---

## 8. Checklist de QA para el sitio nuevo (criterios de aceptación)

**Funcional**
- [ ] Toda página carga < 2.5 s (LCP) en 4G móvil.
- [ ] CLS < 0.1, INP < 200 ms.
- [ ] Cero enlaces rotos (404). Redirecciones 301 de todas las URLs viejas.
- [ ] Formularios validan, envían y confirman; llegan a destino; tienen anti-spam.
- [ ] WhatsApp/CTA funcionan en móvil (deep link `wa.me`).

**Responsive**
- [ ] Breakpoints: 360 / 768 / 1024 / 1440 px sin scroll horizontal.
- [ ] Targets táctiles ≥ 44×44 px. Menú hamburguesa accesible.
- [ ] Tipografía legible (mín. 16 px body en móvil).

**SEO**
- [ ] `<title>` y `meta description` únicos por página.
- [ ] Open Graph + Twitter Card en todas.
- [ ] `sitemap.xml` + `robots.txt` correctos, enviados a Search Console.
- [ ] Schema `EducationalOrganization` + `Course` por carrera.
- [ ] URLs limpias, en español, sin typos.

**Accesibilidad (WCAG 2.2 AA)**
- [ ] Contraste ≥ 4.5:1. Navegación por teclado completa. Foco visible.
- [ ] `alt` en imágenes, labels en formularios, jerarquía de headings correcta.
- [ ] Idioma declarado `lang="es-CR"`.

**Seguridad/cumplimiento**
- [ ] HTTPS forzado, HSTS. Headers de seguridad.
- [ ] Aviso de privacidad/cookies. Consentimiento en formularios (Ley 8968).
- [ ] Backups automáticos + entorno de staging.

---

## 9. Resumen ejecutivo técnico (1 párrafo)

El sitio actual es un **híbrido de un WordPress nuevo montado sobre un sitio estático antiguo** que nunca se retiró, lo que produce inconsistencia visual, contenido duplicado, errores en URLs (con faltas de ortografía que dañan el SEO de forma permanente), footers desactualizados y, muy probablemente, una experiencia móvil pobre. Además, **bloquea a los buscadores** y **no ofrece un camino claro de conversión** (matrícula/solicitud de información). La recomendación es **no parchear, sino reconstruir** sobre una sola plataforma, mobile-first, con SEO técnico, accesibilidad AA y un flujo de captación de estudiantes como eje central.
