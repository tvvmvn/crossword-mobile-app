import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import type { CursorData, Orientation } from "./PlayMode";
import { usePuzzle } from "./PuzzleProvider";

interface BoardProps {
  playing: boolean;
  cursor?: CursorData;
  updateCursor?: (r: number, c: number, orientation: Orientation) => void;
  wordId?: number | null;
}

export default function Board({
  playing,
  wordId,
  cursor,
  updateCursor,
}: BoardProps) {
  const { board } = usePuzzle();

  function handleClick(
    r: number,
    c: number,
    acrossId: number | null,
    downId: number | null
  ): void {
    if (!updateCursor || !cursor) return;

    // 교차 지점을 클릭한 경우
    if (acrossId && downId) {
      // 같은 셀을 클릭한 경우
      if (r === cursor.r && c === cursor.c) {
        // 가로 방향에서 클릭한 경우 세로 방향으로 바꿉니다
        if (cursor.orientation === "ACROSS") {
          updateCursor(r, c, "DOWN");
        } else {
          // 세로 방향에서 클릭한 경우 가로 방향으로 바꿉니다
          updateCursor(r, c, "ACROSS");
        }
      } else {
        // 새로운 교차 지점을 클릭한 경우 가로 방향(기본값)으로 설정합니다
        updateCursor(r, c, "ACROSS");
      }
    } else if (acrossId) {
      // 가로 방향의 셀을 클릭한 경우
      updateCursor(r, c, "ACROSS");
    } else if (downId) {
      // 세로 방향의 셀을 클릭한 경우
      updateCursor(r, c, "DOWN");
    }
  }

  function getCellBgColor(q: string, value: string): string {
    if (q === value) return "bg-blue-100";
    return "bg-red-100";
  }

  function getInputBgColor(
    r: number,
    c: number,
    acrossId: number | null,
    downId: number | null
  ): string {
    
    if (!cursor) return "bg-transparent";

    // 포커스된 셀
    if (cursor.r === r && cursor.c === c) {
      return "bg-yellow-200";
    }
    // 활성화된 가로/세로 단어 영역 셀
    if (
      wordId &&
      cursor.orientation === "ACROSS" &&
      wordId === acrossId
    ) {
      return "bg-yellow-100";
    }
    if (
      wordId &&
      cursor.orientation === "DOWN" &&
      wordId === downId
    ) {
      return "bg-yellow-100";
    }
    // 나머지 셀
    return "bg-transparent";
  }

  return (
    <View style={tw`flex-col mx-2 border-t border-r border-gray-400`}>
      {board.map((row, r) => (
        <View key={r} style={tw`flex-row border-b border-gray-400`}>
          {row.map((cell, c) => (
            <View
              key={`cell-${r}-${c}`}
              style={tw`w-[10%] aspect-square border-l border-gray-400`}
            >
              {cell ? (
                <View style={tw`w-full h-full ${playing ? 'bg-white' : getCellBgColor(cell.q, cell.value)}`}>
                  <TouchableOpacity
                    style={tw`w-full h-full relative justify-center items-center ${playing ? getInputBgColor(r, c, cell.acrossId, cell.downId)
                        : 'bg-transparent'}`}
                    disabled={!playing}
                    onPress={() => handleClick(r, c, cell.acrossId, cell.downId)}
                  >
                    {/* 단어 번호 라벨 (좌상단 absolute) */}
                    <Text style={tw`absolute top-0.5 left-1 font-semibold text-[10px] text-gray-600`}>
                      {cell.label}
                    </Text>
                    {/* 입력된 글자 / 정답 글자 */}
                    <Text style={tw`text-base font-bold text-black`}>
                      {playing ? cell.q : cell.value}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                // 빈 배경 셀 (퍼즐 판 외곽)
                <View style={tw`w-full h-full bg-gray-100`} />
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}