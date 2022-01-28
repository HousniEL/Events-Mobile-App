import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../../helpers/colors";

import ProgSteps from './Components/ProgSteps';

import { DateProvider } from "./Contexts/Date";
import { FormProvider } from './Contexts/Form';
import { PeriodProvider } from './Contexts/Period';

export default function AddEvent({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={ styles.title }  >Créer un événement</Text>
                <TouchableWithoutFeedback onPress={() => navigation.pop()}>
                    <MaterialCommunityIcons name="chevron-left" size={28} color={colors.lightBlue} 
                        style={{ position: "absolute", left: 10, width: 28, height: 28 }}
                    />
                </TouchableWithoutFeedback>
            </View>
            <FormProvider>
                <DateProvider>
                    <PeriodProvider>
                        <ProgSteps navigation={navigation} />
                    </PeriodProvider>
                </DateProvider>
            </FormProvider>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        paddingBottom: 30
    },
    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 15, 
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.lightBlue
    },
})
