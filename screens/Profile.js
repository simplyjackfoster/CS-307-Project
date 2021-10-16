import React, { useEffect, useState } from 'react';
import { StyleSheet,
				 Text,
				 View,
				 ScrollView,
				 RefreshControl,
				 Image,
				 TouchableOpacity,
				 Alert,
				 Switch
				} from 'react-native';
import { AuthContext } from "../context";
import Colors from "../constants/Colors";
import { NavigationAction } from '@react-navigation/routers';
import { renderIcon } from "../images/Icons";

// firebase imports
import { auth, rtdb } from '../database/RTDB';
import { deleteUser } from 'firebase/auth';
import { remove } from 'firebase/database';

// database read/write/remove imports
import { getProfileName } from '../database/readData';


/*
 * Function used to wait a certain amount of time
 * @param timeout -> the amount of milliseconds to wait
 */
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
} // wait()



/*
 * This is the screen where the user can view their profile.
 */
export default ( {navigation} ) => {

	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);
	const [refreshing, setRefreshing] = React.useState(false);
	const { userToken, setUserToken } = React.useContext(AuthContext);

	// Function that refreshes
	const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(250).then(() => setRefreshing(false));
  }, []);

	// Function that immediately refreshes Profile when we navigate
	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			setRefreshing(true);
			wait(1).then(() => setRefreshing(false));
		});
		return unsubscribe;
	}, [navigation]);


	return (
		<ScrollView style={styles.container}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
			}	
		>
			<TouchableOpacity
					style={styles.editProfile}
					onPress={() => navigation.push("EditProfile")}	
			>
				<Text style={styles.textEditProfile}>Edit Profile...</Text>
			</TouchableOpacity>
			<View style={styles.imageWrapper}>
				<Image source={ require("../images/default-profile-picture.jpeg") } style={styles.profilePic} />
				<Text style={styles.imageName}>
					{getProfileName(auth.currentUser.email)}
				</Text>
			</View>

			<View style={{marginTop: 40}}/>

			<View style={styles.infoWrapper}>
				<View style={styles.icon}>
					{renderIcon("envelope", 25, Colors.darkBlue)}
				</View>
				<Text style={styles.infoHeader}>Email:</Text>
				<Text style={styles.infoContent}>{auth.currentUser.email}</Text>
			</View>

			<View style={styles.infoWrapper}>
				<View style={styles.icon}>
					{renderIcon("phone-square", 25, Colors.darkBlue)}
				</View>
				<Text style={styles.infoHeader}>Phone:</Text>
				<Text style={styles.infoContent}>123-456-7890</Text>
			</View>

			<View style={styles.disableWrapper}>
				<View style={styles.icon}>
					{renderIcon("eye-slash", 25, Colors.darkBlue)}
				</View>
				<Text style={styles.disableText}>Ghost Mode</Text>
				<Switch
					trackColor={{ false: Colors.gray, true: Colors.lightBlue }}
					onValueChange={toggleSwitch}
					value={isEnabled}
					style={{transform: [{ scaleX: .80 }, { scaleY: .80 }] }}
				/>
			</View>

		</ScrollView>
	);
}

// styles
const styles = StyleSheet.create({

container: {
	backgroundColor: Colors.white,
},

editProfile: {
	alignSelf: 'flex-end',
},

textEditProfile: {
	margin: 20,
	fontSize: 18,
	color: Colors.lightBlue,
},

imageWrapper: {
},

imageName: {
	textAlign: 'center',
	fontSize: 25,
	fontWeight: 'bold',
},

profilePic: {
	width: 300,
	height: 300,
	borderRadius: 200, // makes image circular
	alignSelf: 'center',
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

disableWrapper: {
	flexDirection: 'row',
	marginBottom: 25,
	marginTop: 15,
	alignSelf: 'center',
},

disableText: {
	paddingLeft: 5,
	paddingRight: 10,
	fontSize: 25,
	textAlign: 'center',
	fontWeight: 'bold'
},

deleteWrapper: {
	paddingLeft: 100,
	paddingRight: 100,
},

deleteBuff: {
	alignItems: 'center',
	backgroundColor: 'blue',
	
},

deleteButtonText: {
	padding: 10,
	fontWeight: 'bold',
	fontSize: 15,
},

});