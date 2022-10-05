import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../App';
import {colorContext} from '../../context/Color.context';
import {COLORS_DATA} from '../ColorPalette/data';
import {getColorById, getDefaultColor} from '../ColorPalette/getColorById';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const START_OFFSET = SCREEN_WIDTH;

type Props = NativeStackScreenProps<RootStackParamList, 'AnimatedText'>;
export default function AnimatedText({
  route: {
    params: {text, duration, onEnd},
  },
  navigation,
}: Props) {
  const scroll = useSharedValue(0);
  const animationStatus = useSharedValue(0);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const [COLORS, setCOLORS] = useState(getDefaultColor(COLORS_DATA));
  const colorCtx = useContext(colorContext);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: scroll.value}],
    };
  }, [text]);

  useEffect(() => {
    // here we subtracted 20 as that padding also needs to be moved off the screen
    scroll.value = withTiming(
      -textWidth - START_OFFSET - 20,
      {
        duration: duration || 1000,
        easing: Easing.linear,
      },
      isFinished => {
        if (isFinished) {
          animationStatus.value = 1;
        }
      },
    );
  }, [animationStatus, duration, scroll, textWidth]);

  useEffect(() => {
    if (isAnimationDone) {
      try {
        navigation.push('Home');
        onEnd && onEnd();
      } catch (error) {
        console.log(error);
      }
    }
  }, [isAnimationDone, navigation, onEnd]);

  useEffect(() => {
    if (colorCtx) {
      setCOLORS(
        getColorById(colorCtx.colorId, COLORS_DATA) ||
          getDefaultColor(COLORS_DATA),
      );
    }
    return () => {
      setCOLORS(getDefaultColor(COLORS_DATA));
    };
  }, [colorCtx]);

  useDerivedValue(() => {
    if (animationStatus.value === 1) {
      runOnJS(setIsAnimationDone)(true);
    }
  }, [animationStatus]);

  return (
    <>
      <Animated.ScrollView
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        ref={ref => {
          ref?.scrollToEnd({animated: true});
        }}
        style={[styles.scrollContainer]}
        horizontal
        contentContainerStyle={[
          styles.contentContainer,
          {
            backgroundColor: COLORS.bgColor,
          },
        ]}>
        <Animated.Text
          onLayout={e => {
            setTextWidth(e.nativeEvent.layout.width);
          }}
          style={[styles.h1, {color: COLORS.textColor}, rStyle]}>
          {text}
        </Animated.Text>
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    transform: [{rotate: '90deg'}],
    width: SCREEN_HEIGHT,
    height: SCREEN_WIDTH,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: START_OFFSET,
    marginTop: SCREEN_WIDTH - 20,
  },
  h1: {
    fontFamily: 'Poppins',
    fontWeight: '900',
    fontSize: SCREEN_WIDTH,
    letterSpacing: 6,
    textAlign: 'center',
  },
});
