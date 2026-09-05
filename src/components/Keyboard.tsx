import * as Haptics from 'expo-haptics';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

// 현재 기기의 가로/세로 폭 가져오기 (픽셀 단위)
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

// 키보드
export const KEYBOARD: string[][] = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', '']
] as const;

// Component props
interface VirtualKeyboardProps {
  handleUserInput: (id: string) => void;
}

export default function VirtualKeyboard({
    handleUserInput,
  }: VirtualKeyboardProps) {

  function onPress(key: string) {
    Haptics.selectionAsync();
    handleUserInput(key);
  }

  return (
    <View style={styles.layout}>
      {KEYBOARD.map((row, r) => (
        <View key={r} style={styles.keyRows}>
          {/* 3열에서 레이아웃을 위해 만든 가상의 왼쪽 시프트 키 */}
          {r == 2 && <View style={styles.hiddenKey} />}
          {/* 키 렌더링 */}
          {row.map((key) => (
            <Pressable
              key={key}
              style={({ pressed }) => [
                styles.key,
                pressed && styles.pressedKey,
                key === '' ? styles.delKey : styles.alphabetKey,
              ]}
              onPress={() => onPress(key)}
            >
              <Text style={[
                styles.keyText,
                key === '' ? styles.delText : styles.alphabetText,
              ]}>
                {key || '⌫'}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  // Keyboard Layout
  layout: { 
    width: vw, 
    height: 0.5 * vw, 
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: 'column',
    // 본인의 높이 기준
    gap: '4%', 
    backgroundColor: '#eee'
  },
  // Each row
  keyRows: { 
    height: '30.66666%', 
    // 본인의 넓이 기준
    gap: '1%', 
    flexDirection: 'row', 
    justifyContent: 'center', 
  },
  // Each Key
  key: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  alphabetKey: {
    // 부모의 넓이 기준
    width: '9.1%',
    backgroundColor: '#fff',
  },
  delKey: {
    // 부모의 넓이 기준
    width: '14.15%',
    backgroundColor: 'rgb(255, 171, 171)',
  },
  hiddenKey: {
    width: '14.15%'
  },
  // Letter in Key
  keyText: {

  },
  alphabetText: {
    color: 'black'
  },
  delText: {
    color: '#fff'
  },
  pressedKey: {
    opacity: 0.5
  }
})