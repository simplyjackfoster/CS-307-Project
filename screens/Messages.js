import React from 'react';
import {
  ScrollView,
  Text,
  ImageBackground,
  View,
  FlatList,
  Touchable
} from 'react-native';
import Message from '../components/Message';
import styles from '../assets/index';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getDataFromPath } from "../database/readData";
//import firestore from '@react-native-firebase/firestore';

//const getName=(props)=>


export default ({  navigation}) =>{
  //const uid = props.id;
  //const name = getDataFromPath("users/" + uid + "/Profile/profile_name");
  const listOfUsers = [
    {
      id: "foste205",
    },
    {
      id: "mfinder"
    }
  ]
  return (
    <ImageBackground
      style={styles.bg}
    >
      <View style={styles.containerMessages}>
          <View style={styles.top}>
            <Text style={styles.title}>Messages</Text>
          </View>
          <FlatList
            data={listOfUsers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
                <Message id={item.id} />
              </TouchableOpacity>
            )}
          />
      </View>
    </ImageBackground>
  );
}
