import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Colors from "./constants/Colors";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Questionnaire from "./screens/Questionnaire";
import Profile from "./screens/Profile";


const AuthStack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={Login}/>
        <AuthStack.Screen name="Signup" component={Signup}/>
      </AuthStack.Navigator>
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
