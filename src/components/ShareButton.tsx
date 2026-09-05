import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, Share } from 'react-native';

export default function ShareButton() {

  const onShare = async (): Promise<void> => {
    try {
      await Share.share({
        message: 'https://play.google.com/store/apps/details?id=com.tvvmvnexpo.crosswordmobileapp',
        title: '영단어 십자말 다운로드 주소!', // iOS 전용 상단 제목
      });
    } catch (error: any) {
      console.log(error.message)
    }
  };

  return (
    <Pressable onPress={onShare}>
      <FontAwesome name="share-alt" size={24} color="black" />
    </Pressable>
  );
}