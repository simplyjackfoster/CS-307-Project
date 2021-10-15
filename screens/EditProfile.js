import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import Colors from "../constants/Colors";
// START OF DATABASE STUFF
// WILL NEED TO BE UNIVERSALLY ACCESSABLE FROM App.js


// Firebase Integration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase, ref, set, onValue, exists, val, child, get, remove} from "firebase/database"
import { StackActions } from '@react-navigation/routers';
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
  set(ref(rtdb, "users/" + "Dummy Name"), {
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


/*
 * This is the screen where the user can edit their profile.
 */
export default ( {navigation} ) => {

  // The variable for profile picture
  const [profilePicture, setProfilePicture] = React.useState(null);

  // hooks for editable fields
  const [name, onChangeName] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);

  const openImagePickerAsync = async () => {
    // get permission from user to access camera roll
    let libraryPermissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if they decline permission
    if (libraryPermissionResult.granted == false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    // let user select image from their camera roll
    let picked = await ImagePicker.launchImageLibraryAsync();
    // if they cancelled the selection
    if (picked.cancelled == true) {
      return;
    }
    // set the selected image
    setProfilePicture({ localUri: picked.uri });
  } // openImagePickerAsync()





	return (
		<ScrollView style={styles.container}>
      <View style={styles.form}>
        {/* Profile Picture Image */}
        <SafeAreaView>
          <Image source={
            profilePicture ? (
              { uri: profilePicture.localUri }
            ) : (
              require("../images/default-profile-picture.jpeg")
            )}
            style={styles.profilePicture}>
          </Image>

          <TouchableOpacity onPress={openImagePickerAsync} style={styles.buttonChangePicture}>
            <Text style={styles.textChangePicture}>Change Picture</Text>
          </TouchableOpacity>
        </SafeAreaView>
        {/* Name (text), name (field) */}
        <Text style={styles.label}>Name</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            placeholder={GetName()}
          />
        </SafeAreaView>

        {/* Email (text), email (field) */}
        <Text style={styles.label}>Purdue Email</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            placeholder={GetEmail()}
          />
        </SafeAreaView>

        {/* Continue to Questionnaire (button) */}
        <TouchableOpacity
          style={styles.questionnaireButton}
          // check if questionnaire has been completed and run setUserToken
          onPress={() => {
            navigation.push("Questionnaire");
          }}
        >
          <Text>Edit Questionnaire</Text>
        </TouchableOpacity>


        {/* Save Button */}
        <TouchableOpacity
          style={styles.buttonSave}
          // check if questionnaire has been completed and run setUserToken
          onPress={() => {
            //EDIT USER DB ENTRY
            writeUserData(name, email);
            navigation.navigate('Profile', {name: name, email: email})
          }}
        >
          <Text style={styles.textSave}>Save</Text>
        </TouchableOpacity>

      </View>
		</ScrollView>
	); // return()

} // export default ()




// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  profilePicture: {
    position: 'absolute',
    alignSelf: 'center',
    top: 25,
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 200, // makes image circular
  },

  buttonChangePicture: {
    position: 'absolute',
    alignSelf: 'center',
    top: 165,
    padding: 5,
  }, 

  textChangePicture: {
    margin: 20,
    fontSize: 18,
    color: Colors.lightBlue,
  },

  /* Form styles */

  form: {
    margin: 20,
    textAlign: 'left',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  label: {
    fontSize: 20,
    margin: 10,
    marginLeft: 15,
    marginBottom: 0,
    marginTop: 10,
    textAlign: 'left',
    flexDirection: 'row',
    top: 225,
  },

  input: {
    height: 40,
    width: 290,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    top: 225,
  },

  questionnaireButton: {
    position: 'absolute',
    top: 550,
    backgroundColor: '#66a3dd',
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    padding: 5,
    width: 135,
    alignSelf: 'center',
  },

  buttonSave: {
    position: 'absolute',
    top: 600, 
    alignSelf: 'center',
  },

  textSave: {
    margin: 20,
    fontSize: 18,
    color: Colors.lightBlue,
  }

});