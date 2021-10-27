import React from 'react';
import { StyleSheet, View, Text } from 'react-native';




export default ( {navigation } ) => {

	return (
		<View style={styles.container}>
			<Text>Interests</Text>
		</View>
	);
} // export default () 



const styles = StyleSheet.create({

	// Container styles
	container: {
		flex: 1,	
	},

});

