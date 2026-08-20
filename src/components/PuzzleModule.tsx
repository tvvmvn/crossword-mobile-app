import { CaptionData, CellData } from '@/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import PlayMode from "./PlayMode";
import ResultMode from "./ResultMode";

interface PuzzleAreaProps {
  initialBoard: (CellData | null)[][];
  captions: CaptionData[];
  publishDate: string;
}

export default function PuzzleModule({
    initialBoard,
    captions,
    publishDate,
  }: PuzzleAreaProps) {
  
  // 보드 데이터
  const [board, setBoard] = useState<(CellData | null)[][]>([]);
  // 초기화 여부
  const [boardFilled, setBoardFilled] = useState(false);
  // 플레이 상태
  const [playing, setPlaying] = useState<boolean>(true);

  // 1. 보드 채우기: 앱을 켰을 때 수행합니다
  useEffect(() => {
    fillBoard();
    // setTimeout(() => fillBoard(), 1000)
    async function fillBoard() {
      // 오늘자 퍼즐을 비동기 저장소에서 가져옵니다
      const savedPuzzle = await AsyncStorage.getItem(publishDate);
      // 옵션1. 오늘 중으로 다시 앱에 접속하면 저장소로부터 풀던 퍼즐을 가져옵니다
      if (savedPuzzle) {
        setBoard(JSON.parse(savedPuzzle!));
      // 옵션2. 오늘 처음으로 접속한 경우 또는 저장소를 비운 경우 initialBoard(불변)로부터 퍼즐을 가져옵니다
      } else {
        setBoard(initialBoard);
      }
      setBoardFilled(true);
    }
  }, [])

  // 2. 게임의 진행 과정 기록: 게임의 진행 과정을 저장소와 동기화합니다.
  useEffect(() => {
    // 보드를 채운 이후부터 동기화 기능이 활성화됩니다
    if (boardFilled) {
      synchronizeStorage();
    }
    async function synchronizeStorage() {
      await AsyncStorage.setItem(publishDate, JSON.stringify(board));
    }
  }, [board]);
  
  // 게임을 재시작합니다
  function gameStart() {
    // data(불변 객체)를 활용해 보드를 초기화합니다.
    setBoard(initialBoard);
    // 다시 플레이모드로 돌아갑니다
    setPlaying(true);
  }

  function gameOver() {
    setPlaying(false)
  }

  const playMode = (
    <PlayMode
      board={board}
      setBoard={setBoard}
      captions={captions}
      gameOver={gameOver}
    />
  )

  const resultMode = (
    <ResultMode
      board={board}
      captions={captions}
      gameStart={gameStart}
    />
  )

  return playing ? playMode : resultMode
}