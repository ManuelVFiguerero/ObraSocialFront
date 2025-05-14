import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types'; // Ajusta la ruta según tu proyecto

type ActionButtonProps = {
  btnName: string;
  btnIcon: keyof typeof MaterialIcons.glyphMap;
  screen: keyof RootStackParamList;
};

const ActionButton: React.FC<ActionButtonProps> = ({ btnName, btnIcon, screen }) => {
  // Tipamos la navegación con tu RootStackParamList
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleButton = () => {
    navigation.navigate(screen);
  };

  return (
    <TouchableOpacity onPress={handleButton} style={styles.container}>
      <MaterialIcons name={btnIcon} size={30} color="#F3F4F8" />
      <Text style={styles.buttonText}>{btnName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D43B3',
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
    width: 90,
    margin: 10,
  },
  buttonText: {
    color: '#F3F4F8',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
  },
});

export default ActionButton;
