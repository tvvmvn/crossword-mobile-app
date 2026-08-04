import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { KEYS } from "../constants/keyboard";

interface VirtualKeyboardProps {
  handleUserInput: (id: string) => void;
}

export default function VirtualKeyboard({
  handleUserInput,
}: VirtualKeyboardProps) {

  function handleClick(keycapId: string) {
    handleUserInput(keycapId === "del" ? "" : keycapId);
  }

  return (
    // grid-cols-20 레이아웃을 flex-row flex-wrap으로 구현
    <View style={tw`px-2 py-4 bg-gray-200`}>
      <View style={tw``}>
        {KEYS.map((row, r) => (
          <View key={r} style={tw`flex-row`}>
            {r === 1 && <View style={tw`w-[5%]`} />}
            {r === 2 && <View style={tw`w-[15%]`} />}
            {row.map((KEY, c) => (
            <View 
              key={KEY.id}
              style={tw`${KEY.id == 'del' ? 'aspect-9/10 w-[15%]' : 'aspect-3/5 w-[10%]'} p-[1]`}
            >
              <TouchableOpacity
                style={tw`w-full h-full ${KEY.id == 'del' ? 'bg-red-200' : 'bg-white'} items-center justify-center`}
                onPress={() => handleClick(KEY.id)}
              >
                <Text style={tw`text-base font-semibold ${KEY.id == 'del' ? 'text-red-400' : 'text-black'}`}>
                  {KEY.symbol}
                </Text>
              </TouchableOpacity>
            </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}