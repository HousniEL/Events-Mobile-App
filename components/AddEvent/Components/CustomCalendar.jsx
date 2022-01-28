import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

import ActivitiesPerDay from './Activity/ActivitiesPerDay';

import { isEmpty } from 'lodash';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import colors from '../../../helpers/colors';
import { Button } from "react-native-elements";

import { useDate } from '../Contexts/Date';
import { usePeriod } from '../Contexts/Period';
import { useForm } from '../Contexts/Form';


export default function CustomCalendar({ handlePrevious, handleNext }) {

    const { startDay, startAgain, setCurrentPeriod, setStartAgain, eventPeriod, setEventPeriod } = useDate();
    const { schedule, addActivity, deleteActivity, emptySchedule } = usePeriod();
    const { addNewField } = useForm();

    const [ period, setPeriod ] = useState();
    const [ error, setError ] = useState(false);

    useEffect(() => {
        if(eventPeriod){
            setPeriod(eventPeriod);
        }
    }, [])

    function getPeriod(startTimestamp, endTimestamp){
        const period = {};
        let currentTimestamp = startTimestamp;
        while( currentTimestamp <= endTimestamp ){
            const dateString = getDateString(currentTimestamp);
            period[dateString] = {
                color: colors.mediumOrange,
                textColor: 'white',
                startingDay: currentTimestamp == startTimestamp,
                endingDay: currentTimestamp == endTimestamp
            };
            currentTimestamp += 24 * 60 * 60 * 1000;
        }
        
        return period;
    }

    function getDateString(timestamp){
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        let dateString = `${year}-`;
        if( month < 10 ){
            dateString += `0${month}-`;
        } else {
            dateString += `${month}-`;
        }

        if( day < 10 ){
            dateString += `0${day}`;
        } else {
            dateString += `${day}`;
        }

        return dateString;
    }

    function setDate(dayObj){
        const { dateString, day, month, year } = dayObj;
        // timestamp returned by dayObj is in 12:00AM UTC 0, want local 12:00AM
        const timestamp = new Date(year, month - 1, day).getTime();
        let newDayObj = { ...dayObj, timestamp };
        if (startAgain) {
            emptySchedule();
            const period = {
                [dateString]: {
                    color: colors.mediumOrange,
                    textColor: 'white',
                    endingDay: true,
                    startingDay: true
                }
            };
            setCurrentPeriod(newDayObj, null);
            setPeriod(period);
            setStartAgain(false);
        } else {
            // if end date is older than start date switch
            const { timestamp: savedTimestamp } = startDay.day;
            if (savedTimestamp > timestamp) {
                const period = getPeriod(timestamp, savedTimestamp);
                let startCopy = startDay.day;
                setCurrentPeriod(newDayObj, startCopy);
                setPeriod(period);
            } else {
                const period = getPeriod(savedTimestamp, timestamp);
                setCurrentPeriod(null, newDayObj);
                setPeriod(period);
            }
            setStartAgain(true);
        }
    }

    function renderPeriods(){
        var loadPeriod = [];
        let i = 0;
        if( period ){
            for( let key in period ){
                loadPeriod[i] = key;
                i++;
            }
        }
        return loadPeriod;
    }

    function Next(){

        setError(false);

        if(!isEmpty(schedule)){
            setEventPeriod(period);
            addNewField('schedule', schedule);
            return handleNext();
        }

        setError(true);

    }

    return (
        <View style={{ width: "90%", alignSelf: 'center' }}>
            <Calendar
                minDate={ getDateString( new Date().getTime() ) }
                markingType={'period'}
                markedDates={period}
                style={{
                    width: '100%',
                    alignSelf: 'center',
                    marginTop: 10,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#112d5255"
                }}
                theme={{
                    todayTextColor: colors.mediumOrange,
                    arrowColor: colors.mediumOrange,
                    textDisabledColor: "#112d5255",
                    dayTextColor: colors.lightBlue,
                    'stylesheet.calendar.main': {
                        week:{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            height: 40,
                        }
                    },
                    'stylesheet.calendar.header': {
                        header: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: 45
                        },
                        monthText: {
                            fontSize: 16,
                            fontWeight: '700',
                            color: colors.lightBlue
                        },
                        dayTextAtIndex0:{
                            color: '#112d5299'
                        },
                        dayTextAtIndex1:{
                            color: '#112d5299'
                        },
                        dayTextAtIndex2:{
                            color: '#112d5299'
                        },
                        dayTextAtIndex3:{
                            color: '#112d5299'
                        },
                        dayTextAtIndex4:{
                            color: '#112d5299'
                        },
                        dayTextAtIndex5:{
                            color: '#112d5299'
                        },
                        dayTextAtIndex6:{
                            color: '#112d5299'
                        },
                    }
                }}
                onDayPress={(date) => setDate(date)}
            />
            <View style={ styles.container }>
                {
                    renderPeriods().map((val, index) => (
                        <ActivitiesPerDay day={val} schedule={schedule} addActivity={addActivity} deleteActivity={deleteActivity} key={index} />
                    ))
                }
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    title={ "Previous" }
                    onPress={ handlePrevious }
                    buttonStyle={{ width: 100, backgroundColor: "#112d5277" }}
                />
                <Button 
                    title={ "Next" }
                    onPress={ Next }
                    buttonStyle={{ width: 100, backgroundColor: colors.mediumOrange }}
                />
            </View>
            <View style={ styles.errorContainer }>
                {   
                    error && (
                        <>
                            <MaterialCommunityIcons name="alert-circle-outline" color="tomato" size={20} style={{ width: 20, height: 20 }} />
                            <Text style={ styles.errorM }>
                                Select event time range and activities 
                            </Text>
                        </>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 10
    },
    buttonContainer: { 
        flexDirection: 'row', 
        justifyContent: "space-between", 
        flexGrow: 1,
        alignSelf: "center", 
        width: '100%',
        marginTop: 50,
        marginBottom: 15
    },
    errorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 25
    },
    errorM: {
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'tomato',
        marginLeft: 5
    }
})