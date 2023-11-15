import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './HomeScreen';
import {DetailScreen} from './DetailScreen';
import {PurityScreen} from './PurityScreen';
import { GraphScreen } from './GraphScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Detail" options={{headerShown: false}} component={DetailScreen} />
        <Stack.Screen name="Purity" options={{headerShown: false}} component={PurityScreen} />
        <Stack.Screen name="Graph" options={{headerShown: false}} component={GraphScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
