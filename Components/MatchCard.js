import React from 'react';
import { 
    StyleSheet,
    Text, 
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { getDataFromPath, getInstagramLink } from "../database/readData";
import Colors from "../constants/Colors";
import { renderIcon } from "../images/Icons";



const CardItem = (props) => {
    
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
            <Image style = {styles.profileImage}
                source={{uri: profile_picture}}
            />
            <View style={styles.container}>
                <Text>{name}</Text>
                <Text style={styles.description}>{location}, {major}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}
                >
                    <Text>Send a message</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CardItem;

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
		flex: 1,
		paddingHorizontal: 10
    },
    profileImage: {
        borderRadius: 30,
		width: 60,
		height: 60,
		marginRight: 20,
		marginVertical: 15
    },
});
