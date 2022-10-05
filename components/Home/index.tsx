import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useReducer} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {RootStackParamList} from '../../App';
import ColorPalette from '../ColorPalette';
import SizedBox from '../SizedBox';
import {
  HomeActionTypes,
  HomeFormAction,
  homeFormReducer,
  HomeFormState,
} from './Home.reducer';
import {convertMsToSeconds, convertSecondsToMs} from './utils';
import LottieView from 'lottie-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({navigation}: Props) {
  const [state, dispatch] = useReducer<
    React.Reducer<HomeFormState, HomeFormAction>
  >(homeFormReducer, {
    enteredText: '',
    duration: undefined,
  });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.lottieContainer}>
          <LottieView
            source={{
              uri: 'https://assets8.lottiefiles.com/packages/lf20_7psw7qge.json',
            }}
            autoPlay
            loop
          />
        </View>
        <TextInput
          value={state.enteredText}
          placeholder="Enter text"
          style={styles.textInput}
          onChangeText={t => {
            dispatch({
              type: HomeActionTypes.SET_TEXT,
              payload: t,
            });
          }}
        />
        <TextInput
          value={
            state.duration
              ? convertMsToSeconds(state.duration).toString()
              : undefined
          }
          placeholder="Enter duration in seconds"
          style={styles.textInput}
          onChangeText={t => {
            if (!t.match(/^[0-9]*$/)) {
              return;
            }

            dispatch({
              type: HomeActionTypes.SET_DURATION,
              payload: convertSecondsToMs(+t),
            });
          }}
        />
        <SizedBox vertical={20} />
        <ColorPalette
          onPress={() => {
            navigation.push('AnimatedText', {
              text: state.enteredText,
              duration: state.duration,
            });
          }}
        />
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
    color: 'black',
    width: '90%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottieContainer: {
    width: 300,
    height: 300,
  },
});
