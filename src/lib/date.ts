// useEffect와 []의 조합처럼 앱이 처음 실행될 때만 날짜를 업데이트합니다.
export const today = new Intl.DateTimeFormat('en-CA')
    .format(new Date());

export function todayDisplayDate(): string {
  // '2026-08-01' -> [2026, 8, 1]
  const [year, month, day] = today.split('-').map(Number);
  const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(year, month - 1, day);

  return `${month}월 ${day}일 ${WEEKDAYS[date.getDay()]}요일`;
}