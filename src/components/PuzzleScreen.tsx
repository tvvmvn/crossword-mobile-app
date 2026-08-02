import React from "react";
import { ScrollView, Text, View } from "react-native";
import tw from "twrnc";
import PlayMode from "./PlayMode";
import { usePuzzle } from "./PuzzleProvider";
import ResultMode from "./ResultMode";

function displayDate(publishDate: string): string {
  // "2026-08-01" -> [2026, 8, 1]
  const [year, month, day] = publishDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

  return `${month}월 ${day}일 ${WEEKDAYS[date.getDay()]}요일`;
}

export default function PuzzleScreen() {
  
  const { publishDate, playing } = usePuzzle();

  return (
    <ScrollView style={tw`bg-white`}>
      {/* Header 영역 */}
      <View style={tw`px-2`}>
        <Text style={tw`my-4 text-2xl font-semibold`}>
          {displayDate(publishDate)} Crossword ♥
        </Text>
      </View>

      {/* Main 게임 영역 (PlayMode / ResultMode) */}
      <View style={tw`flex-1`}>
        {playing ? <PlayMode /> : <ResultMode />}
      </View>

      {/* Footer 영역 */}
      <View style={tw`p-8`}>
        <Text style={tw`text-center`}>footer</Text>
      </View>
    </ScrollView>
  );
}