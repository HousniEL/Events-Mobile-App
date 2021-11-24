import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import SignIn from './SignIn';
import SignUp from './SignUp';
import Welcome from './Welcome';
import { View } from 'react-native';

export default function NavigateScreens(){
    return (
        <View style={{ flexGrow: 1, width: '100%', height: '100%' }}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' } }}
                    
                >
                    <Stack.Screen name="welcome" component={Welcome} />
                    <Stack.Screen name="signin" component={SignIn} />
                    <Stack.Screen name="signup" component={SignUp} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}