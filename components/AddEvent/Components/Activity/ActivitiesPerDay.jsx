import React, { useState } from 'react';

import { 
    StyleSheet, 
    Text, 
    View,
    TouchableWithoutFeedback
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../../../helpers/colors';
import ActivityContainer from './ActivityContainer';
import AddActivity from './AddActivity';

export default function ActivitiesPerDay({ day, schedule, addActivity, deleteActivity }) {

    const [ visibility, setVisibility ] = useState(false);
    const [ activitiesList, setActivitiesList ] = useState(schedule[day]);

    function toggleVisibility(){
        setVisibility(!visibility);
    }

    function moreActivities(obj){
        addActivity(day, obj);
        setActivitiesList(schedule[day]);
    }

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
                <Text style={ styles.day }>
                    { day }
                </Text>
                <TouchableWithoutFeedback onPress={toggleVisibility}>
                    <MaterialCommunityIcons name="plus" size={20} color={colors.xLightBlue} style={ styles.plus } />
                </TouchableWithoutFeedback>
                <AddActivity visible={visibility} toggleVisibility={toggleVisibility} moreActivities={moreActivities} day={day} />
            </View>
            <View>
                {
                    activitiesList ? (
                    activitiesList.map((val,idx) => (
                        <ActivityContainer val={val} idx={idx} key={idx} deleteActivity={deleteActivity} />
                    ))
                    ) : (
                        <Text style={{ textAlign: 'center', color: colors.xLightBlue }}>
                            Add activities
                        </Text>
                    )
                }
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    day: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.lightBlue
    },
    plus: {
        width: 24,
        height: 24,
        padding: 2,
        borderWidth: 1, 
        borderRadius: 5,
        borderColor: colors.xLightBlue,
    }
});
