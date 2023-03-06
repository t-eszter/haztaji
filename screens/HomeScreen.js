import 'react-native-gesture-handler';
import { View, SafeAreaView, Image, StyleSheet } from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import MapView from 'react-native-maps';
import FloatButton from './FloatButton';
import FarmMap from './FarmMap';

const products = ["Eggs", "Honey", "Tomato", "Pepper", "Apples","Strawberry","Melon","Chicken","Mushroom"];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 relative">
        <FarmMap/>
        <FloatButton navigation={navigation} />
        <View className="flex-row absolute top-0 left-0 px-6 mt-8 items-center space-x-2">
            <View className="flex-auto justify-center items-center">
                <Image style={{width:75, height:40}} source={require('../assets/haztaji-text-logo.png')} />
            </View>
        </View>
        <View style={styles.dropdownContainer}>

              <SelectDropdown
                          data={products}
                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                          }}
                          defaultButtonText={"What would you like to buy?"}
                          dropdownOverlayColor={"transparent"}
                          search={true}
                          buttonStyle={{width: '95%', border:'solid', borderWidth: 1, borderColor: 'black', borderRadius: 10}}
                          dropdownStyle={{width: '100%', height: '100%'}}
                          rowTextStyle={{color: 'black', fontSize: 20,}}
                          // rowStyle={{width: '100%', height: '100%', backgroundColor: 'white',}}
                          // searchInputStyle={{color: 'black', fontSize: 20,width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, backgroundColor: 'white',}}
                          searchPlaceHolderText={"Search products..."}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                          }}
                          rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to repreeggsent item in dropdown
                            return item
                          }}
                  />
          </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    left: 10,
    right: 10,
    zIndex: 1,
  },
});