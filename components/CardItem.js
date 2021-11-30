import React, { useState } from 'react';
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
import { ViewQuestionnaire } from '../screens/ViewQuestionnaire';



export const CardItem = (props) => {
    const { profile, likeOpacity, nopeOpacity } = props;

    const getBorderColor = () => {
        return Math.floor(profile.compatibility_score / 34);
    }

    // hook for questionnaire
    const [viewQuestionnaire, setViewQuestionnaire] = useState(false);


    if (viewQuestionnaire) {
        return (
            <ViewQuestionnaire>
                
            </ViewQuestionnaire>
        );
    }



    // this does not work, but it's an idea
    // const getReports = () => {
    //     var reportedUser = getDataFromPath("reported/" + profile.id);
    //     var reports = 0;
    //     if (typeof reportedUser == Object) {
    //         console.log("user was reported");
    //         reports = getDataFromPath("reported/" + profile.id + "/num_reports");
    //     }
    // }
    // getReports();


    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>

                {/* Profile Picture */}
                <View style={styles.imageWrapper}>
                    <Image style={styles.profilePic}
                        source={profile.profile_picture}
                    />
                </View>


                {/* Name and Age */}
                <View style={styles.nameWrapper}>
                    <Text style={styles.nameText}>{profile.name}, {profile.age}</Text>
                </View>


                {/* Compatibility Score (if in feed) */}
                <View style=
                    {getID(auth.currentUser.email) != profile.id ? (
                        styles.compatibilityScoreWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <Text style=
                        {[styles.compatibilityScoreContent,
                        getBorderColor() == 0 ? (
                            {borderColor: Colors.red}
                        ) : (
                            {borderColor: getBorderColor() == 1 ? Colors.yellow : Colors.green}
                        )]}
                    >
                        {profile.compatibility_score}%
                    </Text>
                </View>


                {/* Bio (optional) */}
                <View style=
                    {profile.bio ? (
                        styles.bioWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <Text style={styles.bioContent}>{profile.bio}</Text>
                </View>


                {/* Interests */} 
                <View style={styles.interestsContainer}>
                    <View style=
                        {profile.interest1 ? (
                            styles.interestWrapper
                        ) : (
                            {display: 'none'}
                        )}
                    >
                        <Text style={styles.interestText}>{profile.interest1}</Text>
                    </View>
                    <View style=
                        {profile.interest2 ? (
                            styles.interestWrapper
                        ) : (
                            {display: 'none'}
                        )}
                    >
                        <Text style={styles.interestText}>{profile.interest2}</Text>
                    </View>
                    <View style=
                        {profile.interest3 ? (
                            styles.interestWrapper
                        ) : (
                            {display: 'none'}
                        )}
                    >
                        <Text style={styles.interestText}>{profile.interest3}</Text>
                    </View>
                    <View style=
                        {profile.interest4 ? (
                            styles.interestWrapper
                        ) : (
                            {display: 'none'}
                        )}
                    >
                        <Text style={styles.interestText}>{profile.interest4}</Text>
                    </View>
                    <View style=
                        {profile.interest5 ? (
                            styles.interestWrapper
                        ) : (
                            {display: 'none'}
                        )}
                    >
                        <Text style={styles.interestText}>{profile.interest5}</Text>
                    </View>
                </View>



                {/* Graduation year (optional) */}
                <View style={
                    profile.graduation_year ? (
                        styles.graduationYearWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <View>
                        {renderIcon("graduation-cap", 25, Colors.royalBlue)}
                    </View>
                    <Text style={styles.graduationYearContent}>Class of {profile.graduation_year}</Text>
                </View>


                {/* Major (optional) */}
                <View style=
                    {profile.major ? (
                        styles.majorWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <View>
                        {renderIcon("book", 25, Colors.royalBlue)}
                    </View>
                    <Text style={styles.infoHeader}>Major: </Text>
                    <Text style={styles.infoContent}>{profile.major}</Text>
                </View>


                {/* Location (optional) */}
                <View style=
                    {profile.location ? (
                        styles.locationWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <View>
                        {renderIcon("map-pin", 25, Colors.royalBlue)}
                    </View>
                    <Text style={styles.infoHeader}>Location: </Text>
                    <Text style={styles.infoContent}>{profile.location}</Text>
                </View>


                {/* Preferred # of Roommates (optional) */}
                <View style=
                    {profile.preferred_num_roommates ? (
                        styles.preferredNumRoommatesWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <View>
                        {renderIcon("users", 22, Colors.royalBlue)}
                    </View>
                    <Text style={styles.infoHeader}>Preferred # of Roommates: </Text>
                    <Text style={styles.infoContent}>{profile.preferred_num_roommates}</Text>
                </View>


                {/* Preferred living location (optional) */}
                <View style=
                    {profile.preferred_living_location ? (
                        styles.preferredLivingLocationWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <View>
                        {renderIcon("home", 25, Colors.royalBlue)}
                    </View>
                    <Text style={styles.preferredLivingLocationContent}>Preferred Housing: {profile.preferred_living_location}</Text>
                </View>


                {/* Vaccination status */}
                <View style={styles.vaccinationWrapper}>
                    <View>
                        {renderIcon("medkit", 25, Colors.royalBlue)}
                    </View>
                    <Text style={styles.vaccinationContent}>
                        {(profile.vaccinated == "Vaccinated") ? (
                            "Vaccinated for Covid-19"
                        ) : (
                            "Not vaccinated for Covid-19"
                        )}
                    </Text>
                </View>


                {/* View Questionnaire (button) */}
                <TouchableOpacity
                    style={styles.viewQuestionnaireButton}
                    onPress={() => {
                        console.log("Viewing Questionnaire from card item");
                        // viewQuest();
                        setViewQuestionnaire(!viewQuestionnaire);
                    }}
                >
                    <Text style={styles.viewQuestionnaireText}>View Questionnaire</Text>
                </TouchableOpacity>


                {/* Instagram (optional) */}
                <View style=
                    {profile.instagram ? (
                        styles.instagramWrapper
                    ) : (
                        {display: 'none'}
                    )}
                >
                    <TouchableOpacity style={styles.instagramButton}
                        onPress={async () => {
                            const supported = await Linking.canOpenURL(getInstagramLink(profile.instagram));
                            if (supported) {
                                Linking.openURL(getInstagramLink(profile.instagram));
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
                        <Text style={styles.instagramUsernameText}>{profile.instagram}</Text>
                    </TouchableOpacity>
                </View>


                {/* Report User */}
                <View style={styles.reportUserWrapper}>
                    <Text style={styles.reportUserText}
                        onPress={() => {
                            Alert.alert("Report User", "Are you sure you want to report " + profile.name + "?",
                            [{ 
                                text: "No" 
                            }, {
                                text: "Yes",
                                onPress: () => reportUser(profile.id, reports)
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

    /* View Questionnaire */
    viewQuestionnaireText: {
		fontSize: 18, 
		color: Colors.royalBlue,
		textDecorationLine: 'none',
    },

    viewQuestionnaireButton: {
		margin: 15,
        marginTop: 20, 
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