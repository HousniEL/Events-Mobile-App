import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from './colors';

export default function ErrorHolder({ message }) {
    return (
        <View style={styles.errorHolder}>
            <Text style={styles.errorMessage}>
                { message }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    errorHolder: {
        borderLeftColor: colors.lightRed,
        borderLeftWidth: 5,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 15,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: "white"
    },
    errorMessage: {
        color: colors.black,
        fontWeight: 'bold'
    }
})
