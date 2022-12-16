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
    MONGO_URI: 'mongodb+srv://saad:Zaina78602@cluster0.676d1fs.mongodb.net/players/arsenal?retryWrites=true&w=majority"',
    RECORDS_URI: 'http://localhost:5000/records/',
    POSTS_URI: 'http://localhost:5000/posts/'
  }
}