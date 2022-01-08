import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    ScrollView
} from 'react-native';
import colors from '../../../helpers/colors';
import { Input } from 'react-native-elements';

import CustomCalendar from "./CustomCalendar";

export default function Form() {

    const [ title, setTitle ] = useState("");
    const [ nbrPlace, setNbrPlace ] = useState("");
    const [ price, setPrice ] = useState(0);

    var currentDate = new Date();

    const [value, onChange] = useState(currentDate.getHours() + ":" + currentDate.getMinutes());

    return (
        <ScrollView style={{ width: '90%', alignSelf: 'center' }}>
            <Text style={styles.label}>
                Event Period
            </Text>
            <CustomCalendar />
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    label: {
        color: colors.xLightBlue,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    inputContainerStyle: { 
        borderWidth: 1, 
        borderColor: "#112d5288", 
        margin: 0,
        borderRadius: 5
    }
});

/*
<Input 
                label={"Title"}
                value={title}
                keyboardType={'email-address'}
                selectionColor={colors.xLightBlue}
                inputStyle={{
                    paddingHorizontal: 10,
                    color: colors.lightBlue
                }}
                labelStyle={styles.label}
                inputContainerStyle={ styles.inputContainerStyle }
                containerStyle={{paddingHorizontal: 0, width: '100%'}}
                onChangeText={(text) => setTitle(text)}
            />
            <Input 
                label={"Number of places"}
                value={nbrPlace}
                keyboardType={"decimal-pad"}
                selectionColor={colors.xLightBlue}
                inputStyle={{
                    paddingHorizontal: 10,
                    color: colors.lightBlue
                }}
                labelStyle={styles.label}
                inputContainerStyle={ styles.inputContainerStyle }
                containerStyle={{paddingHorizontal: 0, width: '100%'}}
                onChangeText={(text) => setNbrPlace(text)}
            />
            <Input 
                label={"Price (optionnal)"}
                value={price.toString()}
                keyboardType={"decimal-pad"}
                selectionColor={colors.xLightBlue}
                inputStyle={{
                    paddingHorizontal: 10,
                    color: colors.lightBlue
                }}
                labelStyle={styles.label}
                inputContainerStyle={ styles.inputContainerStyle }
                containerStyle={{paddingHorizontal: 0, width: '100%'}}
                onChangeText={(text) => setPrice(text)}
            />
*/