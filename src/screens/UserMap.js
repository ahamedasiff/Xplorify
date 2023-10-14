import { Dimensions, StyleSheet, Text, View, } from 'react-native';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';

const  UserMap=({route})=> {
    const ItemLocation = route.params.location;
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access locatiob was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);


        })();

    }, []);
    let text = 'Waiting...';
    if (errorMsg) {
        text(errorMsg)
    }
    else if (location) {
        text = JSON.stringify(location);
    }

    const specificLocation = {
        latitude: ItemLocation[0], // Replace with the latitude of your specific location
        longitude: ItemLocation[1], // Replace with the longitude of your specific location
        title: 'Destination',
        image : ItemLocation[2],
        

    };

    return (

        <View style={styles.container}>
            <MapView
                showsMyLocationButton={true}
                showsUserLocation={true}
                style={styles.map}
            >
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="My Location"
                        description="This is where I am"
                        pinColor='red'
                    />
                )}
                {specificLocation && (
                    <Marker
                        coordinate={specificLocation}
                        title={specificLocation.title}
                        
                        image={{ uri: specificLocation.image }}
                       
                    />
                )}

            </MapView>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

    },
    Marker:{
        borderRadius:15,
    },

});
export default UserMap;