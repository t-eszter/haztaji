import { Text, View, TextInput, Image,Button,Alert,TouchableOpacity,SafeAreaView,ScrollView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState,useLayoutEffect, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { supabase } from '../supabase/supabase';

export default function AddNewPlace() {

  const [formData, setFormData] = useState({
    place_name: '',
    opening_hours: '',
    phone_number: '',
    products: '',
  });

  const [placeData, setPlaceData] = useState({});

  const handlePlaceSelect = (data, details) => {
    const { name, formatted_address } = data.description;
    const { lat, lng } = details.geometry.location;

    console.log(data, details);
    console.log(data.description)

    setPlaceData({ name, address: formatted_address, lat, lng });
  };


  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };
  
  const addNewPlace = async () => {
    try {
      const { data, error } = await supabase
        .from('places')
        .insert([{ 
          place_name: formData.place_name,
          place_address: placeData.name,
          longitude: placeData.lat,
          latitude: placeData.lng,
          opening_hours: formData.opening_hours,
          phone_number: formData.phone_number,
          products: value,
        }]);
      if (error) throw error;
      console.log('Form submitted successfully:', data);
      Alert.alert('New Place Added');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Please fill in all the fields');
      console.log('Error submitting form:', error.message);
    }
  };

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
        <View className="flex flex-row items-center mt-3 mb-0">
            <Text className="w-4/5 justify-center text-center font-amatic ml-8 pl-6 mt-3 text-5xl">Add new place</Text>
            <TouchableOpacity className="w-1/5" onPress={() => navigation.navigate('Home')}><Text className="mt-2 text-3xl">X</Text></TouchableOpacity>
        </View>
        <Text  className="font-amatic ml-3 mt-0 text-2xl border-solid border-2 border-black-500">Name of the place:</Text>
        <TextInput value={formData.place_name} onChangeText={(text) => handleInputChange('place_name', text)} variant="outlined" label="name"
        className="p-3 pb-2 mx-3 text-left text-3xl rounded-lg border-solid border-2 border-black-500 font-amatic"
        placeholder="Name of the place..."/>

        <Text className="font-amatic ml-3 mt-2 text-2xl border-solid border-2 border-black-500">Address:</Text>

        <View className="z-50 pb-6 mb-6 mx-3 text-left text-3xl rounded-lg border-solid border-2 border-black-500 font-amatic bg-red-700">
            <GooglePlacesAutocomplete onChangeText={(text) => handlePlaceSelect(value, text)} className="mx-3 font-amatic z-50 absolute bottom-0 left-0 "
                GooglePlacesDetailsQuery={{fields:"geometry"}}
                onPress={handlePlaceSelect}
                placeholder='Type address...'
                fetchDetails={true}
                value={value}
                query={{
                    key: 'AIzaSyAMYOVdm8qq57T__1zDWw0CQ8xeEbx6QdM',
                    language: 'en',
            }}
            />
        </View>

        <Text className="font-amatic ml-3 mt-2 text-2xl border-solid border-2 border-black-500">Phone number:</Text>
        <TextInput value={formData.phone_number} onChangeText={(text) => handleInputChange('phone_number', text)} variant="outlined" label="phone"  
        className="p-3 pb-2 mx-3 text-left text-3xl rounded-lg border-solid border-2 border-black-500 font-amatic"
        placeholder="Phone number..."/>

        <Text className="font-amatic ml-3 mt-2 text-2xl border-solid border-2 border-black-500">Opening hours:</Text>
        <TextInput value={formData.opening_hours} onChangeText={(text) => handleInputChange('opening_hours', text)} variant="outlined" label="open"
        className="p-3 pb-2 mx-3 text-left text-3xl rounded-lg border-solid border-2 border-black-500 font-amatic"
        placeholder="Opening hours..."/>

        <Text className="font-amatic ml-3 mt-2 text-2xl border-solid border-2 border-black-500">What do they sell:</Text>
        <DropDownPicker onChangeText={(text) => handleInputChange('products', text)} className="p-3 pb-2 mx-3 text-left text-3xl rounded-lg border-solid border-2 border-black-500 font-amatic"
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