import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AnimatedText from './components/AnimatedText';
import Home from './components/Home';
import {ColorProvider} from './context/Color.context';

export type RootStackParamList = {
  Home: undefined;
  AnimatedText: {
    text: string;
    duration?: number;
    onEnd?: () => void;
  };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <ColorProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            animationTypeForReplace: 'pop',
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            options={{
              headerShown: false,
              animationTypeForReplace: 'push',
            }}
            name="AnimatedText"
            component={AnimatedText}
          />
        </Stack.Navigator>
      </ColorProvider>
    </NavigationContainer>
  );
};

export default App;
