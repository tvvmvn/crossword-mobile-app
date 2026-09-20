import { CaptionData } from "@/app";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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

interface CatalogueProps {
  captions: CaptionData[];
}

export default function Catalogue({
  captions
}: CatalogueProps) {

  const [filter, setFilter] = useState<FilterName>('가로');

  return (
    <>
      {/* 가로/세로 필터 버튼 */}
      <View style={styles.filterButtonArea}>
        {FILTER_NAMES.map((name) => {
          // 선택된 버튼
          const isActive = name === filter;

          return (
            <Pressable
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
            </Pressable>
          )
        })}
      </View>

      <View style={styles.answerList}>
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
    </>
  )
}

const rounded = 8;

const styles = StyleSheet.create({
  filterButtonArea: {
    flexDirection: 'row',
  },
  filterButton: {
    padding: 8,
    flex: 1,
    borderTopLeftRadius: rounded,
    borderTopRightRadius: rounded,
  },
  buttonActive: {
    backgroundColor: '#fff'
  },
  filterText: {
    fontWeight: 600,
    textAlign: 'center'
  },
  textActive: {
    // color: '#fff'
  },
  answerList: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderBottomLeftRadius: rounded,
    borderBottomRightRadius: rounded,
  },
  captionItem: {
    marginVertical: 8,
  },
  caption: {},
  emphasis: {
    fontWeight: 700
  }
})