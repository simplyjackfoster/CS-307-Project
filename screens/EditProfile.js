import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import Colors from "../constants/Colors";



/*
 * This is the screen where the user can edit their profile.
 */
export default ( {navigation} ) => {

  // The variable for profile picture
  const [profilePicture, setProfilePicture] = React.useState(null);


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
		<View style={styles.container}>

      {/* Profile Picture Image */}
      <Image source={
          profilePicture ? (
            {uri: profilePicture.localUri}
          ) : (
            require("../images/default-profile-picture.jpeg")
          )}
        style={styles.profilePicture}>
      </Image>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.buttonChangePicture}>
        <Text style={styles.textChangePicture}>Change Picture</Text>
      </TouchableOpacity>


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

      <Button title={"Save"} onPress={() => navigation.pop()}></Button>
		</View>
	); // return()

} // export default ()










// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profilePicture: {
    position: 'absolute',
    top: 25,
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 200, // makes image circular
  },

  buttonChangePicture: {
    position: 'absolute',
    top: 165,
  }, 

  textChangePicture: {
    margin: 20,
    fontSize: 18,
    color: Colors.lightBlue,
  },

  questionnaireButton: {
    backgroundColor: '#66a3dd',
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    padding: 5,
    width: 135,
    alignSelf: 'center',
  },

});