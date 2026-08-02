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
    throw new Error("usePuzzle must be used within PuzzleProvider");
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
    initBoard();
    async function initBoard() {
      const savedPuzzle = await AsyncStorage.getItem(data.publishDate);
      if (!savedPuzzle) {
        setBoard(data.puzzleData.grid);
      } else {
        setBoard(JSON.parse(savedPuzzle!));
      }
    }
  }, []);
  
  // 2. board 상태 변경 시 AsyncStorage에 저장 (비동기 처리)
  useEffect(() => {
    syncStorage();
    async function syncStorage() {
      await AsyncStorage.setItem(data.publishDate, JSON.stringify(board));
    }
  }, [board]);

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

  async function gameStart(): Promise<void> {
    setBoard(data.puzzleData.grid);
    setPlaying(true);
  }

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