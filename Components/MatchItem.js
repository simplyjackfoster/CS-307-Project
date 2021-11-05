import React from 'react';
import { 
    StyleSheet,
    Text, 
    View,
    Image,
    Button,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { getDataFromPath, getInstagramLink } from "../database/readData";
import Colors from "../constants/Colors";
import { renderIcon } from "../images/Icons";
import HomeTabs from '../navigation/HomeTabs';



const MatchItem = (props) => {
    //const { userToken, setUserToken }  = React.useContext();
    const uid = props.id;
    const profile_picture = getDataFromPath("users/" + uid + "/Profile/Images/profile_picture");
    const name = getDataFromPath("users/" + uid + "/Profile/profile_name");
    const location = getDataFromPath("users/" + uid + "/Profile/location");
    const major = getDataFromPath("users/" + uid + "/Profile/major");
    const bday = getDataFromPath("users/" + uid + "/Critical Information/birthday");

    var age;
    /* Used for age calculation */
    if(bday != null) { // Seems redundant, but during loading page, bday is briefly null
        const bday_day = bday.substring(0, 2)
        const bday_month = bday.substring(3, 5)
        const bday_year = bday.substring(6)

        const date = new Date();
        const curr_day = date.getDate();
        const curr_month = date.getMonth() + 1;
        const curr_year = date.getFullYear();
        age = curr_year - bday_year;

        /* Giga brain math to calculate true age */
        if(bday_month >= curr_month) {
            if(bday_day > curr_day) {
                age -= 1
            }
        }
    }


    return (
        <View style ={styles.containerMatch}>
            <View style={styles.container}>
                <Image style = {styles.profileImage}source={{uri: profile_picture}}/>
                <Text>{name}</Text>
                <Text style={styles.description}>Hometown: {location}, Major: {major}</Text>
                <Button title={"      💬"} onPress={() => Alert.prompt("Message", "Send your message",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Send",
          }
        ],
        )}></Button>
            </View>
        </View>
    );
}

export default MatchItem;

// styles
const styles = StyleSheet.create({

    /* Container styles */
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 25,
    },

    description: {
        color: Colors.gray,
        fontSize: 12,
        paddingTop: 5,
    },
    containerMatch: {
        justifyContent: "space-between",
		paddingHorizontal: 10
    },
    profileImage: {
        borderRadius: 30,
		width: 60,
		height: 60,
		marginRight: 20,
		marginVertical: 15,
        paddingTop: 5,
        alignSelf: 'flex-start',
    },
    editProfile: {
		alignSelf: 'flex-end',
	},

	textEditProfile: {
		margin: 20,
		fontSize: 18,
		color: Colors.lightBlue,
	},
    button: {
        backgroundColor: Colors.green,
    }
});
