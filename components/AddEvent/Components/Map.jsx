import React, { useState } from 'react';

import MapView, { Marker, ProviderPropType  } from 'react-native-maps';

import colors from '../../../helpers/colors';
export default function Map({ updLocation, location }) {

    const [region, setRegion] = useState({
        latitude: location.latitude ? location.latitude : 28.07828754907326,
        longitude: location.longitude ? location.longitude : -10.2977641671896,
        latitudeDelta: location.latitudeDelta ? location.latitudeDelta : 20,
        longitudeDelta: location.longitudeDelta ? location.longitudeDelta : 20,
      });

    const [marker, setMarker] = useState({
        latitude: location.latitude ? location.latitude : 28.07828754907326, 
        longitude: location.longitude ? location.longitude : -10.2977641671896
    });

    function changeMarker(region){
        var currentLocation = {
            latitude: region.latitude, longitude: region.longitude
        };
        setMarker(currentLocation);
        updLocation(region);
    }

    return (
        <>
            <MapView
                style={{height: 250}}
                initialRegion={region}
                onRegionChange={changeMarker}
            >
                <Marker
                    coordinate={marker}
                    pinColor={colors.mediumOrange}
                />
            </MapView>
        </>
    )
}

Map.prototype = {
    provide: ProviderPropType
}
