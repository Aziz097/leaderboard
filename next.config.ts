import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============================================
  // VERCEL + NEXT.JS BEST PRACTICES CONFIG
  // ============================================

  // Image optimization - Vercel handles this automatically
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Vercel automatically uses their optimized loader
    // No need to specify loader for Vercel deployments
  },

  // Enable compression (Vercel also adds Brotli)
  compress: true,

  // Disable source maps in production for smaller bundles
  productionBrowserSourceMaps: false,

  // Experimental features
  experimental: {
    // CSS optimization for smaller bundles
    optimizeCss: true,
  },

  // Turbopack configuration (Next.js 16 default)
  turbopack: {},

  // Security & Performance Headers
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: [
          // Security Headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache JS/CSS chunks
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Logging configuration for Vercel
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Power Vercel Analytics (if you add @vercel/analytics)
  // This is automatically detected by Vercel
};

export default nextConfig;
