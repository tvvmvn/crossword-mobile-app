import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Share, TouchableOpacity } from 'react-native';

export default function ShareButton() {

  const onShare = async (): Promise<void> => {
    try {
      await Share.share({
        message: '친구에게 공유할 텍스트나 링크 내용! (예: https://example.com)',
        title: '공유하기 제목', // iOS 전용 상단 제목
      });
    } catch (error: any) {
      console.log(error.message)
    }
  };

  return (
    <TouchableOpacity onPress={onShare}>
      <FontAwesome name="share-alt" size={24} color="black" />
    </TouchableOpacity>
  );
}