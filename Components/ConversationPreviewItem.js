import React from 'react';

import { Text, View, Image } from 'react-native';

const Message = ({ image, lastMessage, name }) => {
  return (
    <View style={styles.componentMessage}>
      <Image source={image} style={profileImage} />
      <View>
        <Text>{name}</Text>
        <Text style={styles.message}>{lastMessage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    profileImage: {
        borderRadius: 30,
        width: 60,
        height: 60,
        marginRight: 20,
        marginVertical: 15,
        paddingTop: 5,
        alignSelf: 'flex-start',
    },
    componentMessage: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
		paddingHorizontal: 10,
		width: DIMENSION_WIDTH - 100
	},
    message: {
		color: GRAY,
		fontSize: 12,
		paddingTop: 5
	},
});

export default Message;