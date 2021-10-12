import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';

import Colors from "../constants/Colors";


/*
 * This is the screen where the user can edit their profile.
 */
export default ( {navigation} ) => {
	return (
		<View style={styles.container}>
			<Text>This is the Edit Profile Screen</Text>

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
	);
}




// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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