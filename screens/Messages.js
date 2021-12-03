import React,{useState,useEffect, useContext} from 'react';
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
import { rtdb, auth, app, firestore, firestoreDB} from  '../database/RTDB';
import firebase from 'firebase/app';
import { collection, doc, setDoc, getDocs} from'firebase/firestore';
//import firestore from '@react-native-firebase/firestore';
import { MessageUserContext } from '../context';
//const getName=(props)=>

export default ({ navigation}) =>{
  
  // const {messageUserToken, setMessageUserToken}= React.useContext(MessageUserContext);
  // const navigateToChat = (uid) => {
  //   console.log("hjgsdjkfgsjkdhfg");
  //   setMessageUserToken(String(uid));
  //   console.log("hjgsdjkfgsjkdhfg");
  //   console.log(messageUserToken);
  //   console.log("hjgsdjkfgsjkdhfg");
  //   navigation.navigate("ChatScreen");
  // }
  
  /*
  const[users,setUsers]=useState(null)
  const getUsers = async ()=>{
    const querySanp = await firebfirestore().collection('users').get()
    const allusers = querySanp.docs.map(docSnap=>docSnap.data())
    setUsers(allusers)
  }
  */

 const[users,setUsers] = useState([]);
  useEffect(()=>{
    const accessDocuments = async () =>{
      const querySnapshot = await getDocs(collection(firestoreDB,'users'));
      const allusers = querySnapshot.docs.map(docSnap=>docSnap.data())
      setUsers(querySnapshot.docs.map((doc) => ({ ...doc.data(),id: doc.id})));
      console.log(allusers);
    };
    accessDocuments();
  },[])
  
  
  return (
    <ImageBackground
      style={styles.bg}
    >
      <View style={styles.containerMessages}>
          <View style={styles.top}>
            <Text style={styles.title}>Messages</Text>
          </View>
          <FlatList
            data={users}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate("ChatScreen", {id:item.username, name: item.name})
              }>
                <Message id={item.username} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
      </View>
    </ImageBackground>
  );
}
