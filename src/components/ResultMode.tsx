import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import type { CaptionData } from "@/app";
import Board from "./Board";
import { usePuzzle } from "./PuzzleProvider";

interface FilterMap {
  가로: (caption: CaptionData) => boolean;
  세로: (caption: CaptionData) => boolean;
}

const FILTER_MAP: FilterMap = {
  가로: (caption) => caption.acrossward,
  세로: (caption) => !caption.acrossward,
};

type FilterName = "가로" | "세로";

const FILTER_NAMES: FilterName[] = Object.keys(FILTER_MAP) as FilterName[];

export default function ResultMode() {

  const { 
    board, 
    captions, 
    playing, 
    gameStart } = usePuzzle();

  const [filter, setFilter] = useState<FilterName>("가로");

  function handleClick() {
    gameStart();
  }

  function isError(): boolean {
    return board.flat()
        .filter((cell) => cell && cell.q !== cell.value)
        .length > 0
  }

  return (
    <>
      {/* Result Message */}
      <View style={tw`px-2 flex-row items-center gap-2 my-2`}>
        {isError() ? (
          <Text style={tw`text-base text-black`}>
            아쉬워요 🥲
          </Text>
        ) : (
          <Text style={tw`text-base text-black`}>
            축하합니다! 🎉
          </Text>
        )}
        <TouchableOpacity onPress={handleClick}>
          <Text style={tw`text-blue-500 font-semibold text-base`}>
            다시하기
          </Text>
        </TouchableOpacity>
      </View>

      {/* Board Result */}
      <Board playing={playing} />

      {/* Caption & Answer List */}
      <View style={tw`mt-8 p-4 bg-gray-100`}>
        {/* Filter Buttons */}
        <View style={tw`flex-row`}>
          {FILTER_NAMES.map((name) => {
            const isActive = name === filter;
            return (
              <TouchableOpacity
                key={name}
                style={tw`px-4 py-2 ${
                  isActive ? "bg-black" : "bg-transparent"
                }`}
                onPress={() => setFilter(name)}
              >
                <Text style={tw`font-semibold ${isActive ? "text-white" : "text-black"}`}>
                  {name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Captions List */}
        <View style={tw`mt-2`}>
          {captions.filter(FILTER_MAP[filter]).map((caption) => (
            <View 
              key={caption.wordId} 
              style={tw`my-2`}
            >
              <Text style={tw`text-base text-gray-800`}>
                <Text style={tw`font-bold`}>
                  {caption.label} {caption.word}
                </Text>{" "}
                {caption.content}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}