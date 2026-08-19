import { useBoardStorage } from '@/lib/hooks';
import { Image } from 'expo-image';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PlayMode from "./PlayMode";
import ResultMode from "./ResultMode";
import ShareButton from "./ShareButton";
import { CaptionData, CellData } from '@/app';

function displayDate(publishDate: string): string {
  // "2026-08-01" -> [2026, 8, 1]
  const [year, month, day] = publishDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

  return `${month}월 ${day}일 ${WEEKDAYS[date.getDay()]}요일`;
}

interface PuzzleScreenProps {
  publishDate: string;
  fetchedBoard: (CellData | null)[][];
  captions: CaptionData[];
}

export default function PuzzleScreen({
    publishDate,
    fetchedBoard,
    captions,
  }: PuzzleScreenProps) {
  
  // 보드 데이터
  const { board, setBoard } = useBoardStorage(publishDate, fetchedBoard);
  // 플레이 상태
  const [playing, setPlaying] = useState<boolean>(true);
  
  // 게임을 재시작합니다
  function gameStart() {
    // data(불변 객체)를 활용해 보드를 초기화합니다.
    setBoard(fetchedBoard);
    // 다시 플레이모드로 돌아갑니다
    setPlaying(true);
  }

  const playMode = (
    <PlayMode
      board={board}
      setBoard={setBoard}
      captions={captions}
      gameOver={gameOver}
    />
  )

  const resultMode = (
    <ResultMode
      board={board}
      captions={captions}
      gameStart={gameStart}
    />
  )

  function gameOver() {
    setPlaying(false)
  }

  return (
    <ScrollView style={styles.background}>
      {/* 머리말 */}
      <View style={styles.header}>
        <View style={styles.logoArea}>
          <Image
            source={require('@/assets/images/react-logo.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>
            영단어 십자말퀴즈 
          </Text>
        </View>
        <ShareButton />
      </View>

      {/* 제목 및 날짜 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {displayDate(publishDate)} 퀴즈 ☕️
        </Text>
        <Text style={styles.subtitle}>
          매일 업데이트됩니다 💪🏻
        </Text>
      </View>

      {/* 메인: 게임 영역*/}
      <View style={styles.modeContainer}>
        {playing ? playMode : resultMode}
      </View>

      {/* 꼬리말 영역 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          퍼즐에 사용된 단어들은 <Text style={styles.italic}>Oxford</Text> 사전이 선정한{' '}
          <Text style={styles.emphasis}>가장 실용적인 영어 단어 5000개 (American Oxford 5000 by CEFR level)</Text>
          로부터 추출되었습니다. 랜덤으로 단어가 추출되기 때문에 중복된 단어가 나올 있습니다. 
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // 
  background: {
    backgroundColor: '#fff',
  },
  //
  header: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: { 
    borderWidth: 1, 
    width: 24, 
    height: 24, 
    resizeMode: 'contain' 
  },
  logoText: {
    fontWeight: 700,
    color: '#fff'
  },
  // 
  titleContainer: {
    marginTop: 16,
    paddingHorizontal: 8,
    gap: 8
  },
  title: {
    fontSize: 24,
    fontWeight: 700
  },
  subtitle: {

  },
  //
  modeContainer: {
    marginTop: 16,
  },
  //
  footer: {
    paddingHorizontal: 32,
    paddingVertical: 32
  },
  footerText: {
    textAlign: 'center'
  },
  italic: {
    fontStyle: 'italic',
  },
  emphasis: {
    fontWeight: 700
  }
})

/*
@expo/vector-icons 안에는 여러 스타일의 아이콘 라이브러리가 모여 있습니다. 
상황에 맞춰 골라 쓰세요.

1. Ionicons: 가장 무난하고 예쁨 (아이폰/안드로이드 다 어울림)

2. FontAwesome: 로고나 일반적인 기호가 많음

3. MaterialIcons: 구글 스타일의 깔끔한 디자인

4. AntDesign: 아주 심플하고 세련된 디자인
*/
