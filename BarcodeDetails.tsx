import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './App';
import Barcode from 'react-native-barcode-svg';

const formatMapping = {
  CODE_128: 'CODE128',
  CODE_39: 'CODE39',
  EAN_13: 'EAN13',
  EAN_8: 'EAN8'
};

function convertBarcodeFormat(format) {
  return formatMapping[format] || format;
}

interface BarcodeDetailsProps {
  route: RouteProp<RootStackParamList, 'BarcodeDetails'>;
}

const BarcodeDetails: React.FC<BarcodeDetailsProps> = ({ route }) => {
  const { barcodeData } = route.params;

  const formattedType = convertBarcodeFormat(barcodeData.type);

  return (
    <View style={styles.container}>
      <View style={styles.detailsCard}>
        {barcodeData.description && (
          <Text style={styles.description}>{barcodeData.description}</Text>
        )}
        <Barcode value={barcodeData.data} format={formattedType} />
        <Text style={styles.data}>{barcodeData.data}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  data: {
    fontSize: 14,
    marginTop: 10,
    color: '#555',
  },
});

export default BarcodeDetails;
