import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Platform, TouchableWithoutFeedback, Text } from 'react-native';

import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

import { Button } from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../../../helpers/colors";

import { addEvent } from "../../../services/EventService";

import { useForm } from "../Contexts/Form";
import { useTraitement } from "../../../contexts/TraitementEnCours";
import { useAuth } from '../../../contexts/AuthContext';

import SuccessMessage from "./SuccessMessage";

export default function ImageForm({ handlePrevious, handleFinish, navigation }) {

    const { setWait } = useTraitement();
    const { form, addNewField } = useForm();
    const { getCurrentUser } = useAuth();

    const [ images, setImages ] = useState([]);
    const [ imageForm, setImageForm ] = useState([]);

    const [ refresh, setRefresh ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ done, setDone ] = useState(false);

    async function getFileInfo(fileURI) {
        const fileInfo = await FileSystem.getInfoAsync(fileURI);
        return fileInfo;
    }

    /*useEffect(() => {
        if( form.images ){
            setImages(form.images);
        }
    }, []);*/

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let photo = await ImagePicker.launchImageLibraryAsync({
            uri: true,
            base64: true,
        });

        if( !photo.cancelled ){
            const fileInfo = await getFileInfo(photo.uri);
            var sizeInMB = fileInfo.size / 1024 / 1024;
    
            if(sizeInMB > 4){
                alert("Image size must be under 4 MB");
            } else {
                var imgs = images, imgForm = imageForm;
                imgs.push({
                    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
                });
                imgForm.push({
                    name: "image" + imageForm.length,
                    imgsource: photo.base64
                })
                setImages(imgs);
                setImageForm(imgForm);
                setRefresh(!refresh);
            }
        }

    }

    function valid(){
        setDone(false);
        navigation.pop();
    }

    function Finish(){
        setError(false);
        setWait(true);

        if(images.length != 0){

            var rep = form.title;

            var Images = {
                rep : rep,
                imgs : imageForm
            }

            var imagesValue = { [rep] : [] };

            for( let img of imageForm ){
                imagesValue[form.title].push(img.name);
            }

            addNewField('images', imagesValue);
            addNewField('dateCreation', new Date());
            addNewField('idOrganisateur', getCurrentUser()._id);

            return addEvent(form, Images, () => {
                setWait(false);
                setDone(true);
            }, (err) => {
                setWait(false);
                alert(err.message);
            });
        }

        setError(true);
    }

    function deleteImg(index){
        var imgs = images;
        imgs = imgs.filter((value, idx) => idx != index);
        setImages(imgs);
    }
    
    return (
        <>
            <View style={styles.container}>
                {
                    images.length !== 0 && images.map( (image, idx) => (
                        <View style={styles.imgContainer} key={idx}>
                            <Image 
                                source={image}
                                resizeMode={"contain"}
                                style={styles.img}
                            />
                            <TouchableWithoutFeedback onPress={() => deleteImg(idx)} >
                                <MaterialCommunityIcons color={colors.mediumOrange} name="close" size={20} style={{ margin: 5 }} />
                            </TouchableWithoutFeedback>
                        </View>
                    ))
                }
                <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                    <MaterialCommunityIcons name="camera-plus-outline" color={colors.mediumOrange} size={35} style={{ width: 35, height: 35 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    title={ "Previous" }
                    onPress={ handlePrevious }
                    buttonStyle={{ width: 100, backgroundColor: "#112d5277" }}
                />
                <Button 
                    title={ "Finish" }
                    onPress={ Finish }
                    buttonStyle={{ width: 100, backgroundColor: colors.mediumOrange }}
                />
            </View>
            <View style={ styles.errorContainer }>
                {   
                    error && (
                        <>
                            <MaterialCommunityIcons name="alert-circle-outline" color="tomato" size={20} style={{ width: 20, height: 20 }} />
                            <Text style={ styles.errorM }>
                                Give at least one image
                            </Text>
                        </>
                    )
                }
            </View>
            <SuccessMessage show={done} done={valid} title={form.title} />
        </>
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
        position: 'absolute'
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
    buttonContainer: { 
        flexDirection: 'row', 
        justifyContent: "space-between", 
        flexGrow: 1,
        alignSelf: "center", 
        width: '90%',
        marginTop: 50,
        marginBottom: 15
    },
    errorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 25
    },
    errorM: {
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'tomato',
        marginLeft: 5
    }
});
