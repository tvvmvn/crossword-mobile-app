import { BoardData, CaptionData } from '@/app';
import useAdMobInterstitial from '@/lib/hooks/useAdMobInterstitial';
import useBoard from '@/lib/hooks/useBoard';
import { useState } from 'react';
import PlayMode from "./PlayMode";
import ResultMode from "./ResultMode";

interface PuzzleModuleProps {
  defaultBoard: BoardData;
  captions: CaptionData[];
  publishDate: string;
}

export default function PuzzleModule({
    defaultBoard,
    captions,
    publishDate,
  }: PuzzleModuleProps) {
  
  // 보드 Hook
  const { 
    board, 
    updateBoard,
    clearBoard } = useBoard(defaultBoard, publishDate);
  // 플레이 상태
  const [playing, setPlaying] = useState<boolean>(true);
  // 틈새 광고 호출기
  const adMobInterstitial = useAdMobInterstitial();

  // 게임을 재시작합니다
  function gameStart() {
    // 보드를 초기화합니다.
    clearBoard();
    // 플레이 모드로 돌아갑니다
    setPlaying(true);
  }

  // 게임을 종료합니다
  function gameOver() {
    // 정답을 공개하기 전에 틈새 광고를 보여줍니다
    adMobInterstitial();
    // * 여기서 사용자가 광고를 끕니다 (CLOSED 리스너 작동) *
    // 플레이 모드로 돌아갑니다
    setPlaying(false);
  }

  // 플레이 모드
  const playMode = (
    <PlayMode
      board={board}
      updateBoard={updateBoard}
      captions={captions}
      gameOver={gameOver}
    />
  )

  // 정답지 모드
  const resultMode = (
    <ResultMode
      board={board}
      captions={captions}
      gameStart={gameStart}
    />
  )

  // 정답지 모드로 넘어갈 때, playmode가 언마운트됩니다
  // 따라서 플레이 모드로 돌아오면 state는 초기 상태입니다.
  return playing ? playMode : resultMode
}