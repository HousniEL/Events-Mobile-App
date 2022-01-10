import React, { useState } from 'react';

import { StyleSheet, Text, View , ScrollView, TouchableWithoutFeedback } from 'react-native';

import { Button } from 'react-native-elements';

import colors from "../../../helpers/colors";

import Form from './Form';
import Editor from './Editor';
import CustomCalendar from './CustomCalendar';
import ImageForm from './ImageForm';

const array = [
    "Fill the Form below",
    "Describe your event",
    "Select date and activities",
    "Add Images"
]

export default function ProgSteps() {

    var [ currentStep, setCurrentStep ] = useState(0);

    function handleFinish(){

    }

    function handleNext(){
        setCurrentStep(++currentStep);
    }

    function handlePrevious(){
        setCurrentStep(--currentStep);
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, width: '100%' }}>
            <TouchableWithoutFeedback>
                <View style={{ flexGrow: 1, width: '100%', maxWidth: 450, alignSelf: 'center' }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%',  marginTop: 50, maxWidth: 350, alignSelf: 'center' }}>
                        {
                            array.map( (value, idx) => (
                                idx != 0 ? (
                                    <>
                                        <View style={[styles.line, idx <= currentStep && { backgroundColor: colors.mediumOrange }]}></View>
                                        <View style={[styles.circle, idx <= currentStep && { backgroundColor: colors.mediumOrange }]} key={idx}></View>
                                    </>
                                ) : (
                                    <View style={[styles.circle, idx <= currentStep && { backgroundColor: colors.mediumOrange }]} key={idx}></View>
                                )
                            ))
                        }
                    </View>
                    <Text style={styles.header}>
                        { array[currentStep] }
                    </Text>
                    <View style={{ width: '100%', flexGrow: 1 }}>
                        {
                            currentStep == 0 && <Form />
                        }
                        {
                            currentStep == 1 && <Editor />
                        }
                        {
                            currentStep == 2 && <CustomCalendar />
                        }
                        {
                            currentStep == 3 && <ImageForm />
                        }
                    </View>

                    <View style={styles.buttonContainer}>
                            <Button 
                                title={ "Previous" }
                                onPress={ handlePrevious }
                                buttonStyle={[{ width: 100, backgroundColor: "#112d5233" }, currentStep == 0 && { display: 'none' }]}
                            />
                            <Button 
                                title={ currentStep != 3 ? "Next" : "Finish" }
                                onPress={ currentStep != 3 ? handleNext : handleFinish }
                                buttonStyle={{ width: 100, backgroundColor: colors.mediumOrange }}
                            />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    circle: {
        width: 15,
        height: 15,
        borderRadius: 25,
        backgroundColor: "#112d5233"
    },
    line: {
       flexGrow: 1,
       height: 2,
       backgroundColor: "#112d5233"
    },
    header: {
       textAlign: 'center',
       marginVertical: 20,
       color: colors.mediumOrange,
       fontWeight: 'bold',
       fontSize: 16
    },
    buttonContainer: { 
        flexDirection: 'row', 
        justifyContent: "space-between", 
        flexGrow: 1,
        alignSelf: "center", 
        width: '90%',
        marginVertical: 50,
    }
});
