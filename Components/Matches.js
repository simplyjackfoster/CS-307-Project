import React from 'react';
import { 
    StyleSheet,
    Text, 
    View, 
    ScrollView,
    Image,
    Linking,
    TouchableOpacity,
    Alert
} from 'react-native';
import { getDataFromPath, getInstagramLink } from "../database/readData";
import Colors from "../constants/Colors";
import { renderIcon } from "../images/Icons";



const CardItem = (props) => {
    
    const uid = props.id;
    const profile_picture = getDataFromPath("users/" + uid + "/Profile/Images/profile_picture");
    const name = getDataFromPath("users/" + uid + "/Profile/profile_name");
    const location = getDataFromPath("users/" + uid + "/Profile/location");
    const graduationYear = getDataFromPath("users/" + uid + "/Profile/graduation_year");
    const major = getDataFromPath("users/" + uid + "/Profile/major");
    const bio = getDataFromPath("users/" + uid + "/Profile/bio");
    const vaccination = getDataFromPath("users/" + uid + "/Profile/covid_vaccination_status");
    const preferredNumRoommates = getDataFromPath("users/" + uid + "/Profile/preferred_number_of_roommates");    
    const instagram = getDataFromPath("users/" + uid + "/Profile/instagram");
    const instagramLink = getInstagramLink(uid);
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
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>


                {/* Profile Picture */}
                <View style={styles.imageWrapper}>
                    <Image style={styles.profilePic}
                        source={{uri: profile_picture}}
                    />
                </View>


                {/* Name and Age */}
                <View style={styles.nameWrapper}>
                    <Text style={styles.nameText}>{name}, {age}</Text>
                </View>


                


            </View>
        </ScrollView>
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

    


});
