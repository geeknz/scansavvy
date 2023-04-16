import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './App';

interface BarcodeListProps {
  route: RouteProp<RootStackParamList, 'BarcodeList'>;
}

type BarcodeDataType = {
  id: string;
  type: string;
  data: string;
  expiry: string | null;
  description: string;
};

const ListItem: React.FC<{
  item: BarcodeDataType;
  onPressDelete: () => void;
  onPressItem: () => void;
}> = ({ item, onPressDelete, onPressItem }) => (
  <View style={styles.listItem}>
    <TouchableOpacity onPress={onPressItem} style={styles.itemTouchable}>
      <View style={styles.textContainer}>
        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}
        <Text style={styles.data}>{item.data}</Text>
          {item.expiry && (
            <Text style={styles.expiry}>Expiry: {item.expiry}</Text>
          )}
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  </View>
);

const BarcodeList: React.FC<BarcodeListProps> = ({ route }) => {
  const navigation = useNavigation();
  const [barcodes, setBarcodes] = useState<BarcodeDataType[]>([]);

  useEffect(() => {
    loadBarcodes();
  }, []);

  useEffect(() => {
    if (route.params?.barcodeData) {
      setBarcodes((prevBarcodes) => {
        const newBarcodes = [...prevBarcodes, route.params.barcodeData];
        saveBarcodes(newBarcodes);
        return newBarcodes;
      });
    }
  }, [route.params?.barcodeData]);

  const renderItem = ({ item }) => (
    <ListItem
      item={item}
      onPressDelete={() => removeBarcode(item)}
      onPressItem={() => navigation.navigate('BarcodeDetails', { barcodeData: item })}
    />
  );

  const saveBarcodes = async (barcodes: BarcodeDataType[]) => {
    try {
      await AsyncStorage.setItem('barcodes', JSON.stringify(barcodes));
    } catch (error) {
      console.error('Error saving barcodes:', error);
    }
  };

  const loadBarcodes = async () => {
    try {
      const storedBarcodes = await AsyncStorage.getItem('barcodes');
      if (storedBarcodes !== null) {
        const parsedBarcodes = JSON.parse(storedBarcodes);
        const sortedBarcodes = parsedBarcodes.sort((a: BarcodeDataType, b: BarcodeDataType) => a.expiry > b.expiry ? 1 : -1)
        setBarcodes(sortedBarcodes);
      }
    } catch (error) {
      console.error('Error loading barcodes:', error);
    }
  };

  const removeBarcode = async (barcodeToRemove: BarcodeDataType) => {
    const updatedBarcodes = barcodes.filter(
      (barcode) => barcode.id !== barcodeToRemove.id
    );
    setBarcodes(updatedBarcodes);
    saveBarcodes(updatedBarcodes);
  };

  const handleAddCode = () => {
    navigation.navigate('BarcodeScanner');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={barcodes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddCode}>
        <Text style={styles.addButtonText}>Add Code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  textContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  data: {
    fontSize: 16,
    marginTop: 8,
    color: '#555',
  },
  expiry: {
    fontSize: 14,
    marginTop: 8,
    fontStyle: 'italic',
    color: '#555',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  itemTouchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#3f51b5',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BarcodeList;
