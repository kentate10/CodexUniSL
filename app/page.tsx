"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { campuses, contacts, news, programs, type Level } from "@/content/site";

const levels: Array<Level | "Todos"> = ["Todos", "Técnico", "Bachillerato", "Licenciatura", "Maestría"];
const heroImage = "https://usercontent.one/wp/www.usloccidente.com/wp-content/uploads/2023/06/Header.webp";
const logo = "https://usercontent.one/wp/www.usloccidente.com/wp-content/uploads/2023/06/Logo-USL-300x218.png";

function SectionTitle({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-blue">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-ink sm:text-4xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-7 text-brand-muted">{copy}</p> : null}
    </div>
  );
}

function CTA({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  const styles =
    variant === "primary"
      ? "bg-brand-gold text-brand-ink hover:bg-[#e9a21a]"
      : "border border-white/70 bg-white/10 text-white hover:bg-white/20";
  return (
    <a
      className={`focus-ring inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-black transition ${styles}`}
      href={href}
    >
      {children}
    </a>
  );
}

export default function Home() {
  const [level, setLevel] = useState<Level | "Todos">("Todos");
  const [query, setQuery] = useState("");

  const filteredPrograms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programs.filter((program) => {
      const matchesLevel = level === "Todos" || program.level === level;
      const matchesQuery = !q || `${program.name} ${program.area} ${program.summary}`.toLowerCase().includes(q);
      return matchesLevel && matchesQuery;
    });
  }, [level, query]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Universidad Santa Lucía - Sede Occidente",
    url: "https://www.usloccidente.com",
    logo,
    slogan: "Educación con Excelencia para Todos",
    address: campuses.map((campus) => ({
      "@type": "PostalAddress",
      addressLocality: campus.name.replace("Sede ", ""),
      addressCountry: "CR",
      streetAddress: campus.address,
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+506-8484-7884",
        contactType: "Admisiones",
        areaServed: "CR",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <a className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-ink focus:px-4 focus:py-3 focus:text-white" href="#main">
        Saltar al contenido principal
      </a>

      <header className="sticky top-0 z-40 border-b border-brand-line bg-white/95 backdrop-blur">
        <nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
          <a className="focus-ring flex items-center gap-3 rounded-md" href="#">
            <Image src={logo} alt="Logo Universidad Santa Lucía" width={62} height={45} priority />
            <span className="hidden text-sm font-black text-brand-navy sm:block">USL Occidente</span>
          </a>
          <div className="hidden items-center gap-5 text-sm font-bold text-brand-muted md:flex">
            <a className="focus-ring rounded-md hover:text-brand-blue" href="#carreras">Carreras</a>
            <a className="focus-ring rounded-md hover:text-brand-blue" href="#sedes">Sedes</a>
            <a className="focus-ring rounded-md hover:text-brand-blue" href="#admisiones">Admisiones</a>
            <a className="focus-ring rounded-md hover:text-brand-blue" href="#noticias">Noticias</a>
          </div>
          <a className="focus-ring inline-flex min-h-11 items-center rounded-md bg-brand-blue px-4 py-2 text-sm font-black text-white hover:bg-brand-navy" href={contacts.whatsapp}>
            Solicitá información
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="relative isolate overflow-hidden bg-brand-navy text-white">
          <Image src={heroImage} alt="Estudiantes y sedes de Universidad Santa Lucía Occidente" fill priority className="absolute inset-0 -z-20 object-cover opacity-45" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-blue/50" />
          <div className="section grid min-h-[calc(100svh-4rem)] items-center gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="inline-flex rounded-full bg-white/12 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/30">Educación con Excelencia para Todos</p>
              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                Más de 30 años formando profesionales en Occidente.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/88">
                Carreras técnicas, bachilleratos, licenciaturas y maestrías con sedes en Alajuela y San Carlos, enfoque práctico y acompañamiento para tu proceso de matrícula.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTA href="#admisiones">Matriculate</CTA>
                <CTA href={contacts.whatsapp} variant="secondary">Solicitá información</CTA>
              </div>
            </div>
            <div className="card bg-white/95 p-5 text-brand-ink shadow-soft">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-brand-blue">Oferta académica</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {levels.slice(1).map((item) => (
                  <a key={item} href="#carreras" className="focus-ring rounded-lg border border-brand-line bg-brand-sky p-4 hover:border-brand-blue">
                    <span className="block text-3xl font-black">{programs.filter((p) => p.level === item).length}</span>
                    <span className="text-sm font-bold text-brand-muted">{item}s</span>
                  </a>
                ))}
              </div>
              <p className="mt-5 rounded-lg bg-amber-50 p-4 text-sm leading-6 text-brand-ink">
                Datos migrados desde usloccidente.com. Costos, acreditaciones y algunos planes marcados como pendientes deben validarse con la universidad antes de publicar.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="section grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["30 años", "trayectoria institucional"],
              ["+25.000", "egresados reportados"],
              ["2 sedes", "Alajuela y San Carlos"],
              ["8484-7884", "WhatsApp de admisiones"],
            ].map(([stat, label]) => (
              <div className="rounded-lg border border-brand-line p-5 text-center" key={stat}>
                <strong className="block text-3xl font-black text-brand-navy">{stat}</strong>
                <span className="text-sm font-semibold text-brand-muted">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="nosotros" className="section">
          <SectionTitle
            eyebrow="Conocé a la USL"
            title="Una universidad orientada a la excelencia académica"
            copy="La Universidad Santa Lucía Occidente se presenta como una institución comprometida con la educación superior, la formación integral, la calidad y la aplicación práctica del conocimiento."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Excelencia académica", "Dirigir los esfuerzos hacia la formación de profesionales preparados para servir al desarrollo de Costa Rica."],
              ["Calidad", "Actualización constante para mantener una experiencia educativa sólida y pertinente."],
              ["Financiamiento", "Opciones de financiamiento, descuentos y promociones para facilitar el acceso a la educación."],
            ].map(([title, copy]) => (
              <article className="card p-6" key={title}>
                <h3 className="text-xl font-black text-brand-navy">{title}</h3>
                <p className="mt-3 leading-7 text-brand-muted">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="carreras" className="bg-white">
          <div className="section">
            <SectionTitle
              eyebrow="Carreras"
              title="Catálogo filtrable de la oferta académica"
              copy="Programas consolidados desde el sitio actual, con slugs limpios y notas visibles cuando una página heredada necesita validación."
            />
            <div className="mb-8 grid gap-4 rounded-lg border border-brand-line bg-brand-sky p-4 md:grid-cols-[1fr_auto]">
              <label className="block">
                <span className="mb-2 block text-sm font-black text-brand-ink">Buscá por carrera o área</span>
                <input
                  className="focus-ring min-h-12 w-full rounded-md border border-brand-line bg-white px-4 text-base"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ej. Enfermería, mercadeo, salud..."
                />
              </label>
              <div>
                <span className="mb-2 block text-sm font-black text-brand-ink">Nivel</span>
                <div className="flex flex-wrap gap-2">
                  {levels.map((item) => (
                    <button
                      key={item}
                      className={`focus-ring min-h-12 rounded-md px-4 text-sm font-black ${level === item ? "bg-brand-blue text-white" : "bg-white text-brand-ink ring-1 ring-brand-line"}`}
                      onClick={() => setLevel(item)}
                      type="button"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <p className="mb-5 text-sm font-bold text-brand-muted">{filteredPrograms.length} programas encontrados</p>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredPrograms.map((program) => (
                <article className="card flex flex-col p-5" key={`${program.level}-${program.slug}`}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-brand-sky px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-blue">{program.level}</span>
                    <span className="text-right text-xs font-bold text-brand-muted">{program.area}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-black text-brand-ink">{program.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-brand-muted">{program.summary}</p>
                  <dl className="mt-5 grid gap-2 text-sm">
                    <div><dt className="font-black text-brand-ink">Duración</dt><dd className="text-brand-muted">{program.duration}</dd></div>
                    <div><dt className="font-black text-brand-ink">Sedes</dt><dd className="text-brand-muted">{program.campuses.join(" / ")}</dd></div>
                  </dl>
                  {program.status ? <p className="mt-4 rounded-md bg-amber-50 p-3 text-xs font-bold text-amber-900">{program.status}</p> : null}
                  <a className="focus-ring mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-brand-navy px-4 text-sm font-black text-white hover:bg-brand-blue" href={contacts.whatsapp}>
                    Consultar esta carrera
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sedes" className="section">
          <SectionTitle eyebrow="Sedes" title="Alajuela y San Carlos" copy="Información de contacto extraída del sitio actual y consolidada en una sola fuente de verdad." />
          <div className="grid gap-6 lg:grid-cols-2">
            {campuses.map((campus) => (
              <article className="card overflow-hidden" key={campus.name}>
                <div className="bg-brand-navy p-6 text-white">
                  <h3 className="text-2xl font-black">{campus.name}</h3>
                  <p className="mt-2 text-white/80">{campus.address}</p>
                </div>
                <div className="space-y-4 p-6">
                  <p><strong>Horario:</strong> {campus.schedule}</p>
                  <p><strong>Teléfono:</strong> <a className="focus-ring rounded text-brand-blue underline" href={`tel:${campus.phone}`}>{campus.phone}</a></p>
                  <p><strong>Correo:</strong> <a className="focus-ring rounded text-brand-blue underline" href={`mailto:${campus.email}`}>{campus.email}</a></p>
                  <div className="flex flex-wrap gap-3">
                    <a className="focus-ring rounded-md bg-brand-blue px-4 py-3 text-sm font-black text-white" href={campus.maps}>Google Maps</a>
                    <a className="focus-ring rounded-md border border-brand-line px-4 py-3 text-sm font-black text-brand-ink" href={campus.waze}>Waze</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="financiamiento" className="bg-brand-navy text-white">
          <div className="section grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-gold">Financiamiento</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Descuentos y formas de pago para que no dejés pasar la oportunidad.</h2>
              <p className="mt-4 leading-7 text-white/82">El sitio actual comunica financiamiento, promociones de matrícula y descuentos por sede. El nuevo flujo los convierte en un bloque claro de conversión.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {["Promociones por cuatrimestre", "Descuentos por sede", "Consulta directa por WhatsApp"].map((item) => (
                <div className="rounded-lg bg-white/10 p-5 ring-1 ring-white/20" key={item}>
                  <p className="font-black">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="admisiones" className="section">
          <SectionTitle eyebrow="Admisiones" title="Proceso de matrícula más claro" copy="El sitio anterior tenía el proceso repartido. Esta versión pone el siguiente paso al frente: consultar, elegir carrera, confirmar sede y matricular." />
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <ol className="space-y-4">
              {["Solicitá información por WhatsApp o formulario.", "Elegí carrera, sede y modalidad disponible.", "Confirmá requisitos, costos y promociones vigentes.", "Completá matrícula con plataforma de servicios."].map((step, index) => (
                <li className="card flex gap-4 p-5" key={step}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold font-black text-brand-ink">{index + 1}</span>
                  <span className="self-center font-bold">{step}</span>
                </li>
              ))}
            </ol>
            <form className="card grid gap-4 p-6" aria-label="Formulario de solicitud de información">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-black">Nombre<input className="focus-ring mt-2 min-h-12 w-full rounded-md border border-brand-line px-4 font-normal" name="name" required /></label>
                <label className="block text-sm font-black">Celular<input className="focus-ring mt-2 min-h-12 w-full rounded-md border border-brand-line px-4 font-normal" name="phone" required /></label>
              </div>
              <label className="block text-sm font-black">Correo<input className="focus-ring mt-2 min-h-12 w-full rounded-md border border-brand-line px-4 font-normal" name="email" type="email" /></label>
              <label className="block text-sm font-black">Carrera de interés<input className="focus-ring mt-2 min-h-12 w-full rounded-md border border-brand-line px-4 font-normal" name="program" /></label>
              <label className="sr-only">Sitio web<input name="website" tabIndex={-1} autoComplete="off" /></label>
              <p className="text-xs text-brand-muted">Demo visual. {"<<PENDIENTE: endpoint/correo de admisiones y aviso legal final>>"}</p>
              <a className="focus-ring inline-flex min-h-12 items-center justify-center rounded-md bg-brand-blue px-5 font-black text-white hover:bg-brand-navy" href={contacts.whatsapp}>
                Enviar por WhatsApp
              </a>
            </form>
          </div>
        </section>

        <section id="noticias" className="bg-white">
          <div className="section">
            <SectionTitle eyebrow="Noticias y promociones" title="Actividad reciente del sitio actual" copy="Las entradas se consolidan como blog/promociones para que no se mezclen con las páginas académicas." />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <article className="card p-5" key={item}>
                  <p className="text-xs font-black uppercase tracking-wide text-brand-blue">Noticia / promoción</p>
                  <h3 className="mt-2 text-lg font-black text-brand-ink">{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-brand-ink text-white">
        <div className="section grid gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div>
            <Image src={logo} alt="Logo USL" width={82} height={60} className="rounded bg-white p-1" />
            <p className="mt-4 max-w-md leading-7 text-white/75">Universidad Santa Lucía - Sede Occidente. Educación con Excelencia para Todos.</p>
          </div>
          <div>
            <h2 className="font-black">Enlaces rápidos</h2>
            <div className="mt-4 grid gap-2 text-white/75">
              <a className="focus-ring rounded hover:text-white" href="#carreras">Carreras</a>
              <a className="focus-ring rounded hover:text-white" href="#sedes">Sedes</a>
              <a className="focus-ring rounded hover:text-white" href="#admisiones">Admisiones</a>
              <a className="focus-ring rounded hover:text-white" href="#financiamiento">Financiamiento</a>
            </div>
          </div>
          <div>
            <h2 className="font-black">Contacto</h2>
            <p className="mt-4 text-white/75">Alajuela: 2440-4545</p>
            <p className="text-white/75">San Carlos: 4000-1921</p>
            <a className="focus-ring mt-4 inline-flex rounded-md bg-brand-gold px-4 py-3 font-black text-brand-ink" href={contacts.whatsapp}>WhatsApp</a>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-white/65">
          © {new Date().getFullYear()} Universidad Santa Lucía - Sede Occidente. Todos los derechos reservados.
        </div>
      </footer>

      <a className="focus-ring fixed bottom-20 right-4 z-50 rounded-full bg-[#25d366] px-5 py-4 text-sm font-black text-white shadow-soft md:bottom-5" href={contacts.whatsapp}>
        WhatsApp
      </a>
      <a className="focus-ring fixed inset-x-4 bottom-4 z-50 rounded-md bg-brand-gold px-5 py-4 text-center text-sm font-black text-brand-ink shadow-soft md:hidden" href="#admisiones">
        Matriculate
      </a>
    </>
  );
}
