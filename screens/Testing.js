import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from "../constants/Colors";
import { removeSwipedRight, removeSwipedLeft, removeMatches, removeAllLists, deleteDummyUsersAsync } from '../database/removeData';
import { auth } from '../database/RTDB';
import { getID } from '../database/ID';
import { TouchableHighlight } from 'react-native';
import { createDummyUsersAsync } from '../database/writeData';




/*
 * This is the screen where help/hotlines are provided.
 */
export default () => {

    /*
     * Adds 50 dummy users to the database. 
     */
    const addDummyUsers = () => {
        Alert.alert("NOTICE", "Clicking \"Yes\" will add 50 dummy users to the database.\nDo you wish to proceed?",
            [{ 
                text: "No"
            },
            {
                text: "Yes",
                onPress: () => {
                    createDummyUsersAsync()
                }
            }]
        );
    } // addDummyUsers()


    /*
     * Deletes 50 dummy users from the database.
     */
    const deleteDummyUsers = () => {
        Alert.alert("NOTICE", "Clicking \"Yes\" will remove 50 dummy users from the database.\nDo you wish to proceed?",
            [{ 
                text: "No"
            },
            {
                text: "Yes",
                onPress: () => {
                    deleteDummyUsersAsync()
                }
            }]
        );
    } // deleteDummyUsers()





    /*
     * Purges RTDB of users swiped right contents
     */
    const clearRightList = () => {
        Alert.alert("NOTICE", "Clicking \"Yes\" will delete all users in your \"Swiped Right List\".\nAlso Note this will sign you out.\nDo you wish to proceed?",
            [{ 
                text: "No"
            },
            {
                text: "Yes",
                onPress: () => {
                    removeSwipedRight(getID(auth.currentUser.email))
                }
            }]
        );
    }


    /*
    * Purges RTDB of users swiped left contents
    */
    const clearLeftList = () => {
        Alert.alert("NOTICE", "Clicking \"Yes\" will delete all users in your \"Swiped Left List\".\nAlso Note this will sign you out.\nDo you wish to proceed?",
            [{ 
                text: "No"
            },
            {
                text: "Yes",
                onPress: () => {
                    removeSwipedLeft(getID(auth.currentUser.email))
                }
            }]
        );
    }


    /*
    * Purges RTDB of users match list contents
    */
    const clearMatchList = () => {
        Alert.alert("NOTICE", "Clicking \"Yes\" will delete all users in your \"Matches List\".\nAlso Note this will sign you out.\nDo you wish to proceed?",
            [{ 
                text: "No"
            },
            {
                text: "Yes",
                onPress: () => {
                    removeMatches(getID(auth.currentUser.email))
                }
            }]
        );
    }


    /*
    * Purges RTDB of users swiped right list, swiped left list, and their match list.
    */
    const clearAllLists = () => {
        Alert.alert("NOTICE", "Clicking \"Yes\" will delete all users in your \"Matches List\", \"Swiped Right List\", and \"Swiped Left List\".\nAlso Note this will sign you out.\nDo you wish to proceed?",
            [{ 
                text: "No"
            },
            {
                text: "Yes",
                onPress: () => {
                    removeAllLists(getID(auth.currentUser.email))
                }
            }]
        );
    }


    // check if user should be able to access testing functionalities
    const id = getID(auth.currentUser.email);
    console.log("User: " + id + " attempting to access testing")
    if (!(id == "thylan" || id == "mfinder" || id == "buckle14" || id == "francik" || id == "foste205" || id == "werner51")) {
        return(
            <View style={styles.container}>
                <Text>Admin Access Only</Text>
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>


            <SafeAreaView>

                <TouchableOpacity
                    style={styles.dummyButton}
                    onPress={ addDummyUsers }
                    >
                    <Text style={styles.text}>Add Dummy Users</Text>
                </TouchableOpacity>

            
                <TouchableOpacity
                    style={styles.dummyButton}
                    onPress={ deleteDummyUsers }
                    >
                    <Text style={styles.text}>Delete Dummy Users</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.button}
                    onPress={ clearRightList }
                    >
                    <Text style={styles.text}>Clear My Swiped Right List</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.button}
                    onPress={ clearLeftList }
                    >
                    <Text style={styles.text}>Clear My Swiped Left List</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.button}
                    onPress={ clearMatchList }
                    >
                    <Text style={styles.text}>Clear My Match List</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.button}
                    onPress={ clearAllLists }
                    >
                    <Text style={styles.text}>Clear all of My Lists</Text>
                </TouchableOpacity>
            </SafeAreaView>
		    </View>
	    );
    }   
}



// styles
const styles = StyleSheet.create({
    
    container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

   text: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  dummyButton: {
    marginTop: 15,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    backgroundColor: Colors.lightBlue,
  },

  button: {
    marginTop: 15,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    backgroundColor: Colors.lightRed,
  },

})
