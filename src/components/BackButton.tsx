import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

interface BackButtonProps {
  /** Si quieres personalizar la acción en lugar de goBack */
  onPress?: (e: GestureResponderEvent) => void;
  /** Tamaño del círculo (ancho y alto) */
  size?: number;
  /** Icon size */
  iconSize?: number;
  /** Style adicional para el botón */
  style?: ViewStyle;
}

const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  size = 60,
  iconSize = 24,
  style,
}) => {
  const navigation = useNavigation();
  const handlePress = (e: GestureResponderEvent) => {
    if (onPress) return onPress(e);
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.button,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
      activeOpacity={0.7}
    >
      <Icon name="chevron-left" size={iconSize} color="#4D6EC5" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    // Top se ajustará desde donde lo coloques en cada pantalla
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});

export default BackButton;

