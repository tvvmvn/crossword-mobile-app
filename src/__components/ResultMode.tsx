import type { CaptionData } from '@/app';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Board from './Board';
import { usePuzzle } from './PuzzleProvider';

interface FilterMap {
  가로: (caption: CaptionData) => boolean;
  세로: (caption: CaptionData) => boolean;
}

const FILTER_MAP: FilterMap = {
  가로: (caption) => caption.acrossward,
  세로: (caption) => !caption.acrossward,
};

type FilterName = '가로' | '세로';

const FILTER_NAMES: FilterName[] = Object.keys(FILTER_MAP) as FilterName[];

export default function ResultMode() {

  const { 
    board, 
    captions, 
    playing, 
    gameStart } = usePuzzle();

  const [filter, setFilter] = useState<FilterName>('가로');

  function onPress() {
    gameStart();
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
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={onPress}
        >
          <Text style={styles.retryText}>
            다시하기
          </Text>
        </TouchableOpacity>
      </View>

      {/* 채점된 보드 */}
      <Board />

      {/* 답지 부분 */}
      <View style={styles.answerContainer}>
        {/* 가로/세로 필터 버튼 */}
        <View style={styles.filterButtonArea}>
          {FILTER_NAMES.map((name) => {
            // 선택된 버튼
            const isActive = name === filter;

            return (
              <TouchableOpacity
                key={name}
                style={[
                  styles.filterButton,
                  isActive && styles.buttonActive
                ]}
                onPress={() => setFilter(name)}
              >
                <Text style={[
                  styles.filterText,
                  isActive && styles.textActive
                ]}>
                  {name}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* 단어 + 설명 목록 */}
        <View style={styles.captionList}>
          {captions.filter(FILTER_MAP[filter]).map((caption) => (
            <View 
              key={caption.wordId} 
              style={styles.captionItem}
            >
              <Text style={styles.caption}>
                {caption.label}.{' '}
                <Text style={styles.emphasis}>
                   {caption.word}
                </Text>{' '}
                {caption.content}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  //
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
  // 
  answerContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f1f1f1'
  },
  filterButtonArea: {
    flexDirection: 'row'
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonActive: {
    backgroundColor: '#000'
  },
  filterText: {
    fontWeight: 600,
  },
  textActive: {
    color: '#fff'
  },
  captionList: {
    marginTop: 16,
  },
  captionItem: {
    marginVertical: 8,
  },
  caption: {

  },
  emphasis: {
    fontWeight: 700
  }
})