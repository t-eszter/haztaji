import { Text, View, ScrollView, Platform, StyleSheet, TextInput, Dimensions} from 'react-native'
import React, { Component, useLayoutEffect,useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE  } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const GOOGLE_MAPS_APIKEY = 'AIzaSyAMYOVdm8qq57T__1zDWw0CQ8xeEbx6QdM';

export default function FarmMap({places}) {
  const longitude = places.map(place => place.longitude);
  console.log(longitude);


    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Travel',
            headerShown: false,
        });
    }, []);
    const [userLocation, setUserLocation] = useState(null);
    const [farms, setFarms] = useState([]);
    const getUserLocationAndFetchFarms = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
      
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
      
        const keyword = 'farm products';
        const radius = 50000;
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=${radius}&type=${keyword}&key=AIzaSyAMYOVdm8qq57T__1zDWw0CQ8xeEbx6QdM`;
      
        fetch(url)
          .then(response => response.json())
          .then(data => setFarms(data.results))
          .catch(error => console.log(error));
    };
    useEffect(() => {
        getUserLocationAndFetchFarms();
      }, []);
      
  return (
    <View style={styles.container}>
        <MapView
            key={`map-${places.length}`}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
                latitude: userLocation?.latitude || 46.62770931628499,
                longitude: userLocation?.longitude || 19.945015695800024,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            >
            {farms.map(farm => (
                <Marker
                key={farm.place_id}
                coordinate={{
                    latitude: farm.geometry.location.lat,
                    longitude: farm.geometry.location.lng,
                }}
                title={farm.name}
                description={farm.vicinity}
                />
            ))}
            {places.map(place => (
            <Marker
              key={place.id}
              coordinate={{
                latitude: place.latitude || 46.62770931628499,
                longitude: place.longitude || 19.945015695800024,
              }}
              title={place.place_name}
            />
          ))}
        </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  map: {
    backgroundColor: 'blue',
    height: '100%',
    width: '100%',
    }
});
