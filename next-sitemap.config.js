/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://tinkon.in",
  generateRobotsTxt: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/drafts/**', '/private/*'] // (optional) Generate robots.txt file
  // You can add more options if you want (see docs)
};
