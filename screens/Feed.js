import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import CardItem from '../components/CardItem';
import Colors from "../constants/Colors";
import { renderIcon } from "../images/Icons";


/*
 * This is the screen where the user can swipe on other
 * users profiles.
 */
export default () => {
	return (
		<View style={styles.container}>

      {/* Card */}
      <View style={styles.contentContainer}>
        <CardItem id={"test"}/>
      </View>

      {/* Like and Dislike Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.dislikeWrapper} onPress={() => {
          console.log("Dislike pressed")
        }}>
          {renderIcon("times", 50, Colors.red)}
        </TouchableOpacity>

        <TouchableOpacity style={styles.likeWrapper} onPress={() => {
          console.log("Like pressed")
        }}>
          {renderIcon("check", 50, Colors.green)}
        </TouchableOpacity>
      </View>

		</View>
	);
}




// styles
const styles = StyleSheet.create({

  /* Container styles */
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },

  contentContainer: {
    flex: 1,
    marginHorizontal: '3%',
    marginTop: '3%',
    marginBottom: '3%',
  },

  footer: {
    flex: .10,
    justifyContent: 'space-evenly',
		flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },


  /* Dislike Button */
  dislikeWrapper: {
    marginRight: 45,
  },

  /* Like Button */
  likeWrapper: {
    marginLeft: 45,
  },


});