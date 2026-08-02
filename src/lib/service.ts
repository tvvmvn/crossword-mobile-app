export async function fetchPuzzle() {
  
  const res = await fetch('http://localhost:8080/api/puzzle');

  if (!res.ok) {
    console.error(res)
    throw new Error('Something is broken');
  }

  return await res.json();
}