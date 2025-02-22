import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import index from './(tabs)'; // Your main screen
import WorkoutPreset from './(tabs)'; // New screen to navigate to
import { NavigatorScreenParams } from '@react-navigation/native';
import { RootStackParamList } from './types';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={index} options={{ headerShown: true }} />
        <Stack.Screen name="WorkoutPreset" component={WorkoutPreset} options={{ title: 'Workout Preset' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
