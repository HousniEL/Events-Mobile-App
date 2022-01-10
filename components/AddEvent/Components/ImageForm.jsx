import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import * as ImagePicker from "expo-image-picker";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../../../helpers/colors";

export default function ImageForm() {

    const [images, setImages] = useState([]);
    const [refresh, setRefresh] = useState(false);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        var imgs = images;
        imgs.push({ uri: pickerResult.uri });
        setImages(imgs);
        setRefresh(!refresh);
    }
      
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
