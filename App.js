import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from "./constants/Colors";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Questionnaire from "./screens/Questionnaire";
import Home from "./screens/Home";
import Feed from "./screens/Feed";
import Messages from "./screens/Messages";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";


const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>

      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={Home}></Tabs.Screen>
        <Tabs.Screen name="Feed" component={Feed}></Tabs.Screen>
        <Tabs.Screen name="Messages" component={Messages}></Tabs.Screen>
      </Tabs.Navigator>
        
    </NavigationContainer>
  );
}

/*
      <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={Login} options={{ title: "Sign In" }}/>
        <AuthStack.Screen name="Signup" component={Signup} options={{ title: "Create Account"}}/>
      </AuthStack.Navigator>
 */     



// Create styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
