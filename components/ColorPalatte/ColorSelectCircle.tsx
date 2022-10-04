import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

interface ColorSelectCircleProps {
  bgColor: string;
  textColor: string;
}
const ColorSelectCircle: FC<ColorSelectCircleProps> = ({
  bgColor,
  textColor,
}) => {
  if (!bgColor) {
    return null;
  }
  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.halfCircle,
          styles.leftHalfCircle,
          {
            backgroundColor: textColor,
          },
        ]}
      />
      <View
        style={[
          styles.halfCircle,
          styles.rightHalfCircle,

          {
            backgroundColor: bgColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
  },
  halfCircle: {
    width: 30,
    height: 60,
  },
  leftHalfCircle: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  rightHalfCircle: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
});
export default ColorSelectCircle;
