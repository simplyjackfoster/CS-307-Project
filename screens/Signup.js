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
  Alert,
  KeyboardAvoidingView
} from 'react-native';

import { AuthContext } from "../context";
import Colors from "../constants/Colors";
import { NavigationContainer } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import {
  isValidName,
  isValidEmail,
  isValidPhone,
  isValidBirthday,
  isValidPassword,
  isValidSecurity,
  isValidCheckbox
} from '../checkInputs';


// variables for exporting information to Questionnaire
export var Gemail = '';
export var Gpassword = '';
export var Gname = '';
export var Gphone = ''; 
export var Gbirthday = '';
export var Ggender = '';
export var Gvaccinated = '';
export var GsecurityQuestion = '';
export var GsecurityAnswer = '';


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
  const [securityAnswer, onChangeSecurity] = React.useState(null);

  // hooks for code of conduct and privacy policy checkboxes
  const [checkedCoc, setCheckedCoc] = React.useState(null);
  const [checkedPp, setCheckedPp] = React.useState(null);

  // hooks for security question (NOTE: start off at question 1 by default)
  const [gender, setGender] = React.useState(1);
  const [vaccinated, setVaccinated] = React.useState(1);
  const [selectedQuestion, setSelectedQuestion] = React.useState(1);


  /*
   * validateInputs()
   * function to check all of the input fields and send the appropriate alert
   * if there is an issue with one of the fields. This function will utilize helper
   * functions that validate each of the specific fields and send the alert.
   * If all fields are validated, allow the user to sign up.
   */
  const validateInputs = () => {
    // validate name
    if (!isValidName(name)) return;
  
    // validate email
    if (!isValidEmail(email)) return;
  
    // validate phone
    if (!isValidPhone(phone)) return;
  
    // validate birthday
    if (!isValidBirthday(birthday)) return;
  
    // validate passwords
    if (!isValidPassword(password, confirmPassword)) return;

    // validate security
    if (!isValidSecurity(securityAnswer)) return;

    // validate checkboxes
    if (!isValidCheckbox(checkedCoc, checkedPp)) return;

    // All fields have valid inputs, so create the account by inputting data to the database
      
    // go to the questionnnaire screen
    Gemail = email;
    Gpassword = password;
    Gname = name;
    Gphone = phone;
    Gbirthday = birthday;
    Ggender = gender;
    Gvaccinated = vaccinated;
    GsecurityQuestion = selectedQuestion;
    GsecurityAnswer = securityAnswer;
    navigation.push("Questionnaire");
  } // validateInputs()



	return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={90}>
      <ScrollView style={styles.container}>

          <Text style={styles.intro}>Please fill out the information below to create an account!</Text>

          <View style={styles.form}>

            {/* Name (text), name (field) */}
            <Text style={styles.label}>Name</Text>
            <SafeAreaView>
              <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                autoCapitalize='none'
                autoComplete='off'
                maxLength={50}
                autoCorrect={false}
                spellCheck={false}
                placeholder={name}
              />
            </SafeAreaView>


            {/* Email (text), email (field) */}
            <Text style={styles.label}>Purdue Email</Text>
            <SafeAreaView>
              <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                autoCapitalize='none'
                autoComplete='off'
                maxLength={50}
                autoCorrect={false}
                spellCheck={false}
                placeholder={email}
              />
            </SafeAreaView>


            {/* Phone number (text), phone number (field, only takes numbers) */}
            <Text style={styles.label}>Phone Number (10 #'s only)</Text>
            <SafeAreaView>
              <TextInput
                style={styles.input}
                onChangeText={onChangePhone}
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                spellCheck={false}
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
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                spellCheck={false}
                placeholder={birthday}
              />
            </SafeAreaView>


            {/* Gender */}
            <View>
              <Text style={styles.label}>Gender</Text>
              <Picker
                style={styles.picker}
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) =>
                  setGender(itemValue)}
              >
                <Picker.Item label="Male" value={1} />
                <Picker.Item label="Female" value={2} />
                <Picker.Item label="Other" value={3} />
                <Picker.Item label="Prefer not to say" value={4} />
              </Picker>
            </View>


            {/* Vaccination status */}
            <View>
              <Text style={styles.label}>Are You Vaccinated for Covid-19?</Text>
              <Picker
                style={styles.picker}
                selectedValue={vaccinated}
                onValueChange={(itemValue, itemIndex) =>
                  setVaccinated(itemValue)}
              >
                <Picker.Item label="No, I'm not vaccinated" value={1} />
                <Picker.Item label="Yes, I'm vaccinated" value={2} />
              </Picker>
            </View>


            
            {/* Password (text), password (field, with black dots) */}
            <Text style={styles.label}>Password (8-28 characters, 1 uppercase, 
              1 number, 1 special character)</Text>
            <SafeAreaView>
              <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                spellCheck={false}
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
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                spellCheck={false}
                placeholder={confirmPassword}
                secureTextEntry={true}
              />
            </SafeAreaView>


            {/* Selector for security question */}
            <View>
              <Text style={styles.label}>Choose a Security Question:</Text>
              <Picker
                style={styles.picker}
                selectedValue={selectedQuestion}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedQuestion(itemValue)}
              >
                <Picker.Item label="In what city were you born?" value={1} />
                <Picker.Item label="What is the name of your favorite pet?" value={2} />
                <Picker.Item label="What is your mother's maiden name?" value={3} />
                <Picker.Item label="What high school did you attend?" value={4} />
                <Picker.Item label="What the name of your first school?" value={5} />
                <Picker.Item label="What was your favorite food as a child?" value={6} />
              </Picker>
            </View>

            {/* Security Question Text Input */}
            <Text style={styles.label}>Security Question Answer:</Text>
            <SafeAreaView>
              <TextInput
                style={styles.input}
                onChangeText={onChangeSecurity}
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                spellCheck={false}
                maxLength={50}
                placeholder={"Answer"}
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
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>

          </View>

      </ScrollView>
    </KeyboardAvoidingView>
	); // return()
} // default export ()



// styles
const styles = StyleSheet.create({

  /* Continer styles */
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
    paddingBottom: 50,
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


  /* Checkbox styles */
  checkboxContainer: {
    alignItems: 'flex-end',
  },

  checkboxPrompt: {
    alignSelf: 'flex-start',
    marginLeft: 12,
    marginTop: 15,
    fontSize: 16,
  },

  picker: {
    alignSelf: 'center',
    width: '120%',
  },

  /* Continue Button */
  continueText: {
    fontSize: 18,
    alignSelf: 'center'
  },
  
  continueButton: {
    backgroundColor: Colors.offWhite,
    borderWidth: 1,
    borderRadius: 25,
    margin: 10,
    padding: 7,
    width: 175,
    alignSelf: 'center',
    textAlign: 'center',
    top: 25,
  },

});