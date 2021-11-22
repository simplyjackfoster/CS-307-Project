import React from 'react';
import {
  ScrollView,
  Text,
  ImageBackground,
  View,
  FlatList
} from 'react-native';
import Message from '../components/Message';
import styles from '../assets/index';

export default ({ navigation }) =>{
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
        <ScrollView>
          <View style={styles.top}>
            <Text style={styles.title}>Messages</Text>
          </View>
          <FlatList
            data={listOfUsers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Message id={item.id} />
            )}
          />
        </ScrollView>
      </View>
    </ImageBackground>
  );
}