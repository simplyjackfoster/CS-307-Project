import React, {Component} from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	ScrollView,
	Button,
	Image,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
	Alert,
	KeyboardAvoidingView
} from 'react-native';

import { AuthContext } from "../context";
import Colors from "../constants/Colors";
import { render } from 'react-dom';

import { auth } from '../database/RTDB';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Title } from 'react-native-paper';


/*
 * This is the screen where the user can enter their login credentials
 * to log in, or they can click the sign up button to be brought
 * to the sign up screen. 
 */
export default ({ navigation }) => {

	const { userToken, setUserToken } = React.useContext(AuthContext);

	/* Functions to handle text input changes */
	const [email, onChangeEmail] = React.useState(null);
	const [password, onChangePassword] = React.useState(null);


	/* 	
	 * attemptLogin()
	 * function that attempts to login, it will check if the inputs have been filled out
	 * and make an alert if they haven't, will also do authenticaton(not implemented) 
	 */
	const attemptLogin = () => {
		// log inputs for testing
		// console.log("\nEmail: " + email);
		// console.log("Password: " + password);

		if (!email || !password) {
			// at least one of the fields has not been filled out
			// alert user to fill out both fields and return
			Alert.alert("Error", "Please enter your email and password before logging in.", 
			[{ text: "Ok" }]);

			console.log("Please fill out all fields!");
		}
		else {
			// fields were both filled out
			// call a function to check if the mail and password combination is valid
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential, success) => {
					const user = userCredential.user;
					setUserToken('Arbitrary text');
					console.log("Successful Login!");
				})
				.catch((error) => {
					console.log("Error Code: " + error.code);
					console.log("Error Message: " + error.message);
					Alert.alert("Error", "Incorrect email or password, please try again.", 
						[{ text: "Ok" }]);

					console.log("Failed Login!");
				})
		}
	} // attemptLogin()



	return (
		<KeyboardAvoidingView style={{flex: 1}} behavior={"padding"} keyboardVerticalOffset={90}>
			<ScrollView style={styles.container}>

				{/* UniRoom logo */}
				<Image
					style={styles.logo}
					source={require('../images/logo.png')}
				/>

				<View style={styles.form}>
					
					{/* Email (text), email (field) */}
					<Text style={styles.label}>Email</Text>
					<SafeAreaView>
						<TextInput
							style={styles.input}
							autoCapitalize='none'
							autoComplete='off'
							autoCorrect={false}
							spellCheck={false}
							onChangeText={onChangeEmail}
							placeholder={email}
						/>
					</SafeAreaView>

					
					{/* Password (text), password (field, with black dots) */}
					<Text style={styles.label}>Password</Text>
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

					
					{/* Log In (button) */}
					<TouchableOpacity
						style={styles.loginButton}
						onPress={() => attemptLogin()} 
					>
						<Text style={styles.loginText}>Log In</Text>
					</TouchableOpacity>


					{/* New to UniRoom? (text), Sign Up (button) */}
					<Text style={styles.signupPrompt}>New to UniRoom?</Text>
					<TouchableOpacity
						style={styles.signupButton}
						onPress={() => navigation.push("Signup")}			
					>
						<Text style={styles.signupText}>Sign Up</Text>
					</TouchableOpacity>


					{/* Forgot password button */}
					<TouchableOpacity
						style={styles.forgotButton}
						onPress={() => navigation.push("ResetPassword")}				
					>
						<Text style={styles.forgotText}>Forgot Password?</Text>
					</TouchableOpacity>

				</View>

			</ScrollView>
		</KeyboardAvoidingView>
	);

} // export default ()



// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  logo: {
	height: 250,
	width: 350,
	margin: 20,
	borderRadius: 50,
	alignSelf: 'center',
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

	/* Login Button */

  loginText: {
		fontSize: 18,
		textAlign: 'center',
  },

  loginButton: {
		backgroundColor: Colors.lightBlue,
		borderWidth: 1,
		borderRadius: 25,
		margin: 10,
		padding: 7,
		width: 105,
		alignSelf: 'flex-end',
		textAlign: 'center',
  },

	/* Signup Button */

	signupText: {
		fontSize: 18,
		textAlign: 'center',
	},

  signupButton: {
		backgroundColor: Colors.offWhite,
		borderWidth: 1,
		borderRadius: 25,
		margin: 10,
		padding: 7,
		width: 105,
		alignSelf: 'flex-end',
		textAlign: 'center',
  },

	/* "New to UniRoom?" Prompt */

  signupPrompt: {
		fontSize: 18,
		marginLeft: 12,
  },

	/* Forgot Password Button */

  forgotText: {
		fontSize: 18, 
		color: Colors.lightBlue,
		textDecorationLine: 'underline',
  },

  forgotButton: {
		margin: 12,
		alignSelf: 'flex-start',
  },


});