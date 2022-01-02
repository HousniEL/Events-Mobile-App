import React, { useState } from 'react';

import { 
    View
} from 'react-native';

import FirstUse from "./FirstUse";
import Welcome from './SplashScreen';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NavigateScreens from '../SignInUp/NavigateScreens';

const Stack = createStackNavigator();

export default function FirstConnection() {

    const [ firstTime, setFirstTime ] = useState(true);

    const [ isSignedIn, setIsSignedIn ] = useState();

    function handleSignIn(bool){
        setIsSignedIn(bool);
        setFirstTime(false);
    }

    return (
        <View style={{ flexGrow: 1, width: '100%', height: '100%' }}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                {
                        firstTime && (
                            <Stack.Screen  name="first">
                                { (props) => <Welcome {...props} handleSignIn={handleSignIn} /> }
                            </Stack.Screen>
                        )
                    }
                    {
                        !firstTime && (
                            !isSignedIn && (
                                <>
                                    <Stack.Screen  name="firstuse" component={FirstUse} />
                                    <Stack.Screen  name="sign" component={NavigateScreens} />
                                </>
                            )
                        )
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}
