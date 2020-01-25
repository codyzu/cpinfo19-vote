module.exports = {
  siteMetadata: {
    title: `CPINFO-19 Final Vote`,
    description: `Cast your vote for how to control CPINFO-19 Web Development final.`,
    author: `@codyzu`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `cpinfo-19 vote`,
        short_name: `vote`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#FFFFFF`,
        display: `minimal-ui`,
        icon: `src/images/cloud-512x512.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
