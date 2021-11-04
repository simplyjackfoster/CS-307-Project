import React from 'react';
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';



export default InterestList = (props) => {

	const functionHandler = (data) => {
		props.passChildData(data);
	}	

	return (
		<View>
			<TouchableOpacity
				onPress={() => functionHandler("mmmm")}
			>
				<Text>button</Text>
			</TouchableOpacity>
		</View>
	);

} // sendData