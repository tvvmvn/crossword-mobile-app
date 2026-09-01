import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

  return (
    // 키보드 뒤에 배경
    <View style={styles.background}>
      {/* 키보드 */}
      <View style={styles.layout}>
        {KEYBOARD.map((row, r) => (
          <View key={r} style={styles.keyRows}>
            {/* 3열에서 레이아웃을 위해 만든 가상의 왼쪽 시프트 키 */}
            {r == 2 && <View style={styles.hiddenKey} />}
            {/* 키 렌더링 */}
            {row.map((key) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.key, 
                  key === '' ? styles.delKey : styles.alphabetKey,
                ]}
                onPress={() => handleUserInput(key)}
              >
                <Text style={[
                  styles.keyText,
                  key === '' ? styles.delText : styles.alphabetText,
                ]}>
                  {key || '⌫'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Background
  background: { 
    alignItems: 'center', 
    paddingVertical: '4%',
    backgroundColor: '#f1f1f1', 
  },
  // Keyboard Layout
  layout: { 
    width: 0.94 * vw, 
    height: 0.47 * vw, 
    flexDirection: 'column',
    gap: '4%', // between KEYBOARD rows
  },
  // Each row
  keyRows: { 
    height: '30.66666%', 
    gap: '1%', // between keys
    flexDirection: 'row', 
    justifyContent: 'center', 
  },
  // Each Key
  key: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alphabetKey: {
    width: '9.1%',
    backgroundColor: 'white',
  },
  delKey: {
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
})