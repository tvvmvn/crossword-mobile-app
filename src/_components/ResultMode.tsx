import type { CaptionData, CellData } from '@/app';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Board from './Board';
import Catalogue from './Catalogue';

interface ResultModeProps {
  board: (CellData | null) [][];
  captions: CaptionData[];
  gameStart: any;
}

export default function ResultMode({
    board,
    captions,
    gameStart,
  }: ResultModeProps) {

  function onPress() {
    gameStart()
  }

  const isError = board.flat()
      .filter((cell) => cell && cell.q !== cell.value)
      .length > 0

  return (
    <>
      {/* 결과 메시지 */}
      <View style={styles.messageArea}>
        {isError ? (
          <Text style={styles.message}>
            아쉬워요🥲
          </Text>
        ) : (
          <Text style={styles.message}>
            축하합니다!🎉
          </Text>
        )}
        <Pressable 
          style={styles.retryButton}
          onPress={onPress}
        >
          <Text style={styles.retryText}>
            다시하기
          </Text>
        </Pressable>
      </View>

      {/* 채점된 보드 */}
      <Board 
        board={board} 
        playing={false}
      />

      {/* 답지 부분 */}
      <Catalogue captions={captions} />
    </>
  );
}

const styles = StyleSheet.create({
  messageArea: {
    marginVertical: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  message: {
    
  },
  retryButton: {

  },
  retryText: {
    fontWeight: 700,
  },
})