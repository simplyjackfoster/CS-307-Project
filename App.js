import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { startClock } from 'react-native-reanimated';
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Questionnaire from "./screens/Questionnaire";
import Profile from "./screens/Profile";

const Stack = createStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UniRoom" component={Login}/>
      </Stack.Navigator>
    </NavigationContainer>    
  );

}


// Create styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
