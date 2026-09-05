module.exports = {
  expo: {
    name: "영단어 십자말",
    slug: "crossword-mobile-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "crosswordmobileapp",
    userInterfaceStyle: "automatic",
    ios: {
      icon: "./assets/images/icon.png"
    },
    android: {
      icon: "./assets/images/icon.png",
      predictiveBackGestureEnabled: false,
      package: "com.tvvmvnexpo.crosswordmobileapp",
      // EAS 시크릿 환경 변수 파일 경로를 연결하고, 로컬 개발을 위해 기존 경로를 fallback으로 지정
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json"
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#fff",
          image: "./assets/images/splash-icon.png",
          imageWidth: 76
        }
      ],
      [
        "react-native-google-mobile-ads",
        {
          androidAppId: "ca-app-pub-3940256099942544~3347511713"
        }
      ]
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    },
    extra: {
      router: {},
      eas: {
        projectId: "a93780ce-326e-44f7-9001-dc5d66608b62"
      }
    },
    owner: "tvvmvn-expo"
  }
};