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
  KeyboardAvoidingView,
  Alert,
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
  writeMajor,
  writeLocation,
  writeGender,
  writeVaccinated,
  writePreferredNumRoommates,
  writePreferredLivingLocation,
  writeInstagram,
  writeFacebook,
  writeLinkedIn,
  writeAgeMin,
  writeAgeMax,
} from '../database/writeData';

import {
  isValidName,
  isValidEmail,
  isValidPhone,
  isValidBirthday,
  isValidPassword,
  isValidSecurity,
  isValidCheckbox,
  isValidInstagram,
  isValidFacebook,
  isValidLinkedIn,
  isValidGraduationYear,
  isValidMajor,
  isValidNumberOfRoommates,
  isValidLivingLocation,
  isValidAgeMax,
  isValidAgeMin,
} from '../checkInputs';
import { set } from 'react-native-reanimated';
import Interests from './Interests';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardItem from '../components/CardItem';



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
  const [major, setMajor] = React.useState(null);
  const [majorChanged, setMajorChanged] = React.useState(false);
  const [location, setLocation] = React.useState(null);
  const [locationChanged, setLocationChanged] = React.useState(false);
  const [numRoommates, setNumRoommates] = React.useState(null);
  const [numRoommatesChanged, setNumRoommatesChanged] = React.useState(false);
  const [livingLocation, setLivingLocation] = React.useState(0);
  const [instagram, onChangeInstagram] = React.useState(null);
  const [instagramChanged, setInstagramChanged] = React.useState(false);
  const [facebook, onChangeFacebook] = React.useState(null);
  const [facebookChanged, setFacebookChanged] = React.useState(false);
  const [linkedIn, onChangeLinkedIn] = React.useState(null);
  const [linkedInChanged, setLinkedInChanged] = React.useState(false);
  const [gender, setGender] = React.useState(1);
  const [vaccinated, setVaccinated] = React.useState(1);

  const [min, setMin] = React.useState(false);
  const [max, setMax] = React.useState(false);
  const [fMin, setFMin] = React.useState(null);
  const [fMax, setFMax] = React.useState(null);
  const [ageMin, setAgeMin] = React.useState(null);
  const [ageMinChanged, setAgeMinChanged] = React.useState(false);
  const [ageMax, setAgeMax] = React.useState(null);
  const [ageMaxChanged, setAgeMaxChanged] = React.useState(false);


  // function for setting the selection boxes to the correct value
  const setSelection = () => {
    const dbRef = ref(rtdb);

    // set the living location to the correct value
    get(child(dbRef, "users/" + getID(auth.currentUser.email) +
              "/Profile/preferred_living_location")).then((snapshot) => {
      if (snapshot.exists()) {
        const data_val = snapshot.val();
        if (data_val == "No Preference") { setLivingLocation(0); }
        else if (data_val == "Earhart") { setLivingLocation(1); }
        else if (data_val == "Freida Parker Hall") { setLivingLocation(2); }
        else if (data_val == "Winifred Parker Hall") { setLivingLocation(3); }
        else if (data_val == "Harrison Hall") { setLivingLocation(4); }
        else if (data_val == "Hawkins Hall") { setLivingLocation(5); }
        else if (data_val == "Hillenbrand Hall") { setLivingLocation(6); }
        else if (data_val == "Honors College and Residences") { setLivingLocation(7); }
        else if (data_val == "Owen Hall") { setLivingLocation(8); }
        else if (data_val == "Shreve Hall") { setLivingLocation(9); }
        else if (data_val == "Meredith (female only)") { setLivingLocation(10); }
        else if (data_val == "Meredith South (female only)") { setLivingLocation(11); }
        else if (data_val == "Windsor (female only)") { setLivingLocation(12); }
        else if (data_val == "Cary Quad (male only)") { setLivingLocation(13); }
        else if (data_val == "McCutcheon (male only)") { setLivingLocation(14); }
        else if (data_val == "Tarkington (male only)") { setLivingLocation(15); }
        else if (data_val == "Wiley (male only)") { setLivingLocation(16); }
        else { setLivingLocation(0); }
      }
    }).catch((error) => {
      console.error(error);
    });


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




    get(child(dbRef, "users/" + getID(auth.currentUser.email) +
              "/Profile/age_min")).then((snapshot) => {
      if (snapshot.exists()) {
        const min = snapshot.val();
        setFMin(min);
        if(min == "") {
          setMin(false);
        }
        else {
          setMin(true);
        }
      }
    }).catch((error) => {
      console.error(error);
    });

    get(child(dbRef, "users/" + getID(auth.currentUser.email) +
              "/Profile/age_max")).then((snapshot) => {
      if (snapshot.exists()) {
        const max = snapshot.val();
        setFMax(max);

        if(max == "") {
          setMax(false);
        }
        else {
          setMax(true);
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
  } // nameInputHandler()



  
  /*
   * This function is called when the text in the bio 
   * input is changed. It changes the value of the bio hook
   * and also changes the boolean that tells us if the user has
   * changed the value.
   */
  const bioInputHandler = (input) => {
    setBio(input);
    setBioChanged(true);
  } // bioInputHandler()



  /*
   * This function is called when the text in the year 
   * input is changed. It changes the value of the bio hook
   * and also changes the boolean that tells us if the user has
   * changed the value.
   */
  const yearInputHandler = (input) => {
    setYear(input);
    setYearChanged(true);
  } // yearInputHandler()



  /*
   * This function is called when the major input is changed. It changes
   * the value of the major hook and also changes the boolean that tells
   * us if the user has changed the value.
   */
  const majorInputHandler = (input) => {
    setMajor(input);
    setMajorChanged(true);
  } // majorInputHandler()

  
  /*
   * This function is called when the ageMin input is changed. It changes
   * the value of the ageMin hook and also changes the boolean that tells
   * us if the user has changed the value.
   */
  const ageMinInputHandler = (input) => {
    setAgeMin(input);
    setAgeMinChanged(true);
    if(input == "") {
      setMin(false);
    }
    else {
      setMin(true);
    }
  }

  /*
   * This function is called when the ageMax input is changed. It changes
   * the value of the ageMax hook and also changes the boolean that tells
   * us if the user has changed the value.
   */
  const ageMaxInputHandler = (input) => {
    setAgeMax(input);
    setAgeMaxChanged(true);
    setMax(input);
    if(input == "") {
      setMax(false);
    }
    else {
      setMax(true);
    }
  }

  /*
    * This function is called when the location input is changed. It changes
    * the value of the location hook and also changes the boolean that tells
    * us if the user has changed the value.
    */
  const locationInputHandler = (input) => {
    setLocation(input);
    setLocationChanged(true);
  } // locationInputHandler()


  /*
    * This function is called when the preferred number of roommates input is changed. It 
    * changes the value of the numRoommates hook and also changes the boolean that tells
    * us if the user has changed the value.
    */
  const numRoommatesInputHandler = (input) => {
    setNumRoommates(input);
    setNumRoommatesChanged(true);
  } // numRoommatesInputHandler()



  /*
   * This function is called when the text in the instagram 
   * input is changed. It changes the value of the name hook
   * and also changes the boolean that tells us if the user has
   * changed the value.
   */
  const instagramInputHandler = (input) => {
    onChangeInstagram(input);
    setInstagramChanged(true);
  } // instagramInputHandler()


  /*
   * This function is called when the text in the facebook 
   * input is changed. It changes the value of the name hook
   * and also changes the boolean that tells us if the user has
   * changed the value.
   */
  const facebookInputHandler = (input) => {
    onChangeFacebook(input);
    setFacebookChanged(true);
  }

  /*
   * This function is called when the text in the linkedIn 
   * input is changed. It changes the value of the name hook
   * and also changes the boolean that tells us if the user has
   * changed the value.
   */
  const linkedInInputHandler = (input) => {
    onChangeLinkedIn(input);
    setLinkedInChanged(true);
  }

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

    // if the major has changed, then update it
    if (majorChanged) {
      writeMajor(auth.currentUser.email, major);
    }

    // if the location has changed, then update it
    if (locationChanged) {
      writeLocation(auth.currentUser.email, location);
    }

    // if the preferred # of roommates changed, then update it
    if (numRoommatesChanged) {
      writePreferredNumRoommates(auth.currentUser.email, numRoommates);
    }

    if (instagramChanged) {
      writeInstagram(auth.currentUser.email, instagram);
    }

    if (facebookChanged) {
      writeFacebook(auth.currentUser.email, facebook);
    }

    if (linkedInChanged) {
      writeLinkedIn(auth.currentUser.email, linkedIn);
    }

    if (ageMinChanged) {
      writeAgeMin(auth.currentUser.email, ageMin);
    }

    if (ageMaxChanged) {
      writeAgeMax(auth.currentUser.email, ageMax);
    }

    // write the gender and vaccination status data
    writeGender(auth.currentUser.email, gender);
    writePreferredLivingLocation(auth.currentUser.email, livingLocation);
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


    // Check if major is valid (same as checking name)
    if (majorChanged != false) {
      if (!isValidMajor(major)) {return}
    }

    // Check if instagram is valid 
    if (instagramChanged != false) {
      if(!isValidInstagram(instagram)) {return}
    }

    // Check if facebook is valid
    if(facebookChanged != false) {
      if(!isValidFacebook(facebook)) {return}
    }

    // Check if linkedIn is valid
    if(linkedIn != false) {
      if(!isValidLinkedIn(linkedIn)) {return}
    }

    // Check if the preferred # of roommates is valid
    if (numRoommatesChanged != false) {
      if (!isValidNumberOfRoommates(numRoommates)) {return}
    }

    // Check if the preferred living location is valid
    if (!isValidLivingLocation(livingLocation, gender)) {return}

    if(ageMinChanged != false) {
      if(!isValidAgeMin(ageMin)) {return}
    }

    if(ageMaxChanged != false) {
      if(!isValidAgeMax(ageMax)) {return}
    }

    // Very confusing and redundant logic to ensure entered age range min and max are acceptable values
    if(min && max) {
    let fMinInt = parseInt(fMin)
    let fMaxInt = parseInt(fMax)
      if(ageMin != null && ageMax != null) { // Both are not null, use their values to compare
        let ageMinInt = parseInt(ageMin)
        let ageMaxInt = parseInt(ageMax)

        if(ageMinInt == ageMaxInt) {
          Alert.alert("Error", "Age minimum range and age maximum range must not be the same number.", 
          [{ text: "Ok" }]);
          return;
        }
        else if(ageMinInt > ageMaxInt) {
          Alert.alert("Error", "Age minimum range must be less than age maximum range.", 
          [{ text: "Ok" }]);
          return;
        }
      }
      else if (ageMin != null) { // Min is null, use last max (fMax) to compare
        console.log("Age min is not null!")
        let ageMinInt = parseInt(ageMin)
        if(ageMinInt == fMaxInt) {
          Alert.alert("Error", "Age minimum range and age maximum range must not be the same number.", 
          [{ text: "Ok" }]);
          return;
        }
        else if(ageMinInt > fMaxInt) {
          Alert.alert("Error", "Age minimum range must be less than age maximum range.", 
          [{ text: "Ok" }]);
          return;
        }
      }
      else if(ageMax != null) { // Max is null, use last min (fMin) to compare
        console.log("Age max is not null!")
        let ageMaxInt = parseInt(ageMax)
        if(ageMaxInt == fMinInt) {
          Alert.alert("Error", "Age minimum range and age maximum range must not be the same number.", 
          [{ text: "Ok" }]);
          return;
        }
        else if(fMinInt > ageMaxInt) {
          Alert.alert("Error", "Age minimum range must be less than age maximum range.", 
          [{ text: "Ok" }]);
          return;
        }
      }
      else { // Max and min are null, use last min (fMin) and last max (fMax) to compare
        if(fMaxInt == fMinInt) {
          Alert.alert("Error", "Age minimum range and age maximum range must not be the same number.", 
          [{ text: "Ok" }]);
          return;
        }
        else if(fMinInt > fMaxInt) {
          Alert.alert("Error", "Age minimum range must be less than age maximum range.", 
          [{ text: "Ok" }]);
          return;
        }
      }
    }
    else if(min || max) {
      Alert.alert("Error", "If you are setting an age range minimum or maximum, you must set both.", 
			[{ text: "Ok" }]);
      return;
    }

    // update the information and navigate to Profile
    updateProfileData();
    navigation.pop();
  } // validateInputs()

  // View Profile Function
  const viewProfile = () => {
    navigation.push("viewProfile");
  } //viewProfile





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

          {/* Preview Profile Button*/}
          <SafeAreaView>
            <TouchableOpacity
              onPress={() => viewProfile()}
              style={styles.buttonChangePicture}>
              <Text style={styles.textChangePicture}>Preview Profile</Text>
            </TouchableOpacity>
          </SafeAreaView>
          

          {/* Name (text), name (field) */}
          <Text style={styles.prompt}>Name*</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              spellCheck={false}
              maxLength={50}
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


          {/* Edit Interests */}
          <SafeAreaView>
            <TouchableOpacity style={styles.interestsButton}
              onPress={() => navigation.push("Interests")}
            >
              <Text style={styles.interestsText}>Add Interests</Text>
              <Icon
                style={styles.interestsIcon}
                name={'caret-right'}
                size={20}
                color={Colors.black}
              />
            </TouchableOpacity>
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

          


         {/* Major (text), major (field) */}
         <SafeAreaView>
            <Text style={styles.prompt}>Major</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              spellCheck={false}
              maxLength={50}
              onChangeText={majorInputHandler}
              defaultValue={getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/major")}
              placeholder={"Enter your major"}
            />
          </SafeAreaView>

          {/* Age range minimum field */}
          <SafeAreaView>
            <Text style={styles.prompt}>Age Range Minimum</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              spellCheck={false}
              maxLength={3}
              onChangeText={ageMinInputHandler}
              defaultValue={getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/age_min")}
              placeholder={"18"}
            />
          </SafeAreaView>

          {/* Age range maximum field */}
          <SafeAreaView>
            <Text style={styles.prompt}>Age Range Maximum</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              spellCheck={false}
              maxLength={3}
              onChangeText={ageMaxInputHandler}
              defaultValue={getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/age_max")}
              placeholder={"100"}
            />
          </SafeAreaView>


          {/* Location (text), location (field) */}
          <SafeAreaView>
            <Text style={styles.prompt}>Location</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              spellCheck={false}
              maxLength={50}
              onChangeText={locationInputHandler}
              defaultValue={getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/location")}
              placeholder={"Where you are from"}
            />
          </SafeAreaView>



          {/* Preferred Number of Roommates */}
          <SafeAreaView>
            <Text style={styles.prompt}>Preferred # of Roommates</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              spellCheck={false}
              onChangeText={numRoommatesInputHandler}
              defaultValue={getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/preferred_number_of_roommates")}
              placeholder={"Number of people you want to live with"}
            />
          </SafeAreaView> 


          {/* Instagram Link (field) */}
          <Text style={styles.prompt}>Instagram</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              spellCheck={false}
              maxLength={32}
              onChangeText={instagramInputHandler}
              defaultValue={getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/instagram")}
              placeholder={"Instagram Username"}
            />
          </SafeAreaView>

          {/* Facebook Link (field) */}
          <Text style={styles.prompt}>Facebook</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              spellCheck={false}
              maxLength={50}
              onChangeText={facebookInputHandler}
              defaultValue={getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/facebook")}
              placeholder={"Facebook User ID"}
            />
          </SafeAreaView>

          {/* LinkedIn Link (field) */}
          <Text style={styles.prompt}>LinkedIn</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect={false}
              spellCheck={false}
              maxLength={70} // == first_name (20 chars) - (1 char) last_name (40 chars) - (1 char) 8_digit_code (8 char)
                             // Note the 8_digit_code is only for profiles with a name that already exists
              onChangeText={linkedInInputHandler}
              defaultValue={getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/linkedIn")}
              placeholder={"LinkedIn Profile"}
            />
          </SafeAreaView>


          {/* Preferred Housing (text), living locations (picker) */}
          <Text style={styles.prompt}>Preferred Housing</Text>
          <Picker
            style={styles.picker}
            selectedValue={
              livingLocation
            }
            onValueChange={(itemValue, itemIndex) =>
              setLivingLocation(itemValue)
            }
          >
            <Picker.Item label="No Preference" value={0} />
            <Picker.Item label="Earhart" value={1} />
            <Picker.Item label="Freida Parker Hall" value={2} />
            <Picker.Item label="Winifred Parker Hall" value={3} />
            <Picker.Item label="Harrison Hall" value={4} />
            <Picker.Item label="Hawkins Hall" value={5} />
            <Picker.Item label="Hillenbrand Hall" value={6} />
            <Picker.Item label="Honors College and Residences" value={7} />
            <Picker.Item label="Owen Hall" value={8} />
            <Picker.Item label="Shreve Hall" value={9} />
            <Picker.Item label="Meredith (female only)" value={10} />
            <Picker.Item label="Meredith South (female only)" value={11} />
            <Picker.Item label="Windsor (female only)" value={12} />
            <Picker.Item label="Cary Quad (male only)" value={13} />
            <Picker.Item label="McCutcheon (male only)" value={14} />
            <Picker.Item label="Tarkington (male only)" value={15} />
            <Picker.Item label="Wiley (male only)" value={16} />
          </Picker>


          {/* Vaccination status (text), vaccination status (field) */}
          <Text style={styles.prompt}>Vaccination Status*</Text>
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




          {/* Gender (text), Gender (field) */}
          <Text style={styles.prompt}>Gender*</Text>
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



          {/* Divider used for spacing between the last item in scroll and the footer */}
          <Divider color={Colors.white} height={15}></Divider>

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
    paddingHorizontal: 30,
    paddingTop: 30,
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
    width: "90%",
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
    width: "90%",
    margin: 10,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10, 
  },

  /* Picker */
  picker: {
    flex: 1,
    textAlign: 'left',
    width: '95%',
    marginBottom: 20,
  },


  /* Interests Button */
  interestsText: {
    flex: 1,
    fontSize: 20,
    alignSelf: 'auto',
  },

  interestsIcon: {
    flex: 1,
    textAlign: 'right',
    fontSize: 25,
    marginRight: '5%',
  },

  interestsButton: {
    flexDirection: 'row',
    textAlign: 'left',
    borderWidth: 1,
    borderRadius: 11,
    margin: 10,
    marginTop: 25,
    marginBottom: 40,
    padding: 10,
    width: '90%',
    backgroundColor: Colors.offWhite,
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