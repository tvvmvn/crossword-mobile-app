import React from 'react';
import { Dimensions, GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';

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

interface BlackCellProps {
}

interface WhiteCellProps {
  label: number | null;
  value: string;
  styleKey: string;
  whiteCellPressed?: () => void; 
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
    <View style={[
      styles.blackCell,
    ]} />
  )
}

// 흰 칸
export function WhiteCell({
    label,
    value,
    styleKey,
    whiteCellPressed,
  }: WhiteCellProps) {
  
  // 셀 클릭 처리자
  function onPress(e: GestureResponderEvent) {
    e.stopPropagation();
    whiteCellPressed?.();
  }

  return (
    <Pressable
      style={[ 
        styles.whiteCell,
        styles[styleKey as keyof typeof styles]
      ]}
      onPress={(e) => onPress(e)}
    >
      {/* 퀴즈 라벨*/}
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}
      {/* 입력된 글자 / 정답 글자 */}
      <Text style={styles.letter}>
        {value}
      </Text>
    </Pressable>
  )
}

const size = '9.55%'; 
const gap = '0.5%';

const styles = StyleSheet.create({
  grid: { 
    height: vw,
    padding: 12,
    flexDirection: 'column',
    gap,
    // borderWidth: 1,
  },
  // rows
  row: { 
    height: size,
    flexDirection: 'row', 
    gap,
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
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  white: {

  },
  focused: {
    backgroundColor: 'yellow'
  },
  active: {
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
    fontWeight: 700,
  }
}) 