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
import { Divider } from 'react-native-elements';

// firebase imports
import { auth } from '../database/RTDB';

// database read/write/remove imports
import { getID } from '../database/ID';
import { getDataFromPath } from '../database/readData';
import { writeProfileName } from '../database/writeData';
import { uploadProfilePicture } from '../database/uploadStorage';
import { writeProfileInstagramLink } from '../database/writeData';

import {
  isValidName,
  isValidInstagram,
  isValidEmail,
  isValidPhone,
  isValidBirthday,
  isValidPassword,
  isValidSecurity,
  isValidCheckbox
} from '../checkInputs';
import { set } from 'react-native-reanimated';



/*
 * This is the default export for the EditProfile screen.
 */
export default ( {navigation} ) => {

  // hooks for editable fields
  const [name, onChangeName] = React.useState(null);
  const [nameChanged, setNameChanged] = React.useState(false); 
  const [editProfilePicture, setEditProfilePicture] = React.useState(null);
  const [instagramLink, onChangeInstagramLink] = React.useState(null);
  const [instagramLinkChange, setInstagramLinkChange] = React.useState(false);


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

  const instagramLinkInputHandler = (input) => {
    onChangeInstagramLink(input);
    setInstagramLinkChange(true);
  }



  /*
   * This function is called when the user clicks "Save".
   * It updates all of the profile data in the database.
   */
  const updateProfileData = () => {
    // if we changed the profile picture, then upload it
    if (editProfilePicture) {
      console.log("SAVING: " + editProfilePicture);
      console.log("SAVING: " + editProfilePicture);
      uploadProfilePicture(auth.currentUser.email, editProfilePicture);
    }
    else {
      console.log("Profile picture was not changed");
    }

    // if the name is not null, then update it
    if (name) {
      // update the name
      writeProfileName(auth.currentUser.email, name);
    }

    if(instagramLink) {
      writeProfileInstagramLink(auth.currentUser.email, instagramLink);
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

    if(instagramLinkChange != false) {
      if(!isValidInstagram(instagramLink)) {return}
    }
   
    // update the information and navigate to Profile
    updateProfileData();
    navigation.pop();
  } // validateInputs()

	return (
		<ScrollView style={styles.container}>
      <View style={styles.form}>

        {/* Profile Picture Image */}
        <SafeAreaView>

            {/* Image displayed when we haven't changed the profile picture */}
            <Image 
              source={{uri: getDataFromPath("users/" + getID(auth.currentUser.email) +
                            "/Profile/Images/profile_picture")}}
              style={editProfilePicture ? (
                {display: 'none'} 
              ) : (
                styles.profilePicture
              )}
            />

            {/* Image displayed when we changed the profile picture */}
            <Image 
              source={{uri: editProfilePicture}}
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


        {/* Divider used between profile picture and text fields */}
        <Divider orientation="horizontal" height={20}/>


        {/* Name (text), name (field) */}
        <Text style={styles.label}>Name</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
						autoComplete='off'
						autoCorrect={false}
						spellCheck={false}
            onChangeText={nameInputHandler}
            defaultValue={getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/profile_name")}
            placeholder={"Name"}
          />
        </SafeAreaView>

        <Text style={styles.label}>Instagram Link</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
						autoComplete='off'
						autoCorrect={false}
						spellCheck={false}
            onChangeText={instagramLinkInputHandler}
            defaultValue={getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/instagram_link")}
            placeholder={"Profile Name"}
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
          <Text style={styles.questionnaireText}>Edit Questionnaire</Text>
        </TouchableOpacity>


        {/* Save Button */}
        <TouchableOpacity
          style={styles.buttonSave}
          // check if questionnaire has been completed and run setUserToken
          onPress={ validateInputs }
        >
          <Text style={styles.textSave}>Save Changes</Text>
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
    paddingBottom: 150,
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

  /* Questionnaire Button */
  questionnaireText: {
    fontSize: 16,
    alignSelf: 'center',
  },

  questionnaireButton: {
    flex: 1,
    top: 275,
    backgroundColor: Colors.lightBlue,
    borderWidth: 1,
    borderRadius: 25,
    margin: 10,
    padding: 10,
    width: 175,
    alignSelf: 'center',
  },

  /* Save Button */
   textSave: {
    fontSize: 16,
    alignSelf: 'center',
  },

  buttonSave: {
    flex: 1,
    top: 275,
    backgroundColor: Colors.offWhite,
    borderWidth: 1,
    borderRadius: 25,
    margin: 10,
    padding: 10,
    width: 175,
    alignSelf: 'center',
  },

 

});