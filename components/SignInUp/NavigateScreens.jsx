import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import SignIn from './SignIn';
import SignUp from './SignUp';
import { View } from 'react-native';

export default function NavigateScreens({signed}){
    return (
        <View style={{ flexGrow: 1, width: '100%', height: '100%' }}>
            <NavigationContainer independent={true}>
                <Stack.Navigator
                    screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' } }}
                >
                    <Stack.Screen name="signin">
                        { (props) => <SignIn {...props} signed={signed} /> }
                    </Stack.Screen>
                    <Stack.Screen name="signup">
                        { (props) => <SignUp {...props} signed={signed} /> }
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}