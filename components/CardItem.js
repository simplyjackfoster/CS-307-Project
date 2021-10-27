import React from "react";
import { Text, View } from "react-native";
import { getDataFromPath } from "../database/readData";

const CardItem = (props) => {
    const uid = props.id;
    const name = getDataFromPath("users/" + uid + "/Profile/profile_name")


    return (
        <View>
            <Text>{uid}</Text>
        </View>
    )
}

export default CardItem