import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';

import logo from '../../assets/imgs/logo2.png';

import { useAuth } from "../../contexts/AuthContext";
import * as SecureStore from 'expo-secure-store';

import { Flow } from 'react-native-animated-spinkit';
import colors from '../../helpers/colors';

export default function Welcome({ handleSignIn }) {

    const [color, setColor] = React.useState(colors.mediumOrange);

    const { setCurrentUser } = useAuth();
    
    async function check(){
        ///*
        const token = await SecureStore.getItemAsync('token');
        const user = await SecureStore.getItemAsync('user');
        if(token && user){
            setCurrentUser(JSON.parse(user));
            handleSignIn(true);
        } else {
            setCurrentUser();
            handleSignIn(false);
        }
        //*/
       /*
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('user');
        setCurrentUser();
        handleSignIn(false);
       */
    }

    React.useEffect(() => {

        var changeColor = true;
        if(changeColor){
            setInterval(() => {
                color != colors.mediumOrange ? setColor(colors.mediumOrange) : setColor(colors.mediumBlue);
            }, 1000);
        }

        return () => {
            changeColor = false;
        };
    }, []);
    
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
                    <Flow size={35} color={color} />
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