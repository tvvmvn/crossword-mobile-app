import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// 1. 알림 수신 시 앱의 포그라운드 행동 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// 에러 핸들링 유틸 함수
function handleRegistrationError(errorMessage: string): void {
  alert(errorMessage);
  throw new Error(errorMessage);
}

// 2. 권한 요청 및 Expo Push Token 발급 함수
export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (!Device.isDevice) {
    handleRegistrationError('실제 기기(Physical Device)에서만 푸시 알림을 사용할 수 있습니다.');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    handleRegistrationError('푸시 알림 권한이 거부되었습니다.');
    return;
  }

  // app.json의 eas.projectId 안전하게 가져오기
  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

  if (!projectId) {
    handleRegistrationError('EAS Project ID를 찾을 수 없습니다. app.json을 확인해주세요.');
    return;
  }

  try {
    const pushTokenData = await Notifications.getExpoPushTokenAsync({
      projectId,
    });
    
    console.log('Expo Push Token:', pushTokenData.data);
    
    return pushTokenData.data;

  } catch (e: unknown) {
    handleRegistrationError(`토큰 발급 실패: ${e}`);
  }
}