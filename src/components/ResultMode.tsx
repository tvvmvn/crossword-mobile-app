import type { CaptionData, CellData } from '@/app';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BlackCell, BoardGrid, BoardRow, WhiteCell } from './Board';
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
      <View style={styles.messageContainer}>
        <View style={styles.message}>
          {isError ? (
            <Text>
              아쉬워요🥲
            </Text>
          ) : (
            <Text>
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
      </View>

      {/* 채점된 보드 */}
      <BoardGrid>
        {board.map((row, r) => (
          <BoardRow key={r}>
            {row.map((cell, c) => {
              
              if (!cell) {
                return <BlackCell key={c} />
              }

              return (
                <WhiteCell
                  key={c}
                  label={cell.label}
                  value={cell.value}
                  styleKey={cell.q === cell.value ? 'correct' : 'wrong'}
                />
              )
            })}
          </BoardRow>
        ))}
      </BoardGrid>

      {/* 답지 부분 */}
      <Catalogue captions={captions} />
    </>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    paddingHorizontal: 8,
  },
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8
  },
  retryButton: {
  },
  retryText: {
    fontWeight: 700,
  },
})