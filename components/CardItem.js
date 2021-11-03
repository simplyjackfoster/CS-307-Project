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
    const preferredLivingLocation = getDataFromPath("users/" + uid + "/Profile/preferred_living_location");
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


                {/* Bio (optional) */}
                <View style=
                    {bio ? (
                        styles.bioWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <Text style={styles.bioContent}>{bio}</Text>
                </View>


                {/* Graduation year (optional) */}
                <View style={
                    graduationYear ? (
                        styles.graduationYearWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <View>
                        {renderIcon("graduation-cap", 25, Colors.darkBlue)}
                    </View>
                    <Text style={styles.graduationYearContent}>Class of {graduationYear}</Text>
                </View>


                {/* Major (optional) */}
                <View style=
                    {major ? (
                        styles.majorWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <View>
                        {renderIcon("book", 25, Colors.darkBlue)}
                    </View>
                    <Text style={styles.majorContent}>Major: {major}</Text>
                </View>


                {/* Location (optional) */}
                <View style=
                    {location ? (
                        styles.locationWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <View>
                        {renderIcon("map-pin", 25, Colors.darkBlue)}
                    </View>
                    <Text style={styles.locationContent}>Location: {location}</Text>
                </View>


                {/* Preferred # of Roommates (optional) */}
                <View style=
                    {preferredNumRoommates ? (
                        styles.preferredNumRoommatesWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <View>
                        {renderIcon("users", 25, Colors.darkBlue)}
                    </View>
                    <Text style={styles.preferredNumRoommatesContent}>Preferred # of Roommates: {preferredNumRoommates}</Text>
                </View>


                {/* Preferred living location (optional) */}



                {/* Instagram (optional) */}
                <View style=
                    {instagram ? (
                        styles.instagramWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <TouchableOpacity style={styles.instagramButton}
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
                        <View style={styles.viewInstagramWrapper}>
                            {renderIcon("instagram", 25, "#ff00ff")}
                            <Text style={styles.viewInstagramText}>View Instagram</Text>
                        </View>
                        <Text style={styles.instagramUsernameText}>{instagram}</Text>
                    </TouchableOpacity>
                </View>


                {/* Report User */}
                <View style={styles.reportUserWrapper}>
                        <Text style={styles.reportUserText}
                            onPress={() => {
                                Alert.alert("Report User", "Are you sure you want to report " + name + "?",
                                [{ text: "No" }, {text: "Yes"}]); 
                            }}
                        >
                            Report User
                        </Text>
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


    /* Bio */
    bioWrapper: {
        paddingTop: 20,
    },

    bioContent: {
       fontSize: 15, 
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


    /* Location */
    locationWrapper: {
        paddingTop: 20,
        paddingLeft: 5,
        flexDirection: 'row',
    },

    locationContent: {
        paddingLeft: 20,
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


    /* Instagram */
    instagramWrapper: {
        flexDirection: 'row',
        alignSelf: 'center',
        paddingTop: 20,
    },

    instagramButton: {
        marginTop: 20,
        paddingHorizontal: 25,
        paddingTop: 5,
        paddingBottom: 10,
        borderRadius: 20,
        borderWidth: 1.15,
        borderColor: Colors.fuchsia,
    },

    viewInstagramWrapper: {
        flexDirection: 'row',
        alignSelf: 'center',
    },

    viewInstagramText: {
        fontSize: 15,
        paddingTop: 5,
        paddingLeft: 12,
    },

    instagramUsernameText: {
        color: Colors.darkGray,
        fontSize: 12,
        paddingTop: 3,
        alignSelf: 'center',
    },


    /* Report User */
    reportUserWrapper: {
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 30,
    },

    reportUserText: {
        alignSelf: 'center',
        fontWeight: '600',
        color: Colors.lightRed,
        fontSize: 14,
    }


});