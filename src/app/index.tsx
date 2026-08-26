import AdMobBanner from "@/components/AdMobBanner";
import PuzzleModule from "@/components/PuzzleModule";
import ShareButton from "@/components/ShareButton";
import { getTodayPuzzle } from "@/lib/service";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

export interface CellData {
  acrossId: number | null;
  downId: number | null;
  label: number | null;
  value: string;
  q: string;
}

export type BoardData = (CellData | null)[][];

export interface CaptionData {
  wordId: number,
  word: string,
  content: string,
  label: number,
  acrossward: boolean
}

export interface PuzzleData {
  grid: BoardData;
  captions: CaptionData[]
}

export interface Data {
  publishDate: string;
  puzzleData: PuzzleData;
}

function displayDate(publishDate: string): string {
  // "2026-08-01" -> [2026, 8, 1]
  const [year, month, day] = publishDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

  return `${month}월 ${day}일 ${WEEKDAYS[date.getDay()]}요일`;
}

export default function Index() {

  const [error, setError] = useState<unknown>(null);
  // 서버로부터 받은 데이터. 앱이 실행되는 동안 불변성을 유지해야 합니다
  const [data, setData] = useState<Data | null>(null);
  
  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    try {
      const d : Data = await getTodayPuzzle();
      setData(d);
    } catch (e) {
      setError(e)
    } 
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text>문제가 발생했습니다. 앱을 재실행해보세요</Text>
      </View>
    )
  }

  if (!data) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator 
          size="large" 
          color="#000" 
        />
      </View>
    )
  }

  return (
    <ScrollView style={styles.background}>
      {/* 머리말 */}
      <View style={styles.header}>
        <View style={styles.logoArea}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>
            영단어 십자말퀴즈
          </Text>
        </View>
        <ShareButton />
      </View>

      {/* 상단 배너 광고 */}
      <View style={styles.admobContainer}>
        <AdMobBanner />
      </View>

      {/* 제목 및 날짜 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {displayDate(data.publishDate)} 퀴즈 ☕️
        </Text>
        <Text style={styles.subtitle}>
          매일 업데이트됩니다 💪🏻
        </Text>
      </View>

      {/* 메인: 게임 영역*/}
      <View style={styles.puzzleContainer}>
        <PuzzleModule 
          defaultBoard={data.puzzleData.grid}
          captions={data.puzzleData.captions}
          publishDate={data.publishDate}
        />
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
  error: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
  loading: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  // 
  background: {
    backgroundColor: '#fff',
  },
  //
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
    backgroundColor: '#f1f1f1',
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: { 
    width: 24, 
    height: 24, 
    resizeMode: 'contain' 
  },
  logoText: {
    fontWeight: 700,
  },
  // 
  admobContainer: {
    marginTop: 16,
  },
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
  puzzleContainer: {
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
