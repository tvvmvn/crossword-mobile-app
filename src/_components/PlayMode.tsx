import { BoardData, CaptionData } from '@/app';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Board from './Board';
import Caption from './Caption';
import VirtualKeyboard from './Keyboard';

// 커서 타입: 좌표 + 방향
export interface CursorData {
  r: number;
  c: number;
  orientation: Orientation; // 방위
}

// 커서의 방위 타입
export type Orientation = 'ACROSS' | 'DOWN';

interface PlayModeProps {
  board: BoardData;
  updateBoard: (r: number, c: number, q: string) => void;
  gameOver: any;
  captions: CaptionData[];
}

export default function PlayMode({
    board,
    updateBoard,
    gameOver,
    captions,
  }: PlayModeProps) {
  
  // 커서: 좌표와 방위로 구성됩니다
  const [cursor, setCursor] = useState<CursorData>({
    r: -1,
    c: -1,
    orientation: 'ACROSS',
  });

  // 게임 종료: 제출 버튼을 누르면 게임을 종료합니다
  function onPress(): void {
    gameOver();
  }

  // 커서 업데이트
  function updateCursor(r: number, c: number): void {
    // 기본 방향은 가로로 지정합니다
    const acrossId = board[r][c]!.acrossId;
    const downId = board[r][c]!.downId;
    let orientation: Orientation = 'ACROSS';

    // 교차 지점을 클릭한 경우
    if (acrossId && downId) {
      // 가로 상태에서 같은 칸을 다시 클릭한 경우 세로로 전환합니다
      if (
        cursor!.orientation == 'ACROSS' &&
        r === cursor!.r && 
        c === cursor!.c 
      ) {
        orientation = 'DOWN';
      }
    // 세로 퀴즈에 속한 칸을 클릭한 경우
    } else if (downId) {
      orientation = 'DOWN';
    }
    // 커서 업데이트
    setCursor({ r, c, orientation });
  }

  // 사용자 입력 처리: 가상 키보드를 통해 사용자로부터 입력받은 값을 처리합니다 (q: 입력값)
  function handleUserInput(q: string): void {
    // 1. 사용자 입력을 보드에 반영합니다
    updateBoard(cursor.r, cursor.c, q);
    // 2. 커서를 이동시킵니다
    moveCursor(q);
  }

  // 커서 이동
  function moveCursor(q: string) {
    // 이동 전 커서
    const { r, c, orientation } = cursor;
    // 가로 퀴즈인 경우
    if (orientation === 'ACROSS') {
      if (q === '') { // 삭제 버튼을 누른 경우
        isCell(r, c - 1) && setCursor({ ...cursor, c: c - 1 })
      } else { // 알파벳을 누른 경우
        isCell(r, c + 1) && setCursor({ ...cursor, c: c + 1 })
      }
    // 세로 퀴즈인 경우
    } else {
      if (q === '') { // 삭제 버튼을 누른 경우
        isCell(r - 1, c) && setCursor({ ...cursor, r: r - 1 })
      } else { // 알파벳을 누른 경우
        isCell(r + 1, c) && setCursor({ ...cursor, r: r + 1 })
      }
    }
    // 막혀서 이동할 수 없는 경우 커서의 현재 상태를 유지합니다
  }

  // 셀 유효성 검사: 살아있는 셀인지 검사합니다
  function isCell(r: number, c: number): boolean {
    const x = c >= 0 && c <= board[0].length - 1;
    const y = r >= 0 && r <= board.length - 1;
    // 유효한 좌표인지 검사합니다
    if (x && y) {
      return board[r][c] !== null;
    }
    // 입력받은 좌표가 보드를 벗어난 경우
    return false;
  }

  // 단어 ID: 커서 정보로부터 단어ID를 추출합니다
  const wordIdFromCursor = (): number | null => {
    // 현재 커서 정보
    const { r, c, orientation } = cursor;
    // 첫 렌더링 시 (-1, -1)
    if (!isCell(r, c)) return null;
    // 방위 - 가로
    if (orientation === 'ACROSS') {
      return board[r][c]!.acrossId;
    // 방위 - 세로
    } else {
      return board[r][c]!.downId;
    }
  }

  // 힌트: 단어 ID와 일치하는 캡션을 찾습니다
  const caption = captions
      .find((caption) => caption.wordId === wordIdFromCursor());

  return (
    <>
      {/* Board */}
      <Board
        board={board}
        cursor={cursor}
        updateCursor={updateCursor}
        wordId={wordIdFromCursor()}
        playing={true}
      />

      {/* Hint */}
      <Caption caption={caption} />

      {/* Virtual Keyboard */}
      <VirtualKeyboard handleUserInput={handleUserInput} />

      {/* Submit Button */}
      <View style={styles.submitButtonContainer}>
        <Pressable
          style={styles.submitButton}
          onPress={onPress}
        >
          <Text style={styles.submitText}>
            정답 확인
          </Text>
        </Pressable>
      </View>
    </>
  );
}

// Submit Button
const styles = StyleSheet.create({
  submitButtonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  submitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#000'
  },
  submitText: {
    color: '#fff',
    fontWeight: 700
  }
})