import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import colors from '../../../helpers/colors';
import { Input } from 'react-native-elements';

import Tags from 'react-native-tags';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Map from './Map';

export default function Form() {

    const [ title, setTitle ] = useState("");
    const [ nbrPlace, setNbrPlace ] = useState("");
    const [ price, setPrice ] = useState(0);

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
            onChangeTags={tags => console.log(tags)}
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
        <Map />
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
    }
});