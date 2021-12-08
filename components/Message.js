import React, { useEffect } from 'react';
import styles from '../assets/index';
import { Text, View, Image, TouchableOpacity, Touchable } from 'react-native';
import { getDataFromPath } from "../database/readData";
import { useNavigation } from '@react-navigation/native';
import { getLastMessage } from '../database/readFirestore';


const Message = (props) => {
  const profile = props.profile;
  const [lastMessage, setLastMessge] = React.useState(null);
  const navigation = useNavigation();

	useEffect(() => {
    const loadMessage = async () => {
      const message = await getLastMessage(profile.id);
      setLastMessge(message);
    }
    loadMessage();
	}, []);


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