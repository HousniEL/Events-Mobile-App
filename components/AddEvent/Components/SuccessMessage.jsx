import { StyleSheet, Text, View, Image } from 'react-native';
import { Overlay, Button } from "react-native-elements";
import React from 'react';

import ThumbsUp from '../../../assets/imgs/thumbsup.png';
import colors from "../../../helpers/colors";

export default function SuccessMessage({ show, done, title }) {

  return (
    <Overlay visible={show} overlayStyle={ styles.overlay }>
        <Image source={ThumbsUp} resizeMode='contain' style={{ width: 60, height: 60 }} />
        <Text style={ styles.text }>
            L’événement "{ title }" a été créé avec succès.     
        </Text>
        <Button 
            title={"D'accord"}
            titleStyle={{
                color: colors.mediumOrange
            }}
            buttonStyle={{
                width: 100,
                backgroundColor: "white"
            }}
            onPress={done}
        />
    </Overlay>
  );
}

const styles = StyleSheet.create({
    overlay: {
        width: '90%',
        maxWidth: 400,
        alignItems: 'center'
    },
    text: {
        margin: 5,
        marginTop: 25,
        color: colors.mediumBlue,
        fontSize: 17,
        textAlign: "center"
    }
});
