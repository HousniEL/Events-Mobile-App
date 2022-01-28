import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import Profile from "./Profile";
import AddEvent from "../AddEvent/AddEvent";

export default function NavigateProfile({ signout }){
    return (
        <>
            <NavigationContainer independent={true}>
                <Stack.Navigator screenOptions={{ headerShown : false }} >
                    <Stack.Screen  name="profile">
                        { (props) => <Profile {...props} signout={signout} /> }
                    </Stack.Screen>
                    <Stack.Screen  name="addevent" component={AddEvent} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}