import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as Facebook from "expo-facebook";
import { FB_APP_ID } from '@env';

export default function LoginFacebook() {

    async function logInAsync() {
        try {
          await Facebook.initializeAsync({
            appId: FB_APP_ID,
          });
          const {
            type,
            token,
            expirationDate,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
    }

    const logIN = () => {
        logInAsync()
    }

    return (
        <View>
            <Button onPress={() => logIN()} title="Facebook" 
                icon={
                    <FontAwesome name="facebook" size={25} color={"#3b5998"} style={{ fontWeight: 'bold', marginHorizontal: 6 }} />
                }
                buttonStyle={styles.buttonStyle}
                titleStyle={{ display: "none" }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        borderWidth: 3,
        borderRadius: 50,
        marginHorizontal: 5,
        borderColor: "#3b5998",
        backgroundColor: 'transparent',
        height: 48,
        marginVertical: 5
    }
});
