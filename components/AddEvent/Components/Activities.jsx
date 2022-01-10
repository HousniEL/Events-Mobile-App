import React from 'react';

import { 
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';

import CustomCalendar from './CustomCalendar';

import colors from "../../../helpers/colors";

export default function Activities() {
    return (
        <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
            <TouchableWithoutFeedback>
                <View style={{ width: '90%', maxWidth: 400 }} >
                    <Text style={styles.label}>
                        Event Period
                    </Text>
                    <CustomCalendar />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    label: {
        color: colors.xLightBlue,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold'
    }
});
