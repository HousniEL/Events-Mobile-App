import React from 'react';
import { StyleSheet, View } from 'react-native';
import Form from './Components/Form';

import { DateProvider } from "./Contexts/Date";
import { PeriodProvider } from './Contexts/Period';

export default function AddEvent() {
    return (
        <View style={styles.container}>
            <DateProvider>
                <PeriodProvider>
                    <Form />
                </PeriodProvider>
            </DateProvider>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    }
})
