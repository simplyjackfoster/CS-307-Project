import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'

import Colors from "./constants/Colors";
import { AuthContext, VerificationContext } from "./context"
import RootStack from './navigation/RootStack';


/*
 * This is the default export for the App.
 */
export default function App() {
  // Set up a state variable to tell whether we are signed in or not
  const [userToken, setUserToken] = React.useState(null);
  const [userVerified, setUserVerified] = React.useState(null);
  
  return (
    <VerificationContext.Provider value={ {userVerified, setUserVerified} }>
    <AuthContext.Provider value={ {userToken, setUserToken} }>
      <NavigationContainer>
        <RootStack userToken={userToken} userVerified={userVerified}/>
      </NavigationContainer>
    </AuthContext.Provider>
    </VerificationContext.Provider>
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
