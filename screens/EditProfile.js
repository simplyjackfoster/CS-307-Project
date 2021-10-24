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
import { uploadProfilePicture } from '../database/uploadStorage';
import {
  writeProfileName,
  writeBio,
  writeYearInSchool
} from '../database/writeData';

import {
  isValidName,
  isValidEmail,
  isValidPhone,
  isValidBirthday,
  isValidPassword,
  isValidSecurity,
  isValidCheckbox,
  isValidYearInSchool
} from '../checkInputs';
import { set } from 'react-native-reanimated';



/*
 * This is the default export for the EditProfile screen.
 */
export default ( {navigation} ) => {

  // hooks for editable fields
  const [editProfilePicture, setEditProfilePicture] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [nameChanged, setNameChanged] = React.useState(false);
  const [bio, setBio] = React.useState(null);
  const [bioChanged, setBioChanged] = React.useState(false);
  const [year, setYear] = React.useState(null);
  const [yearChanged, setYearChanged] = React.useState(false);


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
   * and also changes the boolean that tells us if the user has
   * changed the value.
   */
  const nameInputHandler = (input) => {
    setName(input);
    setNameChanged(true);
  } // setNameChanged


  /*
   * This function is called when the text in the bio 
   * input is changed. It changes the value of the bio hook
   * and also changes the boolean that tells us if the user has
   * changed the value.
   */
  const bioInputHandler = (input) => {
    setBio(input);
    setBioChanged(true);
  } // setBioChanged



  /*
   * This function is called when the text in the year 
   * input is changed. It changes the value of the bio hook
   * and also changes the boolean that tells us if the user has
   * changed the value.
   */
  const yearInputHandler = (input) => {
    setYear(input);
    setYearChanged(true);
  } // setNameChanged




  /*
   * This function is called when the user clicks "Save".
   * It updates all of the profile data in the database.
   */
  const updateProfileData = () => {
    // if we changed the profile picture, then upload it
    if (editProfilePicture) {
      console.log("Saving Image: " + editProfilePicture);
      uploadProfilePicture(auth.currentUser.email, editProfilePicture);
    }
    else {
      console.log("Profile picture was not changed");
    }

    // if the name is not null, then update it
    if (name) {
      writeProfileName(auth.currentUser.email, name);
    }

    // if the bio has been changed, then update it
    if (bioChanged) {
      writeBio(auth.currentUser.email, bio);
    }

    // if the year has changed, then update it
    if (yearChanged) {
      writeYearInSchool(auth.currentUser.email, year);
    }


  } // updateProfileData()




  /*
   * Validates that none of the inputs are invalid.
   * If the fields have been changed, then we do a check
   * to see if they are valid. If they havn't been changed then
   * we don't do a check.
   */
  const validateInputs = () => {
    // Check if the name field is valid
    if (nameChanged != false) {
      if (!isValidName(name)) {return}
    } 


    // Check if the year in school is valid
    if (yearChanged != false) {
      if (!isValidYearInSchool(year)) {return}
    }

    // Check if hometown is valid


    // Check if major is valid


    // update the information and navigate to Profile
    updateProfileData();
    navigation.pop();
  } // validateInputs()





	return (
    <View style={styles.container}>


      <ScrollView style={styles.scroll}>
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
              style={editProfilePicture ? (
                styles.profilePicture
              ) : (
                {display: 'none'}
              )}
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
        <Text style={styles.prompt}>Name</Text>
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


        {/* Bio (text), bio (field) */}
        <SafeAreaView>
          <Text style={styles.prompt}>Bio</Text>
          <TextInput
            style={styles.largeInput}
            autoCapitalize='none'
            autoComplete='off'
            autoCorrect={false}
            spellCheck={false}
            maxLength={250}
            multiline={true}
            onChangeText={bioInputHandler}
            defaultValue={getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/bio")}
            placeholder={"Enter a description of yourself"}
          />
        </SafeAreaView>


        {/* Graduation Year (text), Graduation Year (field) */}
        <SafeAreaView>
          <Text style={styles.prompt}>Graduation Year</Text>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            autoComplete='off'
            autoCorrect={false}
            spellCheck={false}
            onChangeText={yearInputHandler}
            defaultValue={getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/year_in_school")}
            placeholder={"yyyy"}
          />
        </SafeAreaView>




      </ScrollView>



      <View style={styles.footer}>
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


    </View>
	); // return()

} // export default ()






// styles
const styles = StyleSheet.create({

  /* Container Styles */
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },

  scroll: {
    flex: 1,
    padding: 30,
  },

  footer: {
    flex: 0.15,
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 5,
    paddingHorizontal: 150,
    paddingBottom: 25,
    backgroundColor: Colors.lightGray,
  },

  /* Profile Picture */
  profilePicture: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 200,
    resizeMode: 'cover',
  },

  buttonChangePicture: {
    alignSelf: 'center',
    padding: 5,
  },

  textChangePicture: {
    margin: 20,
    fontSize: 18,
    color: Colors.lightBlue,
  },

  /* Input Prompt */
  prompt: {
    flexDirection: 'row',
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    marginLeft: 15,
    marginBottom: 0,
    marginTop: 10,
  },

  /* Text Input */
  input: {
    textAlign: 'left',
    height: 40,
    width: 290,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },

  /* Large Text Input */
  largeInput: {
    textAlign: 'left',
    textAlign: 'auto',
    height: 140,
    width: 290,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10, 
  },


  /* Questionnaire Button */
  questionnaireText: {
    fontSize: 16,
    alignSelf: 'center',
  },

  questionnaireButton: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 25,
    margin: 5,
    padding: 10,
    width: 175,
    backgroundColor: Colors.offWhite,
  },

  /* Save Button */
   textSave: {
    fontSize: 16,
    alignSelf: 'center',
  },

  buttonSave: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 25,
    margin: 5,
    padding: 10,
    width: 175,
    backgroundColor: Colors.offWhite,
  },


});