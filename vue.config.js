module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/when-is-it-over/' : '/',
	pwa: {
		name: 'My App',
		themeColor: '#4DBA87',
		msTileColor: '#000000',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'black',
	}
}