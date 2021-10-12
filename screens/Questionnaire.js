import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Colors from "../constants/Colors";
import { AuthContext } from "../context";

/*
 * This is the screen where the user fills out the questionnaire
 * about themselves.
 */
export default ( {navigation} ) => {

  const { userToken, setUserToken }  = React.useContext(AuthContext);

	return (
		<View style={styles.container}>
			<Text>This is the Questionnaire Screen</Text>
      
      {/* Continue to Questionnaire (button) */}
      <TouchableOpacity
			  style={styles.createButton}
        // check if questionnaire has been completed and run setUserToken
        onPress={() => {
          {userToken ? (
            navigation.pop()
          ) : (
            setUserToken('asdsf')
          )}
        }}
			>

      {userToken ? (
        <Text>Save Changes</Text>
      ) : (
        <Text>Create Account</Text>
      )}
			</TouchableOpacity> 
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


  createButton: {
    backgroundColor: '#66a3dd',
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    padding: 5,
    width: 120,
    alignSelf: 'center',
  },


});
