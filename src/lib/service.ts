export async function fetchPuzzle() {
  
  const res = await fetch(process.env.EXPO_PUBLIC_API_URL + '/puzzle');

  if (!res.ok) {
    console.error(res)
    throw new Error('Something is broken');
  }

  return await res.json();
}