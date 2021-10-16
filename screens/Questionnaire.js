import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';

import Colors from "../constants/Colors";
import { AuthContext } from "../context";
import { Picker } from '@react-native-picker/picker';

// authentication imports
import { auth } from '../database/RTDB';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// data value imports from Signup screen
import {
  Gemail,
  Gpassword,
  Gname,
  Gphone,
  Gbirthday,
  GsecurityQuestion,
  GsecurityAnswer
 } from './Signup';

// database imports
import { writeNewUser } from '../database/writeData';



/*
 * This is the screen where the user fills out the questionnaire
 * about themselves.
 */
// On Press Function for CreateAcc Button


export default ( {navigation} ) => {
  const { userToken, setUserToken }  = React.useContext(AuthContext);

  const [selectedOne, setSelectedOne] = React.useState('3');
  const [selectedTwo, setSelectedTwo] = React.useState('3');
  const [selectedThree, setSelectedThree] = React.useState('3');
  const [selectedFour, setSelectedFour] = React.useState('3');
  const [selectedFive, setSelectedFive] = React.useState('1');
  const [selectedSix, setSelectedSix] = React.useState('1');

  const attemptCreate = () => {
    createUserWithEmailAndPassword(auth, Gemail, Gpassword)
      .then((userCredential) => {
        const user = userCredential.user;
        // move to Questionnaire screen
        console.log("Successfully Created Account!");
        console.log("SECURITY_QUESTION: " + GsecurityQuestion);
        writeNewUser(Gemail, Gname, Gphone,
          Gbirthday, GsecurityQuestion, GsecurityAnswer);
        setUserToken('Arbitrary Value');
      })
      .catch((error) => {
        Alert.alert("Error", "Error: Email Already in Use");
        console.log("Error Code: " + error.code);
        console.log("Error Message: " + error.message);
        // move back to create account screen
        navigation.pop();
      })
  } // attemptCreate()


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
        <Text style={styles.question}>What time do you go to bed during the week?</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedThree}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedThree(itemValue)
          }
        >
          <Picker.Item label="Before 10pm" value="1" />
          <Picker.Item label="10pm-12am" value="2" />
          <Picker.Item label="12-2am" value="3" />
          <Picker.Item label="2-4am" value="4" />
          <Picker.Item label="After 4am" value="5" />
        </Picker>


        {/* Question 4 */}
        <Text style={styles.question}>What time do you go to bed on the weekends?</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedFour}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedFour(itemValue)
          }
        >
          <Picker.Item label="Before 10pm" value="1" />
          <Picker.Item label="10pm-12am" value="2" />
          <Picker.Item label="12-2am" value="3" />
          <Picker.Item label="2-4am" value="4" />
          <Picker.Item label="After 4am" value="5" />
        </Picker>
        
        
        {/* Question 5 */}
        <Text style={styles.question}>How many days of the week do you drink alcohol?</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedFive}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedFive(itemValue)
          }
        >
          <Picker.Item label="Never" value="1" />
          <Picker.Item label="1 day" value="2" />
          <Picker.Item label="2-3 days" value="3" />
          <Picker.Item label="4-5 days" value="4" />
          <Picker.Item label="6-7 days" value="5" />
        </Picker>


        {/* Question 6 */}
        <Text style={styles.question}>How many days of the week do you smoke?</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedSix}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedSix(itemValue)
          }
        >
          <Picker.Item label="Never" value="1" />
          <Picker.Item label="1 day" value="2" />
          <Picker.Item label="2-3 days" value="3" />
          <Picker.Item label="4-5 days" value="4" />
          <Picker.Item label="6-7 days" value="5" />
        </Picker>




        {/* Continue to Questionnaire (button) */}
        <TouchableOpacity
          style={styles.createButton}
          // check if questionnaire has been completed and run setUserToken
          onPress={() => {
            {userToken ? (
              navigation.pop()
            ) : (
              attemptCreate()
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
    backgroundColor: Colors.lightBlue,
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    marginBottom: 30,
    padding: 5,
    width: 110,
    alignSelf: 'center',
  },


});
