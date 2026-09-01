import { useEffect, useRef } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { CaptionData } from "@/app";

interface CaptionProps {
  caption?: CaptionData;
}

const vw = Dimensions.get('window').width;


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
      <View style={styles.captionInner}>
        <View style={styles.iconContainer}>
          <Text>💁🏻‍♀️{' '}</Text>
        </View>
        <ScrollView
          horizontal
          // showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            // alignItems: 'center',
          }}
          ref={scrollViewRef}
          style={{ 
            paddingVertical: 12, 
            borderWidth: 1, 
            borderColor: 'transparent',
          }}
        >
          <Text>
            {caption? caption.content : '여기에 힌트가 나와요'}
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, commodi quidem! Alias doloribus natus voluptatibus quaerat illo possimus ad quos at! Dolorum eos similique odit iste, deleniti ea mollitia consequuntur? */}
          </Text>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  captionContainer: {
    marginTop: 16,
    paddingHorizontal: 8,
  },
  captionInner: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderLeftWidth: 4,
    borderColor: '#999',
    paddingHorizontal: 8,
  },
  iconContainer: {
    justifyContent: 'center',
  },
})

