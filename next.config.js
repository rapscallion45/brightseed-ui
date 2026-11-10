module.exports = {
  async redirects() {
    return [{
      source: '/posts/javascript-fullstack-developer%e2%80%8a-a-new-trend-in-web-development',
      destination: '/posts/javascript-fullstack-developer-a-new-trend-in-web-development',
      permanent: true,
    }];
  },
  images: {
    // Repository content uses local images from public/.
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
};
