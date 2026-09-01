import { BoardData, CellData } from "@/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function useBoard(defaultBoard: any, publishDate: string) {
  // 보드 데이터
  const [board, setBoard] = useState<BoardData>([]);
  // 초기화 여부
  const [boardFilled, setBoardFilled] = useState(false);

  // 1. 보드 초기화: 앱을 켰을 때 수행합니다
  useEffect(() => {
    initBoard();
    async function initBoard() {
      // 오늘자 퍼즐을 비동기 저장소에서 가져옵니다
      const savedPuzzle = await AsyncStorage.getItem(publishDate);
      // 옵션1. 오늘 중으로 다시 앱에 접속하면 저장소로부터 풀던 퍼즐을 가져옵니다
      if (savedPuzzle) {
        setBoard(JSON.parse(savedPuzzle!));
        // 옵션2. 오늘 처음으로 접속한 경우 또는 저장소를 비운 경우 빈 퍼즐로 설정합니다
      } else {
        setBoard(defaultBoard);
      }
      setBoardFilled(true);
  }
  }, [])
  
  // 2. 로컬 저장소 동기화: 게임의 진행 과정을 저장합니다
  useEffect(() => {
    // 보드를 채운 이후부터 동기화 기능이 활성화됩니다
    if (!boardFilled) return;
    synchronizeStorage();
    async function synchronizeStorage() {
      await AsyncStorage.setItem(publishDate, JSON.stringify(board));
    }
  }, [board]);

  // 보드 업데이트
  function updateBoard(r: number, c: number, q: string) {
    const updatedBoard = board.map((row, _r) => row.map((col, _c) => {
      if (col && _r === r && _c === c) {
        return { ...col, q };
      }
      return col;
    }));
    setBoard(updatedBoard);
  }

  // 보드 초기화
  function clearBoard() {
    setBoard(defaultBoard);
  }

  return { board, clearBoard, updateBoard }
}

