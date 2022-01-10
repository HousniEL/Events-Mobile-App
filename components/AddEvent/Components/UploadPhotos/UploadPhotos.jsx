import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import * as ImagePicker from "expo-image-picker";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../../../../helpers/colors";

import { API_URL } from "@env";

function createFormData(photo, body = {}) {
    const data = new FormData();
  
    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    return data;
};

export default function UploadPhotos() {

    const [images, setImages] = useState([]);
    const [refresh, setRefresh] = useState(false);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let photo = await ImagePicker.launchImageLibraryAsync();
        var imgs = images;
        imgs.push({ 
            name: photo.fileName,
            type: photo.type,
            uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });
        setImages(imgs);
        setRefresh(!refresh);
    }

    function handleUploadPhoto() {
        fetch(`${API_URL}/event/upload`, {
          method: 'POST',
        })
          .then((response) => response.json())
          .then((response) => {
            console.log('response', response);
          })
          .catch((error) => {
            console.log('error', error);
          });
    };
      
      return (
        <View style={styles.container}>
            {
                images.length !== 0 && images.map( (image, idx) => (
                    <View style={styles.imgContainer} key={idx}>
                        <Image 
                            source={image}
                            resizeMode={"contain"}
                            style={styles.img}
                        />
                    </View>
                ))
            }
            <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                <MaterialCommunityIcons name="camera-plus-outline" color={colors.mediumOrange} size={35} style={{ width: 35, height: 35 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUploadPhoto} style={{ borderWidth: 1, borderColor: 'black', padding: 10 }}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        alignSelf: 'center',
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: '#fff',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imgContainer: {
        width: 170,
        height: 145,
        borderWidth: 2,
        borderColor: colors.mediumOrange,
        borderRadius: 15,
        margin: 5
    },
    img: {
        width: 165,
        height: 140,
    },
    button: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: colors.mediumOrange,
        borderRadius: 15,
        width: 170,
        height: 145,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
});
