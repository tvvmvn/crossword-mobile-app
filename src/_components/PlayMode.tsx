import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Board from './Board';
import VirtualKeyboard from './Keyboard';
import Caption from './Caption';
import { CaptionData, CellData } from '@/app';

// 커서 타입: 좌표 + 방향
export interface CursorData {
  r: number;
  c: number;
  orientation: Orientation; // 방위
}

// 커서의 방위 타입
export type Orientation = 'ACROSS' | 'DOWN';

interface PlayModeProps {
  board: (CellData | null)[][];
  setBoard: any;
  gameOver: any;
  captions: CaptionData[];
}

export default function PlayMode({
    board,
    setBoard,
    gameOver,
    captions,
  }: PlayModeProps) {
  
  // 커서: 좌표와 방위로 구성됩니다
  const [cursor, setCursor] = useState<CursorData>({
    r: -1,
    c: -1,
    orientation: 'ACROSS',
  });

  // 로직상 return 안에 있는것이 어울리는 변수는 바로 위에 적습니다
  const wordId: number | null = getWordId();

  // 제출 버튼을 누르면 게임을 종료합니다
  function onPress(): void {
    gameOver()
  }

  // 커서를 업데이트합니다
  function updateCursor(r: number, c: number, orientation: Orientation): void {
    setCursor({ r, c, orientation });
  }

  // 사용자 입력 처리
  function handleUserInput(q: string): void {
    // 포커스된 커서 상태
    const { r, c, orientation } = cursor;

    // 1. 보드를 새 값과 함께 업데이트합니다
    const updatedBoard = board.map((row, _r) => row.map((col, _c) => {
      if (!col) return null;
      if (_r === r && _c === c) {
        return { ...col, q };
      }
      return col;
    }));
    setBoard(updatedBoard);

    // 2. 커서 이동
    // 가로 퀴즈에서 삭제키를 누른 경우 왼쪽으로 이동
    if (orientation === 'ACROSS' && q === '' && isCell(r, c - 1)) {
      setCursor({ ...cursor, c: c - 1 });
    // 가로 퀴즈에서 알파벳키를 누른 경우 오른쫃으로 이동
    } else if (orientation === 'ACROSS' && q !== '' && isCell(r, c + 1)) {
      setCursor({ ...cursor, c: c + 1 });
    // 세로 퀴즈에서 삭제키를 누른 경우 위로 이동
    } else if (orientation === 'DOWN' && q === '' && isCell(r - 1, c)) {
      setCursor({ ...cursor, r: r - 1 });
    // 세로 퀴즈에서 알파벳키를 누른 경우 아래로 이동
    } else if (orientation === 'DOWN' && q !== '' && isCell(r + 1, c)) {
      setCursor({ ...cursor, r: r + 1 });
    } 
    // 막혀서 이동할 수 없는 경우 커서의 현재 상태를 유지합니다
  }

  // 살아있는 셀인지 검사합니다
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

  // 커서 정보로부터 단어ID를 추출하는 로직
  function getWordId() {
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

  // 힌트
  const caption = captions.find((caption) => caption.wordId === wordId);

  return (
    <>
      {/* Board */}
      <Board
        board={board}
        playing={true}
        cursor={cursor}
        updateCursor={updateCursor}
        wordId={wordId}
      />

      {/* Hint */}
      <Caption caption={caption} />

      {/* Virtual Keyboard */}
      <VirtualKeyboard handleUserInput={handleUserInput} />

      {/* Submit Button */}
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={onPress}
        >
          <Text style={styles.submitText}>
            정답 확인
          </Text>
        </TouchableOpacity>
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