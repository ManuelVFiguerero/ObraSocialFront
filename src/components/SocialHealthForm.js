import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Platform, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const SocialHealthForm = () => {
    const [socialHealthName, setSocialHealthName] = useState("");
    const [affiliateNumber, setAffiliateNumber] = useState("");
    const [tipoAfiliado, setTipoAfiliado] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const navigation = useNavigation();

    const tipos = [
      { label: 'Titular', value: 'titular' },
      { label: 'Familiar', value: 'familiar' },
      { label: 'Adherente', value: 'adherente' },
    ];

    const showDatePicker = () => setShowPicker(true);

    const onChangeDate = (event, selectedDate) => {
      const currentDate = selectedDate || startDate;
      setShowPicker(Platform.OS === 'ios');
      setStartDate(currentDate);
    };

    const handleCancel = () => navigation.navigate('Home');

    const handleSave = () => {
        navigation.navigate('Home');
        ToastAndroid.show('Datos guardados exitosamente', ToastAndroid.SHORT);
    };

    return (
        <ScrollView contentContainerStyle={styles.formContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Ingrese los datos de la obra social</Text>
            </View>

            <View style={styles.inputView}>
                <Text style={styles.label}>Nombre de la obra social</Text>
                <TextInput
                  style={styles.input}
                  value={socialHealthName}
                  onChangeText={setSocialHealthName}
                  keyboardType="default"
                  autoCapitalize="none"
                />
            </View>

            <View style={styles.inputView}>
                <Text style={styles.label}>Número de afiliado</Text>
                <TextInput
                  style={styles.input}
                  value={affiliateNumber}
                  onChangeText={(text) => setAffiliateNumber(text.toString())}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.label}>Tipo de afiliado</Text>
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  onValueChange={setTipoAfiliado}
                  items={tipos}
                  placeholder={{ label: 'Seleccionar...', value: null }}
                  value={tipoAfiliado}
                  style={{
                    inputIOS: styles.pickerText,
                    inputAndroid: styles.pickerText,
                    placeholder: {
                      color: '#888',
                      fontFamily: 'Inter_400Regular',
                    }
                  }}
                />
              </View>
            </View>

            <View style={styles.inputView}>
              <Text style={styles.label}>Fecha de alta en la obra social</Text>
              <Pressable onPress={showDatePicker}>
                <View style={styles.input}>
                  <Text style={styles.dateText}>
                    {startDate.toLocaleDateString()}
                  </Text>
                </View>
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
              <TouchableOpacity style={[styles.button, {backgroundColor: '#B32D2F'}]} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {backgroundColor: '#429B46'}]} onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 28,
    alignItems: 'center',
    backgroundColor: '#F3F4F8',
    borderRadius: 16,
    elevation: 6,
    marginLeft: 20,
    marginRight: 20,
    
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 25,
    width: '100%',
  },
  title: {
    fontSize: 24,  
    fontFamily: 'Inter_700Bold',
    color: '#1226A9',
    textAlign: 'center',
  },
  inputView: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Inter_400Regular',
    marginBottom: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 25,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    width: '100%',
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  pickerText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000',
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000',
  },
  buttons: {
    marginTop: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 40,
    alignItems: 'center',
    width: '40%'
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Inter_700Bold',
  }
});

export default SocialHealthForm;
