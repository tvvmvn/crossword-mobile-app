import * as Notifications from 'expo-notifications';

// 알림 권한 요청 및 로컬 알림 예약 함수
export async function scheduleLocalNotification() {
  // 1. 먼저 사용자에게 알림 권한을 요청합니다.
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    alert('알림 권한이 허용되지 않았습니다.');
    return;
  }

  const date = new Intl.DateTimeFormat('en-CA')
      .format(new Date());

  // 2. 기기 내부 타이머로 알림을 예약합니다.
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "영단어 십자말 🤓",
      body: date + " 퍼즐을 풀어보세요!",
      sound: true,
    },
    trigger: {
      // type 지정을 통해 매일 반복되도록 설정합니다.
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 7,
      minute: 0,
    },
  });

  console.log('알림이 성공적으로 예약되었습니다!');
}