import React, { useState, useEffect } from 'react';
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
import Colors from "../constants/Colors";

// firebase imports
import { auth } from '../database/RTDB';

// database read/write/remove imports
import { getProfileName } from '../database/readData';
import { writeProfileName } from '../database/writeData';
import { uploadProfilePicture, uploadEditProfilePicture } from '../database/uploadStorage';
import { downloadProfilePicture, downloadEditProfilePicture } from '../database/downloadStorage';

import {
  isValidName,
  isValidEmail,
  isValidPhone,
  isValidBirthday,
  isValidPassword,
  isValidSecurity,
  isValidCheckbox
} from '../checkInputs';



/*
 * This is the default export for the EditProfile screen.
 */
export default ( {navigation} ) => {

  // hooks for editable fields
  const [name, onChangeName] = React.useState(null);
  const [nameChanged, setNameChanged] = React.useState(false); 
  const [editProfilePicture, setEditProfilePicture] = React.useState(null);


  /*
   * This function is used to choose an image from the camera roll
   * for the profile picture.
   */
  const openProfilePicImagePickerAsync = async () => {
    // get permission from user to access camera roll
    let libraryPermissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if they decline permission
    if (libraryPermissionResult.granted == false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    // let user select image from their camera roll
    let picked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });
    // if they cancelled the selection
    if (picked.cancelled == true) {
      return;
    }

    // set the selected image
    setEditProfilePicture(picked.uri);
    uploadEditProfilePicture(auth.currentUser.email, picked.uri);
  } // openProfilePicImagePickerAsync()




  /*
   * This function is called when the text in the name 
   * input is changed. It changes the value of the name hook
   * and also changed the boolean that tells us if the user has
   * changed the value.
   */
  const nameInputHandler = (input) => {
    onChangeName(input);
    setNameChanged(true);
  } // setNameChanged



  /*
   * This function is called when the user clicks "Save".
   * It updates all of the profile data in the database.
   */
  const updateProfileData = () => {
    // if we changed the profile picture, then upload it
    if (editProfilePicture) {
      uploadProfilePicture(auth.currentUser.email, editProfilePicture);
    }

    // if the name is not null, then update it
    if (name) {
      // update the name
      writeProfileName(auth.currentUser.email, name);
    }
  } // updateProfileData()




  /*
   * Validates that none of the inputs are invalid.
   */
  const validateInputs = () => {
    // Check if the name field is valid
    if (nameChanged != false) {
      if (!isValidName(name)) {return}
    } // if it hasn't been changed then we save it as is
   
    // update the information and navigate to Profile
    updateProfileData();
    navigation.pop();
  } // validateInputs()




  

	return (
		<ScrollView style={styles.container}>
      <View style={styles.form}>

        {/* Profile Picture Image */}
        <SafeAreaView>
            <Image source={{uri: downloadEditProfilePicture(auth.currentUser.email)}}
              style={styles.profilePicture}
            />
          <TouchableOpacity
            onPress={
              openProfilePicImagePickerAsync
            }
            style={styles.buttonChangePicture}>
            <Text style={styles.textChangePicture}>Change Picture</Text>
          </TouchableOpacity>
        </SafeAreaView>


        {/* Name (text), name (field) */}
        <Text style={styles.label}>Name</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={nameInputHandler}
            defaultValue={getProfileName(auth.currentUser.email)}
            placeholder={"Name"}
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
          onPress={ validateInputs }
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