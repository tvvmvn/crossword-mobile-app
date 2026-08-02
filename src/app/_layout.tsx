import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={tw`flex-1`}>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

/*
# SafeAreaProvider

앱 전체에 "이 기기(아이폰15 Pro, 갤럭시 S24 등)의 상단/하단 노치 높이가 
얼마인지 측정해라" 하고 엔진을 켜주는 역할입니다. 
보통 앱 최상위(app/_layout.tsx)에 딱 1번 감싸줍니다.

# SafeAreaView

실제 컨텐츠를 안전한 영역 안으로 밀어 넣어주는 감싸기 상자(View)입니다. 
노치 높이만큼 자동으로 상단/하단에 padding을 줘서 글자가 안 짤리게 해줍니다.

# ScrollView
"기본적으로 스크롤 기능이 아예 없는 모바일 화면에 '스크롤바'를 강제로 달아주는 상자"
기본 <View>는 스크롤 기능이 아예 없습니다. 내용이 모바일 화면 높이(예: 800px)를 넘어가면 
넘친 부분은 그냥 화면 밑으로 삐져나가서 짤린 채로 영영 안 보입니다.
*/