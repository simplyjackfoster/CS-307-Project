import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button,
  SafeAreaView,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { AuthContext } from "../context";
import Colors from "../constants/Colors";


/*
 * This is the screen where the user creates an account. 
 */
export default ( {navigation} ) => {

  const { userToken, setUserToken }  = React.useContext(AuthContext);


  /* Functions to handle text input changes */
  const [name, onChangeName] = React.useState("name");
  const [email, onChangeEmail] = React.useState("email");
  const [password, onChangePassword] = React.useState("password");
  const [confirmPassword, onChangeConfirmPassword] = React.useState("confirmPassword");



	return (
    // If the user clicks "Create Account", set userToken to a non-null value.
		<View style={styles.container}>

        <Text style={styles.intro}>Please fill out the information below to create an account!</Text>

        <View style={styles.form}>

          {/* Name (text), name (field) */}
          <Text style={styles.name}>Name</Text>
          <SafeAreaView>
            <TextInput
              style={styles.nameInput}
              onChangeText={onChangeName}
              placeholder={name}
            />
          </SafeAreaView>


          {/* Email (text), email (field) */}
          <Text style={styles.email}>Purdue Email</Text>
          <SafeAreaView>
            <TextInput
              style={styles.emailInput}
              onChangeText={onChangeEmail}
              placeholder={email}
            />
          </SafeAreaView>


          {/* Phone number (text), phone number (field, only takes numbers) */}


          {/* Date of birth (text), date of birth (field) */}

          
          {/* Password (text), password (field, with black dots) */}
          <Text style={styles.password}>Password</Text>
          <SafeAreaView>
            <TextInput
              style={styles.passwordInput}
              onChangeText={onChangePassword}
              placeholder={password}
              secureTextEntry={true}
            />
          </SafeAreaView>


          {/* Confirm password (text), password (field, with black dots) */}
          <Text style={styles.confirmPassword}>Confirm Password</Text>
          <SafeAreaView>
            <TextInput
              style={styles.confirmPasswordInput}
              onChangeText={onChangeConfirmPassword}
              placeholder={confirmPassword}
              secureTextEntry={true}
            />
          </SafeAreaView>


          {/* Fill out this questionnaire to make your profile (text) */}
            

          {/* Button for questionnaire (button) */}
            {/* push Questionnaire.js */}
            {/* toggle a state/context to confirm submission of questionnaire */}



          {/* Continue to Questionnaire (button) */}
          <TouchableOpacity
					style={styles.continueButton}
          // check if questionnaire has been completed and run setUserToken
          onPress={() => {
            navigation.push("Questionnaire");
            //setUserToken('asdsf')
          }}
				>
					<Text>Continue</Text>
				</TouchableOpacity>

        </View>




		</View>
	);
}




// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  intro: {
    margin: 15,
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
  },

  form: {
    margin: 20,
    textAlign: 'left',
    alignSelf: 'center',
  },

  name: {
    fontSize: 20,
    margin: 12,
    marginBottom: 0,
  },
  
  nameInput: {
    height: 40,
    width: 250,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },

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

  password: {
    fontSize: 20,
    margin: 12,
    marginBottom: 0,
  },
  
  passwordInput: {
    height: 40,
    width: 250,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },

  confirmPassword: {
    fontSize: 20,
    margin: 12,
    marginBottom: 0,
  },
  
  confirmPasswordInput: {
    height: 40,
    width: 250,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },

  continueButton: {
    backgroundColor: '#66a3dd',
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    padding: 5,
    width: 75,
    alignSelf: 'center',
  },
  

});