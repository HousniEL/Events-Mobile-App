import React from 'react';
import { StyleSheet, View } from 'react-native';
import Activities from './Components/Activities';
import Form from './Components/Form';
import ImageForm from './Components/ImageForm';
import ProgSteps from './Components/ProgSteps';

import { DateProvider } from "./Contexts/Date";
import { FormProvider } from './Contexts/Form';
import { PeriodProvider } from './Contexts/Period';

export default function AddEvent() {
    return (
        <View style={styles.container}>
            <FormProvider>
                <DateProvider>
                    <PeriodProvider>
                        <ProgSteps />
                    </PeriodProvider>
                </DateProvider>
            </FormProvider>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    }
})
