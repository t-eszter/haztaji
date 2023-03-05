import { Text, View, TextInput, Image,Button,Alert,TouchableOpacity,SafeAreaView,ScrollView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState,useLayoutEffect, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { supabase } from '../supabase/supabase';


export default function AddNewPlace() {

  const[place_name, setPlaceName] = useState('');
  const[place_address, setPlaceAddress] = useState('');
  const[opening_hours, setOpeningHours] = useState('');
  const[phone_number, setPhoneNumber] = useState('');
  const[products, setProducts] = useState('');

  const addNewPlace = async (place_name, place_address,opening_hours,phone_number,value) => {
    const {data: places, error } = await supabase
      .from('places')
      .insert([
        {place_name: place_name},
        {place_address: place_address},
        {opening_hours: opening_hours},
        {phone_number: phone_number},
        {products: value }
    ])
  
    Alert.alert('New Place Added');
    navigation.navigate('FarmMap');
    return places;
  }

const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false,
    });
}, [navigation]);


  // render() {
    // if (!fontsLoaded) {
    //   return <AppLoading />;
    // } else {
      const [open, setOpen] = useState(false);
      const [value, setValue] = useState(null);
      const [items, setItems] = useState([
        {label: 'Poultry Products', value: 'pp'},
        {label: 'Egg', value: 'egg', parent: 'pp', icon: () => <Image source={require('../assets/icons/egg.png')} />},
        {label: 'Whole chicken', value: 'chicken', parent: 'pp', icon: () => <Image source={require('../assets/icons/chicken.png')} />},
        {label: 'Fruits', value: 'fruits'},
        {label: 'Apple', value: 'apple', parent: 'fruits', icon: () => <Image source={require('../assets/icons/apple.png')} />},
        {label: 'Strawberry', value: 'strawberry', parent: 'fruits', icon: () => <Image source={require('../assets/icons/strawberry.png')} />},
        {label: 'Melon', value: 'melon', parent: 'fruits', icon: () => <Image source={require('../assets/icons/melon.png')} />},
        {label: 'Vegetables', value: 'vegetables'},
        {label: 'Tomato', value: 'tomato', parent: 'vegetables', icon: () => <Image source={require('../assets/icons/tomato.png')} />},
        {label: 'Pepper', value: 'pepper', parent: 'vegetables', icon: () => <Image source={require('../assets/icons/pepper.png')} />},
        {label: 'Other', value: 'other'},
        {label: 'Honey', value: 'honey', parent: 'other', icon: () => <Image source={require('../assets/icons/honey.png')} />},
        {label: 'Mushroom', value: 'mushroom', parent: 'other', icon: () => <Image source={require('../assets/icons/mushroom.png')} />}
      ]);

    return (
      <SafeAreaView className="flex-1 flex flex-column justify-top items-left bg-white">
        <View className="items-center mt-3 mb-0"><Text className="font-amatic ml-3 mt-3 text-5xl">Add new place</Text></View>
        <Text  className="font-amatic ml-3 mt-0 text-2xl border-solid border-2 border-black-500">Name of the place:</Text>
        <TextInput value={place_name} onChangeText={setPlaceName} variant="outlined" label="name"
        className="p-3 pb-2 mx-3 text-left text-3xl rounded-lg border-solid border-2 border-black-500 font-amatic"
        placeholder="Name of the place..."/>

        <Text className="font-amatic ml-3 mt-2 text-2xl border-solid border-2 border-black-500">Address:</Text>
        {/* <TextInput variant="outlined" label="address"
        className="p-3 pb-2 mx-3 text-left text-3xl rounded-lg border-solid border-2 border-black-500 font-amatic"
        placeholder="Address..."/> */}
        <View className="z-50 pb-6 mb-6 mx-3 text-left text-3xl rounded-lg border-solid border-2 border-black-500 font-amatic bg-red-700">
            <GooglePlacesAutocomplete onChangeText={setPlaceAddress} className="mx-3 font-amatic z-50 absolute bottom-0 left-0 "
                GooglePlacesDetailsQuery={{fields:"geometry"}}
                placeholder='Type address...'
                fetchDetails={true}
                value={place_address}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    // console.log(data, details);
                    // console.log(details?.geometry?.viewport);
                }}
                query={{
                    key: 'AIzaSyAMYOVdm8qq57T__1zDWw0CQ8xeEbx6QdM',
                    language: 'en',
            }}
            />
        </View>

        <Text className="font-amatic ml-3 mt-2 text-2xl border-solid border-2 border-black-500">Phone number:</Text>
        <TextInput value={phone_number} onChangeText={setPhoneNumber} variant="outlined" label="phone"  
        className="p-3 pb-2 mx-3 text-left text-3xl rounded-lg border-solid border-2 border-black-500 font-amatic"
        placeholder="Phone number..."/>

        <Text className="font-amatic ml-3 mt-2 text-2xl border-solid border-2 border-black-500">Opening hours:</Text>
        <TextInput value={opening_hours} onChangeText={setOpeningHours} variant="outlined" label="open"
        className="p-3 pb-2 mx-3 text-left text-3xl rounded-lg border-solid border-2 border-black-500 font-amatic"
        placeholder="Opening hours..."/>

        <Text className="font-amatic ml-3 mt-2 text-2xl border-solid border-2 border-black-500">What do they sell:</Text>
        <DropDownPicker onChangeText={setProducts} className="p-3 pb-2 mx-3 text-left text-3xl rounded-lg border-solid border-2 border-black-500 font-amatic"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          showTickIcon={true}
          searchable={true}
          addCustomItem={true}
          multiple={true}
          mode="BADGE"
          showBadgeDot={false}
          listMode="MODAL"
          placeholder="Select items..."
          categorySelectable={false}
        />

        <TouchableOpacity className="p-3 pb-2 mx-3 my-3 bg-haztaji_green text-left text-3xl rounded-lg border-solid border-2 border-black-500 font_amatic"
        title="Add new place"
        onPress={() => addNewPlace()}><Text className="font-amatic text-3xl text-center">Add new place</Text></TouchableOpacity>  

      </SafeAreaView>
    )
  }
// }
// }