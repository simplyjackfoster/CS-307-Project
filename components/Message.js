import React from 'react';
import styles from '../assets/index';
import { Text, View, Image, TouchableOpacity, Touchable } from 'react-native';
import { getDataFromPath } from "../database/readData";
import { useNavigation } from '@react-navigation/native';

const Message = (props) => {
  const profile = props.profile;
  /*const profile_picture = getDataFromPath("users/" + uid + "/Profile/Images/profile_picture");
  const name = getDataFromPath("users/" + uid + "/Profile/profile_name");
  */
  const lastMessage = "Hey do you want to be roommates?"
  const navigation = useNavigation();
  return (
      <View style={styles.containerMessage}>
        <Image source={profile.profile_picture} style={styles.avatar} />
        <View>
          <Text>{profile.name}</Text>
          <Text style={styles.message}>{lastMessage}</Text>
        </View>
      </View>
  );
};

export default Message;