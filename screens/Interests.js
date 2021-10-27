import React, {use} from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';





export default ( {navigation } ) => {

	const data = "music";
	const [music, setMusic] = React.useState(data == "music" ? (true) : (false));
	console.log("music = " + music);

	const [workingOut, setWorkingOut] = React.useState(false);
	const [yoga, setYoga] = React.useState(false);


	


	return (
		<View style={styles.container}>
			<Text style={styles.instructionsText}>Select Up to 5 Interests!</Text>



			<View style={styles.interestsConainer}>
				{/* Music */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton} 
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Music</Text>
					</TouchableOpacity>
				</SafeAreaView>				

				{/* Working Out */}
				<SafeAreaView>
					<TouchableOpacity style={styles.selectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Working Out</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Yoga */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Yoga</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Swimming */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Swimming</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Football */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Football</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Netflix */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Netflix</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Theatre */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Theatre</Text>
					</TouchableOpacity>
				</SafeAreaView>


				{/* Comedy */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Comedy</Text>
					</TouchableOpacity>
				</SafeAreaView>


				{/* Outdoors */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Outdoors</Text>
					</TouchableOpacity>
				</SafeAreaView>


				{/* Shopping */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Shopping</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Politics */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Politics</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Cycling */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Cycling</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Art */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Art</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Dancing */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Dancing</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Soccer */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Soccer</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Cooking */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Cooking</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Spirituality */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Spirituality</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Astrology */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Astrology</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Bars */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Bars</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Coffee */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Coffee</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Watching Sports */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Watching Sports</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Reading */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Reading</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Surfing */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Surfing</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Gaming */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Gaming</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Photography */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Photography</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Skateboarding */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Skateboarding</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Gambling */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Gambling</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Chess */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Chess</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Movies */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Movies</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Golf */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Golf</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Writing */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Writing</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Climbing */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Climbing</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Skiing */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Skiing</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Snowboarding */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Snowboarding</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Social Media */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Social Media</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Running */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Running</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Rowing */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Rowing</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Walking */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Walking</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Concerts */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Concerts</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Basketball */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Basketball</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Fishing */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Fishing</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Water Sports */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Water Sports</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Racing */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Racing</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Programming */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Programming</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Baseball */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Baseball</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Hockey */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Hockey</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Frisbee */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Frisbee</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Investing */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Investing</Text>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Greek Life */}
				<SafeAreaView>
					<TouchableOpacity style={styles.unselectedInterestButton}
						onPress={() => {}}
					>
						<Text style={styles.interestText}>Greek Life</Text>
					</TouchableOpacity>
				</SafeAreaView>


			</View>
		</View>
	);
} // export default () 





const styles = StyleSheet.create({

	/* Container styles */
	container: {
		flex: 1,	
	},

	interestsConainer: {
		flex: 1,
		marginHorizontal: 30,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},


	/* Instructions Text */
	instructionsText: {
		alignSelf: 'center',
		fontSize: 20,
		marginVertical: 35,
	},


	/* Interest Buttons */
	interestText: {
		fontSize: 15,
		textAlign: 'center',
	},

	unselectedInterestButton: {
		borderWidth: 1,
		borderRadius: 20,
		marginHorizontal: 2,
		marginBottom: 10,
		padding: 7,
		backgroundColor: Colors.offWhite,
	},

	selectedInterestButton: {
		borderWidth: 1,
		borderRadius: 20,
		marginHorizontal: 3,
		marginBottom: 10,
		padding: 7,
		backgroundColor: Colors.green,
	},



});

