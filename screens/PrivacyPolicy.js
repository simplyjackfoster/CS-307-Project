import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Colors from "../constants/Colors";


/*
 * This is the screen where the user can view the privacy policy.
 */
export default ({ navigation }) => {
	return (
		<View style={styles.container}>
      <View>
			  <Text style={styles.header}>Privacy Notice</Text>
      </View>
        <Text style={styles.body}>
          Thank you for choosing to be part of our community at UniRoom 
          ("Company," "we," "us," or "our"). We are committed to protecting your 
          personal information and your right to privacy. If you have any questions 
          or concerns about this privacy notice or our practices with regard to your 
          personal information, please contact us at company@email.com.
        </Text>
      <View>
        <Text style={styles.header}>What Information do we collect?</Text>
		  </View>
      <View>
			  <Text style={styles.body}>
          We collect personal information that you voluntarily provide to us when 
          you register on the App, express an interest in obtaining information about 
          us or our products and Services, when you participate in activities on the 
          App (such as by posting messages in our online forums or entering competitions, 
          contests or giveaways) or otherwise when you contact us.
        </Text>
      </View>
    </View>
	);
}



// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 15,
  },

  header:{
    textAlign: 'center',
    fontSize: 25,
    margin: 10,
    marginTop: 25,
  },

  body:{
    fontSize: 16

  }

});
