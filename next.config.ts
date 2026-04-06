import path from "path";

export default {
  experimental: {
    // ppr: true,
    // inlineCss: true,
    useCache: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imgnike-a.akamaihd.net",
        pathname: "/**",
      },
    ],
  },
};
