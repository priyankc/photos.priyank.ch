import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/**',
                search: '',
            },{
                protocol: 'https',
                hostname: 'lalikzfkzejytvtzxbuw.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**',
                search: '',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '54321',
                pathname: '/storage/v1/object/public/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;
