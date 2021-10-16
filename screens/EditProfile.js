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

// firebase imports
import { auth, rtdb } from '../database/RTDB';
import { deleteUser } from 'firebase/auth';
import { remove } from 'firebase/database';

// database read/write/remove imports
import { getProfileName } from '../database/readData';
import { writeProfileName } from '../database/writeData';


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
            placeholder={getProfileName(auth.currentUser.email)}
          />
        </SafeAreaView>

        {/* Email (text), email (field) */}
        <Text style={styles.label}>Purdue Email</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            placeholder={auth.currentUser.email}
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
            // EDIT USER DB ENTRY...
            // To do this write functions in writeData.js and import them here
            writeProfileName(auth.currentUser.email, name);
            //navigation.navigate('Profile', {name: name, email: email})
            navigation.pop();
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