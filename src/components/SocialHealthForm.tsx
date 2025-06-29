import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { API_BASE_URL } from '@env';
import { useTheme } from '../theme/ThemeContext';

const base = API_BASE_URL.replace(/\/$/, '');
const CREATE_OBRA_SOCIAL_URL = base.endsWith('/api')
  ? `${base}/obras-sociales`
  : `${base}/api/obras-sociales`;

const SocialHealthForm: React.FC = () => {
  const [socialHealthName, setSocialHealthName] = useState('');
  const [affiliateNumber, setAffiliateNumber] = useState('');
  const [tipoAfiliado, setTipoAfiliado] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();

  const showDatePicker = () => setShowPicker(true);

  const onChangeDate = (_: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowPicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const handleCancel = () => {
    navigation.navigate('Home');
  };

  const handleSave = async () => {
    if (!tipoAfiliado) {
      Toast.show({ type: 'error', text1: 'Debes seleccionar un tipo de afiliado' });
      return;
    }
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('accessToken');

      if (!userId || !token) {
        return Alert.alert('Error', 'No se pudo recuperar el ID del usuario o el token');
      }

      const payload = {
        nombreObraSocial: socialHealthName,
        numeroAfiliado: parseInt(affiliateNumber),
        tipoAfiliado,
        fechaAlta: startDate.toISOString().split('T')[0],
        userId: parseInt(userId),
      };

      const res = await fetch(CREATE_OBRA_SOCIAL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.mensaje || 'No se pudo crear la obra social');
      }

      Toast.show({ type: 'success', text1: 'Obra social cargada correctamente' });
      navigation.navigate('Home');
    } catch (err: any) {
      console.error('❌ Error cargando obra social:', err);
      Alert.alert('Error', err.message || 'Falló la carga de la obra social');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.formContainer, { backgroundColor: theme.card, borderRadius: 16, padding: 16 }] }>
        <Text style={[styles.label, { color: theme.text }]}>Ingrese los datos de la obra social</Text>

        <View style={styles.inputView}>
          <Text style={[styles.label, { color: theme.text }]}>Nombre de la obra social</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.input, color: theme.text, borderColor: theme.border }]}
            placeholder="Ej. OSDE"
            placeholderTextColor={theme.placeholder}
            value={socialHealthName}
            onChangeText={setSocialHealthName}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={[styles.label, { color: theme.text }]}>Número de afiliado</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.input, color: theme.text, borderColor: theme.border }]}
            value={affiliateNumber}
            onChangeText={setAffiliateNumber}
            keyboardType="number-pad"
            placeholder="12345678"
            placeholderTextColor={theme.placeholder}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={[styles.label, { color: theme.text }]}>Tipo de afiliado</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={tipoAfiliado}
              onValueChange={value => setTipoAfiliado(value)}
              style={[styles.pickerText, {width: '100%'}]}
              itemStyle={{ fontSize: 15 }}
              dropdownIconColor="#1226A9"
            >
              <Picker.Item label="Seleccionar tipo de afiliado..." value="" color="#999" />
              <Picker.Item label="Titular en relación de dependencia" value="Titular en relación de dependencia" />
              <Picker.Item label="Monotributista" value="Monotributista" />
              <Picker.Item label="Autónomo" value="Autónomo" />
              <Picker.Item label="Jubilado / Pensionado" value="Jubilado / Pensionado" />
              <Picker.Item label="Cónyuge o pareja conviviente" value="Cónyuge o pareja conviviente" />
              <Picker.Item label="Hijo/a menor de 21 años" value="Hijo/a menor de 21 años" />
              <Picker.Item label="Hijo/a estudiante" value="Hijo/a estudiante" />
              <Picker.Item label="Hijo/a con discapacidad" value="Hijo/a con discapacidad" />
              <Picker.Item label="Padre / Madre a cargo" value="Padre / Madre a cargo" />
              <Picker.Item label="Nieto/a a cargo" value="Nieto/a a cargo" />
              <Picker.Item label="Hermano/a a cargo" value="Hermano/a a cargo" />
              <Picker.Item label="Afiliado voluntario" value="Afiliado voluntario" />
              <Picker.Item label="Afiliado adherente" value="Afiliado adherente" />
              <Picker.Item label="Beneficiario de plan social" value="Beneficiario de plan social" />
            </Picker>
          </View>
          {!tipoAfiliado && (
            <Text style={styles.errorText}>Debes seleccionar un tipo de afiliado</Text>
          )}
        </View>

        <View style={styles.inputView}>
          <Text style={[styles.label, { color: theme.text }]}>Fecha de alta</Text>
          <Pressable onPress={showDatePicker} style={styles.dateWrapper}>
            <Text style={[styles.dateText, { color: theme.text }]}>
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
          <TouchableOpacity
            style={[styles.button, styles.saveBtn, !tipoAfiliado && { opacity: 0.5 }]}
            onPress={handleSave}
            disabled={!tipoAfiliado}
          >
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  pickerText: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: '#000',
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
  errorText: {
    color: '#B32D2F',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
});

export default SocialHealthForm;
