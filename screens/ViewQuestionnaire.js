import React, {useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
} from 'react-native';
import Colors from '../constants/Colors';

import { auth, rtdb } from '../database/RTDB';
import { getID } from '../database/ID';

import { getInterests, getDataFromPath } from '../database/readData';
import { ref, child, get, set } from 'firebase/database';

import Questionnaire, { questions, responses } from './Questionnaire';



export const ViewQuestionnaire = (props) => {
  const { profile } = props;


  return(
    <View>
      <Text style={styles.question}>{questions[1]}</Text>
      <Text style={styles.response}>{responses[1][profile.questionnaire1]}</Text>

      <Text style={styles.question}>{questions[2]}</Text>
      <Text style={styles.response}>{responses[2][profile.questionnaire2]}</Text>

      <Text style={styles.question}>{questions[3]}</Text>
      <Text style={styles.response}>{responses[3][profile.questionnaire3]}</Text>

      <Text style={styles.question}>{questions[4]}</Text>
      <Text style={styles.response}>{responses[4][profile.questionnaire4]}</Text>

      <Text style={styles.question}>{questions[5]}</Text>
      <Text style={styles.response}>{responses[5][profile.questionnaire5]}</Text>

      <Text style={styles.question}>{questions[6]}</Text>
      <Text style={styles.response}>{responses[6][profile.questionnaire6]}</Text>

      <Text style={styles.question}>{questions[7]}</Text>
      <Text style={styles.response}>{responses[7][profile.questionnaire7]}</Text>

      <Text style={styles.question}>{questions[8]}</Text>
      <Text style={styles.response}>{responses[8][profile.questionnaire8]}</Text>

      <Text style={styles.question}>{questions[9]}</Text>
      <Text style={styles.response}>{responses[9][profile.questionnaire9]}</Text>

      <Text style={styles.question}>{questions[10]}</Text>
      <Text style={styles.response}>{responses[10][profile.questionnaire10]}</Text>

      <Text style={styles.question}>{questions[11]}</Text>
      <Text style={styles.response}>{responses[11][profile.questionnaire11]}</Text>

      <Text style={styles.question}>{questions[12]}</Text>
      <Text style={styles.response}>{responses[12][profile.questionnaire12]}</Text>

      <Text style={styles.question}>{questions[13]}</Text>
      <Text style={styles.response}>{responses[13][profile.questionnaire13]}</Text>

    </View>
  );
}


// export default ( {navigation} ) => {
//   const { userToken, setUserToken }  = React.useContext(AuthContext);


//     return(
//       <ScrollView style={styles.container}>
//           <Text>
//             This is the other user's questionnaire.
//           </Text>
//       </ScrollView>
//     );
// }

export default ViewQuestionnaire;

// styles
const styles = StyleSheet.create({

    /* Container styles */
    container: {
      flex: 1,
      backgroundColor: Colors.lightGray,
    },

    question: {
      fontSize: 20,
    },

    response: {
      fontSize: 18,
    },
  
    
});