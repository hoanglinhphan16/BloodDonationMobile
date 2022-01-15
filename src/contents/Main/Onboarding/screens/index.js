import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import OnBoarding1 from '../components/OnBoarding1';
import OnBoarding2 from '../components/OnBoarding2';
import OnBoarding3 from '../components/OnBoarding3';
import * as colors from '@colors';

export default function OnBoardingScreen() {
  const swiper = useRef(null);

  const handleNext = index => {
    swiper?.current?.scrollTo(index);
  };
  return (
    <>
      <Swiper
        ref={swiper}
        activeDotColor={colors.colorFF3152}
        activeDotStyle={{
          width: 18,
          height: 3,
          borderRadius: 20,
          marginBottom: 20,
        }}
        dotStyle={{width: 8, height: 3, borderRadius: 20, marginBottom: 20}}
        dotColor="#C4C4C4"
        loop={false}
        containerStyle={{backgroundColor: colors.white}}>
        <OnBoarding1 key={0} onPress={index => handleNext(index)} />
        <OnBoarding2 key={1} onPress={index => handleNext(index)} />
        <OnBoarding3 key={2} onPress={index => handleNext(index)} />
      </Swiper>
    </>
  );
}

const styles = StyleSheet.create({});
