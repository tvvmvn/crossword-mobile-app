import { BoardData } from '@/app';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { CursorData, Orientation } from './PlayMode';

// 현재 기기의 가로/세로 폭 가져오기 (픽셀 단위)
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

interface BoardProps {
  board: BoardData;
  cursor?: CursorData; // ?: undefined일 수도 있어
  updateCursor?: (r: number, c: number) => void;
  wordId?: number | null;
  playing: boolean;
}

export default function Board({
    board,
    cursor,
    updateCursor,
    wordId,
    playing,
  }: BoardProps) {

  // 셀 스타일링: 플레이 모드
  function styleWorkingCell(r: number, c: number) {
    // 게임을 처음/오랜만에 열었을 때 스타일링이 필요없어
    if (!wordId) return;
    // 1. 포커스된 셀
    if (cursor!.r == r && cursor!.c == c) {
      return styles.focusedInput;
    }
    // 2. 활성화된 셀 (포커스 셀 주변)
    if (
      board[r][c]!.acrossId === wordId || 
      board[r][c]!.downId === wordId
    ) {
      return styles.activeInput;
    }
  }

  // 셀 스타일링: 결과 모드
  function styleResultCell(correct: boolean) {
    return correct ? styles.correct : styles.wrong;
  }

  return (
    <View style={styles.background}>
      {/* 보드 */}
      <View style={styles.layout}>
        {board.map((row, r) => (
          <View key={r} style={styles.rows}>
            {row.map((cell, c) => {

              if (!cell) {
                return (
                  <View key={c} style={styles.black} />
                )
              }

              const { label, q, value } = cell;

              return (
                <TouchableOpacity
                  key={c}
                  style={[
                    styles.input,
                    playing ? styleWorkingCell(r, c) : styleResultCell(q === value)
                  ]}
                  onPress={playing ? () => updateCursor!(r, c) : undefined}
                  disabled={!playing}
                >
                  {/* 퀴즈 라벨*/}
                  <Text style={styles.label}>
                    {label}
                  </Text>
                  {/* 입력된 글자 / 정답 글자 */}
                  <Text style={styles.letter}>
                    {playing ? q : value}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // background
  background: {
    alignItems: 'center',
  },
  // layout
  layout: { 
  },
  // rows
  rows: { 
    flexDirection: 'row', 
  },
  // cell
  black: {
    width: '10%',
    aspectRatio: 1,
    backgroundColor: '#ddd',
  },
  // input
  input: {
    width: '10%',
    backgroundColor: '#fff',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedInput: {
    backgroundColor: 'yellow'
  },
  activeInput: {
    backgroundColor: 'lightyellow'
  },
  correct: {
    backgroundColor: 'rgb(206, 234, 253)'
  },
  wrong: {
    backgroundColor: 'rgb(250, 222, 222)'
  },
  // label
  label: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '4%',
    fontSize: 0.02 * vw
  },
  // input text
  letter: {

  }
}) 