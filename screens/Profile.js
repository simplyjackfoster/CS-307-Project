import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
  Alert,
  Switch,
	Linking
} from 'react-native';
import { AuthContext } from "../context";
import Colors from "../constants/Colors";
import { NavigationAction } from '@react-navigation/routers';
import { renderIcon } from "../images/Icons";

// firebase imports
import { auth } from '../database/RTDB';

// database read/write/remove imports
import { getDataFromPath, getInstagramLink } from '../database/readData';
import { getID } from '../database/ID';


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

	const { userToken, setUserToken } = React.useContext(AuthContext);
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);
	const [isEnabled, setIsEnabled] = useState(false);
	const [refreshing, setRefreshing] = React.useState(false);
	const [profilePicture, setProfilePicture] = React.useState(null);
	
	const instagramLink = getInstagramLink(auth.currentUser.email);



	// Function that refreshes
	const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
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

			{/* Edit Profile Button */}
			<TouchableOpacity
					style={styles.editProfile}
					onPress={() => {
						navigation.push("EditProfile");
					}}	
			>
				<Text style={styles.textEditProfile}>Edit Profile...</Text>
			</TouchableOpacity>

			{/* Profile Picture */}
			<View style={styles.imageWrapper}>
				<Image style={styles.profilePic}
					source={{uri: getDataFromPath("users/" + getID(auth.currentUser.email) 
									 + "/Profile/Images/profile_picture")}}
				/>

				{/* Profile Name */}
				<Text style={styles.imageName}>
					{getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/profile_name")}
				</Text>
			</View>
			<View style={{marginTop: 40}}/>


			<View style={styles.fullInfoWrapper}>
				{/* Email: <email> */}
				<View style={styles.infoWrapper}>
					<View style={styles.icon}>
						{renderIcon("envelope", 25, Colors.royalBlue)}
					</View>
					<Text style={styles.infoHeaderEmail}>Email:</Text>
					<Text style={styles.infoContent}>{auth.currentUser.email}</Text>

				</View>
			</View>
			
			{/* Gender: <gender> */}
			<View style={styles.infoWrapper}>
				<View style={styles.icon}>
					{renderIcon("male", 25, Colors.royalBlue)}
				</View>
				<Text style={styles.infoHeaderGender}>Gender:</Text>
				<Text style={styles.infoContent}>
					{getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/gender")}
				</Text>
			</View>

			{/* Phone: <phone number> */}
			<View style={styles.infoWrapper}>
				<View style={styles.icon}>
					{renderIcon("phone-square", 25, Colors.royalBlue)}
				</View>
				<Text style={styles.infoHeaderPhone}>Phone:</Text>
				<Text style={styles.infoContent}>
					{getDataFromPath("users/" + getID(auth.currentUser.email) + "/Critical Information/phone")}
				</Text>
			</View>

			{/* Bio: <bio> */}
			<View style={
				getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/bio") ?
				(styles.infoWrapper)
				: ({display: 'none'})
				}>
				<View style={styles.icon}>
					{renderIcon("id-card", 25, Colors.royalBlue)}
				</View>
				<Text style={styles.infoHeaderBio}>Bio:</Text>
				<Text style={styles.infoContent}>
					{getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/bio")}
				</Text>
			</View>

			{/* Location: <location> */}
			<View style={
				getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/location") ?
				(styles.infoWrapper)
				: ({display: 'none'})
				}>
				<View style={styles.icon}>
					{renderIcon("map-pin", 25, Colors.royalBlue)}
				</View>
				<Text style={styles.infoHeaderLocation}>Location:</Text>
				<Text style={styles.infoContent}>
					{getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/location")}
				</Text>
			</View>

			{/* Graduation year: <graduation_year> */}
			<View style={
				getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/graduation_year") ?
				(styles.infoWrapper)
				: ({display: 'none'})
				}>
				<View style={styles.icon}>
					{renderIcon("graduation-cap", 25, Colors.royalBlue)}
				</View>
				<Text style={styles.infoHeader}>Graduation Year:</Text>
				<Text style={styles.infoContent}>
					{getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/graduation_year")}
				</Text>
			</View>

			{/* Major: <major> */}
			<View style={
				getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/major") ?
				(styles.infoWrapper)
				: ({display: 'none'})
				}>
				<View style={styles.icon}>
					{renderIcon("book", 25, Colors.royalBlue)}
				</View>
				<Text style={styles.infoHeaderMajor}>Major:</Text>
				<Text style={styles.infoContent}>
					{getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/major")}
				</Text>
			</View>

			{/* Preferred # of roommates */}
			<View style={
				getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/preferred_number_of_roommates") ?
				(styles.infoWrapper)
				: ({display: 'none'})
				}>
				<View style={styles.icon}>
					{renderIcon("users", 25, Colors.royalBlue)}
				</View>
				<Text style={styles.infoHeaderRoommates}>Preffered # of Roommates:</Text>
				<Text style={styles.infoContent}>
					{getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/preferred_number_of_roommates")}
				</Text>
			</View>

			{/* Instagram Link */}
			<View style={
				getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/instagram") ?
					(styles.infoWrapper)
					: ({display: 'none'})
				}>
				<View style={styles.icon}>
					{renderIcon("instagram", 25, Colors.royalBlue)}
				</View>
				<Text style={styles.infoHeaderIG}>Instagram:</Text>
				<Text style={styles.instagramLink}
					onPress={async () => {
						const supported = await Linking.canOpenURL(instagramLink);
						if (supported) {
							Linking.openURL(instagramLink);
						}
						else {
							console.log("Instagram Link doesn't exist");
						}
					}}
				>
					{getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/instagram")}
				</Text>
			</View>

			{/* Housing: <housing> */}
			<View style={
				getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/preferred_living_location") ?
				(styles.infoWrapper)
				: ({display: 'none'})
				}>
				<View style={styles.icon}>
					{renderIcon("home", 25, Colors.royalBlue)}
				</View>
				<Text style={styles.infoHeaderPrefHouse}>Preferred Housing:</Text>
				<Text style={styles.infoContent}>
					{getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/preferred_living_location")}
				</Text>
			</View>

			{/* Vaccination status: <vaccinated_status> */}
			<View style={
				getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/covid_vaccination_status") ?
				(styles.infoWrapper)
				: ({display: 'none'})
				}>
				<View style={styles.icon}>
					{renderIcon("medkit", 25, Colors.royalBlue)}
				</View>
				<Text style={styles.infoHeaderVax}>Vaccination Status:</Text>
				<Text style={styles.infoContent}>
					{getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/covid_vaccination_status")}
				</Text>
			</View>

			{/* Ghost Mode */}
			<View style={styles.disableWrapper}>
				<View style={styles.icon}>
					{renderIcon("eye-slash", 30, Colors.royalBlue)}
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

	); //return()
} // default export ()





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
		marginTop: 10,
	},
	
	profilePic: {
		width: 300,
		height: 300,
		borderRadius: 200, // makes image circular
		alignSelf: 'center',
	},

	icon: {
		paddingRight: 5,
	},

	infoWrapper: {
		textAlign: 'left',
		flexDirection: 'row',
		marginLeft: 25,
		marginBottom: 25,
	},
	
	infoHeader: {
		fontSize: 20,
		marginRight: 8,
		fontWeight: 'bold',
	},

	infoHeaderBio: {
		fontSize: 20,
		marginLeft: 4,
		marginRight: 8,
		fontWeight: 'bold',
	},

	infoHeaderEmail: {
		fontSize: 20,
		marginLeft: 7,
		marginRight: 8,
		fontWeight: 'bold',
	},

	infoHeaderGender: {
		fontSize: 20,
		marginLeft: 17,
		marginRight: 8,
		fontWeight: 'bold',
	},

	infoHeaderIG: {
		fontSize: 20,
		marginLeft: 8,
		marginRight: 8,
		fontWeight: 'bold',
	},

	infoHeaderLocation: {
		fontSize: 20,
		marginLeft: 20,
		marginRight: 8,
		fontWeight: 'bold',
	},

	infoHeaderMajor: {
		fontSize: 20,
		marginLeft: 10,
		marginRight: 8,
		fontWeight: 'bold',
	},

	infoHeaderPhone: {
		fontSize: 20,
		marginLeft: 11,
		marginRight: 8,
		fontWeight: 'bold',
	},

	infoHeaderPrefHouse: {
		fontSize: 20,
		marginLeft: 12,
		marginRight: 8,
		fontWeight: 'bold',
	},

	infoHeaderRoommates: {
		fontSize: 20,
		marginLeft: 8,
		marginRight: 8,
		fontWeight: 'bold',
	},

	infoHeaderVax: {
		fontSize: 20,
		marginLeft: 10,
		marginRight: 8,
		fontWeight: 'bold',
	},

	infoContent: {
		flex: 1,
		flexWrap: 'wrap',
		fontSize: 20,
		marginRight: 25,
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


	/* Instagram Link Text */
	instagramLink: {
		flex: 1,
		flexWrap: 'wrap',
		fontSize: 20,
		marginRight: 25,
		color: Colors.blue,
		textDecorationLine: 'underline',
	},

});