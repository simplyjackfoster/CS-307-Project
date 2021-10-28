import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import CardItem from '../components/CardItem';
import Colors from "../constants/Colors";
import { renderIcon } from "../images/Icons";


/*
 * This is the screen where the user can swipe on other
 * users profiles.
 */
export default () => {
	return (
		<View style={styles.container}>

      <View style={styles.contentContainer}>
        <CardItem id={"test"}/>
      </View>



      {/* <View style={styles.contentContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              width: 250, height: 300,
              uri: "https://picsum.photos/200/300"}}
          />
        </View>

          <View style={styles.nameWrapper}>
            <Text style={styles.nameText}>
              John Doe
            </Text>
			    </View>
      </View>

        {/* Phone: <phone number> */}
			{/* <View style={styles.infoWrapper}>
				<View style={styles.icon}>
					{renderIcon("phone-square", 25, Colors.darkBlue)}
				</View>
				<Text style={styles.infoHeader}>Some:</Text>
				<Text style={styles.infoContent}>text_here1</Text>
			</View> */}

      {/* <View style={styles.infoWrapper}>
				<View style={styles.icon}>
					{renderIcon("phone-square", 25, Colors.darkBlue)}
				</View>
				<Text style={styles.infoHeader}>Some:</Text>
				<Text style={styles.infoContent}>text_here2</Text>
			</View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.dislikeWrapper} onPress={() => {
          console.log("Dislike pressed")
        }}>
          {renderIcon("times", 60, Colors.red)}
        </TouchableOpacity>

        <TouchableOpacity style={styles.likeWrapper} onPress={() => {
          console.log("Like pressed")
        }}>
          {renderIcon("gratipay", 60, Colors.green)}
        </TouchableOpacity>
      </View> */}


		</View>
	);
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
    marginHorizontal: '5%',
    marginVertical: '7%',
  },

  footer: {
    flex: 1,
    justifyContent: 'space-evenly',
		flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },

  /* Dislike Button */
  dislikeWrapper: {
    paddingRight: 10,
  },

  /* Like Button */
  likeWrapper: {
    paddingLeft: 10,
  },


});