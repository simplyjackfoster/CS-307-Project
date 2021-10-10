import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'

import Colors from "./constants/Colors";
import { AuthContext } from "./context"
import RootStack from './navigation/RootStack';


/*
 * This is the default export for the App.
 */
export default function App() {
  // Set up a state variable to tell whether we are signed in or not
  const [userToken, setUserToken] = React.useState(null);
  
  return (
    <AuthContext.Provider value={ {userToken, setUserToken} }>
      <NavigationContainer>
        <RootStack userToken={userToken}/>
      </NavigationContainer>
    </AuthContext.Provider>
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
