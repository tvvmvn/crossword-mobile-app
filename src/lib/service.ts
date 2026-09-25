import { getToday } from "./date";

export async function getTodayPuzzle() {
  // URL 예시: /puzzles/2026-08-20
  const url = `${process.env.EXPO_PUBLIC_API_URL}/puzzles/${getToday()}`;
  const res = await fetch(url);

  // 오류 발생! (상태 2XX이 아님)
  if (!res.ok) {
    console.error(res)
    throw new Error('Something is broken');
  }

  // 성공하면 전송받은 객체를 반환합니다
  return await res.json();
}