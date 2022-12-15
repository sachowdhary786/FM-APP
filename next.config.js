module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.arsenal.com',
      }
    ],
    domains: ['www.arsenal.com']
  },
  webpack: (config) => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;
    return config
  },
  env: {
    RECORDS_URI: 'http://localhost:5000/records/',
    POSTS_URI: 'http://localhost:5000/posts/'
  }
}