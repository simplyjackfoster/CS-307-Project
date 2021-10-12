import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView, 
  Button,
  SafeAreaView,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { AuthContext } from "../context";
import Colors from "../constants/Colors";
import { NavigationContainer } from '@react-navigation/native';


/*
 * This is the screen where the user creates an account. 
 */
export default ( {navigation} ) => {

  const { userToken, setUserToken }  = React.useContext(AuthContext);


  /* Functions to handle text input changes */
  const [name, onChangeName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [phone, onChangePhone] = React.useState("");
  const [birthday, onChangeBirthday] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [confirmPassword, onChangeConfirmPassword] = React.useState("");



  /*
   * goToQuest()
   * function to keep track of whether the user has filled out the questionnaire
   * and navigate them to the questionnaire in the process
   */
  const goToQuest = () => {
    // keep track of whether the user went to the questionnaire (not implemented)
    

    // navigate the user to the questionnaire screen
    navigation.push("Questionnaire");
  }


  /*
   * IsValidName()
   * function to check whether the name is valid, will return true if there are only
   * alphabetic characters, apostrophes, and hyphens and false otherwise 
   */
  const isValidName = () => {
    //check if there are any characters besides uppercase and lowercase letters, apostrophes, and hyphens
    for (const c of name) {

      // 8217 is the acsii value for apostrophe for iOS

      if ((c.charCodeAt(0) == 8217) || (c === '-') || (c === ' ') || 
          (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) {
        // valid character
        console.log(c + " is a valid character");
      }
      else {
        // invalid character
        console.log(c + " is NOT a valid character");
        return false;
      }
    }
  }


  /*
   * isValidEmail
   * function to check if the email is valid, checks that the email is a purdue email
   * and then checks if the username of the email has valid characters
   * returns true if those conditions are met, false if not
   */
  const isValidEmail = () => {
    const indexOfAt = email.indexOf('@');

    // check for @ character
    if (indexOfAt == -1) {
      console.log("No @ character");
      return false;
    } 
    
    // check for purdue email
    if (email.substring(indexOfAt) !== "@purdue.edu") {
      console.log("Not a purdue email");
      return false;
    }

    // get the username of the email 
    const username = email.substring(0, indexOfAt);
    
    // check for empty username
    if (username.length === 0) {
      console.log("Empty username");
      return false;
    }

    // iterate through the username characters
    for (const c of username) {
      if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9')) {
        console.log(c + " is a valid character");
      }
      else {
        // invalid character
        console.log(c + " is NOT a valid character");
        return false;
      }
    }

    return true;
  } // isValidEmail
  


	return (
    // If the user clicks "Create Account", set userToken to a non-null value.
		<ScrollView style={styles.container}>

        <Text style={styles.intro}>Please fill out the information below to create an account!</Text>

        <View style={styles.form}>

          {/* Name (text), name (field) */}
          <Text style={styles.label}>Name</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={onChangeName}
              placeholder={name}
            />
          </SafeAreaView>


          {/* Email (text), email (field) */}
          <Text style={styles.label}>Purdue Email</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              placeholder={email}
            />
          </SafeAreaView>


          {/* Phone number (text), phone number (field, only takes numbers) */}
          <Text style={styles.label}>Phone Number (10 #'s only)</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={onChangePhone}
              placeholder={phone}
            />
          </SafeAreaView>


          {/* Date of birthday (text), date of birth (field) */}
          <Text style={styles.label}>Date of Birth (MM/DD/YYYY)</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={onChangeBirthday}
              placeholder={birthday}
            />
          </SafeAreaView>

          
          {/* Password (text), password (field, with black dots) */}
          <Text style={styles.label}>Password</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              placeholder={password}
              secureTextEntry={true}
            />
          </SafeAreaView>


          {/* Confirm password (text), password (field, with black dots) */}
          <Text style={styles.label}>Confirm Password</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={onChangeConfirmPassword}
              placeholder={confirmPassword}
              secureTextEntry={true}
            />
          </SafeAreaView>


          {/* Fill out this questionnaire (text), Button for questionnaire (button) */}
            {/* push Questionnaire.js */}
            {/* toggle a state/context to confirm submission of questionnaire */}
          <Text style={styles.questPrompt}>Take this quiz to get a customized feed of other students!</Text>
          <TouchableOpacity
            style={styles.questButton}
            onPress={goToQuest}
				  >
            <Text>Take Quiz</Text>
				  </TouchableOpacity>


          {/* Create your account (text), Create account (button) */}
          <Text style={styles.createPrompt}>Once you take the quiz, you're all set to create your account!</Text>
          <TouchableOpacity
					style={styles.createButton}
          // check if questionnaire has been completed and run setUserToken
          onPress={() => setUserToken('asdsf')}
				  >
            <Text>Create Account</Text>
				  </TouchableOpacity>


          {/* Button to test validation functions */}
			    <Button title="Validate Email" onPress={isValidEmail}></Button>
          


        </View>




		</ScrollView>
	);
}




// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  intro: {
    margin: 15,
    marginBottom: 0,
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
  },

  /* Form styles */

  form: {
    margin: 20,
    textAlign: 'left',
    alignSelf: 'center',
  },

  label: {
    fontSize: 20,
    margin: 10,
    marginLeft: 28,
    marginBottom: 0,
    textAlign: 'left',
  },

  input: {
    height: 40,
    width: 290,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
  },


  /* Button styles */

  questPrompt: {
    fontSize: 16,
    margin: 5,
    marginTop: 25,
    textAlign: 'center',
  },

  questButton: {
    backgroundColor: Colors.lightBlue,
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    padding: 5,
    width: 80,
    alignSelf: 'center',
  },

  createPrompt: {
    fontSize: 16,
    margin: 5,
    marginTop: 25,
    textAlign: 'center',
  },

  createButton: {
    backgroundColor: Colors.lightBlue,
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    padding: 5,
    width: 120,
    alignSelf: 'center',
  },
  

});