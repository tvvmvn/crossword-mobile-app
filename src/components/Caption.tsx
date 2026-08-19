import { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CaptionData } from "@/app";

interface CaptionProps {
  caption?: CaptionData;
}

export default function Caption({ caption }: CaptionProps) {

  // 스크롤 뷰
  const scrollViewRef = useRef<ScrollView>(null);
  
  // 단어가 바뀌면 힌트 부분의 스크롤을 초기화합니다
  useEffect(() => {
    // 2. ref를 통해 scrollTo 메서드 호출
    scrollViewRef.current?.scrollTo({
      x: 0,          // 이동할 y 좌표 (맨 위는 0)
      animated: false, // 부드럽게 스크롤하려면 true, 즉시 확 바꾸려면 false
    });
  }, [caption])

  return (
    <View style={styles.captionContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
      >
        <Text style={styles.caption}>
          💁🏻‍♂️ {caption ? caption.content : '여기에 힌트가 나와요'}
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  captionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  caption: {
  },
})

