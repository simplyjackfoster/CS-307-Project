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
import { auth } from '../database/RTDB';
import { getDataFromPath, getInstagramLink, getInterestListProfile, getFacebookLink, getLinkedInLink } from '../database/readData';
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
	const facebookLink = getFacebookLink(auth.currentUser.email);
	const linkedInLink = getLinkedInLink(auth.currentUser.email);


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

			{/* Profile Picture */}
			<View>
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

			{/* Preview Profile Button*/}
			<View>
            	<TouchableOpacity
              		onPress={() => navigation.push("ViewProfile")}
              		style={styles.buttonPreview}>
              	<Text style={styles.textPreview}>Preview Profile</Text>
            	</TouchableOpacity>
          	</View>

			  {/* Edit Profile Button */}
			<TouchableOpacity
					style={styles.editProfile}
					onPress={() => {
						navigation.push("EditProfile");
					}}	
			>
				<Text style={styles.textEditProfile}>Edit Profile...</Text>
			</TouchableOpacity>


			{/* Email: <email> */}
			<View style={styles.fullInfoWrapper}>
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
				<View style={styles.iconGender}>
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

			{/* Facebook Link */}
			<View style={
				getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/facebook") ?
					(styles.infoWrapper)
					: ({display: 'none'})
				}>
				<View style={styles.iconFB}>
					{renderIcon("facebook", 25, Colors.royalBlue)}
				</View>
				<Text style={styles.infoHeaderFB}>Facebook:</Text>
				<Text style={styles.instagramLink}
					onPress={async () => {
						const supported = await Linking.canOpenURL(facebookLink);
						if (supported) {
							Linking.openURL(facebookLink);
						}
						else {
							console.log("Facebook Link doesn't exist");
						}
					}}
				>
					{getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/facebook")}
				</Text>
			</View>

			{/* LinkedIn Link */}
			<View style={
				getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/linkedIn") ?
					(styles.infoWrapper)
					: ({display: 'none'})
				}>
				<View style={styles.iconLI}>
					{renderIcon("linkedin", 25, Colors.royalBlue)}
				</View>
				<Text style={styles.infoHeaderLI}>LinkedIn:</Text>
				<Text style={styles.instagramLink}
					onPress={async () => {
						const supported = await Linking.canOpenURL(linkedInLink);
						if (supported) {
							Linking.openURL(linkedInLink);
						}
						else {
							console.log("LinkedIn Link doesn't exist");
						}
					}}
				>
					{getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/linkedIn")}
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
				<View style={styles.iconLocation}>
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
				<View style={styles.iconMajor}>
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

			{/* Viewing users from <age_range_min> to <age_range_max> */}
			{/* Due to edit profile logic, only need to ensure 1 field exists below */}
			<View style={
				getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/age_min") ?
				(styles.infoWrapper)
				: ({display: 'none'})
				}>
				<View style={styles.icon}>
					{renderIcon("binoculars", 25, Colors.royalBlue)}
				</View>
				<Text style={styles.infoHeaderRoommates}>Seeing users between:</Text>
				<Text style={styles.infoContentAgeHead}>
					{getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/age_min")}
				</Text>
				<Text style={styles.infoContentAgeMiddle}> and </Text>
				<Text style={styles.infoContentAgeTail}>
					{getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/age_max")}
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

			{/* Interests: <interest_list> */}
			{/* "users/" + id + "/Profile/Interests" */}
			<View style={
				getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/Interests/interest1") ?
				(styles.infoWrapper)
				: ({display: 'none'})
				}>
				<View style={styles.icon}>
					{renderIcon("user-plus", 25, Colors.royalBlue)}
				</View>
				<Text style={styles.infoHeaderVax}>Interests:</Text>
				<Text style={styles.infoContent}>
					{getInterestListProfile(auth.currentUser.email)} 
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
		alignSelf: 'center',
		borderWidth: 1,
		borderRadius: 25,
		margin: 5,
		marginBottom: 15,
		marginTop: 5,
		padding: 10,
		backgroundColor: Colors.lightBlue,
	},

	textEditProfile: {
		fontSize: 16,
		alignSelf: 'center',
	},

	imageName: {
		textAlign: 'center',
		fontSize: 25,
		fontWeight: '500',
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

	iconFB: {
		paddingRight: 2,
		paddingLeft: 3,
	},

	iconLI: {
		paddingRight: 2,
		paddingLeft: 3,
	},

	iconGender: {
		paddingLeft: 4,
		paddingRight: 1,
	},

	iconLocation: {
		paddingLeft: 5,
	},

	iconMajor: {
		paddingLeft: 3,
		paddingRight: 2,
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
		fontWeight: '500',
		fontStyle: 'italic',
	},

	infoHeaderBio: {
		fontSize: 20,
		marginLeft: 4,
		marginRight: 8,
		fontWeight: '500',
		fontStyle: 'italic',
	},

	infoHeaderEmail: {
		fontSize: 20,
		marginLeft: 7,
		marginRight: 8,
		fontWeight: '500',
		fontStyle: 'italic',
	},

	infoHeaderGender: {
		fontSize: 20,
		marginLeft: 17,
		marginRight: 8,
		fontWeight: '500',
		fontStyle: 'italic',
	},

	infoHeaderIG: {
		fontSize: 20,
		marginLeft: 12,
		marginRight: 8,
		fontWeight: '500',
		fontStyle: 'italic',
	},

	infoHeaderFB: {
		fontSize: 20,
		marginLeft: 18,
		marginRight: 8,
		fontWeight: '500',
		fontStyle: 'italic',
	},

	infoHeaderLI: {
		fontSize: 20,
		marginLeft: 10,
		marginRight: 8,
		fontWeight: '500',
		fontStyle: 'italic',
	},

	infoHeaderLocation: {
		fontSize: 20,
		marginLeft: 20,
		marginRight: 8,
		fontWeight: '500',
		fontStyle: 'italic',
	},

	infoHeaderMajor: {
		fontSize: 20,
		marginLeft: 10,
		marginRight: 8,
		fontWeight: '500',
		fontStyle: 'italic',
	},

	infoHeaderPhone: {
		fontSize: 20,
		marginLeft: 11,
		marginRight: 8,
		fontWeight: '500',
		fontStyle: 'italic',
	},

	infoHeaderPrefHouse: {
		fontSize: 20,
		marginLeft: 12,
		marginRight: 8,
		fontWeight: '500',
		fontStyle: 'italic',
	},

	infoHeaderRoommates: {
		fontSize: 20,
		marginLeft: 8,
		marginRight: 8,
		fontWeight: '500',
		fontStyle: 'italic',
	},

	infoHeaderVax: {
		fontSize: 20,
		marginLeft: 8,
		marginRight: 8,
		fontWeight: '500',
		fontStyle: 'italic',
	},

	infoContent: {
		flex: 1,
		flexWrap: 'wrap',
		fontSize: 20,
		marginRight: 25,
	},

	infoContentAgeHead: {
		fontSize: 20,
	},

	infoContentAgeMiddle: {
		fontSize: 20,
	},

	infoContentAgeTail: {
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


	/* Instagram Link Text */
	instagramLink: {
		flex: 1,
		flexWrap: 'wrap',
		fontSize: 20,
		marginRight: 25,
		color: Colors.blue,
		textDecorationLine: 'underline',
	},

	/* Preview CSS */
	buttonPreview: {
		borderWidth: 1,
		borderRadius: 25,
		margin: 5,
		alignSelf: 'center',
		marginBottom: 5,
		marginTop: 0,
		padding: 10,
		backgroundColor: Colors.lightBlue,
		
	  },

	  textPreview: {
		fontSize: 16,
		alignSelf: 'center',
	  },

});