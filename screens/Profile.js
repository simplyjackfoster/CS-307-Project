import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../constants/Colors";



/*
 * This is the screen where the user can view their profile.
 */
export default ( {navigation} ) => {
	return (
		<ScrollView style={styles.container}>
			<TouchableOpacity
					style={styles.editProfile}
					onPress={() => navigation.push("EditProfile")}				
			>
				<Text style={styles.textEditProfile}>Edit Profile...</Text>
			</TouchableOpacity>
			<View style={styles.imageWrapper}>
				<Image source={ require("../images/default-profile-picture.jpeg") } style={styles.profilePic} />
				<Text style={styles.imageName}> John Doe</Text>
			</View>

			<View style={{marginTop: 40}}/>

			<View style={styles.infoWrapper}>
				<Icon name="envelope" size={25} color={'#2b31d4'} style={styles.icon}/>
				<Text style={styles.infoHeader}>Email:</Text>
				<Text style={styles.infoContent}>johnDoe@purdue.edu</Text>
			</View>
			<View style={styles.infoWrapper}>
				<Icon name="phone-square" size={25} color={'#2b31d4'} style={styles.icon}/>
				<Text style={styles.infoHeader}>Phone:</Text>
				<Text style={styles.infoContent}>123-456-7890</Text>
			</View>
		</ScrollView>
	);
}




// styles
const styles = StyleSheet.create({

container: {
	backgroundColor: Colors.white,
},

editProfile: {
	alignSelf: 'flex-end',
},

textEditProfile: {
	margin: 20,
	fontSize: 18,
	color: Colors.lightBlue,
},

imageWrapper: {
},

imageName: {
	textAlign: 'center',
	fontSize: 25,
	fontWeight: 'bold',
},

profilePic: {
	width: 300,
	height: 300,
	borderRadius: 200, // makes image circular
	alignSelf: 'center',
},

infoWrapper: {
	textAlign: 'left',
	flexDirection: 'row',
	marginLeft: 25,
	marginBottom: 25,
},

icon: {
},

infoHeader: {
	fontSize: 20,
	marginLeft: 8,
	marginRight: 8,
	fontWeight: 'bold',
},

infoContent: {
	alignSelf: 'flex-start',
	fontSize: 20,
}


});