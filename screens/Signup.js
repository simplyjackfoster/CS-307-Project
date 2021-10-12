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
  const [name, onChangeName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [phone, onChangePhone] = React.useState("");
  const [birthday, onChangeBirthday] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [confirmPassword, onChangeConfirmPassword] = React.useState("");



  /*
   * 
   * 
   *  
   */



	return (
    // If the user clicks "Create Account", set userToken to a non-null value.
		<View style={styles.container}>

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


          {/* Fill out this questionnaire to make your profile (text) */}
            

          {/* Button for questionnaire (button) */}
            {/* push Questionnaire.js */}
            {/* toggle a state/context to confirm submission of questionnaire */}



          {/* Create account (button) */}
          <TouchableOpacity
					style={styles.createButton}
          // check if questionnaire has been completed and run setUserToken
          onPress={() => setUserToken('asdsf')}
				>
					<Text>Create Account</Text>
				</TouchableOpacity>

        </View>




		</View>
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
    margin: 12,
    marginBottom: 0,
  },

  input: {
    height: 40,
    width: 290,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },


  /* Button styles */

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