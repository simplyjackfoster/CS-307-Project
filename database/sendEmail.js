import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
    Linking
  } from 'react-native';
import { rtdb, auth } from './RTDB';
import { ref, set, update, exists, val, child, get, remove} from "firebase/database"
import { AuthCredential, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';

// database read/write/remove imports
import { getDataFromPath } from './readData';
import { getID } from './ID';

export const sendVerification = () => {
    updateProfile(auth.currentUser, { displayName: getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/profile_name")})
        .then(() => {
            //displayName has been updated
            console.log(auth.currentUser.displayName)
        })
        .catch((error) => {
            Alert.alert("Error", "Error: There was an issue updating your name");
            console.log("Error Code: " + error.code);
            console.log("Error Message: " + error.message);
            // move back to create account screen
            navigation.pop();
        });
    //find way to update app and display name in email
    sendEmailVerification(auth.currentUser)
        .then(() => {
            Alert.alert("Email Sent", "A verification link has been sent to your email!");
        })
        .catch((error) => {
            Alert.alert("Error", "Error: There was an issue sending your account verification link");
            console.log("Error Code: " + error.code);
            console.log("Error Message: " + error.message);
            // move back to create account screen
            navigation.pop();
        });
}