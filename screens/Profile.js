import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
 import {
// 	Avatar,
 	Title,
// 	Caption,
// 	Text,
// 	TouchableRipple
 } from 'react-native-paper';


/*
 * This is the screen where the user can view their profile.
 */
export default ( {navigation} ) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
					style={styles.editProfile}
					onPress={() => navigation.push("EditProfile")}				
			>
				<Text style={styles.textEditProfile}>Edit Profile</Text>
			</TouchableOpacity>
			<View style={styles.imageWrapper}>
				<Image source={ require("../images/default-profile-picture.jpeg") } style={styles.profilePic} />
			</View>
			<View style={styles.infoWrapper}>
				<Text style={styles.information}>Name: John Doe</Text>
				<Text style={styles.information}>Email: johnDoe@purdue.edu</Text>
			</View>
		</View>
		// <View style={styles.container}>

		// 	<View style={styles.container}>
		// 		
				
		// 		options={{ }}/>

		// 		<Text>Name: </Text>
		// 		<Text styles={styles.name}>John Doe</Text>
		// 	</View>
		// </View>
	);
}




// styles
const styles = StyleSheet.create({

container: {
	backgroundColor: '#fff',
},

editProfile: {
	alignSelf: 'flex-end',
},

textEditProfile: {
	margin: 20,
	fontSize: 18,
	color: '#66a3ff',
},

imageWrapper: {
	marginBottom: 20,
},

profilePic: {
	width: 300,
	height: 300,
	borderRadius: 200, // makes image circular
	alignSelf: 'center',
},

infoWrapper: {
	textAlign: 'left',
	alignSelf: 'flex-start',
	marginLeft: 15,
},

information: {
	margin: 20,
	fontSize: 20,
},


});