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
  KeyboardAvoidingView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import Colors from "../constants/Colors";
import { Divider } from 'react-native-elements';

// firebase imports
import { auth, rtdb } from '../database/RTDB';
import { ref, child, get } from 'firebase/database';

// database read/write/remove imports
import { getID } from '../database/ID';
import { getDataFromPath } from '../database/readData';
import { uploadProfilePicture } from '../database/uploadStorage';
import {
  writeProfileName,
  writeBio,
  writeGraduationYear,
  writeGender,
  writeVaccinated
} from '../database/writeData';

import {
  isValidName,
  isValidEmail,
  isValidPhone,
  isValidBirthday,
  isValidPassword,
  isValidSecurity,
  isValidCheckbox,
  isValidGraduationYear
} from '../checkInputs';
import { set } from 'react-native-reanimated';


// used so that the hooks don't get set rapidly in edit questionnaire
var updatedTheSelected = false;



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

  const [gender, setGender] = React.useState(1);
  const [vaccinated, setVaccinated] = React.useState(1);


  // function for setting the selection boxes to the correct value
  const setSelection = () => {
    const dbRef = ref(rtdb);

    // set the gender to the correct value
    get(child(dbRef, "users/" + getID(auth.currentUser.email) +
              "/Profile/gender")).then((snapshot) => {
      if (snapshot.exists()) {
        const data_val = snapshot.val();
        if (data_val == "Male") {
          setGender(1);
        }
        else if (data_val == "Female") {
          setGender(2);
        }
        else if (data_val == "Other") {
          setGender(3);
        }
        else {
          setGender(4);
        }
      }
    }).catch((error) => {
      console.error(error);
    });

    // set vaccination status to the correct value
    get(child(dbRef, "users/" + getID(auth.currentUser.email) +
              "/Profile/covid_vaccination_status")).then((snapshot) => {
      if (snapshot.exists()) {
        const data_val = snapshot.val();
        if (data_val == "Not Vaccinated") {
          setVaccinated(1);
        }
        else {
          setVaccinated(2);
        }
      }
    }).catch((error) => {
      console.error(error);
    });

  } // setSelection()


  // update the initial values of the selection boxes
  if (updatedTheSelected == false) {
    setSelection();
    updatedTheSelected = true;
  }


  /*
   * Effect that resets the value of updatedTheSelected to false, so that when
   * we open the edit profile screen again, the selections will update.
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      updatedTheSelected = false;
    });
    return unsubscribe;
  }, [navigation]);



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
      writeGraduationYear(auth.currentUser.email, year);
    }

    // write the gender and vaccination status data
    writeGender(auth.currentUser.email, gender);
    writeVaccinated(auth.currentUser.email, vaccinated);


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
      if (!isValidGraduationYear(year)) {return}
    }

    // Check if hometown is valid


    // Check if major is valid


    // update the information and navigate to Profile
    updateProfileData();
    navigation.pop();
  } // validateInputs()





	return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
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
              defaultValue={getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/graduation_year")}
              placeholder={"yyyy"}
            />
          </SafeAreaView>


          {/* Gender (text), Gender (field) */}
          <Text style={styles.prompt}>Gender</Text>
          <Picker
            style={styles.picker}
            selectedValue={
              gender
            }
            onValueChange={(itemValue, itemIndex) =>
              setGender(itemValue)
            }
          >
            <Picker.Item label="Male" value={1} />
            <Picker.Item label="Female" value={2} />
            <Picker.Item label="Other" value={3} />
            <Picker.Item label="Prefer not to say" value={4} />
          </Picker>

          
          {/* Vaccination status (text), vaccination status (field) */}
          <Text style={styles.prompt}>Vaccination Status</Text>
          <Picker
            style={styles.picker}
            selectedValue={
              vaccinated
            }
            onValueChange={(itemValue, itemIndex) =>
              setVaccinated(itemValue)
            }
          >
            <Picker.Item label="Not Vaccinated" value={1} />
            <Picker.Item label="Vaccinated" value={2} />
          </Picker>





          {/* Divider used for spacing between the last item in scroll and the footer */}
          <Divider color={Colors.white} height={80}></Divider>

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
    </KeyboardAvoidingView>
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
    marginBottom: 20,
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
    marginBottom: 30,
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