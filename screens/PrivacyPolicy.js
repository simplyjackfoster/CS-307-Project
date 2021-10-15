import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Colors from "../constants/Colors";


/*
 * This is the screen where the user can view the privacy policy.
 */
export default ({ navigation }) => {
	return (
		<View style={styles.container}>
      <View style={styles.header}>
			  <Text>Privacy Notice</Text>
      </View>
      <Text>Thank you for choosing to be part of our community at UniRoom ("Company," "we," "us," or "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at company@email.com.</Text>
      <View style={styles.header}>
        <Text>WHAT INFORMATION DO WE COLLECT?</Text>
		  </View>
      <View style={styles.container}>
			  <Text>We collect personal information that you voluntarily provide to us when you register on the App, express an interest in obtaining information about us or our products and Services, when you participate in activities on the App (such as by posting messages in our online forums or entering competitions, contests or giveaways) or otherwise when you contact us.
        </Text>
      </View>
    </View>
	);
}



// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontSize: 32
  },
  body:{
    fontSize: 18
  }

});
