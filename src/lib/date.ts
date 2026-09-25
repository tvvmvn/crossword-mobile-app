// private
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

// public
export function getToday() {
  // 2026-09-25
  return new Intl.DateTimeFormat('en-CA')
      .format(new Date());
}

// public
export function todayDisplayDate(): string {
  // '2026-08-01' -> [2026, 8, 1]
  const [year, month, day] = getToday().split('-').map(Number);
  
  const date = new Date(year, month - 1, day);

  return `${month}월 ${day}일 ${WEEKDAYS[date.getDay()]}요일`;
}