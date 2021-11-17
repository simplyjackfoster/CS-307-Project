import React from 'react';
import { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from "../constants/Colors";
import { renderIcon } from "../images/Icons";
import CardList from '../components/CardList';





export default class Feed extends Component {

  render() { 
    var profiles = ["mfinder", "thylan", "buckle14"];

    return (
      <View style={styles.container}>

        {/* Stack of Cards */}
        <View style={styles.contentContainer}>
          <CardList {...{profiles}} ></CardList>
        </View>


        {/* Like, Refresh, and Dislike Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => {
            console.log("Dislike pressed");
          }}>
            {renderIcon("times", 50, Colors.red)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            console.log("Like pressed");
          }}>
            {renderIcon("check", 50, Colors.green)}
          </TouchableOpacity>
        </View>

      </View>
    );
  }
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
    marginTop: '2%',
    marginBottom: '1%',
  },

  footer: {
    flex: .10,
    justifyContent: 'space-evenly',
		flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

});