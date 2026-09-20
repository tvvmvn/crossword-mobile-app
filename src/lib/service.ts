import { today } from "./date";

export async function getTodayPuzzle() {

  // URL 예시: /puzzles/2026-08-20
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/puzzles/${today}`);

  // 오류 발생! (상태 2XX이 아님)
  if (!res.ok) {
    console.error(res)
    throw new Error('Something is broken');
  }

  // 성공하면 전송받은 객체를 반환합니다
  return await res.json();
}