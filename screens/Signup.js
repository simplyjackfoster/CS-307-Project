import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView, 
  Button,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert
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
  const [name, onChangeName] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [phone, onChangePhone] = React.useState(null);
  const [birthday, onChangeBirthday] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [confirmPassword, onChangeConfirmPassword] = React.useState(null);


  /*
   * IsValidName()
   * function to check whether the name is valid, will return true if there are only
   * alphabetic characters, apostrophes, and hyphens and false otherwise 
   */
  const isValidName = () => {
    console.log("Validating the name: " + name);

    if (!name) {
      Alert.alert("Error", "Name field is empty, please try again.", 
				[{ text: "Ok" }]);
      return false;
    }

    // iterate through the characters in the name
    for (const c of name) {

      // 8216 and 8217 are the acsii values for apostrophes in iOS
      if ((c.charCodeAt(0) == 8217) || (c.charCodeAt(0) == 8216) || (c === '-') || 
          (c === ' ') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) {
        // valid character
        console.log(c + " is a valid character");
      }
      else {
        // invalid character
        Alert.alert("Error", "Name field contains invalid character: '" + c + 
          "', please try again.", [{ text: "Ok" }]);

        console.log(c + " is NOT a valid character");
        return false;
      }
    }

    console.log("Name Validated");
    return true;
  } // isValidName


  /*
   * isValidEmail
   * function to check if the email is valid, checks that the email is a purdue email
   * and then checks if the username of the email has valid characters
   * returns true if those conditions are met, false if not
   */
  const isValidEmail = () => {
    console.log("Validating the email: " + email);

    if (!email) {
      Alert.alert("Error", "Email field is empty, please try again.", 
				[{ text: "Ok" }]);
      return false;
    }

    const indexOfAt = email.indexOf('@');

    // check for @ character
    if (indexOfAt == -1) {
      Alert.alert("Error", "Email is missing '@' character, please try again.", 
				[{ text: "Ok" }]);

      // console.log("No @ character");
      return false;
    } 
    
    // check for purdue email
    if (email.substring(indexOfAt) !== "@purdue.edu") {
      Alert.alert("Error", "Email is not a purdue email, please try again.", 
				[{ text: "Ok" }]);

      // console.log("Not a purdue email");
      return false;
    }

    // get the username of the email 
    const username = email.substring(0, indexOfAt);
    
    // check for empty username
    if (username.length === 0) {
      Alert.alert("Error", "Email is missing username, please try again.", 
				[{ text: "Ok" }]);

      // console.log("Empty username");
      return false;
    }

    // iterate through the username characters
    for (const c of username) {
      if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9')) {
        // console.log(c + " is a valid character");
      }
      else {
        // invalid character
        Alert.alert("Error", "Email contains invalid character '" + c + 
          "' in username, please try again.", [{ text: "Ok" }]);

        // console.log(c + " is NOT a valid character");
        return false;
      }
    }

    console.log("Email Validated");
    return true;
  } // isValidEmail



  /*
   * isValidPhone()
   * function to make sure the phone number only consists of 10 numbers
   * $$ Issue with interpreting '.' as the same value as numbers $$
   */
  const isValidPhone = () => {
    console.log("Validating the phone: " + phone);
    
    if (!phone) {
      Alert.alert("Error", "Phone field is empty, please try again.", 
				[{ text: "Ok" }]);
      return false;
    }

    if (phone.length !== 10) {
      Alert.alert("Error", "Phone number is not 10 digits long, please try again.", 
				[{ text: "Ok" }]);

      // console.log("Phone number not 10 digits long");
      return false;
    }

    for (const c in phone) {
      console.log(c.charCodeAt(0));
      if (c < '0' || c > '9' || c == '.') {
        Alert.alert("Error", "Phone number contains non-numeric character, please try again.", 
				[{ text: "Ok" }]);

        // console.log("Non-numeric character found");
        return false;
      }
    }

    console.log("Phone Number Validated");
    return true;
  } // isValidPhone
  


  /*
   * isValidBirthday()
   *  
   */
/*   const isValidBirthday = () => {
    console.log("Validating the birthday: " + birthday);

    if (!birthday) {
      Alert.alert("Error", "Birthday field is empty, please try again.", 
				[{ text: "Ok" }]);
      return false;  
    }

    if(birthday.length != 10){
      console.log("Not a valid length for a date")
      return false;
    }
    const birthdate = moment(birthday, 'MM-DD-YYYY');
    if(!birthdate.isValid()){
      console.log("Not a valid date")
      return false;
    }
  } */



  /*
   * isValidPassword()
   * function to check if the password entered is the same in both password fields
   * and also have the length within the specified range of 8 to 28 
   */
  const isValidPassword = () => {
    console.log("Validating the password: " + password + 
                ", confirm password: " + confirmPassword);

    if (!password || !confirmPassword) {
      Alert.alert("Error", "Password and/or Confirm Password field is empty, please try again.", 
        [{ text: "Ok" }]);
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match, please try again.", 
				[{ text: "Ok" }]);
      return false;
    }
    if (password.length > 28 || password.length < 8) {
      Alert.alert("Error", "Password must be within range 8-28 characters, please try again.", 
				[{ text: "Ok" }]);
      return false;
    }

    console.log("Password Validated");
    return true;
  } // isValidPassword



    /*
   * validateInputs()
   * function to check all of the input fields and send the appropriate alert
   * if there is an issue with one of the fields. This function will utilize helper
   * functions that validate each of the specific fields and send the alert.
   * If all fields are validated, allow the user to sign up.
   */
    const validateInputs = () => {
      console.log("\n\n...Authenticating signup...");
  
      // validate name
      if (!isValidName()) return;
  
      // validate email
      if (!isValidEmail()) return;
  
      // validate phone
      if (!isValidPhone()) return;
  
      // validate birthday
      // if (!isValidBirthday()) return;
  
      // validate passwords
      if (!isValidPassword()) return;
  
      // All fields have valid inputs, so create the account by inputting data to the database
  

      // go to the questionnnaire screen
      navigation.push("Questionnaire");
  
      console.log("Moving to Questionnaire!");
  
    } // validateInputs



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
              keyboardType='numeric'
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
          <Text style={styles.label}>Password (8-28 characters)</Text>
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



          {/* Continue to Questionnaire (button) */}
          <TouchableOpacity
					  style={styles.continueButton}
            onPress={validateInputs}
				  >
            <Text>Continue</Text>
				  </TouchableOpacity>

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

  continueButton: {
    backgroundColor: Colors.lightBlue,
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    padding: 5,
    width: 75,
    alignSelf: 'center',
  },
  

});