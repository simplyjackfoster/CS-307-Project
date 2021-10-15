import React from 'react';
import { TouchableOpacity, TextInput, StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';

import Colors from "../constants/Colors";

/*
 * This is the screen where the user resets their password.
 */

export default ( {navigation} ) => {
const [email, onChangeEmail] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.email}>Enter your email address</Text>
        <SafeAreaView>
					<TextInput
				  	style={styles.emailInput}
				  	onChangeText={onChangeEmail}
				  	placeholder={email}
					/>
          <TouchableOpacity
					    style={styles.enterButton}
              onPress={() => {
                console.log("reseting with " + email)
                Alert.alert("Notice", 
                "An email has been sent to your email address. Please follow the contained instructions to reset your password.",
                [
                  {
                    text: "Ok",
                    onPress: () => { 
                      //handleEmail
                      navigation.pop()}
                  }
                ]
                );}}
				  >
					<Text>Enter</Text>
				</TouchableOpacity>
          </SafeAreaView>
      </View>
		</View>
	);
}

// styles
const styles = StyleSheet.create({

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

  enterButton: {
	backgroundColor: '#66a3dd',
	borderWidth: 2,
	borderRadius: 5,
	margin: 10,
	padding: 5,
	width: 60,
	alignSelf: 'flex-end',
  },

});