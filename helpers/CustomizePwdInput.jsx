import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Input } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomizePwdInput({ name, value, fctCT, fctBl, err }){

    const [ pinsecure, setPinSecure ] = React.useState(true);

    return (
        <Input 
            value={value}
            placeholder={"Password"}
            keyboardType={"default"}
            autoCompleteType={'password'}
            textContentType={'password'}
            autoCorrect={false}
            secureTextEntry={pinsecure}
            leftIcon={
                <MaterialCommunityIcons name={"account-key"} size={20} color={"#999"} />
            }
            rightIcon={
                <PwdRightIcon pinsecure={pinsecure} setpinsecure={setPinSecure} />
            }
            leftIconContainerStyle={{
                width: 30
            }}
            containerStyle={styles.Container}
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


function PwdRightIcon({ pinsecure, setpinsecure }){
    return (
        <TouchableWithoutFeedback
            onPress={() => setpinsecure(!pinsecure)}
        >
            {
                pinsecure ? (
                    <MaterialCommunityIcons name={"eye"} size={20} color={"#999"} />
                ) : (
                    <MaterialCommunityIcons name={"eye-off"} size={20} color={"#999"} />
                )
            }
        </TouchableWithoutFeedback>
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
