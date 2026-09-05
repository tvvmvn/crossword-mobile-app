import { useEffect, useState } from 'react';
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';

// 광고ID를 설정합니다. 개발 모드에서는 테스트ID, 생산 환경에서는 실제ID를 적용합니다
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : '실제_admob_전면_광고_아이디';

// 앱이 실행될 때 광고 객체를 생성합니다
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

export default function useAdMobInterstitial() {
  // 광고가 준비되었는지 여부
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { 
    // addAdEventListener(이벤트, 리스너)
    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      // AdEventType.LOADED (이벤트): 광고가 로드됨 (interstitial.load()가 촉발시킴)
      console.log('[틈새 광고] 광고를 성공적으로 가져왔습니다!')
      setLoaded(true);
    });

    // 💡 핵심: 광고가 닫힌(CLOSED) 순간에 결과 화면으로 전환!
    // AdEventType.CLOSED (이벤트): 광고를 닫음
    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setLoaded(false);
      // 다음 광고를 미리 다운로드합니다.
      interstitial.load();
    });

    // 컴포넌트가 시작되면 백그라운드에서 광고를 미리 다운로드합니다
    interstitial.load();

    // 클린업: 컴포넌트를 벗어날 때 이벤트 리스너를 제거합니다 (중복 등록 방지)
    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  return () => {
    if (loaded) {
      interstitial.show()
    } else {
      console.log('[interstital] 광고를 가져오지 못했습니다')
    }
  }
}