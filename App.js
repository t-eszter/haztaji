// Supabase database
import 'react-native-url-polyfill/auto'
const supabaseUrl = 'https://qgvehrcffejjqaprawiz.supabase.co'
import { supabase } from './supabase/supabase';
// import { createClient } from '@supabase/supabase-js'


import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component,useLayoutEffect }  from 'react';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, AmaticSC_400Regular } from '@expo-google-fonts/amatic-sc';
import * as Font from 'expo-font';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import Travel from "./screens/Travel";
import FarmMap from "./screens/FarmMap";
import AddNewPlace from './screens/AddNewPlace';
import SideMenu from './screens/SideMenu';
import FloatButton from './screens/FloatButton';


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [items, setItems] = useState([]);

  const getItems = async () => {
    let {data: Items, error } = await supabase
        .from('places')
        .select('*')
    console.log(places)
    return places;
  }
  
    useEffect(() => {
        getItems()
        .then((places) => {
            console.log(places);
            setItems(places);
        })
    }, []);

    useEffect(() => {
        async function prepare() {
        try {
            // Pre-load fonts, make any API calls you need to do here
            // await Font.loadAsync(Entypo.font);
            await Font.loadAsync({ AmaticSC_400Regular });
            // Artificially delay for two seconds to simulate a slow loading
            // experience. Please remove this if you copy and paste the code!
            await new Promise(resolve => setTimeout(resolve, 3000));
        } catch (e) {
            console.warn(e);
        } finally {
            // Tell the application to render
            setAppIsReady(true);
        }
        }

        

    prepare();
  }, []);



  const Stack = createStackNavigator();
  return (
  //   <NavigationContainer>
  //   <Stack.Navigator>
  //     <Stack.Screen name="AddNewPlace" component={AddNewPlace} />
  //     <Stack.Screen name="FarmMap" component={FarmMap} />
  //     <Stack.Screen name="Travel" component={Travel} />
  //   </Stack.Navigator>
  // </NavigationContainer>
      <NavigationContainer>
      <Drawer.Navigator
        // drawerContent={(props) => <FloatButton {...props} />}
        initialRouteName="HomeScreen"
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Új hely hozzáadása" component={AddNewPlace} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
