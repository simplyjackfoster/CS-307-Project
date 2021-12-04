import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from "../constants/Colors";
import { removeSwipedRight, removeSwipedLeft, removeMatches, removeAllLists } from '../database/removeData';
import { auth } from '../database/RTDB';
import { getID } from '../database/ID';




/*
 * This is the screen where help/hotlines are provided.
 */
export default () => {

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

	return (
		<View style={styles.container}>
            <SafeAreaView>
                <TouchableOpacity
                    style={styles.button}
                    onPress={ clearRightList }
                >
                    <Text style={styles.text}>Clear My Swipped Right List</Text>
                </TouchableOpacity>

                <View style={{marginTop: 20}}/>

                <TouchableOpacity
                    style={styles.button}
                    onPress={ clearLeftList }
                >
                    <Text style={styles.text}>Clear My Swipped Left List</Text>
                </TouchableOpacity>

                <View style={{marginTop: 20}}/>

                <TouchableOpacity
                    style={styles.button}
                    onPress={ clearMatchList }
                >
                    <Text style={styles.text}>Clear My Match List</Text>
                </TouchableOpacity>

                <View style={{marginTop: 20}}/>

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

  button: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    backgroundColor: Colors.lightRed,
  },

})
