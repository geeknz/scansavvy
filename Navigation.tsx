import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BarcodeList from './BarcodeList';
import BarcodeScanner from './BarcodeScanner';
import BarcodeDetails from './BarcodeDetails';
import BarcodeForm from './BarcodeForm';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BarcodeList"
        component={BarcodeList}
        options={{ title: 'Barcode List' }}
      />
      <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScanner}
        options={{ title: 'Scan a Code' }}
      />
      <Stack.Screen
        name="BarcodeDetails"
        component={BarcodeDetails}
        options={{ title: 'Barcode Details' }}
      />
      <Stack.Screen
        name="BarcodeForm"
        component={BarcodeForm}
        options={{ title: 'Barcode Details' }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
