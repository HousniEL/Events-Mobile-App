import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

import { getImages } from "../services/EventService";

export default function PhotoReader() {

    const [ img, setImg ] = React.useState();

    React.useEffect(() => {
        getImages((res) => {
            console.log(new Blob([res.binary.buffer.data]));
            var imag = "data:image/jpg;base64,";
            imag += res.binary;
            setImg(imag);
        }, (err) => {
            console.log(err.message);
        })
    }, []);

  return (
    <View style={{ flex: 1, borderColor: "black", borderWidth: 2 }}>
      { img && <Image source={{ uri: img }} resizeMode='contain' style={{ width: 250, height: 250, borderWidth: 2, borderColor: 'orange' }} />}
    </View>
  );
}

const styles = StyleSheet.create({});
