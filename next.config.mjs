/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true, // Si estás usando la carpeta "app/"
    },
    output: "standalone", // Para despliegues más fáciles en plataformas como Vercel
  };
  
export default nextConfig;
