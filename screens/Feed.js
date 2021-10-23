import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
'/.'
import Colors from "../constants/Colors";


/*
 * This is the screen where the user can swipe on other
 * users profiles.
 */
export default () => {
	return (
		<View style={styles.container}>

			<View style={styles.imageWrapper}>
				<Image
					source={{
            width: 200, height: 300,
            uri: "https://picsum.photos/200/300"}}
				/>
        </View>

        <View style={styles.nameWrapper}>
          <Text style={styles.nameText}>
					  John Doe
				  </Text>
			  </View>


		</View>
	);
}




// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
  },

  imageWrapper: {
    paddingTop: 30,
  },

  nameWrapper: {
    paddingTop: 15,
  },

  nameText: {
    fontSize: 25,
  },

});