import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking
} from 'react-native';

import Colors from "../constants/Colors";
import { AuthContext } from "../context";
import { Picker } from '@react-native-picker/picker';
import { Divider } from 'react-native-elements';

// authentication imports
import { auth, rtdb } from '../database/RTDB';
import { AuthCredential, createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import { ref, child, get, set } from 'firebase/database';
        

// data value imports from Signup screen
import {
  Gemail,
  Gpassword,
  Gname,
  Gphone,
  Gbirthday,
  Ggender,
  GsecurityQuestion,
  GsecurityAnswer,
  Gvaccinated
 } from './Signup';

// database read/write/remove imports
import { writeNewUser, writeQuestionnaire } from '../database/writeData';
import { getDataFromPath } from '../database/readData';
import { getID } from '../database/ID';
import { FirebaseError } from '@firebase/util';

// used so that the hooks don't get set rapidly in edit questionnaire
var updatedTheSelected = false;

/*
 * This is the screen where the user fills out the questionnaire
 * about themselves.
 */
// On Press Function for CreateAcc Button

export default ( {navigation} ) => {
  const { userToken, setUserToken }  = React.useContext(AuthContext);

  const [selectedOne, setSelectedOne] = React.useState(3); // has_people_over
  const [selectedTwo, setSelectedTwo] = React.useState(3); // is_clean
  const [selectedThree, setSelectedThree] = React.useState(3); // week_bedtime
  const [selectedFour, setSelectedFour] = React.useState(3); // weekend_bedtime
  const [selectedFive, setSelectedFive] = React.useState(1); // drinks_alcohol
  const [selectedSix, setSelectedSix] = React.useState(1); // smokes
  const [selectedSeven, setSelectedSeven] = React.useState(2); // handle_chores
  const [selectedEight, setSelectedEight] = React.useState(1); // has_car
  const [selectedNine, setSelectedNine] = React.useState(1); // wants_pets
  const [selectedTen, setSelectedTen] = React.useState(3); // introverted_or_extraverted
  const [selectedEleven, setSelectedEleven] = React.useState(1); // check_before_having_people_over
  const [selectedTwelve, setSelectedTwelve] = React.useState(1); // joint_grocery_shopping
  const [selectedThirteen, setSelectedThirteen] = React.useState(1); // has_significant_other

  // function for setting the selection boxes to the correct value
  const setSelection = (question_num, field) => {
		const dbRef = ref(rtdb);
		// get the data
		get(child(dbRef, "users/" + getID(auth.currentUser.email) +
							"/Roommate Compatibility/" + field)).then((snapshot) => {
			if (snapshot.exists()) {
				const data_val = snapshot.val();
				if (question_num == 1) {
					setSelectedOne(data_val);
				}
				else if (question_num == 2) {
					setSelectedTwo(data_val);
				}
        else if (question_num == 3) {
          setSelectedThree(data_val);
        }
        else if (question_num == 4) {
          setSelectedFour(data_val);
        }
        else if (question_num == 5) {
          setSelectedFive(data_val);
        }
        else if (question_num == 6) {
          setSelectedSix(data_val);
        }
        else if (question_num == 7) {
          setSelectedSeven(data_val);
        }
        else if (question_num == 8) {
          setSelectedEight(data_val);
        }
        else if (question_num == 9) {
          setSelectedNine(data_val);
        }
        else if (question_num == 10) {
          setSelectedTen(data_val);
        }
        else if (question_num == 11) {
          setSelectedEleven(data_val);
        }
        else if (question_num == 12) {
          setSelectedTwelve(data_val);
        }
        else if (question_num == 13) {
          setSelectedThirteen(data_val);
        }
			}
		}).catch((error) => {
			console.error(error);
		});	
	} // setSelection()

  /*
   * Set the selection boxes to the database values if we are in
   * the HomeStack
   */
  if (userToken && (updatedTheSelected == false)) {
    setSelection(1, "has_people_over"); 
    setSelection(2, "is_clean");
    setSelection(3, "week_bedtime");
    setSelection(4, "weekend_bedtime");
    setSelection(5, "drinks_alcohol");
    setSelection(6, "smokes");
    setSelection(7, "handle_chores");
    setSelection(8, "has_car");
    setSelection(9, "wants_pets");
    setSelection(10, "introverted_or_extraverted");
    setSelection(11, "check_before_having_people_over");
    setSelection(12, "joint_grocery_shopping");
    setSelection(13, "has_significant_other");
    updatedTheSelected = true;
  }



  /*
   * Effect that resets the value of updatedTheSelected to false, so that when
   * we open the edit questionnaire screen again, the selections will update.
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      updatedTheSelected = false;
    });
    return unsubscribe;
  }, [navigation]);



  // attempt to create an account
  const attemptCreate = () => {
    createUserWithEmailAndPassword(auth, Gemail, Gpassword)
      .then((userCredential) => {
        const user = userCredential.user;
        // move to Questionnaire screen
        console.log("Successfully Created Account!");
        writeNewUser(Gemail, Gname, Gphone, Gbirthday, Ggender, Gvaccinated,
          GsecurityQuestion, GsecurityAnswer, selectedOne, selectedTwo,
          selectedThree, selectedFour, selectedFive, selectedSix, selectedSeven,
          selectedEight, selectedNine, selectedTen, selectedEleven, selectedTwelve,
          selectedThirteen);
        setUserToken('Arbitrary Value');
      })
      .catch((error) => {
        Alert.alert("Error", "Error: Email Already in Use");
        console.log("Error Code: " + error.code);
        console.log("Error Message: " + error.message);
        // move back to create account screen
        navigation.pop();
      });
  } // attemptCreate()


	return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
          <Text style={styles.intro}>
            Please fill out this questionnaire to get a personalized feed!
          </Text>
          

          {/* Question 1 */}
          <Text style={styles.question}>I have people over frequently.</Text>
          <Picker
            style={styles.picker}
            selectedValue={
              selectedOne
            }
            onValueChange={(itemValue, itemIndex) =>
              setSelectedOne(itemValue)
            }
          >
            <Picker.Item label="Strongly Disagree" value={1} />
            <Picker.Item label="Somewhat Disagree" value={2} />
            <Picker.Item label="Neither Agree or Disagree" value={3} />
            <Picker.Item label="Somewhat Agree" value={4} />
            <Picker.Item label="Strongly Agree" value={5} />
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
            <Picker.Item label="Strongly Disagree" value={1} />
            <Picker.Item label="Somewhat Disagree" value={2} />
            <Picker.Item label="Neither Agree or Disagree" value={3} />
            <Picker.Item label="Somewhat Agree" value={4} />
            <Picker.Item label="Strongly Agree" value={5} />
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
            <Picker.Item label="Before 10pm" value={1} />
            <Picker.Item label="10pm-12am" value={2} />
            <Picker.Item label="12-2am" value={3} />
            <Picker.Item label="2-4am" value={4} />
            <Picker.Item label="After 4am" value={5} />
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
            <Picker.Item label="Before 10pm" value={1} />
            <Picker.Item label="10pm-12am" value={2} />
            <Picker.Item label="12-2am" value={3} />
            <Picker.Item label="2-4am" value={4} />
            <Picker.Item label="After 4am" value={5} />
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
            <Picker.Item label="Never" value={1} />
            <Picker.Item label="1 day" value={2} />
            <Picker.Item label="2-3 days" value={3} />
            <Picker.Item label="4-5 days" value={4} />
            <Picker.Item label="6-7 days" value={5} />
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
            <Picker.Item label="Never" value={1} />
            <Picker.Item label="1 day" value={2} />
            <Picker.Item label="2-3 days" value={3} />
            <Picker.Item label="4-5 days" value={4} />
            <Picker.Item label="6-7 days" value={5} />
          </Picker>


          {/* Question 7 */}
          <Text style={styles.question}>How would you like to handle chores?</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedSeven}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedSeven(itemValue)
            }
          >
            <Picker.Item label="Assign tasks to each person" value={1} />
            <Picker.Item label="Do them when needed" value={2} />
            <Picker.Item label="I don't want to do any chores" value={3} />
          </Picker>


          {/* Question 8 */}
          <Text style={styles.question}>Do you have a car?</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedEight}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedEight(itemValue)
            }
          >
            <Picker.Item label="No" value={1} />
            <Picker.Item label="Yes" value={2} />
          </Picker>


          {/* Question 9 */}
          <Text style={styles.question}>Do you want pets in the room?</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedNine}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedNine(itemValue)
            }
          >
            <Picker.Item label="No" value={1} />
            <Picker.Item label="Yes, dog(s)" value={2} />
            <Picker.Item label="Yes, cat(s)" value={3} />
            <Picker.Item label="Yes, (other)" value={4} />
          </Picker>


          {/* Question 10 */}
          <Text style={styles.question}>Are you introverted or extraverted?</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedTen}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTen(itemValue)
            }
          >
            <Picker.Item label="Definitely introverted" value={1} />
            <Picker.Item label="Somewhat introverted" value={2} />
            <Picker.Item label="Neither" value={3} />
            <Picker.Item label="Somewhat extraverted" value={4} />
            <Picker.Item label="Definitely extraverted" value={5} />
          </Picker>


          {/* Question 11 */}
          <Text style={styles.question}>Do we need to check before having someone over?</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedEleven}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedEleven(itemValue)
            }
          >
            <Picker.Item label="Never, no" value={1} />
            <Picker.Item label="Sometimes, yes" value={2} />
            <Picker.Item label="Most of the time, yes" value={3} />
            <Picker.Item label="Always, yes" value={4} />
          </Picker>


          {/* Question 12 */}
          <Text style={styles.question}>Do you want to do joint grocery shopping?</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedTwelve}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTwelve(itemValue)
            }
          >
            <Picker.Item label="No" value={1} />
            <Picker.Item label="Yes" value={2} />
          </Picker>


          {/* Question 13 */}
          <Text style={styles.question}>Do you have a significant other?</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedThirteen}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedThirteen(itemValue)
            }
          >
            <Picker.Item label="No" value={1} />
            <Picker.Item label="Yes, on campus" value={2} />
            <Picker.Item label="Yes, not on campus" value={3} />
          </Picker>

          <Divider color={Colors.white} height={50}></Divider>

          {/* Create Account Button - when we are in the AuthStack */}
          <TouchableOpacity
            style={
              userToken ? (
                {display: 'none'}
              ) : (
                styles.createButton
              )
            }
            onPress={attemptCreate}
          >
            <Text style={styles.createText}>Create Account</Text>
          </TouchableOpacity> 

      </ScrollView>


      {/* Save Button - when we are in the HomeStack */}
      <View
        style= {userToken ? (
          styles.footer
        ) : (
          {display: 'none'}
        )}
      >
        <TouchableOpacity style={styles.saveButton}
          onPress={() => {
            // save changes to database 
            writeQuestionnaire(auth.currentUser.email, selectedOne, selectedTwo,
              selectedThree, selectedFour, selectedFive, selectedSix, selectedSeven,
              selectedEight, selectedNine, selectedTen, selectedEleven,
              selectedTwelve, selectedThirteen),


            // navigate back to EditProfile
            updatedTheSelected = false,
            navigation.pop()
          }}
        >
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>

      </View>

    </View>
	);
}




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
    alignSelf: 'center',
    paddingTop: 5,
    paddingHorizontal: 150,
    paddingBottom: 25,
    backgroundColor: Colors.lightGray,
  },

  /* Instructions */
  intro: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    marginBottom: 40,
  },

  /* Questions */
  question: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 0,
    marginTop: 50,
    marginHorizontal: '10%',
    fontWeight: 'bold',
  },

  /* Pickers */
  picker: {
    flex: 1,
    alignSelf: 'center',
    width: '80%',
  },

  /* Create Account Button */
  createText: {
    fontSize: 18,
    alignSelf: 'center',
  },

  createButton: {
    backgroundColor: Colors.lightBlue,
    borderWidth: 1,
    borderRadius: 25,
    margin: 10,
    marginBottom: 100,
    padding: 10,
    width: 175,
    alignSelf: 'center',
    textAlign: 'center',
  },

  /* Save Changes Button */
  saveText: {
    fontSize: 16,
    alignSelf: 'center',
  },

  saveButton: {
    backgroundColor: Colors.offWhite,
    borderWidth: 1,
    borderRadius: 25,
    margin: 10,
    padding: 10,
    top: 15,
    width: 175,
    alignSelf: 'center',
    textAlign: 'center',
  },

});
