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



export const ViewQuestionnaire = (props) => {
  const { profile } = props;


  return(
    <View>
      
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


// styles
const styles = StyleSheet.create({

    /* Container styles */
    container: {
      flex: 1,
      backgroundColor: Colors.lightGray,
    },
  
    
});