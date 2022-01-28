import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import WebViewQuillJS from 'react-native-webview-quilljs';

import { isEmpty } from "lodash";

import { Button } from "react-native-elements";
import colors from "../../../helpers/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useForm } from "../Contexts/Form";

export default function Editor({ handleNext, handlePrevious }) {

    const [ content, setContent ] = useState({});
    const [ error, setError ] = useState(false);
    const [ defaultContent, setDefaultContent ] = useState({});
    const { form, addNewField } = useForm();

    useEffect(() => {
        if( form.description ){
            setContent(form.description);
            setDefaultContent(form.description);
        }
    }, []);

    function Next(){
        setError(false);
        if(!isEmpty(content)){
            addNewField("description", content);
            return handleNext();
        }
        setError(true);
    }

    function onMessageReceived(message){
        const { instruction, payload } = message;
        if (payload?.delta) {
          setContent(payload.delta);
        }
    };

    return (
        <>
            <View style={{ 
                flexGrow: 1, 
                width: '100%', 
                height: "65%", 
                padding: 10, 
                marginBottom: 15, 
                borderWidth: 2, 
                borderColor: '#ccc' 
            }}>
                <WebViewQuillJS
                    content={defaultContent}
                    backgroundColor={"#FFF"}
                    onMessageReceived={onMessageReceived}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    title={ "Previous" }
                    onPress={ handlePrevious }
                    buttonStyle={{ width: 100, backgroundColor: "#112d5277" }}
                />
                <Button 
                    title={ "Next" }
                    onPress={ Next }
                    buttonStyle={{ width: 100, backgroundColor: colors.mediumOrange }}
                />
            </View>
            <View style={ styles.errorContainer }>
                {   
                    error && (
                        <>
                            <MaterialCommunityIcons name="alert-circle-outline" color="tomato" size={20} style={{ width: 20, height: 20 }} />
                            <Text style={ styles.errorM }>
                                Give a description for your event
                            </Text>
                        </>
                    )
                }
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    buttonContainer: { 
        flexDirection: 'row', 
        justifyContent: "space-between", 
        flexGrow: 1,
        alignSelf: "center", 
        width: '90%',
        maxWidth: 400,
        marginTop: 50,
        marginBottom: 15
    },
    errorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 25
    },
    errorM: {
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'tomato',
        marginLeft: 5
    }
});
