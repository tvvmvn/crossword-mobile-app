import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import Board from "./Board";
import VirtualKeyboard from "./Keyboard";
import { usePuzzle } from "./PuzzleProvider";

// 커서: 좌표 + 방향
export interface CursorData {
  r: number;
  c: number;
  orientation: Orientation;
}

// 커서의 방위 타입
export type Orientation = "ACROSS" | "DOWN";

export default function PlayMode() {
  
  const { 
    board, 
    captions, 
    updateBoard, 
    playing, 
    gameOver } = usePuzzle();

  const [cursor, setCursor] = useState<CursorData>({
    r: -1,
    c: -1,
    orientation: "ACROSS",
  });

  const wordId: number | null = getWordId();

  // 결과 페이지 보기 (완료 버튼 클릭 시)
  const onPress = () => {
    gameOver();
  }

  // 커서의 위치/방향을 설정합니다
  const updateCursor = (r: number, c: number, orientation: Orientation) => {
    setCursor({ r, c, orientation });
  }

  // 사용자 입력 처리
  const handleUserInput = (q: string) => {
    // 키를 클릭한 시점의 커서 상태
    const { r, c, orientation } = cursor;

    // 1. 보드에 사용자가 입력한 값을 입력하고
    updateBoard(r, c, q);

    // 2. 입력이 끝나면 커서를 이동시킵니다
    const isDel = q === "";

    if (orientation === "ACROSS" && isDel && isCell(r, c - 1)) {
      setCursor({ ...cursor, c: c - 1 });
    } else if (orientation === "ACROSS" && !isDel && isCell(r, c + 1)) {
      setCursor({ ...cursor, c: c + 1 });
    } else if (orientation === "DOWN" && isDel && isCell(r - 1, c)) {
      setCursor({ ...cursor, r: r - 1 });
    } else if (orientation === "DOWN" && !isDel && isCell(r + 1, c)) {
      setCursor({ ...cursor, r: r + 1 });
    }
  }

  // 커서 정보로부터 단어ID를 추출합니다
  function getWordId() {
    const { r, c, orientation } = cursor;
    // 첫 렌더링 시 (-1, -1)
    if (!isCell(r, c)) return null;

    if (orientation === "ACROSS") {
      return board[r][c]!.acrossId;
    } else {
      return board[r][c]!.downId;
    }
  }

  // 좌표가 유효한지 검사합니다 (보드 밖이거나 null 여부 확인)
  function isCell(r: number, c: number): boolean {
    const x = c >= 0 && c <= board[0].length - 1;
    const y = r >= 0 && r <= board.length - 1;
    if (x && y) {
      return board[r][c] !== null;
    }
    return false;
  }

  const caption = captions.find((caption) => caption.wordId === wordId);

  return (
    <>
      {/* Board */}
      <Board
        playing={playing}
        cursor={cursor}
        updateCursor={updateCursor}
        wordId={wordId}
      />

      {/* Hint / Caption */}
      <View style={styles.captionContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
        >
          <Text style={styles.caption}>
            {caption ? caption.content : "여기에 힌트가 나와요"}
            {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Aspernatur delectus ipsa facere quos accusamus exercitationem, 
            porro quam sapiente esse dolor quia quibusdam alias tempora 
            voluptatem excepturi dolores architecto nobis optio! */}
          </Text>
        </ScrollView>
      </View>

      {/* Virtual Keyboard */}
      <VirtualKeyboard handleUserInput={handleUserInput} />

      {/* Submit Button */}
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={onPress}
        >
          <Text style={styles.submitText}>
            정답 확인
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // Caption
  captionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  caption: {
  },
  // Submit Button
  submitButtonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  submitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#000'
  },
  submitText: {
    color: '#fff',
    fontWeight: 700
  }
})