import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";

import colors from '../../../../helpers/colors';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function TimePicker({ setTimeRange }) {

    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const [date, setDate] = useState(new Date());

    const [start, setStart] = useState(true);
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    function onChange(event, selectedDate) {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        if(start){
            setTimeRange("");
            setStartTime(currentDate);
        } else {
            setEndTime(currentDate);
            setTimeRange( getHaMS() + " - " + getHaME(currentDate) )
        }
        setDate(currentDate);
    };

    function showMode(currentMode) {
        setShow(true);
        setMode(currentMode);
    };

    function showTimepicker(begin) {
        showMode('time');
        setStart(begin)
    };


    function getHaMS(){
        var arr2p = startTime.toISOString().split('T')[1].split(':');
        return arr2p[0] + ':' + arr2p[1];
    }
    function getHaME(date){
        var arr2p = date.toISOString().split('T')[1].split(':');
        return arr2p[0] + ':' + arr2p[1];
    }

    return (
        <View style={{ marginBottom: 8 }}>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableWithoutFeedback onPress={() => showTimepicker(true)} >
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>
                            { startTime ? getHaMS() : "HH:MM" }
                        </Text>
                        <MaterialCommunityIcons name="clock-time-nine-outline" color={colors.xLightBlue} size={18} />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => showTimepicker(false)} >
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>
                            { endTime ? getHaME(endTime) : "HH:MM" }
                        </Text>
                        <MaterialCommunityIcons name="clock-time-five-outline" color={colors.xLightBlue} size={18} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    timeContainer: {
        borderWidth: 1,
        borderColor: colors.xLightBlue,
        borderRadius: 3,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    time: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.xLightBlue,
        marginRight: 8
    }
})
