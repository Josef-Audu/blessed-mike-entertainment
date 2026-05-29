/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bnrztkcmzglfidruuyxn.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

if (process.env.NODE_ENV === 'development') {
  // Keeps Turbopack happy if there are any experimental configurations
}

export default nextConfig;