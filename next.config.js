/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

}

module.exports = {
  nextConfig,
  // allow next/image to load images only from the domais with hostnames we know of.
  images: {
    domains: ["images.unsplash.com"]
  }
};
