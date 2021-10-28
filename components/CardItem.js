import React from "react";
import { 
    StyleSheet,
    Text, 
    View, 
    ScrollView 
} from "react-native";
import { getDataFromPath } from "../database/readData";

const CardItem = (props) => {
    const uid = props.id;
    const name = getDataFromPath("users/" + uid + "/Profile/profile_name");
    // const age;
    const location = getDataFromPath("users/" + uid + "/Profile/location");
    const graduationYear = getDataFromPath("users/" + uid + "/Profile/graduation_year");
    const major = getDataFromPath("users/" + uid + "/Profile/major");
    const bio = getDataFromPath("users/" + uid + "/Profile/bio");
    const vaccination = getDataFromPath("users/" + uid + "/Profile/covid_vaccination_status");
    const preferredRoommates = getDataFromPath("users/" + uid + "/Profile/preferred_number_of_roommates")
    


    return (
        <ScrollView style={styles.container}>
            <Text>{name}</Text>
            <Text>{location}</Text>
            <Text>Class of {graduationYear}</Text>
            <Text>Studying {major}</Text>
            <Text>{bio}</Text>
            <Text>I am {vaccination} for Covid-19</Text>
            <Text>I prefer to have {preferredRoommates} roommates</Text>

            


        </ScrollView>
    )
}

export default CardItem


const styles = StyleSheet.create({

    container: {
        margin: 20,
        alignSelf: 'center',
    },


});