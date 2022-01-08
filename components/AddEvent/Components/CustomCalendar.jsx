import React, { useState, useEffect } from 'react';

import { isEmpty } from 'lodash';

import {
    View,
    StyleSheet,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import ActivitiesPerDay from './Activity/ActivitiesPerDay';

import Colors from '../../../helpers/colors';

import { useDate } from '../Contexts/Date';
import { usePeriod } from '../Contexts/Period';

export default function CustomCalendar() {

    const { startDay, endDay, appliedStartDay, appliedEndDay, startAgain, setCurrentPeriod, setStartAgain, resetPeriod } = useDate();
    const { schedule, addActivity, deleteActivity, emptySchedule } = usePeriod();

    const [ period, setPeriod ] = useState();

    function getPeriod(startTimestamp, endTimestamp){
        const period = {};
        let currentTimestamp = startTimestamp;
        while( currentTimestamp <= endTimestamp ){
            const dateString = getDateString(currentTimestamp);
            period[dateString] = {
                color: Colors.mediumOrange,
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
                    color: Colors.mediumOrange,
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

    return (
        <>
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
                    todayTextColor: Colors.mediumOrange,
                    arrowColor: Colors.mediumOrange,
                    textDisabledColor: "#112d5255",
                    dayTextColor: Colors.lightBlue,
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
                            color: Colors.lightBlue
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
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 10,
    }
})

/*
<View style={{ alignItems: 'flex-start' }}>
                    <Text style={styles.label}>
                        Starting Date
                    </Text>
                    <Text style={styles.content}>
                        { !isEmpty(startDay) ? startDay.dayFormat : "dd mm yyyy" }
                    </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.label}>
                        Ending Date
                    </Text>
                    <Text style={styles.content}>
                        { !isEmpty(endDay) ? endDay.dayFormat : "dd mm yyyy" }
                    </Text>
                </View>
*/