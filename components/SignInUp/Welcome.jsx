import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Button } from "react-native-elements";
import bg from "../../assets/imgs/bga.jpg";

import Colors from '../../helpers/colors';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
     <ImageBackground source={bg} style={styles.image} resizeMode={'cover'}>
         <View style={ styles.contentContainer }>

                <Text style={ styles.title }>
                    Events Share
                </Text>
                <Text style={styles.description}>
                    Organize your propre Event and share it with the rest of the world.
                </Text>
                <Button 
                    title='Sign In'
                    containerStyle={{ marginVertical: 10 }}
                    buttonStyle={styles.signInStyle}
                    titleStyle={{ color: Colors.mediumBlue }}
                    onPress={() => {
                      navigation.push('signin');
                    }}
                />
                <Button 
                    title='Sign Up'
                    containerStyle={{ marginVertical: 10 }}
                    buttonStyle={styles.signUpStyle}
                    onPress={() => {
                      navigation.push('signup');
                    }}
                />
         </View>
     </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
  },
  image: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignContent: "flex-end"
  },
  contentContainer: { alignSelf: 'flex-end', width: '90%', maxWidth: 400, paddingBottom: 40 },
  title: {
    fontSize: 30,
    color: 'white',
    marginBottom: 10
  },
  description: {
    fontSize: 17,
    color: 'white',
    marginVertical: 10,
    marginBottom: 30
  },
  signUpStyle: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    height: 48
  },
  signInStyle: {
    height: 48,
    backgroundColor: 'white'
  }
});
