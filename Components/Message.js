import React from 'react';
import styles from '../assets/index';
import { Text, View, Image, TouchableOpacity, Touchable } from 'react-native';
import { getDataFromPath } from "../database/readData";
import { useNavigation } from '@react-navigation/native';

const Message = (props) => {
  const uid = props.id;
  const profile_picture = getDataFromPath("users/" + uid + "/Profile/Images/profile_picture");
  const name = getDataFromPath("users/" + uid + "/Profile/profile_name");
  const lastMessage = "Hey do you want to be roommates?"
  const navigation = useNavigation();
  return (
    <TouchableOpacity
    onPress={() => navigation.push("ChatScreen")}
    >
      <View style={styles.containerMessage}>
        <Image source={{uri: profile_picture}} style={styles.avatar} />
        <View>
          <Text>{name}</Text>
          <Text style={styles.message}>{lastMessage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Message;