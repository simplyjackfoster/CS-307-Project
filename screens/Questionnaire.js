import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Colors from "../constants/Colors";
import { AuthContext } from "../context";
import { Picker } from '@react-native-picker/picker';


/*
 * This is the screen where the user fills out the questionnaire
 * about themselves.
 */
export default ( {navigation} ) => {

  const { userToken, setUserToken }  = React.useContext(AuthContext);

  const [selectedOne, setSelectedOne] = React.useState('3');
  const [selectedTwo, setSelectedTwo] = React.useState('3');
  const [selectedThree, setSelectedThree] = React.useState('3');




	return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.intro}>
          Please fill out this questionnaire to get a personalized feed!
        </Text>
        

        {/* Question 1 */}
        <Text style={styles.question}>I have people over frequently.</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedOne}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedOne(itemValue)
          }
        >
          <Picker.Item label="Strongly Disagree" value="1" />
          <Picker.Item label="Somewhat Disagree" value="2" />
          <Picker.Item label="Neither Agree or Disagree" value="3" />
          <Picker.Item label="Somewhat Agree" value="4" />
          <Picker.Item label="Strongly Agree" value="5" />
        </Picker>


        {/* Question 2 */}
        <Text style={styles.question}>I am a clean person.</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedTwo}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedTwo(itemValue)
          }
        >
          <Picker.Item label="Strongly Disagree" value="1" />
          <Picker.Item label="Somewhat Disagree" value="2" />
          <Picker.Item label="Neither Agree or Disagree" value="3" />
          <Picker.Item label="Somewhat Agree" value="4" />
          <Picker.Item label="Strongly Agree" value="5" />
        </Picker>


        {/* Question 3 */}
        <Text style={styles.question}>I play videogames frequently.</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedThree}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedThree(itemValue)
          }
        >
          <Picker.Item label="Strongly Disagree" value="1" />
          <Picker.Item label="Somewhat Disagree" value="2" />
          <Picker.Item label="Neither Agree or Disagree" value="3" />
          <Picker.Item label="Somewhat Agree" value="4" />
          <Picker.Item label="Strongly Agree" value="5" />
        </Picker>






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
    </ScrollView>
	);
}




// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 0,
  },

  intro: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    marginBottom: 40,
  },

  question: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 0,
    marginTop: 50,
    fontWeight: 'bold',
  },

  picker: {
    alignSelf: 'center',
    width: '70%',
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
