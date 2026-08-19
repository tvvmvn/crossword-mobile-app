import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CaptionData, CellData, Data } from "@/app";

interface PuzzleProviderProps {
  children: React.ReactNode;
  data: Data;
}

interface PuzzleContextType {
  board: (CellData | null)[][];
  updateBoard: (r: number, c: number, q: string) => void;
  publishDate: string;
  captions: CaptionData[];
  playing: boolean;
  gameStart: () => void;
  gameOver: () => void;
}

const PuzzleContext = createContext<PuzzleContextType | null>(null);

export const usePuzzle = (): PuzzleContextType => {
  const context = useContext(PuzzleContext);
  if (!context) {
    throw new Error("usePuzzle은 PuzzleProvider안에서만 사용될 수 있습니다");
  }
  return context;
};

// 퍼즐 게임과 관련된 핵심/전역 데이터를 보관합니다.
export default function PuzzleProvider({ children, data }: PuzzleProviderProps) {
  // 보드 데이터
  const [board, setBoard] = useState<(CellData | null)[][]>([]);
  // 플레이 상태
  const [playing, setPlaying] = useState<boolean>(true);

  // 1. 보드 초기화
  useEffect(() => {
    initBoard()
    // setTimeout(() => initBoard(), 1000)
    async function initBoard() {
      // 오늘자 퍼즐을 비동기 저장소에서 가져옵니다
      const savedPuzzle = await AsyncStorage.getItem(data.publishDate);
      // 오늘 처음으로 접속한 경우 또는 저장소를 비운 경우 data(불변)로부터 퍼즐을 가져옵니다
      if (!savedPuzzle) {
        setBoard(data.puzzleData.grid);
      // 오늘 중으로 다시 앱에 접속하면 저장소로부터 풀던 퍼즐을 가져옵니다
      } else {
        setBoard(JSON.parse(savedPuzzle!));
      }
    }
  }, []);
  
  // 2. 저장소 동기화: 초기/게임 진행 과정에서 동기화를 수행합니다
  useEffect(() => {
    // 초기화가 끝나야 동기화 기능이 활성화됩니다
    if (!board.length) return;

    synchronizeStorage();
    async function synchronizeStorage() {
      await AsyncStorage.setItem(data.publishDate, JSON.stringify(board));
    }
  }, [board]);

  // 퍼즐의 입력값(q)을 업데이트합니다
  function updateBoard(r: number, c: number, q: string): void {
    const updatedBoard = board.map((row, _r) => row.map((col, _c) => {
      if (!col) return null;
      if (_r === r && _c === c) {
        return { ...col, q };
      }
      return col;
    }));
    setBoard(updatedBoard);
  }

  // 게임을 재시작합니다
  async function gameStart(): Promise<void> {
    // data(불변 객체)를 활용해 보드를 초기화합니다.
    setBoard(data.puzzleData.grid);
    // 다시 플레이모드로 돌아갑니다
    setPlaying(true);
  }

  // 게임을 종료합니다 (정답 보기로 이동)
  function gameOver(): void {
    setPlaying(false);
  }

  return (
    <PuzzleContext.Provider
      value={{
        board,
        updateBoard,
        captions: data.puzzleData.captions,
        publishDate: data.publishDate,
        playing,
        gameStart,
        gameOver,
      }}
    >
      {children}
    </PuzzleContext.Provider>
  );
}