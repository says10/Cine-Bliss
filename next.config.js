// next.config.js

module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "raw.githubusercontent.com",
        },
      ],
    },
    // Add other configurations below
    reactStrictMode: true, // Example: Enables React Strict Mode
    swcMinify: true, // Example: Enables SWC minification
  };

  return nextConfig;
};
