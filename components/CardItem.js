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
import Animated, { round } from 'react-native-reanimated';

import { getDataFromPath, getInstagramLink, getInterests, getQuestionnaire } from "../database/readData";
import Colors from "../constants/Colors";
import { renderIcon } from "../images/Icons";
import { reportUser } from '../database/writeData';
import { auth } from '../database/RTDB';
import { getID } from '../database/ID';



export const CardItem = (props) => {
    const { likeOpacity, nopeOpacity } = props;
    
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
    const reports = getDataFromPath("reported/" + uid + "/num_reports");
    const interests = getInterests(uid);

    // get my own questionnaire as well as the other user's
    const myUid = getID(auth.currentUser.email);
    const myQuestionnaire = getQuestionnaire(myUid);
    const questionnaire = getQuestionnaire(uid);

    // border color based on the compatibility score (0-33 score is red(0), 34-67 score is yellow(1), 68-100 score is green(2))
    var compatibility = -1;
    var borderColor = -1; 

    /*
     * Utilize the questionnaire data of both users and get a compatibility score between 0 and 100
     * while also setting
     */
    const values = [
        -1,
        /* 1 */3,
        /* 2 */3,
        /* 3 */4,
        /* 4 */4,
        /* 5 */2,
        /* 6 */2,
        /* 7 */3,
        /* 8 */1,
        /* 9 */3,
        /* 10 */2,
        /* 11 */2,
        /* 12 */1,
        /* 13 */1,
    ];

    // keep track of difference adjusted for value and the sum of those differences
    let diff = 0;
    let sumOfDiff = 0;

    // sum up the differences
    for (let i = 1; i <= 13; i++) {
        diff = values[i] * (questionnaire[i] - myQuestionnaire[i]);
        if (diff < 0) diff = -diff;
        console.log("Diff " + i + " = " + diff);
        sumOfDiff += diff;
    }
    console.log("Sum of Differences: " + sumOfDiff);

    // turn the sum of differences (1-110) into a scale from 0 to 100
    const compatibilityScore = Math.round(100 - ((sumOfDiff / 108) * 100));
    console.log("Compatibility score between " + myUid + " and " + uid + ": " + compatibilityScore);

    // set the border color based on the score (0-33 is red(0), 34-67 is yellow(1), 68-100 is green(2))
    borderColor = Math.floor(compatibilityScore / 34);

    // set the global compatibility
    compatibility = compatibilityScore;






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


                {/* Compatibility Score (if in feed) */}
                <View style=
                    {myUid != uid ? (
                        styles.compatibilityScoreWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    {/* <View> */}
                        {/* <Text style={styles.compatibilityScoreText}>Compatibility: </Text> */}

                        <Text style=
                            {[styles.compatibilityScoreContent,
                            borderColor == 0 ? (
                                {borderColor: Colors.red}
                            ) : (
                                {borderColor: borderColor == 1 ? Colors.yellow : Colors.green}
                            )]}
                        >
                            {compatibilityScore}
                        </Text>
                    {/* </View> */}
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


                {/* Interests */} 
                <View style={styles.interestsContainer}>
                    <View style=
                        {interests[0] ? (
                            styles.interestWrapper
                        ) : (
                            {display: 'none'}
                        )}
                    >
                        <Text style={styles.interestText}>{interests[0]}</Text>
                    </View>
                    <View style=
                        {interests[1] ? (
                            styles.interestWrapper
                        ) : (
                            {display: 'none'}
                        )}
                    >
                        <Text style={styles.interestText}>{interests[1]}</Text>
                    </View>
                    <View style=
                        {interests[2] ? (
                            styles.interestWrapper
                        ) : (
                            {display: 'none'}
                        )}
                    >
                        <Text style={styles.interestText}>{interests[2]}</Text>
                    </View>
                    <View style=
                        {interests[3] ? (
                            styles.interestWrapper
                        ) : (
                            {display: 'none'}
                        )}
                    >
                        <Text style={styles.interestText}>{interests[3]}</Text>
                    </View>
                    <View style=
                        {interests[4] ? (
                            styles.interestWrapper
                        ) : (
                            {display: 'none'}
                        )}
                    >
                        <Text style={styles.interestText}>{interests[4]}</Text>
                    </View>
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
                        {renderIcon("graduation-cap", 25, Colors.royalBlue)}
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
                        {renderIcon("book", 25, Colors.royalBlue)}
                    </View>
                    <Text style={styles.infoHeader}>Major: </Text>
                    <Text style={styles.infoContent}>{major}</Text>
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
                        {renderIcon("map-pin", 25, Colors.royalBlue)}
                    </View>
                    <Text style={styles.infoHeader}>Location: </Text>
                    <Text style={styles.infoContent}>{location}</Text>
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
                        {renderIcon("users", 22, Colors.royalBlue)}
                    </View>
                    <Text style={styles.infoHeader}>Preferred # of Roommates: </Text>
                    <Text style={styles.infoContent}>{preferredNumRoommates}</Text>
                </View>


                {/* Preferred living location (optional) */}
                <View style=
                    {preferredLivingLocation ? (
                        styles.preferredLivingLocationWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <View>
                        {renderIcon("home", 25, Colors.royalBlue)}
                    </View>
                    <Text style={styles.preferredLivingLocationContent}>Preferred Housing: {preferredLivingLocation}</Text>
                </View>


                {/* Vaccination status */}
                <View style={styles.vaccinationWrapper}>
                    <View>
                        {renderIcon("medkit", 25, Colors.royalBlue)}
                    </View>
                    <Text style={styles.vaccinationContent}>
                        {(vaccination == "Vaccinated") ? (
                            "Vaccinated for Covid-19"
                        ) : (
                            "Not vaccinated for Covid-19"
                        )}
                    </Text>
                </View>


                


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
                                [{ 
                                    text: "No" 
                                }, {
                                    text: "Yes",
                                    onPress: () => reportUser(uid, reports)
                                }]); 
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
        padding: 7,
    },


    /* Profile Picture */
    profilePic: {
        width: 340,
        height: 340, 
        borderRadius: 25,
        marginTop: 20,
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


    /* Interets */
    interestsContainer: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    interestWrapper: {
        flexDirection: 'row',
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 2,
        padding: 7,

    },

    interestText: {
        fontSize: 12,
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

    /* Location */
    locationWrapper: {
        paddingTop: 20,
        paddingLeft: 5,
        flexDirection: 'row',
    },
   
    /* Preferred Roommates */
    preferredNumRoommatesWrapper: {
        paddingTop: 20,
        flexDirection: 'row',
    },


    infoHeader: {
        fontStyle: 'italic',
        paddingLeft: 15,
        fontSize: 20,
    },

    infoContent: {
		flex: 1,
		flexWrap: 'wrap',
        fontSize: 20,
    },

    /* Preferred Living Location */
    preferredLivingLocationWrapper: {
        paddingTop: 20,
        flexDirection: 'row',
    },

    preferredLivingLocationContent: {
        paddingLeft: 15,
        fontSize: 20,
    },


    /* Vaccination */
    vaccinationWrapper: {
        paddingTop: 20,
        flexDirection: 'row',
    },

    vaccinationContent: {
        paddingLeft: 15,
        fontSize: 20, 
    },
    

    /* Compatibility Score */
    compatibilityScoreWrapper: {
        paddingTop: 20,
        flexDirection: 'row',
    },
    
    compatibilityScoreText: {
        flexDirection: 'row',
        fontSize: 20,
        paddingTop: 5,
        paddingRight: 10,
    },

    compatibilityScoreContent: {
        alignContent: 'flex-end',
        fontSize: 20,
        borderWidth: 2.5,
        borderRadius: 20,
        padding: 5,
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