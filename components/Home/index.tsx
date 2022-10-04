import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {RootStackParamList} from '../../App';
import ColorPalette from '../ColorPalatte';
import SizedBox from '../SizedBox';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export default function Home({navigation}: Props) {
  const [enteredText, setEnteredText] = useState(
    'Hello000😁😁 How are you all?',
  );
  return (
    <>
      <View style={styles.container}>
        <TextInput
          value={enteredText}
          placeholder="Enter text"
          style={styles.textInput}
          onChangeText={setEnteredText}
        />
        <Button
          title="Play"
          disabled={enteredText.length === 0}
          onPress={() => {
            navigation.push('AnimatedText', {
              text: enteredText,
              duration: 10000,
            });
          }}
        />
        <SizedBox vertical={20} />
        <ColorPalette />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
