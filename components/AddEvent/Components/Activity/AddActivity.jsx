import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Overlay, Button } from 'react-native-elements';

import colors from '../../../../helpers/colors';

import TimePicker from './TimePicker';

export default function AddActivity({ visible, toggleVisibility, moreActivities, day }) {

    const [ timeRange, setTimeRange ] = useState("");
    const [ description, setDescription ] = useState("");

    function handleAdd(){
        if( timeRange != "" && description != ""){
            var obj = {
                name: timeRange,
                content: description,
                day: day
            }
            moreActivities(obj);
            setTimeRange("");
            setDescription("");
            toggleVisibility();
        }
    }

    function handleReset(){
        setTimeRange("");
        setDescription("");
    }

    return (
        <Overlay isVisible={visible} onBackdropPress={toggleVisibility} overlayStyle={ styles.overlayStyle }>
            <View style={ styles.titleContainer }>
                <Text style={ styles.title }>
                    Add Activity
                </Text>
            </View>
            <View style={ styles.contentContainer }>
                <Text style={[ styles.label, { fontSize: 16, fontWeight: 'bold' } ]}>
                    Time range
                </Text>
                <TimePicker setTimeRange={setTimeRange} />
                <Input
                    label={"Description"}
                    value={description}
                    keyboardType={"default"}
                    multiline={true}
                    numberOfLines={6}
                    underlineColorAndroid={"transparent"}
                    selectionColor={colors.xLightBlue}
                    inputStyle={ styles.descriptionInputStyle }
                    labelStyle={styles.label}
                    inputContainerStyle={ styles.inputContainerStyle }
                    containerStyle={{paddingHorizontal: 0, width: '100%'}}
                    onChangeText={setDescription}
                />
                <View style={ styles.buttonsContainer }>
                    <Button 
                        title={"RESET"}
                        buttonStyle={[ styles.buttonStyle, { backgroundColor: colors.xLightBlue } ]}
                        onPress={handleReset}
                    />
                    <Button 
                        title={"ADD"}
                        buttonStyle={[ styles.buttonStyle, { backgroundColor: colors.mediumOrange } ]}
                        onPress={handleAdd}
                    />
                </View>
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.mediumOrange,
        padding: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    contentContainer: {
        padding: 20
    },
    label: {
        marginBottom: 5,
        color: colors.xLightBlue
    },
    inputContainerStyle: {
        borderWidth: 1,
        borderColor: colors.xLightBlue,
        borderRadius: 3
    },
    timeInputStyle: {
        paddingHorizontal: 7,
        color: colors.lightBlue,
        fontSize: 15
    },
    descriptionInputStyle: {
        paddingVertical: 7,
        paddingHorizontal: 7,
        color: colors.lightBlue,
        textAlignVertical: 'top',
        textDecorationLine: 'none',
        fontSize: 15
    },
    content: {
        padding: 10,
        paddingHorizontal: 20,
        color: colors.mediumBlue,
        borderColor: "#112d5255",
        borderWidth: 1,
        borderRadius: 5
    },
    overlayStyle: {
        width: '90%',
        maxWidth: 400,
        padding: 0,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonStyle: {
        width: 100
    }
})
