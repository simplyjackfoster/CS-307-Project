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
import { Checkbox } from 'react-native-paper';


/*
 * This is the screen where the user creates an account. 
 */
export default ( {navigation} ) => {

  const { userToken, setUserToken }  = React.useContext(AuthContext);


  // hooks for input fields
  const [name, onChangeName] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [phone, onChangePhone] = React.useState(null);
  const [birthday, onChangeBirthday] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [confirmPassword, onChangeConfirmPassword] = React.useState(null);

  // hooks for code of conduct and privacy policy checkboxes
  const [checkedCoc, setCheckedCoc] = React.useState(false);
  const [checkedPp, setCheckedPp] = React.useState(false);



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

    console.log("Name Validated!");
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

    console.log("Email Validated!");
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
      return false;
    }

    for (const c in phone) {
      // console.log(c.charCodeAt(0));
      if (c < '0' || c > '9' || c == '.') {
        Alert.alert("Error", "Phone number contains non-numeric character, please try again.", 
				  [{ text: "Ok" }]);
        return false;
      }
    }

    console.log("Phone Number Validated!");
    return true;
  } // isValidPhone
  


  /*
   * isValidBirthday()
   *  
   */
  const isValidBirthday = () => {
    console.log("Validating the birthday: " + birthday);

    if (!birthday) {
      Alert.alert("Error", "Birthday field is empty, please try again.", 
				[{ text: "Ok" }]);
      return false;  
    }

    if (birthday.length != 10) {
      Alert.alert("Error", "Birthday field has incorrect length, please try again.", 
				[{ text: "Ok" }]);
      return false;
    }

    const slashOneIndex = birthday.indexOf('/');
    if (slashOneIndex === -1) {
      // no slash
      Alert.alert("Error", "Birthday field is missing '/' character, please try again.", 
				[{ text: "Ok" }]);
    }

    const slashTwoIndex = birthday.indexOf('/', slashOneIndex + 1)
    if (slashTwoIndex === -1) {
      // no second slash
      Alert.alert("Error", "Birthday field is missing second '/' character, please try again.", 
				[{ text: "Ok" }]);
    }

    const month = birthday.substring(0, slashOneIndex);
    const day = birthday.substring(slashOneIndex + 1, slashTwoIndex);
    const year = birthday.substring(slashTwoIndex + 1);

    console.log("Month: " +  month + ", Day: " + day + ", Year: " + year);

    // check if the month day and year are numeric
    for (const c in month) {
      if (c < '0' || c > '9') {
        Alert.alert("Error", "Birthday field contains invalid character, please try again.", 
				  [{ text: "Ok" }]);
        return false;
      }
    }

    for (const c in day) {
      if (c < '0' || c > '9') {
        Alert.alert("Error", "Birthday field contains invalid character, please try again.", 
				  [{ text: "Ok" }]);
        return false;
      }
    }

    for (const c in year) {
      if (c < '0' || c > '9') {
        Alert.alert("Error", "Birthday field contains invalid character, please try again.", 
				  [{ text: "Ok" }]);
        return false;
      }
    }

    // check if the month day and year are valid dates
    const monthInt = parseInt(month);
    const dayInt = parseInt(day);
    const yearInt = parseInt(year);

    if (monthInt < 1 || monthInt > 12) {
      Alert.alert("Error", "Birthday field has invalid month, please try again.", 
				[{ text: "Ok" }]);
        return false;
    }

    var dayIsValid = true;
    switch (monthInt) {
      case 1, 3, 5, 7, 8, 10, 12: 
        if (dayInt < 1 || dayInt > 31) dayIsValid = false;
        break;
      case 4, 6, 9, 11:
        if (dayInt < 1 || dayInt > 30) dayIsValid = false;
        break;
      case 2:
        if (dayInt < 1 || dayInt > 28) dayIsValid = false;
        if (dayInt === 29 && yearInt % 4 === 0) dayIsValid = true;
        break;
      default:
        // month was invalid
    }

    if (!dayIsValid) {
      Alert.alert("Error", "Birthday field has invalid day, please try again.", 
				[{ text: "Ok" }]);
        return false;
    }

    const today = new Date();
    const currentYear = parseInt(today.getFullYear());
    console.log("Current year: " + currentYear);
    
    if (yearInt < currentYear - 100 || yearInt > currentYear - 16) {
      Alert.alert("Error", "Birthday field has invalid year, please try again.", 
				[{ text: "Ok" }]);
        return false;
    }

    console.log("Birthday Validated!")
    return true;
  }



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
   * isValidCheckbox()
   * function to check if the code of conduct and the privacy policy
   * checkboxes have been read by the user, return true if both are checked
   */
  const isValidCheckbox = () => {
    console.log("Validating the checkboxes...");

    if (!checkedCoc) {
      // didn't check the code of conduct checkbox
      Alert.alert("Error", "Please read the Code of Conduct before continuing.", 
				[{ text: "Ok" }]);
      return false;
    }

    if (!checkedPp) {
      // didn't check the privacy policy checkbox
      Alert.alert("Error", "Please read the Privacy Policy before continuing.", 
				[{ text: "Ok" }]);
      return false;
    }

    console.log("Checkboxes Validated");
    return true;
  }



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
      if (!isValidBirthday()) return;
  
      // validate passwords
      if (!isValidPassword()) return;

      // validate checkboxes
      if (!isValidCheckbox()) return;
  
      // All fields have valid inputs, so create the account by inputting data to the database
      // storeLoginData()
      // storeCriticalData()

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


          {/* View Code of Conduct Button*/}
          <Button title={"Code of Conduct"} onPress={() => navigation.push("CodeOfConduct")}></Button>

          {/* View Privacy Policy Button */}
          <Button title={"Privacy Policy"} onPress={() => navigation.push("PrivacyPolicy")}></Button>

          
          {/* Checkbox for code of conduct */}
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxPrompt}>I have read the Code of Conduct</Text>
            <Checkbox.Android
              status={checkedCoc ? 'checked' : 'unchecked'}
              onPress={() => setCheckedCoc(!checkedCoc)}
              uncheckedColor={Colors.darkGray}
              color={Colors.lightBlue}
            />
          </View>

          {/* Checkbox for privacy policy */}
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxPrompt}>I have read the Privacy Policy</Text>
            <Checkbox.Android
              status={checkedPp ? 'checked' : 'unchecked'}
              onPress={() => setCheckedPp(!checkedPp)}
              uncheckedColor={Colors.darkGray}
              color={Colors.lightBlue}
            />
          </View>

          
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
    marginLeft: 15,
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


  /* Button and checkbox styles */

  checkboxContainer: {
    alignItems: 'flex-end',
  },

  checkboxPrompt: {
    alignSelf: 'flex-start',
    marginLeft: 12,
    marginTop: 15,
    fontSize: 16,
  },

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