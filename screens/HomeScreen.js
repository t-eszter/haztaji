import 'react-native-gesture-handler';
import { View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';
import FloatButton from './FloatButton';
import FarmMap from './FarmMap';

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
    </SafeAreaView>
  );
}