import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View,
} from 'react-native';
import colors from '../../../helpers/colors';
import { Input, Button } from 'react-native-elements';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Tags from 'react-native-tags';

import Map from './Map';

import { useForm } from "../Contexts/Form";

import { isEmpty } from "lodash";

export default function Form({ handleNext }) {

    const { fillForm, form } = useForm();

    const [ title, setTitle ] = useState("");
    const [ nbrPlace, setNbrPlace ] = useState("");
    const [ price, setPrice ] = useState("0");
    const [ tags, setTags ] = useState([]);
    const [ location, setLocation ] = useState({});

    const [ error, setError ] = useState(false);

    useEffect(() => {
        if(!isEmpty(form)){
            setTitle(form.title);
            setNbrPlace(form.nbrplace);
            setPrice(form.price);
            setTags(form.tags);
            setLocation(form.location);
        }
    }, [])

    function Next(){

        setError(false);

        if( title != "" && nbrPlace != "" && price != ""){
            if( tags != [] && !isEmpty(location) ){
                var obj = {
                    title: title,
                    nbrplace: nbrPlace,
                    price: price,
                    tags: tags,
                    location: location,
                };
        
                fillForm(obj);
                return handleNext();
            }
        }

        setError(true);

    }

    function changeLocation(obj){
        setLocation(obj);
    }

    return (
        <View style={{ width: '90%', alignSelf: 'center' }}>
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
        <Text style={ styles.label }>
            Tags#
        </Text>
        <Tags
            initialTags={form.tags ? form.tags : []}
            onChangeTags={setTags}
            containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', minHeight: 50, marginBottom: 17 }}
            inputStyle={ styles.tagInput }
            createTagOnReturn={true}
            renderTag={(props) => (
                <RenderTag key={`${props.tag}-${props.index}`} {...props} />
            )}
        />
        <Text style={ styles.label }>
            Maps
        </Text>
        <Map updLocation={changeLocation} location={form.location ? form.location : {}} />
        <View style={styles.buttonContainer}>
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
                            Check if the fields and the location are all set
                        </Text>
                    </>
                )
            }
        </View>
        </View>
    )
};

function RenderTag({ tag, onPress, deleteTagOnPress }){
    return (
        <TouchableOpacity onPress={onPress} style={styles.tagContainer}>
            <Text style={{ color: colors.lightBlue, fontSize: 14, marginRight: 5 }} >{tag}</Text>
            <MaterialCommunityIcons name="close" color={colors.lightBlue} size={16} style={{ width: 16, height: 16}} />
        </TouchableOpacity>
    )
}

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
    },
    tagContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#112d5222",
        paddingVertical: 7,
        paddingHorizontal: 15,
        borderRadius: 50,
        marginRight: 5,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tagInput: {
        minHeight: 40,
        borderWidth: 1, 
        borderColor: "#112d5288", 
        fontSize: 14,
        color: colors.lightBlue,
        borderRadius: 5,
        backgroundColor: 'white',
        paddingHorizontal: 0
    },
    buttonContainer: { 
        flexDirection: 'row', 
        justifyContent: "flex-end", 
        flexGrow: 1,
        alignSelf: "center", 
        width: '100%',
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