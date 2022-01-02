import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomizeInput({ name, value, ph, kT, aCT, tCT, iconName, fctCT, fctBl, err, half }){
    return (
        <Input 
            value={value}
            placeholder={ph}
            keyboardType={kT}
            autoCompleteType={aCT}
            textContentType={tCT}
            autoCorrect={false}
            leftIcon={
                <MaterialCommunityIcons name={iconName} size={20} color={"#999"} />
            }
            leftIconContainerStyle={{
                width: 30
            }}
            containerStyle={[styles.Container, half && { width: "48%" }]}
            inputStyle={styles.input}
            placeholderTextColor={"#999"}
            inputContainerStyle={styles.inputcontainer}
            onChangeText={fctCT(name)}
            onBlur={fctBl(name)}
            errorMessage={err}
            errorStyle={styles.erroStyle}
        />
    )
}

const styles = StyleSheet.create({
    Container: {
        paddingHorizontal: 0,
    },
    inputcontainer: { 
        borderBottomWidth: 0,
        backgroundColor: "#eee",
        padding: 10,
        height: 50,
        borderRadius: 5,
    },
    input: {
        marginLeft: 2,
        backgroundColor: 'transparent'
    },
    erroStyle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#F88',
        marginTop: 0,
        marginBottom: 8,
    }
})
