import { BoardData } from '@/app';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { CursorData, Orientation } from './PlayMode';

// 현재 기기의 가로/세로 폭 가져오기 (픽셀 단위)
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

interface BoardProps {
  board: BoardData;
  playing: boolean;
  cursor?: CursorData; // ?: undefined일 수도 있어
  updateCursor?: (r: number, c: number, orientation: Orientation) => void;
  wordId?: number | null;
}

export default function Board({
    board,
    playing,
    wordId,
    cursor,
    updateCursor,
  }: BoardProps) {

  // 셀 클릭: 커서의 좌표와 방향을 설정합니다
  function onPress (
    r: number,
    c: number,
    acrossId: number | null,
    downId: number | null
  ) {
    // 기본 방향은 가로로 지정합니다
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
    updateCursor!(r, c, orientation);
  }

  function styleWorkingCell(
      r: number, c: number, 
      acrossId: number | null, 
      downId: number | null
    ) {
    // 게임을 처음/오랜만에 열었을 때 스타일링이 필요없어
    if (!wordId) return;
    // 포커스중인 셀
    if (cursor!.r == r && cursor!.c == c) {
      return styles.focusedInput;
    }
    // 활성화된 셀 (포커스중인 셀 주변)
    if (wordId == acrossId || wordId == downId) {
      return styles.activeInput;
    }
  }

  // 채점 결과 스타일링
  function styleResultCell(q: string, value: string) {
    if (q == value) { // 맞췄지롱
      return styles.correct;
    } 
    // 틀림ㅠ.ㅠ
    return styles.wrong;
  }

  return (
    <View style={styles.background}>
      {/* 보드 */}
      <View style={styles.layout}>
        {board.map((row, r) => (
          <View key={r} style={[styles.rows, r > 0 && styles.rowBorder]}>
            {row.map((cell, c) => {

              const wrap = (child: any) => (
                <View key={`cell${r}${c}`} style={[styles.cell, c > 0 && styles.colBorder]}>
                  {child}
                </View>
              )
              
              if (!cell) return wrap(null);

              const { label, q, value, acrossId, downId } = cell;

              return wrap(
                <TouchableOpacity
                  style={[
                    styles.input,
                    playing ? styleWorkingCell(r, c, acrossId, downId)
                      : styleResultCell(q, value)
                  ]}
                  disabled={!playing}
                  onPress={playing ? () => onPress(r, c, acrossId, downId) : undefined}
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
    width: 0.94 * vw, 
    height: 0.94 * vw, 
    borderWidth: 1, 
    borderColor: '#aaa',
    backgroundColor: '#f1f1f1'
  },
  // rows
  rows: { 
    flexDirection: 'row', 
    height: '10%', 
  },
  rowBorder: {
    borderTopWidth: 1,
    borderColor: '#aaa'
  },
  // cell
  cell: {
    width: '10%',
  },
  colBorder: {
    borderLeftWidth: 1,
    borderColor: '#aaa',
  },
  // input
  input: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
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