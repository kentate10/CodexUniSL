/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "usercontent.one",
      },
      {
        protocol: "https",
        hostname: "www.usloccidente.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/informacion/", destination: "/#nosotros", permanent: true },
      { source: "/sede-alajuela/", destination: "/#sedes", permanent: true },
      { source: "/sede-san-carlos/", destination: "/#sedes", permanent: true },
      { source: "/Financiamiento.html", destination: "/#financiamiento", permanent: true },
      {
        source: "/MaestriaAdministracionServiciosSalud.html",
        destination: "/#carreras",
        permanent: true,
      },
      {
        source: "/tecnico-en-diseno-y-desarollo-web/",
        destination: "/#carreras",
        permanent: true,
      },
      {
        source: "/tecnico-en-diseno-y-desarollo-web-2/",
        destination: "/#carreras",
        permanent: true,
      },
      {
        source: "/tecnico-en-diseno-y-desarollo-web-3/",
        destination: "/#carreras",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
