import { View, Text } from 'react-native'
import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import FloatButton from './FloatButton';
import AddNewPlace from './AddNewPlace';

const Drawer = createDrawerNavigator();

export default function SideMenu() {
  return (
    <NavigationContainer>
        <Drawer.Navigator
        drawerContent={(props) => <FloatButton {...props} />}
        >
            <Drawer.Screen name="AddNewPlace" component={AddNewPlace} />
        </Drawer.Navigator>
    </NavigationContainer>
  )
}
