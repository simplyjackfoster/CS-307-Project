import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'

import Colors from "./constants/Colors";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Questionnaire from "./screens/Questionnaire";
import Feed from "./screens/Feed";
import Messages from "./screens/Messages";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import Settings from "./screens/Settings";


const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();



const Home = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Profile" component={Profile} options={{ headerShown: false}}></Tabs.Screen>
    <Tabs.Screen name="Feed" component={Feed} options={{ headerShown: false}}></Tabs.Screen>
    <Tabs.Screen name="Messages" component={Messages} options={{ headerShown: false}}></Tabs.Screen>
  </Tabs.Navigator>
);




export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="UniRoom" component={Home}/>
        <Drawer.Screen name="Settings" component={Settings}/>
      </Drawer.Navigator>        
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
