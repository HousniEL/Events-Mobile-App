import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Agenda() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Agenda</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    text: {
        fontSize: 40,
        fontWeight: '700'
    }
});
