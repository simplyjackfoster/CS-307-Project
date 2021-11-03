import { sendPasswordResetEmail } from 'firebase/auth';
import React from 'react';
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView
} from 'react-native';

import Colors from "../constants/Colors";
import { AuthContext, VerificationContext } from "../context";

// authentication imports
import { auth, rtdb } from '../database/RTDB';

/*
 * This is the screen where the user resets their password.
 */

var emailIn = "";

export default ( {navigation} ) => {
const [email, onChangeEmail] = React.useState("");
const { userToken, setUserToken }  = React.useContext(AuthContext);
const { userVerified, setUserVerified } = React.useContext(VerificationContext);

  const attemptResetEmail = () => {
    sendPasswordResetEmail(auth, emailIn)
      .then(() => {
        console.log("Reset Password Email Sent");
        setUserToken(null)
				setUserVerified(null)
      })
      .catch((error) => {
        Alert.alert("Error", "Error: There was an issue sending you a password link");
        console.log("Error Code: " + error.code);
        console.log("Error Message: " + error.message);
        navigation.pop();
      })
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={"padding"}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.email}>Enter your email address</Text>
          <SafeAreaView>
            <TextInput
              style={styles.emailInput}
              onChangeText={onChangeEmail}
              placeholder={email}
            />
            <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  console.log("reseting with " + email)
                  Alert.alert("Notice", 
                  "An email has been sent to your email address. Please follow the contained instructions to reset your password. You will now be logged out.",
                  [
                    {
                      text: "Ok",
                      onPress: () => { 
                        //handleEmail
                        emailIn = email
                        attemptResetEmail()
                        //navigation.pop()
                      }
                    }
                  ]
                  );}}
            >
            <Text style={styles.resetText}>Reset Password</Text>
          </TouchableOpacity>
            </SafeAreaView>
        </View>
      </View>
    </KeyboardAvoidingView>
	);
}

// styles
const styles = StyleSheet.create({

  /* Container styles */
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.white,
  },

  form: {
	margin: 20,
	textAlign: 'left',
	alignSelf: 'center',

  },

  /* Email Input */
  email: {
	fontSize: 20,
	margin: 12,
	marginBottom: 0,

  },

  emailInput: {
	height: 40,
	width: 250,
	margin: 10,
	padding: 10,
	borderWidth: 1,
	borderRadius: 10,
  },

  /* Reset Password Button */
  resetText: {
    fontSize: 16,
    alignSelf: 'center',
  },

  resetButton: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 25,
    margin: 5,
    padding: 10,
    width: 175,
    backgroundColor: Colors.lightBlue,
  },


});