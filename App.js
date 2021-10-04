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



// Create navigators
const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



// Create the tabs at the bottom that include "Profile", "Feed", and "Messages" 
const HomeTabs = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
    <Tabs.Screen name="Feed" component={Feed} options={{ headerShown: false }}/>
    <Tabs.Screen name="Messages" component={Messages} options={{ headerShown: false }}/>
  </Tabs.Navigator>
);



// Drawer on the left that includes "HomeTabs" and "Settings" 
const HomeDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="UniRoom" component={HomeTabs}/>
    <Drawer.Screen name="Settings" component={Settings}/>
  </Drawer.Navigator>
);



// Stack that allows us to move between the Drawer and Edit Profile
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeDrawer" component={HomeDrawer}
     options={{ headerShown: false }}/>
    <Stack.Screen name="EditProfile" component={EditProfile}
     options={{ headerTitle: "Edit Profile", headerBackTitle: "Back" }}/>
  </Stack.Navigator>
);






/*
 * This is the default export for the App.
 * 
 * Starts with
 */
export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name="Home" component={HomeStack} options={{ headerShown: false}}/>
      </MainStack.Navigator>
    </NavigationContainer>
  );
}




// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
