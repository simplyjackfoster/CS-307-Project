import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../constants/Colors";
import { useState } from 'react';
import { NavigationAction } from '@react-navigation/routers';


// START OF DATABASE STUFF
// WILL NEED TO BE UNIVERSALLY ACCESSABLE FROM App.js


// Firebase Integration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase, ref, set, onValue, exists, val, child, get, remove} from "firebase/database"
//import { navigate } from '@react-navigation/routers/lib/typescript/src/CommonActions';
//import {getFirestore, collection, getDocs, setDoc, docRef} from 'firebase/firestore/lite';
//import {doc} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVc6_sT83QWcX-TCxDEDtVMHsMRaTy2yY",
  authDomain: "uniroom-fdcd7.firebaseapp.com",
  databaseURL: "https://uniroom-fdcd7-default-rtdb.firebaseio.com",
  projectId: "uniroom-fdcd7",
  storageBucket: "uniroom-fdcd7.appspot.com",
  messagingSenderId: "644435940478",
  appId: "1:644435940478:web:40e3f7aea01972606bb42f",
  measurementId: "G-KQK1K10WTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);

// write to rtdb
function writeUserData(name, email) {
  set(ref(rtdb, "users/" + name), {
    name: name,
    email: email
  });
} // writeUserData()



// read from rtdb
function readUserData(user_name) {
  const dbRef = ref(rtdb);
  
  // (react hook)
  const [name, setName] = useState(null);

  // get the data
  get(child(dbRef, "users/" + user_name + "/name")).then((snapshot) => {
    if (snapshot.exists()) {
      const person = snapshot.val();
      setName(person);
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  return name;
} // readUserData()

// read from rtdb
function readUserEmail(user_name) {
	const dbRef = ref(rtdb);
	
	// (react hook)
	const [email, setEmail] = useState(null);
  
	// get the data
	get(child(dbRef, "users/" + user_name + "/email")).then((snapshot) => {
	  if (snapshot.exists()) {
		const person = snapshot.val();
		setEmail(person);
	  } else {
		console.log("No data available");
	  }
	}).catch((error) => {
	  console.error(error);
	});
  
	return email;
  } // readUserData()


// remove from rtdb
function removeUser(user_name) {
  remove(ref(rtdb, "users/" + user_name));
} // removeUser()

const GetName = () => {
  //writeUserData("Max Finder", "mfinder@purdue.edu");
  const dummy = readUserData("Dummy Name");
  //removeUser("Max Finder");
  return (
    dummy
  );
}
const GetEmail = () => {
	const dummyEmail = readUserEmail("Dummy Name");
	return (
	  dummyEmail
	);
}


// END OF DATABASE STUFF


console.log("Profile");

/*
 * This is the screen where the user can view their profile.
 */
export default ( {navigation} ) => {
	return (
		<ScrollView style={styles.container}>
			<TouchableOpacity
					style={styles.editProfile}
					onPress={() => navigation.push("EditProfile")}	
					//onPress={() => navigation.navigate("EditProfile")}			
			>
				<Text style={styles.textEditProfile}>Edit Profile...</Text>
			</TouchableOpacity>
			<View style={styles.imageWrapper}>
				<Image source={ require("../images/default-profile-picture.jpeg") } style={styles.profilePic} />
				<Text style={styles.imageName}><GetName /></Text>
			</View>

			<View style={{marginTop: 40}}/>

			<View style={styles.infoWrapper}>
				<Icon name="envelope" size={25} color={'#2b31d4'} style={styles.icon}/>
				<Text style={styles.infoHeader}>Email:</Text>
				<Text style={styles.infoContent}><GetEmail /></Text>
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