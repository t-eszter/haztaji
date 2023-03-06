import { Text, View, ScrollView, Platform, StyleSheet, TextInput, Dimensions} from 'react-native'
import React, { Component, useLayoutEffect,useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE  } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import SelectDropdown from 'react-native-select-dropdown';

// const products = ["Eggs", "Honey", "Tomato", "Pepper", "Apples","Strawberry","Melon","Chicken","Mushroom"];

const GOOGLE_MAPS_APIKEY = 'AIzaSyAMYOVdm8qq57T__1zDWw0CQ8xeEbx6QdM';
// Geolocation.getCurrentPosition(info => console.log(info));

export default function FarmMap({ navigation, supabase }) {
  console.log(supabase); 
    // const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Travel',
            headerShown: false,
        });
    }, []);

    const [userLocation, setUserLocation] = useState(null);
    const [farms, setFarms] = useState([]);
    // let ScreenHeight = Dimensions.get("window").height;
    // let ScreenWidth = Dimensions.get("window").width;

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
      

      // const [places, setPlaces] = useState([])

      // useEffect(() => {
      //   async function fetchPlaces() {
      //     const { data, error } = await supabase
      //     .from('places').select('latitude, longitude')
      //     if (error) {
      //       console.error(error)
      //     } else {
      //       setPlaces(data)
      //     }
      //   }
      //   fetchPlaces()
      // }, [])
    

  return (
    <View style={styles.container}>
        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
                latitude: userLocation?.latitude || 46.62770931628499,
                longitude: userLocation?.longitude || 19.945015695800024,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>
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
    height: '100%',
    width: '100%',
  },
  map: {
    backgroundColor: 'blue',
    height: '100%',
    width: '100%',
    // ...Platform.select({
    //   ios: {
    //     marginTop: 20,
    //   },
    //   android: {
    //     marginTop: 24,
    //   },
    //   web: {
    //     marginTop: 24,
    //   },
    // }),
  },
});
``
