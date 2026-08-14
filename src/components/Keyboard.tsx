import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dimensions } from 'react-native';
import tw from "twrnc";
import { KEYS } from "../constants/keyboard";

// 현재 기기의 가로/세로 폭 가져오기 (픽셀 단위)
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

// Component props
interface VirtualKeyboardProps {
  handleUserInput: (id: string) => void;
}

export default function VirtualKeyboard({
  handleUserInput,
}: VirtualKeyboardProps) {

  const onPress = (keycapId: string) => {
    handleUserInput(keycapId === "del" ? "" : keycapId);
  }

  return (
    // 키보드 뒤에 배경
    <View style={styles.background}>
      {/* 키보드 */}
      <View style={styles.layout}>
        {KEYS.map((row, r) => (
          <View 
            key={r} 
            style={styles.keyRows}
          >
            {r == 2 && <View style={styles.hiddenKey} />}
            {row.map((KEY, c) => (
              <TouchableOpacity
                key={KEY.id}
                style={[
                  styles.key, 
                  KEY.id == 'del' ? styles.delKey : styles.alphabetKey,
                ]}
                onPress={() => onPress(KEY.id)}
              >
                <Text style={[
                  styles.keyText,
                  KEY.id == 'del' ? styles.delText : styles.alphabetText,
                ]}>
                  {KEY.symbol}
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
    width: 0.9 * vw, 
    height: 0.45 * vw, 
    flexDirection: 'column',
    gap: '4%', // between keyboard rows
    // borderWidth: 1, 
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
    alignItems: 'center'
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

const keycapStyle = {
  // common styles
  common: {
    justifyContent: 'center',
    alignItems: 'center' 
  },
  // keycap-specific styles
  alphabetical: {
    width: '9.1%',
    backgroundColor: 'white'
  },
  deletion: {
    width: '14.15%',
    backgroundColor: '#f00',
  }
}