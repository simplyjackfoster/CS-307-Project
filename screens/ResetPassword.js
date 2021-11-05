import { sendPasswordResetEmail, sendSignInLinkToEmail, updatePassword, onAuthStateChanged } from 'firebase/auth';
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
import { isValidPassword } from '../checkInputs';

import Colors from "../constants/Colors";
import { AuthContext } from "../context";

// authentication imports
import { auth, rtdb } from '../database/RTDB';

/*
 * This is the screen where the user resets their password.
 */

var emailIn = "";

export default ( {navigation} ) => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState(null);
  const { userToken, setUserToken } = React.useContext(AuthContext);

  const attemptResetEmail = () => {
    //may need to look into way to send to internal link
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Reset Password Email Sent");
        auth.signOut();
        navigation.pop();
      })
      .catch((error) => {
        Alert.alert("Error", "Error: There was an issue sending you a password link");
        console.log("Error Code: " + error.code);
        console.log("Error Message: " + error.message);
        navigation.pop();
      })
  }

  const attemptPasswordReset = () => {
    // validate passwords
    if (isValidPassword(password, password)){
      updatePassword(auth.currentUser, password).then(() => {
        Alert.alert("Password Reset", "Your password has been successfully reset. You will now be logged out.");
        console.log("reset successful")
        auth.signOut();
        setUserToken(null);
      })
      .catch((error) => {
        Alert.alert("Error", "Error: There was an issue updating your password");
        console.log("Error Code: " + error.code);
        console.log("Error Message: " + error.message);
      })
    }
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={"padding"}>
      <View style={styles.container}>
        {/* Display email prompt to give access to reset password page if not logged in  */}
        <View style={userToken ? (
          { display: 'none' }
        ) : (
          styles.form 
        )}
        >
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
                  "An email has been sent to your email address. Please follow the contained instructions to reset your password.",
                  [
                    {
                      text: "Ok",
                      onPress: () => { 
                        //handleEmail
                        attemptResetEmail()
                      }
                    }
                  ]
                  );}}
            >
            <Text style={styles.resetText}>Send Reset Password Email</Text>
          </TouchableOpacity>
            </SafeAreaView>
        </View>

        {/* Display Reset Password Page when logged in  */}
        <View style={userToken ? (
          styles.form 
        ) : (
          { display: 'none' }
        )}
        >
          <Text style={styles.email}>Enter your new password.</Text>
          <Text style={styles.email}>Note: Resetting your password will automatically log you out.</Text>
          <SafeAreaView>
            <TextInput
              style={styles.emailInput}
              onChangeText={onChangePassword}
              placeholder={password}
            />
            <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  console.log("reseting password")
                  attemptPasswordReset()
                  navigation.pop()
                }}
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