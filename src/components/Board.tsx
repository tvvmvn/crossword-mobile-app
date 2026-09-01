import React from 'react';
import { Dimensions, GestureResponderEvent, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 현재 기기의 가로/세로 폭 가져오기 (픽셀 단위)
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

interface BoardGridProps {
  boardGridPressed?: () => void;
  children: React.ReactNode;
}

interface BoardRowProps {
  children: React.ReactNode;
}

interface BlackCellProps {}

interface WhiteCellProps {
  label: number | null;
  focused?: boolean;
  active?: boolean;
  q?: string;
  value?: string;
  correct?: boolean;
  whiteCellPressed?: () => void; 
  playing: boolean;
}

// 보드 그리드
export function BoardGrid({ 
    boardGridPressed, 
    children 
  }: BoardGridProps) {

  function onPress() {
    console.log('BoardGrid clicked');
    // 함수가 undefined가 아닐 때만 안전하게 호출하도록 ?. 연산자를 붙여줍니다. 
    // 함수가 undefined면 실행을 건너뛰고 에러를 내지 않습니다.
    boardGridPressed?.();
  }

  return (
    <Pressable 
      style={styles.grid}
      onPress={onPress}
    >
      {children}
    </Pressable>
  )
}

// 보드 행
export function BoardRow({ children }: BoardRowProps) {
  return (
    <View style={styles.row}>
      {children}
    </View>
  )
}

// 검은 칸
export function BlackCell() {
  return (
    <View style={styles.blackCell} />
  )
}

// 흰 칸
export function WhiteCell({
    label,
    focused,
    active,
    q,
    value,
    correct,
    whiteCellPressed,
    playing,
}: WhiteCellProps) {

  function styleWorkingCell() {
    if (focused) {
      return styles.focusedInput;
    } else if (active) {
      return styles.activeInput;
    } 
  }

  function styleResultCell() {
    if (correct) {
      return styles.correct;
    } else {
      return styles.wrong;
    }
  }

  function onPress(e: GestureResponderEvent) {
    e.stopPropagation();
    whiteCellPressed!();
  }

  return (
    <TouchableOpacity
      style={[
        styles.whiteCell,
        playing ? styleWorkingCell() : styleResultCell(),
      ]}
      onPress={playing ? (e) => onPress(e) : undefined}
      disabled={!playing}
    >
      {/* 퀴즈 라벨*/}
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}
      {/* 입력된 글자 / 정답 글자 */}
      <Text style={styles.letter}>
        {playing ? q : value}
      </Text>
    </TouchableOpacity>
  )
}

const size = '9.1%';
const gap = '1%';

const styles = StyleSheet.create({
  grid: { 
    width: vw,
    height: vw,
    // 본인의 넓이 기준
    padding: 8,
    // 본인의 넓이 기준
    gap: gap,
  },
  // rows
  row: { 
    flexDirection: 'row', 
    // 부모의 높이 기준
    height: size,
    // 부모의 높이 기준
    gap: gap,
  },
  // cell
  blackCell: {
    // 부모의 넓이 기준
    width: size,
  },
  // whiteCell
  whiteCell: {
    // 부모의 넓이 기준
    width: size,
    justifyContent: 'center',
    // borderRightWidth: 2,
    // borderBottomWidth: 2,
    // borderTopWidth: 2,
    // borderLeftWidth: 2,
    borderWidth: 1,
    // boxShadow: '0 0 8px #ddd',
    borderColor: '#ddd',
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
    paddingLeft: '5%',
    fontSize: 0.02 * vw
  },
  // whiteCell text
  letter: {

  }
}) 