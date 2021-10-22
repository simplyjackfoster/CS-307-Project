import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import Colors from "../constants/Colors";


/*
 * This is the screen where the user can view their matches.
 */
export default ( {navigation} ) => {
  const matches_list = {
    // Sample data
    matches: [
      { item: "John Smith", major: "Computer Science", id: 1 },
      { item: "Sarah Davis", major: "Data Science", id: 2 },
    ],
  };
	return (
		<View style={styles.container}>
      <ScrollView>
      {matches_list.matches.map((item, index) => (
            <View key={item.id}>
              <View style={styles.summary}>
                <Text style={styles.summaryText}>
                  {item.item} <Text style={styles.majorText}>
                      Major: {item.major}</Text>
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
		</View>
	);
}



// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  majorText: {
    color: Colors.orange,
    fontWeight: 'normal',
    fontSize: 12,
  },

});
