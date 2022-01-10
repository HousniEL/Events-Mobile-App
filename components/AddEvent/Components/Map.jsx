import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import MapView, { Marker, ProviderPropType  } from 'react-native-maps';

import colors from '../../../helpers/colors';

export default function Map() {

    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

    const [marker, setMarker] = useState({
        coordinate: { latitude: 37.78825, longitude: -122.4324 },
        color: colors.mediumOrange
    });

    function changeMarker(region){
        setMarker({
            coordinate: { latitude: region.latitude, longitude: region.longitude },
            color: colors.mediumOrange
        })
    }

    return (
        <>
            <MapView
                style={{height: 250}}
                initialRegion={region}
                onRegionChange={changeMarker}
            >
                <Marker
                    coordinate={marker.coordinate}
                    pinColor={marker.color}
                />
            </MapView>
        </>
    )
}

Map.prototype = {
    provide: ProviderPropType
}
