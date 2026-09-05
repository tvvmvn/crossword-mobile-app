import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy';

export default function AdMobBanner() {

  const onAdLoaded = () => {
    console.log('[배너 광고] 광고를 성공적으로 가져왔습니다!')
  }

  const onAdFailedToLoad = (err: unknown) => {
    console.error('[banner] 광고를 가져오지 못했습니다: ', err);
  }

  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdLoaded={onAdLoaded}
      onAdFailedToLoad={onAdFailedToLoad}
    />
  );
}