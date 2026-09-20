import * as Notifications from 'expo-notifications';
import { todayDisplayDate } from './date';

// 알림 권한 요청 및 로컬 알림 예약 함수
export default async function setLocalNotification() {
  
  // 1. 먼저 사용자에게 알림 권한을 요청합니다.
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    console.log('알림 권한이 허용되지 않았습니다.');
    return;
  }

  // 식별자를 바꾸는 과정에서 생기는 알람 삭제용
  // await Notifications.cancelAllScheduledNotificationsAsync();

  // 2. 기기 내부 타이머로 알림을 예약합니다.
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `영단어 십자말 🤓 ${todayDisplayDate()}`,
      body: '오늘의 퍼즐이 도착했어요!',
      sound: true,
    },
    identifier: 'crossword-morning-notification',
    trigger: {
      // type 지정을 통해 매일 반복되도록 설정합니다.
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 7,
      minute: 0,
    },
  });

  console.log('알림이 성공적으로 예약되었습니다!');

  const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
  
  console.log('현재 예약된 알림 목록:');
  scheduledNotifications.forEach(no => {
    console.log(no);
  })
}