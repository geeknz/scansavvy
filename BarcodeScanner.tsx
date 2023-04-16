import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  BarcodeList: { barcodeData: object };
};

interface BarcodeScannerProps {
  navigation: StackNavigationProp<RootStackParamList, 'BarcodeList'>;
  route: RouteProp<RootStackParamList, 'BarcodeList'>;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ navigation }) => {
  const [isScanning, setIsScanning] = useState(true);

  const handleBarCodeScanned = ({ data, _, __, type }: { data: string, _: string, __: string, type: string }) => {
    if (isScanning) {
      setIsScanning(false);
      navigation.navigate('BarcodeForm', {
        data: data,
        type: type,
      });
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        onBarCodeRead={handleBarCodeScanned}
        barCodeTypes={[
          RNCamera.Constants.BarCodeType.aztec,
          RNCamera.Constants.BarCodeType.code128,
          RNCamera.Constants.BarCodeType.code39,
          RNCamera.Constants.BarCodeType.code39mod43,
          RNCamera.Constants.BarCodeType.code93,
          RNCamera.Constants.BarCodeType.ean13,
          RNCamera.Constants.BarCodeType.ean8,
          RNCamera.Constants.BarCodeType.pdf417,
          RNCamera.Constants.BarCodeType.qr,
          RNCamera.Constants.BarCodeType.upc_e
        ]}
        captureAudio={false}
      >
        <Text style={styles.scanText}>Point the camera at a barcode</Text>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scanText: {
    color: 'white',
    fontSize: 18,
    padding: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BarcodeScanner;
