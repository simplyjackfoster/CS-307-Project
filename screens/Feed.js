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

  const uid = "thylan";



  const refreshScreen = () => {
  //   console.log(1);
  //   var cardContainer = getElementById('card');
  //   console.log(2);
  //   var newCard = createElement("CardItem");
  //   console.log(3);
  //   newCard.setAttribute("id", uid);
  //   console.log(4);
  //   cardContainer.removeChild(cardContainer.firstChild);
  //   console.log(5);
  //   cardContainer.appendChild(newCard);
  } 


	return (
		<View style={styles.container}>

      {/* Card */}
      <View id='card' style={styles.contentContainer}>
        <CardItem id={uid}/>
      </View>

      {/* Like, Refresh, and Dislike Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.dislikeWrapper} onPress={() => {
          console.log("Dislike pressed");
        }}>
          {renderIcon("times", 50, Colors.red)}
        </TouchableOpacity>

        <TouchableOpacity style={styles.refreshWrapper} onPress={() => {
          console.log("Refresh pressed");
          refreshScreen();
        }}>
          {renderIcon("refresh", 50, Colors.yellow)}
        </TouchableOpacity>

        <TouchableOpacity style={styles.likeWrapper} onPress={() => {
          console.log("Like pressed");
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
    // marginLeft: 25,
    // marginRight: 25,
  },
  
  /* Refresh Button */
  refreshWrapper: {
    // marginLeft: 20,
    // marginRight: 20,
    alignContent: 'center',
  },

  /* Like Button */
  likeWrapper: {
    // marginLeft: 25,
    // marginRight: 25,
  },


});