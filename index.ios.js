/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from "react";
import {AppRegistry, Image, StyleSheet, View} from "react-native";
import MapView from "react-native-maps";

export default class AwesomeProject extends Component {
    getNativeRegionData(lat, lon, zoom) {
        const accuracy = 591657550.500000 / Math.pow(2, (zoom + 3));
        const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
        const circumference = (40075 / 360) * 1000;

        const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
        const lonDelta = (accuracy / oneDegreeOfLongitudeInMeters);

        return {
            latitude: lat,
            longitude: lon,
            latitudeDelta: Math.max(0, latDelta),
            longitudeDelta: Math.max(0, lonDelta)
        };
    }

    render() {

        let region = new MapView.AnimatedRegion(this.getNativeRegionData(37.773309, -122.405959, 17));

        let markersData = [
            {
                lat: 37.772011,
                lng: -122.406152
            },
            {
                lat: 37.772460,
                lng: -122.403931
            },
            {
                lat: 37.773309,
                lng: -122.405959
            }
        ];
        return (
            <View style={styles.container}>
                <MapView.Animated
                    style={styles.map}
                    region={region}
                    showsUserLocation={true}
                >
                    {markersData.map((marker, i) =>
                        <MapView.Marker
                            key={'marker' + i}
                            coordinate={{
                                latitude: marker.lat,
                                longitude: marker.lng,
                            }}
                        >
                            <Image
                                key={'img' + i}
                                source={{uri: 'https://thetomatos.com/wp-content/uploads/2016/05/red-roundedwith-number-6-clip-art.png'}}
                                style={{width: 75, height: 75}}/>
                        </MapView.Marker>
                    )}
                </MapView.Animated>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
