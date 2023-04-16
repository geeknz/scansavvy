import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './App';

type BarcodeFormProps = {
  route: RouteProp<RootStackParamList, 'BarcodeForm'>;
};

const BarcodeForm: React.FC<BarcodeFormProps> = ({ route }) => {
  const { type, data } = route.params;
  const navigation = useNavigation();
  const [description, setDescription] = useState<string>('');
  const [expiry, setExpiry] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleSubmit = () => {
    navigation.navigate('BarcodeList', {
      barcodeData: {
        id: Date.now().toString(),
        type: type,
        data: data,
        expiry: expiry?.toISOString().split('T')[0],
        description: description,
      },
    });
  };

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChanged = (_: Event, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setExpiry(selectedDate);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.inputLabel}>Description:</Text>
      <TextInput
        style={styles.inputLabel}
        onChangeText={(text) => setDescription(text)}
        value={description}
        placeholder="Enter description"
      />

      <Text style={styles.inputLabel}>Expiry Date:</Text>
      <TouchableOpacity onPress={showDateTimePicker}>
        <TextInput
        style={[styles.input, styles.nonEditableInput]}
        value={expiry?.toISOString().split('T')[0]}
        editable={false}
        />
      </TouchableOpacity>

      <Text style={styles.inputLabel}>Type:</Text>
      <TextInput
        style={[styles.input, styles.nonEditableInput]}
        value={type}
        editable={false}
      />

      <Text style={styles.inputLabel}>Code:</Text>
      <TextInput
        style={[styles.input, styles.nonEditableInput]}
        value={data}
        editable={false}
      />

      {showDatePicker && (
        <DateTimePicker
          value={expiry || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChanged}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Add to List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      padding: 16,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#333',
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 8,
      marginBottom: 16,
      borderRadius: 4,
    },
    nonEditableInput: {
      backgroundColor: '#e0e0e0',
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

export default BarcodeForm;
