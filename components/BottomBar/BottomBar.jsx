import React from 'react';

import { Dimensions, View } from "react-native";
import { Fold } from "react-native-animated-spinkit";

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../../helpers/colors";

import NavigateProfile from "../Profile/NavigateProfile";
import Home from "../Home/Home";
import Agenda from "../Agenda/Agenda";
import Favorites from "../Favorites/Favorites";

import { useTraitement } from "../../contexts/TraitementEnCours";

export default function BottomBar({ signout }) {

  const { wait } = useTraitement();

  return (
      <>
        <NavigationContainer independent={true}>
            <Tab.Navigator
                activeColor={colors.mediumOrange}
                inactiveColor={colors.xLightBlue}
                initialRouteName='Home'
                backBehavior={'order'}
                barStyle={{
                    backgroundColor: "#112d5200",
                    borderTopWidth: 0,
                    elevation: 0
                }}
            >
                <Tab.Screen 
                    name='Home'
                    component={Home}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name='home' color={color} size={26} />
                        )
                    }}
                />
                <Tab.Screen 
                    name='Agen'
                    component={Agenda}
                    options={{
                        tabBarLabel: 'Agenda',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name='calendar' color={color} size={26} />
                        )
                    }}
                />
                <Tab.Screen 
                    name='Favo'
                    component={Favorites}
                    options={{
                        tabBarLabel: 'Favorites',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name='heart' color={color} size={26} />
                        )
                    }}
                />
                <Tab.Screen 
                    name='Profi'
                    options={{
                        tabBarLabel: 'Profile',
                        backgroundColor: 'white',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name='account' color={color} size={26} />
                        )
                    }}
                >
                    { (props) => <NavigateProfile {...props} signout={signout} /> }
                </Tab.Screen>
                
            </Tab.Navigator>
        </NavigationContainer>
        {
            wait && (
                <View style={{ position: 'absolute', top: 0, width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, backgroundColor: "#00000055", alignItems: 'center', justifyContent: "center" }} >
                    <Fold size={40} color='white' />
                </View>
            )
        }
      </>
  );
}
