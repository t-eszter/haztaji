import { Text, View, ScrollView} from 'react-native'
import React, { Component, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const Travel = () =>{
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Travel',
            headerShown: false,
        });
    }, []);

    return (
      <View className="flex-column flex-1">
        <Text className="mt-9 mb-3 mx-3 text-2xl">Travel</Text>
        <ScrollView className="mx-3">
            <GooglePlacesAutocomplete
            GooglePlacesDetailsQuery={{fields:"geometry"}}
              placeholder='Search'
              fetchDetails={true}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
                console.log(details?.geometry?.viewport);
              }}
              query={{
                key: 'AIzaSyAMYOVdm8qq57T__1zDWw0CQ8xeEbx6QdM',
                language: 'en',
          }}
        />
        </ScrollView>
      </View>
    )
  };

  export default Travel;