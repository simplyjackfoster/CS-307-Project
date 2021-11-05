import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Colors from "../constants/Colors";


const CONTENT = [
  {
    title: 'Why use UniRoom?',
    content:
      'UniRoom is a fantastic way to connect with a likeminded roommate',
  },
  {
    title: 'Do we have a Privacy Policy?',
    content:
      'Yes, our Privacy Policy agreement is the agreement where you specify if you collect personal data from your users, what kind of personal data you collect and what you do with that data.',
  },
];


/*
 * This is the screen where the user can view Frequently Asked Questions.
 */
export default ( {navigation} ) => {
  const [activeSections, setActiveSections] = useState([]);
  // Collapsed condition for the single collapsible
  const [collapsedOne, setCollapsedOne] = useState(true);
  const [collapsedTwo, setCollapsedTwo] = useState(true);

  const toggleExpanded = () => {
  //Toggling the state of single Collapsible
  setCollapsedOne(!collapsedOne);
  setCollapsedTwo(!collapsedTwo);

  };
	return (

		<View style={styles.container}>
      <TouchableOpacity onPress={() => setCollapsedOne(!collapsedOne)}>
        <View>
			    <Text style={styles.header}>Why use UniRoom?</Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsedOne} align="center">
        <View>
          <Text style={styles.content}>
          UniRoom is a fantastic way to connect with a likeminded roommate
          </Text>
        </View>
      </Collapsible>

      <TouchableOpacity onPress={() => setCollapsedTwo(!collapsedTwo)}>
        <View>
			    <Text style={styles.header}>Do we have a Privacy Policy?</Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsedTwo} align="center">
        <View >
          <Text style={styles.content}>
          Yes, our Privacy Policy agreement is the agreement where we specify if we collect personal data from our users, what kind of personal data we collect and what we do with that data.
          </Text>
        </View>
      </Collapsible>
		</View>
	);
}



// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // alignItems: 'center',
    width: '100%',
    // justifyContent: 'center',
  },

  header: {
    backgroundColor: Colors.lightBlue,
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    width: '100%',
  },

  content: {
    backgroundColor: Colors.lightBlue,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 20,
    width: '100%',
  },

});
