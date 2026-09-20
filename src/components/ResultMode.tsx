import type { CaptionData, CellData } from '@/app';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BlackCell, BoardGrid, BoardRow, WhiteCell } from './Board';
import Catalogue from './Catalogue';
import { RefObject, useEffect } from 'react';

interface ResultModeProps {
  board: (CellData | null) [][];
  captions: CaptionData[];
  gameStart: any;
  scrollViewRef: RefObject<ScrollView | null>;
}

export default function ResultMode({
    board,
    captions,
    gameStart,
    scrollViewRef,
  }: ResultModeProps) {

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, [])

  function onPress() {
    gameStart()
  }

  const isError = board.flat()
      .filter((cell) => cell && cell.q !== cell.value)
      .length > 0

  return (
    <>
      {/* 결과 메시지 */}
      <View style={styles.message}>
        {isError ? (
          <Text>아쉬워요🥲</Text>
        ) : (
          <Text>축하합니다!🎉</Text>
        )}
        <Pressable onPress={onPress}>
          <Text style={styles.retryText}>
            다시하기
          </Text>
        </Pressable>
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
      <View style={styles.catalogContainer}>
        <Catalogue captions={captions} />
      </View>

      <View style={styles.footer} />
    </>
  );
}

const styles = StyleSheet.create({
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  retryText: {
    fontWeight: 700,
  },
  catalogContainer: {
    paddingHorizontal: 12,
  },
  footer: {
    padding: 16,
  }
})