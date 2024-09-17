const myValue = 'Greenbasket'; // App name can be dynamic

module.exports = {
  expo: {
    name: myValue,
    slug: 'Greenbasket',
    version: process.env.MY_CUSTOM_PROJECT_VERSION || '1.0.0',
    orientation: 'portrait',
    icon: './assets/apps/image.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/apps/entry.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.greenbasketkz.app',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: '14c3497f-0fff-4d6b-bccc-ba4f20199a4a',
      },
    },
    scheme: 'greenbasket',
    plugins: ['expo-asset', 'expo-font'],
  },
};
