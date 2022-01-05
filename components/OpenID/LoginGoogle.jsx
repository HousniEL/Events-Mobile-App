import React from 'react';
import {
    StyleSheet,
    View,
    Platform
} from 'react-native';
import { Button } from 'react-native-elements';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as Google from 'expo-google-app-auth';
import { AND_CLIENT_ID, IOS_CLIENT_ID } from '@env';

import { useAuth } from "../../contexts/AuthContext";

const isAndroid = Platform.OS === "android" ? true : false;

export default function LoginGoogle(){

  const { openID } = useAuth();

    async function signInWithGoogleAsync() {
        try {
          const result = await Google.logInAsync({
            clientId: isAndroid ? AND_CLIENT_ID : IOS_CLIENT_ID,
            scopes: ['profile', 'email'],
          });
    
          if (result.type === 'success') {
            const data = {
              firstname: result.user.givenName,
              lastname: result.user.familyName,
              email: result.user.email,
              token: result.accessToken,
              account: "google",
            }
            openID(data, (res) => {
              console.log(res);
            }, (err) => {
              console.log(err);
            })
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
    }

    const signInWithGoogle = () => {
        signInWithGoogleAsync()
    }

    return(
        <View>
            <Button onPress={() => signInWithGoogle()} title="Google" 
                icon={
                    <FontAwesome name="google" size={25} color={"#db4a39"} style={{ fontWeight: 'bold', marginHorizontal: 3 }} />
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
        borderColor: "#db4a39",
        backgroundColor: 'transparent',
        height: 48,
        marginVertical: 5
    }
});
