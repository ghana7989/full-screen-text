import React, {FC, useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {colorContext} from '../../context/Color.context';
import SizedBox from '../SizedBox';
import ColorSelectCircle from './ColorSelectCircle';
import {COLORS_DATA} from './data';

interface ColorPaletteProps {}
const ColorPalette: FC<ColorPaletteProps> = () => {
  const colorCtx = useContext(colorContext);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select a color combination</Text>

      <SizedBox vertical={8} />

      <ScrollView horizontal style={styles.scrollView}>
        {COLORS_DATA.map(color => {
          return (
            <TouchableOpacity
              onPress={() => {
                colorCtx?.changeColor(color.id);
              }}
              key={color.id}
              style={styles.colorSelectContainer}>
              <ColorSelectCircle
                bgColor={color.bgColor}
                textColor={color.textColor}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  scrollView: {},
  colorSelectContainer: {
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 36,
  },
});
export default ColorPalette;
