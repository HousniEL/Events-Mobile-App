import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../helpers/colors';

import { useAuth } from "../../contexts/AuthContext";
import { getSomeUserInfo, getUserCreatedEvents } from "../../services/UserService";

export default function Profile({ signout, navigation }) {

  const { getCurrentUser, logout } = useAuth();

  const [ userInfo, setUserInfo ] = useState(getCurrentUser());
  const [ nbrEvents, setNbrEvents ] = useState();
  const [ nbrFavoris, setNbrFavoris ] = useState();
  const [ nbrEventsCree, setNbrEventsCree ] = useState();

  useEffect(() => {
    getSomeUserInfo({ id: getCurrentUser()._id }, (res) => {
      setNbrEvents(res.user.nbrEvents);
      setNbrFavoris(res.user.nbrFavoris);
    }, (err) => {
      alert(err.message);
    })
    getUserCreatedEvents({ userId: getCurrentUser()._id }, (res) => {
      setNbrEventsCree(res.evenement.length);
    }, (err) => {
      alert(err.message);
    })
  }, [])

  function out(){
    logout(() => {
      signout();
    }, (err) => {
      console.log(err);
    })
  }

  return (
    <View style={styles.container}>

        {
          userInfo.image ? (
            <Image source={userInfo.image} resizeMode='cover' style={{ width: 90, height: 90, margin: 5, borderRadius: 90 }} />
          ) : (
            <MaterialCommunityIcons name='account-circle' size={100} color={colors.xLightBlue} />
          )
        }
        <View>
            <Text style={ styles.nom }>
              { userInfo.firstname + " " + userInfo.lastname }
            </Text>
            <Text style={ styles.email }>
              { userInfo.email}
            </Text>
        </View>
        <View style={{ flexDirection: "row", width: "90%", maxWidth: 400, justifyContent: 'space-between' }}>
          <View style={ styles.block }>
            <Text style={ styles.blockNumber }>{ nbrEvents ? nbrEvents : 0 }</Text>
            <Text style={ styles.blockIn }>Événements suivis</Text>
          </View>
          <View style={ styles.block }>
            <Text style={ styles.blockNumber }>{ nbrFavoris ? nbrFavoris : 0 }</Text>
            <Text style={ styles.blockIn }>Favoris</Text>
          </View>
          <View style={ styles.block }>
            <Text style={ styles.blockNumber }>{ nbrEventsCree ? nbrEventsCree : 0 }</Text>
            <Text style={ styles.blockIn }>Événements</Text>
          </View>
        </View>
        <View style={ styles.listElement }>
          <MaterialCommunityIcons 
            name="cog"
            size={20}
            color={colors.mediumBlue}
            style={{ marginHorizontal: 8, width: 20, height: 20 }}
          />
          <Text style={[ styles.listElementText, { color: colors.mediumBlue } ]}>
            Modifier vos infos
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.push("addevent")}>
          <View style={ styles.listElement }>
            <MaterialCommunityIcons 
              name="calendar-plus"
              size={20}
              color={colors.mediumBlue}
              style={{ marginHorizontal: 8, width: 20, height: 20 }}
            />
            <Text style={[ styles.listElementText, { color: colors.mediumBlue } ]}>
              Créer un événement
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={out}>
          <View style={ styles.listElement }>
            <MaterialCommunityIcons 
              name="power"
              size={20}
              color={"tomato"}
              style={{ marginHorizontal: 8, width: 20, height: 20 }}
            />
            <Text style={[ styles.listElementText, { color: "tomato" } ]}>
              Se Déconnecter
            </Text>
          </View>
        </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: "15%",
        backgroundColor: 'white'
    },
    nom: {
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'capitalize',
        color: colors.mediumBlue
    },
    email: {
        fontSize: 13,
        textAlign: 'center',
        color: colors.lightBlue,
        marginBottom: 10
    },
    block:{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      marginVertical: 10,
      marginBottom: 40,
      padding: 5
    },
    blockNumber: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.mediumOrange
    },
    blockIn: {
      fontWeight: 'bold',
      color: colors.xLightBlue
    },
    listElement: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      paddingVertical: 15,
      width: "90%", maxWidth: 400, backgroundColor: 'white', elevation: 5, borderRadius: 5,
      marginBottom: 10
    },
    listElementText:{
      fontSize: 16,
    }
});
