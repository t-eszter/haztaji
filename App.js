// Supabase database
import 'react-native-url-polyfill/auto'
const supabaseUrl = 'https://qgvehrcffejjqaprawiz.supabase.co'
import { supabase } from './supabase/supabase';


import 'react-native-gesture-handler';
import React, { useEffect, useState,Component,useLayoutEffect }  from 'react';


import { useFonts, AmaticSC_400Regular } from '@expo-google-fonts/amatic-sc';
import * as Font from 'expo-font';

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';

import AddNewPlace from './screens/AddNewPlace';
// import HomeScreen from './screens/HomeScreen';


const Drawer = createDrawerNavigator();

class FloatButton extends Component {
  handlePress = () => {
    this.props.navigation.openDrawer();
  };
  render() {
    return (
      <View className="flex-row absolute top-0 left-0 px-6 mt-8 items-center space-x-2">
        <TouchableOpacity title="Open Drawer" onPress={this.handlePress} className="flex-none w-16 h-16 bg-haztaji rounded-full justify-center">
          <Image style={{width: 44, height: 44, margin:10}} source={require('./assets/haztaji-logo.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

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



  // const Stack = createStackNavigator();
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
            <Drawer.Screen name="Add New Place" component={AddNewPlace} />
          </Drawer.Navigator>
      </NavigationContainer>
  );
}

function HomeScreen(props) {
  const navigation = useNavigation();

   useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

  return (
    <SafeAreaView className="flex-1 relative">
        <View className="flex-1 relative">
            <MapView 
            className="flex-1 relative" />
            <FloatButton navigation={navigation} />
            <View className="flex-row absolute top-0 left-0 px-6 mt-8 items-center space-x-2">
                <View className="flex-auto justify-center items-center">
                <Image style={{width:75, height:40}} source={require('./assets/haztaji-text-logo.png')} />
                </View>
            </View>
        </View>
    </SafeAreaView>
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
