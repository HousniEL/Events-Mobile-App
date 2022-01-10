import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import colors from '../../../../helpers/colors';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ActivityContainer({ val, idx, deleteActivity, refreshActivities }) {

    function handleDelete(){
        var newSch = deleteActivity(val.day, idx);
        refreshActivities(newSch);
    }

    return (
        <View style={ styles.container }>
            <View style={{ width: '90%' }}>
                <Text style={ styles.name }>
                    { val.name }
                </Text>
                <Text style={ styles.content } numberOfLines={2}>
                    { val.content }
                </Text>
            </View>
            <TouchableWithoutFeedback onPress={handleDelete} >
                <MaterialCommunityIcons name="close" color={colors.xLightBlue} size={20} />
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#112d5211",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 5
    },
    name: {
        marginBottom: 5,
        fontSize: 15,
        color: colors.xLightBlue,
    },
    content: {
        fontSize: 17,
        color: colors.lightBlue
    }
})
