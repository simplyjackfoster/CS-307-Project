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
import { AuthCredential, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, reload, sendEmailVerification, updateProfile } from 'firebase/auth';
import { ref, child, get, set, onChildChanged } from 'firebase/database';
        

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

// used so that the hooks don't get set rapidly in edit questionnaire
var updatedTheSelected = false;

// constants for all the questions and responses
// string arrays for all the questions and responses, ignoring the 0th index of each array
export const questions = [
  "",
  /* 1 */"I have people over frequently.",
  /* 2 */"I am a clean person.",
  /* 3 */"What time do you go to bed during the week?",
  /* 4 */"What time do you go to bed on the weekends?",
  /* 5 */"How many days of the week do you drink alcohol?",
  /* 6 */"How many days of the week do you smoke?",
  /* 7 */"How would you like to handle chores?",
  /* 8 */"Do you have a car?",
  /* 9 */"Do you want pets in the room?",
  /* 10 */"Are you introverted or extraverted?",
  /* 11 */"Do we need to check before having someone over?",
  /* 12 */"Do you want to do joint grocery shopping?",
  /* 13 */"Do you have a significant other?",
];


export const responses = [
  [],
  /* 1 */[ "", "Strongly Disagree", "Somewhat Disagree", "Neither Agree or Disagree", "Somewhat Agree", "Strongly Agree", ],
  /* 2 */[ "", "Strongly Disagree", "Somewhat Disagree", "Neither Agree or Disagree", "Somewhat Agree", "Strongly Agree", ],
  /* 3 */[ "", "Before 10pm", "10pm-12am", "12-2am", "2-4am", "After 4am", ],
  /* 4 */[ "", "Before 10pm", "10pm-12am", "12-2am", "2-4am", "After 4am", ],
  /* 5 */[ "", "Never", "1 day", "2-3 days", "4-5 days", "6-7 days", ],
  /* 6 */[ "", "Never", "1 day", "2-3 days", "4-5 days", "6-7 days", ],
  /* 7 */[ "", "Do all the chores", "Divide chores evenly", "Do chores when needed", "I don't do chores", ],
  /* 8 */[ "", "No", "Yes", ],
  /* 9 */[ "", "No", "Yes, dog(s)", "Yes, cat(s)", "Yes, other", ],
  /* 10 */[ "", "Definitely Introverted", "Somewhat Introverted", "Neither", "Somewhat Extraverted", "Definitely Extraverted", ],
  /* 11 */[ "", "No", "Sometimes, yes", "Most of the time, yes", "Always, yes", ],
  /* 12 */[ "", "No", "Yes", ],
  /* 13 */[ "", "No", "Yes, not on campus", "Yes, on campus" ],
];

