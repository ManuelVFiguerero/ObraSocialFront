import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types'; // Ajusta la ruta según tu proyecto
import { useTheme } from '../theme/ThemeContext';

type ActionButtonProps = {
  btnName: string;
  btnIcon: keyof typeof MaterialIcons.glyphMap;
  screen?: keyof RootStackParamList;
  onPress?: () => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({ btnName, btnIcon, screen, onPress }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();

  const handleButton = () => {
    if (onPress) {
      onPress();
    } else if (screen) {
      // Forzamos el tipo para evitar error de tipado
      navigation.navigate(screen as any);
    }
  };

  return (
    <TouchableOpacity onPress={handleButton} style={[styles.container, { backgroundColor: theme.primary }] }>
      <MaterialIcons name={btnIcon} size={30} color={theme.buttonText} />
      <Text style={[styles.buttonText, { color: theme.buttonText }]}>{btnName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
    width: 90,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
  },
});

export default ActionButton;
