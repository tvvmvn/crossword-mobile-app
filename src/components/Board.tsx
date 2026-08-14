import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw, { style } from "twrnc";
import type { CursorData, Orientation } from "./PlayMode";
import { usePuzzle } from "./PuzzleProvider";

// 현재 기기의 가로/세로 폭 가져오기 (픽셀 단위)
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

interface BoardProps {
  playing: boolean;
  cursor?: CursorData;
  updateCursor?: (r: number, c: number, orientation: Orientation) => void;
  wordId?: number | null;
}

export default function Board({
  playing,
  wordId,
  cursor,
  updateCursor,
}: BoardProps) {

  const { board } = usePuzzle();

  const handleClick = (
    r: number,
    c: number,
    acrossId: number | null,
    downId: number | null
  ) => {

    if (!updateCursor || !cursor) return;

    // 교차 지점을 클릭한 경우
    if (acrossId && downId) {
      // 같은 셀을 클릭한 경우
      if (r === cursor.r && c === cursor.c) {
        // 가로 방향에서 클릭한 경우 세로 방향으로 바꿉니다
        if (cursor.orientation === "ACROSS") {
          updateCursor(r, c, "DOWN");
        } else {
          // 세로 방향에서 클릭한 경우 가로 방향으로 바꿉니다
          updateCursor(r, c, "ACROSS");
        }
      } else {
        // 새로운 교차 지점을 클릭한 경우 가로 방향(기본값)으로 설정합니다
        updateCursor(r, c, "ACROSS");
      }
    } else if (acrossId) {
      // 가로 방향의 셀을 클릭한 경우
      updateCursor(r, c, "ACROSS");
    } else if (downId) {
      // 세로 방향의 셀을 클릭한 경우
      updateCursor(r, c, "DOWN");
    }
  }

  return (
    <View style={styles.background}>
      {/* 보드 */}
      <View style={styles.layout}>
        {board.map((row, r) => (
          <View key={r}
            style={[
              styles.rows,
              r > 0 && styles.rowBorder
            ]}
          >
            {row.map((cell, c) => (
              <View key={`cell-${r}-${c}`}
                style={[
                  styles.cell,
                  c > 0 && styles.colBorder
                ]}
              >
                {cell && (
                  <TouchableOpacity
                    style={[
                      styles.input,
                      !!(wordId && wordId === cell.acrossId) && styles.activeInput,
                      !!(wordId && wordId === cell.downId) && styles.activeInput,
                      (playing && cursor!.r == r && cursor!.c == c) && styles.focusedInput,
                      (!playing && cell.q == cell.value) && styles.correct,
                      (!playing && cell.q != cell.value) && styles.wrong,
                    ]}
                    disabled={!playing}
                    onPress={() => handleClick(r, c, cell.acrossId, cell.downId)}
                  >
                    {/* 퀴즈 라벨*/}
                    <Text style={styles.label}>
                      {cell.label}
                    </Text>
                    {/* 입력된 글자 / 정답 글자 */}
                    <Text style={styles.letter}>
                      {playing ? cell.q : cell.value}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
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
    width: 0.9 * vw, 
    height: 0.9 * vw, 
    borderWidth: 1, 
    borderColor: '#888',
    backgroundColor: '#f1f1f1'
  },
  // rows
  rows: { 
    flexDirection: 'row', 
    height: '10%', 
  },
  rowBorder: {
    borderTopWidth: 1,
    borderColor: '#888'
  },
  // cell
  cell: {
    width: '10%',
  },
  colBorder: {
    borderLeftWidth: 1,
    borderColor: '#888',
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
    backgroundColor: 'rgb(189, 229, 255)'
  },
  wrong: {
    backgroundColor: 'rgb(255, 200, 200)'
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

const inputStyle = StyleSheet.create({
  // common style
  common: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // state-specific styles
  focused: {},
  active: {},
  correct: {},
  wrong: {}
})