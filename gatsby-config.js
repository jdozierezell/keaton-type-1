module.exports = {
	siteMetadata: {
		title: `Keaton Type 1`,
		siteUrl: `https://www.yourdomain.tld`,
	},
	plugins: [
		{
			resolve: 'gatsby-source-datocms',
			options: {
				apiToken: '11c7cea5158e2d069fa32beabb9c87',
			},
		},
		{
			resolve: '@chakra-ui/gatsby-plugin',
			options: {
				resetCSS: true,
				isUsingColorMode: true,
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Keaton Type 1`,
				short_name: `KT1`,
				start_url: `/`,
				background_color: `#8BEE11`,
				theme_color: `#5412ED`,
				display: `standalone`,
				icon: `src/images/insulin_pen.png`,
			},
		},
		{
			resolve: `gatsby-plugin-offline`,
			options: {
				precachePages: [`/`],
			},
		},
	],
}
