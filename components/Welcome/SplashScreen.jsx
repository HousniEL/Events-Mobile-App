import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';

import logo from '../../assets/imgs/logo.png';

import * as SecureStore from 'expo-secure-store';

import { Flow } from 'react-native-animated-spinkit';
import colors from '../../helpers/colors';

export default function Welcome({ handleSignIn }) {


    //const { setCurrentUser } = useAuth();
    
    async function check(){
        //const token = await SecureStore.getItemAsync('token');
        //const user = await SecureStore.getItemAsync('user');
        //if(token && user){
        //    setCurrentUser(JSON.parse(user));
        //    handleSignIn(true);
        //} else {
        //    setCurrentUser();
            handleSignIn(false);
       // }
    }
    setTimeout(check, 5500);


    return (
        <View style={{ flexGrow: 1, height: '100%', width: '100%' }}>
            <View style={styles.container}>
                <Image 
                    style={{
                        width: 200,
                        height: 200,
                        marginTop: '50%',
                        resizeMode: 'contain'
                    }}
                    source={logo}
                />
                <View style={{ position: 'absolute', bottom: 100 }}>
                    <Flow size={35} color={colors.mediumOrange} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})