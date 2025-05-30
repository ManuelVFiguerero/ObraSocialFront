import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Platform,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { RootStackParamList } from '../types';

interface PickerItem {
  label: string;
  value: string;
}

const tipos: PickerItem[] = [
  { label: 'Titular', value: 'titular' },
  { label: 'Familiar', value: 'familiar' },
  { label: 'Adherente', value: 'adherente' },
];

const SocialHealthForm: React.FC = () => {
  const [socialHealthName, setSocialHealthName] = useState('');
  const [affiliateNumber, setAffiliateNumber] = useState('');
  const [tipoAfiliado, setTipoAfiliado] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const showDatePicker = () => setShowPicker(true);

  const onChangeDate = (_: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowPicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const handleCancel = () => {
    navigation.navigate('Home');
  };

  const handleSave = () => {
    navigation.navigate('Home');
    Toast.show({ type: 'success', text1: 'Datos guardados exitosamente' });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Ingrese los datos de la obra social</Text>

      <View style={styles.inputView}>
        <Text style={styles.label}>Nombre de la obra social</Text>
        <TextInput
          style={styles.input}
          value={socialHealthName}
          onChangeText={setSocialHealthName}
          placeholder="Ej. OSDE"
        />
      </View>

      <View style={styles.inputView}>
        <Text style={styles.label}>Número de afiliado</Text>
        <TextInput
          style={styles.input}
          value={affiliateNumber}
          onChangeText={setAffiliateNumber}
          keyboardType="number-pad"
          placeholder="12345678"
        />
      </View>

      <View style={styles.inputView}>
        <Text style={styles.label}>Tipo de afiliado</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(val) => setTipoAfiliado(val)}
            items={tipos}
            placeholder={{ label: 'Seleccionar...', value: '' }}
            value={tipoAfiliado}
            style={{
              inputIOS: styles.pickerText,
              inputAndroid: styles.pickerText,
            }}
          />
        </View>
      </View>

      <View style={styles.inputView}>
        <Text style={styles.label}>Fecha de alta</Text>
        <Pressable onPress={showDatePicker} style={styles.dateWrapper}>
          <Text style={styles.dateText}>
            {startDate.toLocaleDateString()}
          </Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, styles.cancelBtn]} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveBtn]} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#F3F4F8',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#1226A9',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputView: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  pickerText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000',
    paddingVertical: 12,
  },
  dateWrapper: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 40,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#B32D2F',
    marginRight: 10,
  },
  saveBtn: {
    backgroundColor: '#429B46',
    marginLeft: 10,
  },
  buttonText: {
    color: '#F3F4F8',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  },
});

export default SocialHealthForm;

