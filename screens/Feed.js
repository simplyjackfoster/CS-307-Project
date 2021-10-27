import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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
      <CardItem id={"thylan"}/>
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

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  contentContainer: {
    flex: 1,
  },

  footer: {
    justifyContent: 'space-evenly',
		flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },

  dislikeWrapper: {
    paddingRight: 10,
  },

  likeWrapper: {
    paddingLeft: 10,
  },

  imageWrapper: {
    paddingTop: 30,
    alignItems: "center",
  },

  nameWrapper: {
    paddingTop: 15,
    alignItems: "center",
    paddingBottom: 15,
  },

  nameText: {
    fontSize: 40,
  },

  infoWrapper: {
		textAlign: 'left',
		flexDirection: 'row',
		marginLeft: 25,
		marginBottom: 25,
	},

	icon: {
		paddingRight: 5,
	},

	infoHeader: {
		fontSize: 20,
		marginLeft: 8,
		marginRight: 8,
		fontWeight: 'bold',
	},

	infoContent: {
		alignSelf: 'flex-start',
		fontSize: 20,
	},

});