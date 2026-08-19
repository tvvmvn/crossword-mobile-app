import { CellData } from "@/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useBoardStorage(publishDate: string, fetchedBoard: (CellData | null)[][]) {

  // 퍼즐 보드 (핵심)
  const [board, setBoard] = useState<any>([]);
  // 초기화 여부
  const [initialized, setInitialized] = useState(false);

  // 1. 초기 보드(initial board) 설정: 앱을 켰을 때 보드의 초기값을 설정합니다
  useEffect(() => {
    initBoard()
    // setTimeout(() => initBoard(), 1000)
    async function initBoard() {
      // 오늘자 퍼즐을 비동기 저장소에서 가져옵니다
      const savedPuzzle = await AsyncStorage.getItem(publishDate);
      // 옵션1. 오늘 중으로 다시 앱에 접속하면 저장소로부터 풀던 퍼즐을 가져옵니다
      if (savedPuzzle) {
        setBoard(JSON.parse(savedPuzzle!));
      // 옵션2. 오늘 처음으로 접속한 경우 또는 저장소를 비운 경우 data(불변)로부터 퍼즐을 가져옵니다
      } else {
        setBoard(fetchedBoard);
      }
      setInitialized(true);
    }
  }, [])

  // 2. 게임의 진행 과정 기록: 게임의 진행 과정을 저장소와 동기화합니다.
  useEffect(() => {
    // 초기화가 끝난 이후부터 동기화 기능이 활성화됩니다
    if (initialized) {
      synchronizeStorage();
    }
    async function synchronizeStorage() {
      await AsyncStorage.setItem(publishDate, JSON.stringify(board));
    }
  }, [board]);

  return { board, setBoard }
}