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
                pathname: '/storage/v1/object/public/Selects/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;
