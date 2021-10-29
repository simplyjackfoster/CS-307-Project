import React from 'react';
import { 
    StyleSheet,
    Text, 
    View, 
    SafeAreaView,
    ScrollView,
    Image,
} from 'react-native';
import { getDataFromPath } from "../database/readData";
import Colors from "../constants/Colors";
import { renderIcon } from "../images/Icons";



const CardItem = (props) => {
    
    const uid = props.id;
    const name = getDataFromPath("users/" + uid + "/Profile/profile_name");
    const location = getDataFromPath("users/" + uid + "/Profile/location");
    const graduationYear = getDataFromPath("users/" + uid + "/Profile/graduation_year");
    const major = getDataFromPath("users/" + uid + "/Profile/major");
    const bio = getDataFromPath("users/" + uid + "/Profile/bio");
    const vaccination = getDataFromPath("users/" + uid + "/Profile/covid_vaccination_status");
    const preferredRoommates = getDataFromPath("users/" + uid + "/Profile/preferred_number_of_roommates");    
    const bday = getDataFromPath("users/" + uid + "/Critical Information/birthday");

    var age
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
        <ScrollView style={styles.container}>
            <View style={styles.contentContainer}>
                {/* Profile Picture */}
                <SafeAreaView style={styles.imageWrapper}>
                    <Image style={styles.profilePic}
                        source={{uri: getDataFromPath("users/" + uid + "/Profile/Images/profile_picture")}}
                    />
                </SafeAreaView>

                {/* Name and Age */}
                <SafeAreaView style={styles.nameWrapper}>
                    <Text style={styles.nameText}>{name}, {age}</Text>
                </SafeAreaView>


                {/* Location */}
                <View style={styles.locationWrapper}>
                    <View style={styles.icon}>
                        {renderIcon("map-pin", 25, Colors.darkBlue)}
                    </View>
                    <Text style={styles.locationContent}>Location: {location}</Text>
                </View>

                {/* Graduation year */}
                <View style={styles.graduationYearWrapper}>
                    <View style={styles.icon}>
                        {renderIcon("graduation-cap", 25, Colors.darkBlue)}
                    </View>
                    <Text style={styles.graduationYearContent}>Graduation Year: {graduationYear}</Text>
                </View>

                {/* Major */}
                <View style={styles.majorWrapper}>
                    <View style={styles.icon}>
                        {renderIcon("book", 25, Colors.darkBlue)}
                    </View>
                    <Text style={styles.majorContent}>Major: {major}</Text>
                </View>

                {/* Preferred # of Roommates */}
                <View style={styles.preferredNumRoommatesWrapper}>
                    <View style={styles.icon}>
                        {renderIcon("users", 25, Colors.darkBlue)}
                    </View>
                    <Text style={styles.preferredNumRoommatesContent}>Preferred roommate #: {preferredRoommates}</Text>
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

    contentContainer: {
        flex: 1,
        alignSelf: 'center',
        width: 325,
    },


    /* Profile Picture */
    profilePic: {
        width: 325,
        height: 325, 
        borderRadius: 25,
        marginTop: 35,
        marginBottom: 10,
        alignSelf: 'center',
    },


    /* Name */
    nameWrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },

    nameText: {
        fontSize: 30,
        alignSelf: 'flex-start',
    },


    /* Location */
    locationWrapper: {
        paddingTop: 20,
        paddingLeft: 10,
        flexDirection: 'row',
    },

    locationContent: {
        paddingLeft: 15,
        fontSize: 20,
    },


    /* Graduation Year */
    graduationYearWrapper: {
        paddingTop: 20,
        flexDirection: 'row',
    },

    graduationYearContent: {
        paddingLeft: 5,
        fontSize: 20,
    },


    /* Major */
    majorWrapper: {
        paddingTop: 20,
        flexDirection: 'row',
    },

    majorContent: {
        paddingLeft: 15,
        fontSize: 20,
    },


    /* Preferred Roommates */
    preferredNumRoommatesWrapper: {
        paddingTop: 20,
        flexDirection: 'row',
    },

    preferredNumRoommatesContent: {
        paddingLeft: 15,
        fontSize: 20,
    },


});