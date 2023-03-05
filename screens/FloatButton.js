import 'react-native-gesture-handler';
import React, { Component }  from 'react';
import {View,Text, StyleSheet, TouchableOpacity, Image,} from 'react-native';

class FloatButton extends Component {

        handlePress = () => {
            this.props.navigation.openDrawer();
        };
        render() {
            return (
                <View className="flex-row absolute top-0 left-0 px-6 mt-8 items-center space-x-2">

                <TouchableOpacity title="Open Drawer" onPress={this.handlePress} className="flex-none w-16 h-16 bg-haztaji rounded-full justify-center">
                     <Image style={{width: 44, height: 44, margin:10}} source={require('../assets/haztaji-logo.png')} />
                </TouchableOpacity>
                </View>
            );
        }
}

export default FloatButton;