import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

import Colors from "../constants/Colors";
import { AuthContext } from "../context";

import { auth } from '../database/RTDB';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Gemail, Gpassword } from './Signup';
/*
 * This is the screen where the user fills out the questionnaire
 * about themselves.
 */

 //On Press Function for CreateAcc Button
 const attemptCreate = () => {
  console.log("Auth: " + auth);
  console.log("EMAIL: " + Gemail);
  console.log("PASSWORD: " + Gpassword);
  createUserWithEmailAndPassword(auth, Gemail, Gpassword)
      .then((userCredential) => {
          console.log("ayo we here");
          const user = userCredential.user;
          console.log("USER: " + user);
      })
      .catch((error) => {
          console.log("Error Code: " + error.code);
          console.log("Error Message: " + error.message);
          Alert.alert("Error", "Error: Email Already in Use");
      });
 }
export default ( {navigation} ) => {

  const { userToken, setUserToken }  = React.useContext(AuthContext);

	return (
		<View style={styles.container}>
			<Text>This is the Questionnaire Screen</Text>
      
      {/* Continue to Questionnaire (button) */}
      <TouchableOpacity
			  style={styles.createButton}
        // check if questionnaire has been completed and run setUserToken
        onPress={() => {
          console.log("AYAYAYAYAYA")
          console.log("USER TOKEN: " + userToken)
          userToken ? (
            navigation.pop()
          ) : (
            attemptCreate(),
            setUserToken("asdfs")
          )
        }}
			>

      {userToken ? (
        <Text>Save Changes</Text>
      ) : (
        <Text>Create Account</Text>
      )}
			</TouchableOpacity> 
		</View>
	);
}




// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },


  createButton: {
    backgroundColor: '#66a3dd',
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    padding: 5,
    width: 120,
    alignSelf: 'center',
  },


});
