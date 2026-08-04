import { useEffect, useState } from "react";
import PuzzleProvider from "@/components/PuzzleProvider";
import PuzzleScreen from "@/components/PuzzleScreen";
import { fetchPuzzle } from "@/lib/service";
import { Text } from "react-native";

export interface CellData {
  acrossId: number | null;
  downId: number | null;
  label: number | null;
  value: string;
  q: string;
}

export interface CaptionData {
  wordId: number,
  word: string,
  content: string,
  label: number,
  acrossward: boolean
}

export interface PuzzleData {
  grid: (CellData | null)[][];
  captions: CaptionData[]
}

export interface Data {
  publishDate: string;
  puzzleData: PuzzleData;
}

export default function App() {

  const [error, setError] = useState<unknown>(null)
  const [data, setData] = useState<Data | null>(null);
  
  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    try {
      // 캐시의 maxAge(최대 수명)이 만료된 경우만 서버에 요청하고
      // 디스크 캐시로부터 데이터를 가져옵니다
      const d = await fetchPuzzle();
      setData(d);
    } catch (e) {
      setError(e)
    }
  }

  if (error) {
    return <Text>Error!</Text>
  }

  if (!data) {
    return <Text>Loading..</Text>
  }

  return (
    <PuzzleProvider data={data}>
      <PuzzleScreen />
    </PuzzleProvider>
  )
}