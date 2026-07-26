/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // versioned local images (?v=N) bust year-long immutable browser caches
    localPatterns: [{ pathname: "/**" }],
  },
  async headers() {
    return [
      {
        source: "/:all*(webp|jpg|png|mp4|webm|svg)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
