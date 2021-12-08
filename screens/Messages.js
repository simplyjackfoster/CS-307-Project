import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  ImageBackground,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Message from '../components/Message';
import styles from '../assets/index';
import { getDataFromPath, getMatchesAsync, getUserData } from "../database/readData";
import { rtdb, auth, app, firestore, firestoreDB } from  '../database/RTDB';
import firebase from 'firebase/app';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';


export default ({ navigation }) => {
 
  const [users, setUsers] = React.useState([]);
  const [ready, setReady] = React.useState(false);


  // Effect that forces screen to reload when we navigate to it
  useEffect(() => {
		const unsubscribe = navigation.addListener("tabPress", () => {
      setUsers([]);
      setReady(false);
		});
		return unsubscribe;
	}, [navigation]);


  // get the conversation from matches list
  const initializeConversations = async () => {
    const ids = await getMatchesAsync(auth.currentUser.email);
    const profiles = await getUserData(ids);
    setUsers(profiles);
    setReady(true);
  } // initializeConversations()



  if (!ready) {
    // load the conversations from the matches list
    initializeConversations();

    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>Loading...</Text>
      </View>
    );
  }
  
  

  return (
    <View style={styles.containerMessages}>
        <View style={styles.top}>
          <Text style={styles.title}>Messages</Text>
        </View>


        <FlatList
          data={users}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("ChatScreen", { profile:item, id:item.id, name:item.name})
            }>
              <Message profile={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          />
    </View>
  );

} // export default()









