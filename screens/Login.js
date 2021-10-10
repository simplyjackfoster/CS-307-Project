import React, {Component} from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	Button,
	Image,
	TextInput,
	SafeAreaView,
} from 'react-native';

import { AuthContext } from "../context";
import Colors from "../constants/Colors";
import { render } from 'react-dom';
import ResetPassword from './ResetPassword';



/*
 * This is the screen where the user can enter their login credentials
 * to log in, or they can click the sign up button to be brought
 * to the sign up screen. 
 */
export default ({ navigation }) => {

	const { userToken, setUserToken } = React.useContext(AuthContext);

	/* Functions to handle text input changes */
	const [email, onChangeEmail] = React.useState("email");
	const [password, onChangePassword] = React.useState("password");

	return (
		// If the user clicks "Log In", then set userToken to a non-null value.
		<View style={styles.container}>

			{/* UniRoom logo */}
			<Image
				style={styles.logo}
				source={require('../images/logo.png')}
			/>

			{/* Log In (text) */}
			<Text style={styles.login}>Log In</Text>
			
			{/* Email (text), email (field) */}
			<Text style={styles.email}>Email</Text>
			<SafeAreaView>
				<TextInput
				style={styles.emailInput}
				onChangeText={onChangeEmail}
				placeholder={email}
				/>
			</SafeAreaView>


			
			{/* Password (text), password (field, with black dots) */}
			<Text style={styles.password}>Password</Text>
			<SafeAreaView>
				<TextInput
				style={styles.passwordInput}
				onChangeText={onChangePassword}
				placeholder={password}
				/>
			</SafeAreaView>

			
			{/* Log In (button) */}
			<Button title="Log In" onPress={() => setUserToken('asdf')}></Button>

			{/* New to UniRoom? (text), Sign Up (button) */}
			<Text>New to UniRoom?</Text>
			<Button title="Sign Up" onPress={() => navigation.push("Signup")}></Button>

			{/* Forgot password button */}
			<Button title="Forgot password?" onPress={() => navigation.push("ResetPassword")}></Button>



		</View>
	);


}



// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  logo: {
	height: 250,
	width: 350,
	margin: 25,
	borderRadius: 50,
  },

  login: {
	fontSize: 35,
	textAlign: 'left',
	
  },

  email: {
	fontSize: 20,
  },

  emailInput: {
	height: 40,
	width: 200,
	margin: 10,
	padding: 10,
	borderWidth: 1,
	borderRadius: 10,
  },

  password: {
	fontSize: 20,
  },

  passwordInput: {
	height: 40,
	width: 200,
	margin: 10,
	padding: 10,
	borderWidth: 1,
	borderRadius: 10,
  },


});