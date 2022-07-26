import 'dotenv/config'

let Config = {
  apiUrl: process.env.API_ENDPOINT,
}

if (process.env.APP_ENV === 'production') {
  Config.apiUrl = 'https://conference-demos.vercel.app'
} else if (process.env.APP_ENV === 'staging') {
  Config.apiUrl = 'https://conference-demos-git-develop-mwarger.vercel.app'
}

export default {
  expo: {
    owner: 'mwarger',
    name: 'Mobile',
    slug: 'mobile',
    scheme: 'com.tmdb.watchlist.edgedb',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#f44336',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.tmdb.watchlist.edgedb',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#f44336',
      },
      package: 'com.tmdb.watchlist.edgedb',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      ...Config,
    },
  },
}