// array of values based on how important each quesiton is to roommate compatibility
export const values = [
  -1,
  /* 1 */3,
  /* 2 */3,
  /* 3 */4,
  /* 4 */4,
  /* 5 */2,
  /* 6 */2,
  /* 7 */3,
  /* 8 */1,
  /* 9 */3,
  /* 10 */2,
  /* 11 */2,
  /* 12 */1,
  /* 13 */1,
];



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
        // move to Questionnaire screen
        const user = userCredential.user;
        console.log("Successfully Created Account!");
        writeNewUser(Gemail, Gname, Gphone, Gbirthday, Ggender, Gvaccinated,
          GsecurityQuestion, GsecurityAnswer, selectedOne, selectedTwo,
          selectedThree, selectedFour, selectedFive, selectedSix, selectedSeven,
          selectedEight, selectedNine, selectedTen, selectedEleven, selectedTwelve,
          selectedThirteen);
      })
      .catch((error) => {
        Alert.alert("Error", "Error: Email Already in Use");
        console.log("Error Code: " + error.code);
        console.log("Error Message: " + error.message);
        // move back to create account screen
        navigation.pop();
      })
    var authState = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (auth.currentUser.emailVerified != true) {
          console.log("Auth State Changed From Questionnaire");
          attemptDisplayNameUpdate(authState);
        }
        return;
      }
      else {
        console.log("Waiting for user auth state change from Questionnaire");
      }
    });
  } // attemptCreate()

  const attemptDisplayNameUpdate = (authState) => {
    updateProfile(auth.currentUser, { displayName: Gname })
      .then(() => {
        //displayName has been updated
        console.log(auth.currentUser.displayName);
        attemptEmail();
      })
      .catch((error) => {
        Alert.alert("Error", "Error: There was an issue updating your name");
        console.log("Error Code: " + error.code);
        console.log("Error Message: " + error.message);
        // move back to create account screen
        navigation.pop();
      })
      authState();

  }

  const attemptEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        navigation.push("VerifyEmail");
      })
      .catch((error) => {
        Alert.alert("Error", "Error: There was an issue sending your account verification link");
        console.log("Error Code: " + error.code);
        console.log("Error Message: " + error.message);
        // move back to create account screen
        navigation.pop();
      })
  }


	return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
          <Text style={styles.intro}>
            Please fill out this questionnaire to get a personalized feed!
          </Text>
          

          {/* Question 1 */}
          <Text style={styles.question}>{questions[1]}</Text>
          <Picker
            style={styles.picker}
            selectedValue={
              selectedOne
            }
            onValueChange={(itemValue, itemIndex) =>
              setSelectedOne(itemValue)
            }
          >
            <Picker.Item label={responses[1][1]} value={1} />
            <Picker.Item label={responses[1][2]} value={2} />
            <Picker.Item label={responses[1][3]} value={3} />
            <Picker.Item label={responses[1][4]} value={4} />
            <Picker.Item label={responses[1][5]} value={5} />
          </Picker>


          {/* Question 2 */}
          <Text style={styles.question}>{questions[2]}</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedTwo}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTwo(itemValue)
            }
          >
            <Picker.Item label={responses[2][1]} value={1} />
            <Picker.Item label={responses[2][2]} value={2} />
            <Picker.Item label={responses[2][3]} value={3} />
            <Picker.Item label={responses[2][4]} value={4} />
            <Picker.Item label={responses[2][5]} value={5} />
          </Picker>


          {/* Question 3 */}
          <Text style={styles.question}>{questions[3]}</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedThree}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedThree(itemValue)
            }
          >
            <Picker.Item label={responses[3][1]} value={1} />
            <Picker.Item label={responses[3][2]} value={2} />
            <Picker.Item label={responses[3][3]} value={3} />
            <Picker.Item label={responses[3][4]} value={4} />
            <Picker.Item label={responses[3][5]} value={5} />
          </Picker>


          {/* Question 4 */}
          <Text style={styles.question}>{questions[4]}</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedFour}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedFour(itemValue)
            }
          >
            <Picker.Item label={responses[4][1]} value={1} />
            <Picker.Item label={responses[4][2]} value={2} />
            <Picker.Item label={responses[4][3]} value={3} />
            <Picker.Item label={responses[4][4]} value={4} />
            <Picker.Item label={responses[4][5]} value={5} />
          </Picker>
          
          
          {/* Question 5 */}
          <Text style={styles.question}>{questions[5]}</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedFive}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedFive(itemValue)
            }
          >
            <Picker.Item label={responses[5][1]} value={1} />
            <Picker.Item label={responses[5][2]} value={2} />
            <Picker.Item label={responses[5][3]} value={3} />
            <Picker.Item label={responses[5][4]} value={4} />
            <Picker.Item label={responses[5][5]} value={5} />
          </Picker>


          {/* Question 6 */}
          <Text style={styles.question}>{questions[6]}</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedSix}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedSix(itemValue)
            }
          >
            <Picker.Item label={responses[6][1]} value={1} />
            <Picker.Item label={responses[6][2]} value={2} />
            <Picker.Item label={responses[6][3]} value={3} />
            <Picker.Item label={responses[6][4]} value={4} />
            <Picker.Item label={responses[6][5]} value={5} />
          </Picker>


          {/* Question 7 */}
          <Text style={styles.question}>{questions[7]}</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedSeven}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedSeven(itemValue)
            }
          >
            <Picker.Item label={responses[7][1]} value={1} />
            <Picker.Item label={responses[7][2]} value={2} />
            <Picker.Item label={responses[7][3]} value={3} />
            <Picker.Item label={responses[7][4]} value={4} />
          </Picker>


          {/* Question 8 */}
          <Text style={styles.question}>{questions[8]}</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedEight}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedEight(itemValue)
            }
          >
            <Picker.Item label={responses[8][1]} value={1} />
            <Picker.Item label={responses[8][2]} value={2} />
          </Picker>


          {/* Question 9 */}
          <Text style={styles.question}>{questions[9]}</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedNine}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedNine(itemValue)
            }
          >
            <Picker.Item label={responses[9][1]} value={1} />
            <Picker.Item label={responses[9][2]} value={2} />
            <Picker.Item label={responses[9][3]} value={3} />
            <Picker.Item label={responses[9][4]} value={4} />
          </Picker>


          {/* Question 10 */}
          <Text style={styles.question}>{questions[10]}</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedTen}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTen(itemValue)
            }
          >
            <Picker.Item label={responses[10][1]} value={1} />
            <Picker.Item label={responses[10][2]} value={2} />
            <Picker.Item label={responses[10][3]} value={3} />
            <Picker.Item label={responses[10][4]} value={4} />
            <Picker.Item label={responses[10][5]} value={5} />
          </Picker>


          {/* Question 11 */}
          <Text style={styles.question}>{questions[11]}</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedEleven}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedEleven(itemValue)
            }
          >
            <Picker.Item label={responses[11][1]} value={1} />
            <Picker.Item label={responses[11][2]} value={2} />
            <Picker.Item label={responses[11][3]} value={3} />
            <Picker.Item label={responses[11][4]} value={4} />
          </Picker>


          {/* Question 12 */}
          <Text style={styles.question}>{questions[12]}</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedTwelve}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTwelve(itemValue)
            }
          >
            <Picker.Item label={responses[12][1]} value={1} />
            <Picker.Item label={responses[12][2]} value={2} />
          </Picker>


          {/* Question 13 */}
          <Text style={styles.question}>{questions[13]}</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedThirteen}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedThirteen(itemValue)
            }
          >
            <Picker.Item label={responses[13][1]} value={1} />
            <Picker.Item label={responses[13][2]} value={2} />
            <Picker.Item label={responses[13][3]} value={3} />
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
            onPress={() => {
                attemptCreate()
            }}
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
    paddingHorizontal: 300,
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
