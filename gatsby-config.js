module.exports = {
  siteMetadata: {
    title: `Keaton Type 1`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
    resolve: 'gatsby-source-datocms',
    options: {
      "apiToken": "11c7cea5158e2d069fa32beabb9c87"
    }
  }]
};