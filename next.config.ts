import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jirhzzpaqwwoqshfhawu.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'dp-prod.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '44.240.251.75',
        port: '',
        pathname: '/**',
      },
    ],
  localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
      {
        pathname: '/api/media/file/**',
        search: '?prefix=media', // 显式允许带有这个参数的图片
      },
      {
        pathname: '/api/media/file/**',
        search: '', // 同时允许不带参数的普通本地图片（以防万一）
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: false,
      },
    ];
  },
};

export default withPayload(nextConfig);
