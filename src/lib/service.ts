export async function getTodayPuzzle() {

  // en-CA(캐나다 영어): 날짜가 yyyy-MM-dd 형식을 가집니다
  const date = new Intl.DateTimeFormat('en-CA')
      .format(new Date());
  
  // URL 예시: /puzzles/2026-08-20
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/puzzles/${date}`);

  // 오류 발생! (상태 2XX이 아님)
  if (!res.ok) {
    console.error(res)
    throw new Error('Something is broken');
  }

  // 성공하면 전송받은 객체를 반환합니다
  return await res.json();
}