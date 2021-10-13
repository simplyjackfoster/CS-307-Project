import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'

import Colors from "./constants/Colors";
import { AuthContext } from "./context"
import RootStack from './navigation/RootStack';

// Firebase Integration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, exists, val, child, get } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVc6_sT83QWcX-TCxDEDtVMHsMRaTy2yY",
  authDomain: "uniroom-fdcd7.firebaseapp.com",
  databaseURL: "https://uniroom-fdcd7-default-rtdb.firebaseio.com",
  projectId: "uniroom-fdcd7",
  storageBucket: "uniroom-fdcd7.appspot.com",
  messagingSenderId: "644435940478",
  appId: "1:644435940478:web:40e3f7aea01972606bb42f",
  measurementId: "G-KQK1K10WTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);

//module.exports = {app, rtdb};
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
