import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  useNavigation,
  CommonActions,
  NavigationProp,
} from '@react-navigation/native';
import { RootStackParamList } from '../types';
import ConfirmationModal from './ConfirmationModal';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 5;

export type NavBarKey =
  | 'home'
  | 'person'
  | 'credential'
  | 'notifications'
  | 'logout';

interface NavBarProps {
  selectedIcon: NavBarKey;
}

export default function NavBar({ selectedIcon }: NavBarProps) {
  const [deleteVisible, setDeleteVisible] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleDelete = () => {
    setDeleteVisible(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
    Toast.show({ type: 'success', text1: 'Sesión cerrada exitosamente' });
  };

  const navItems: Array<{
    key: NavBarKey;
    icon: keyof typeof MaterialIcons.glyphMap;
    label: string;
    screen?: keyof RootStackParamList;
  }> = [
    { key: 'home', icon: 'home', label: 'Inicio', screen: 'Home' },
    { key: 'person', icon: 'person', label: 'Perfil', screen: 'Profile' },
    { key: 'credential', icon: 'badge', label: 'Credencial', screen: 'Credential' },
    { key: 'notifications', icon: 'notifications', label: 'Alertas', screen: 'Notifications' },
    { key: 'logout', icon: 'logout', label: 'Cerrar sesión' },
  ];

  const handlePress = (itemKey: NavBarKey, screen?: keyof RootStackParamList) => {
    if (itemKey === 'logout') {
      setDeleteVisible(true);
    } else if (screen) {
      navigation.navigate(screen);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {navItems.map(item => {
          const isSelected = item.key === selectedIcon;
          const label = item.label;
          const isCred = item.key === 'credential';

          return (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.item,
                isCred && styles.credentialWrapper,
              ]}
              onPress={() => handlePress(item.key, item.screen)}
              activeOpacity={0.7}
            >
              {isCred ? (
                <View
                  style={[
                    styles.credentialCircle,
                    isSelected && styles.credentialCircleSelected,
                  ]}
                >
                  <MaterialIcons
                    name={item.icon}
                    size={isSelected ? 36 : 32}
                    color="#fff"
                  />
                </View>
              ) : (
                <MaterialIcons
                  name={item.icon}
                  size={isSelected ? 32 : 28}
                  color={isSelected ? '#2D43B3' : '#777'}
                />
              )}
              <Text
                style={[styles.label, isSelected && styles.labelSelected]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Modal de confirmación */}
      <ConfirmationModal
        visible={deleteVisible}
        type="warning"
        title="Estás a punto de cerrar sesión"
        message="Una vez cierres sesión, tendrás que volver a ingresar tus datos para entrar a tu cuenta"
        onConfirm={handleDelete}
        onClose={() => setDeleteVisible(false)}
      />
    </>
  );
}


const BAR_HEIGHT = 100;   // antes 90
const CIRCLE_SIZE = 60;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingBottom: 10,   // espacio inferior extra
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  labelSelected: {
    color: '#2D43B3',
    fontWeight: '600',
  },
  underline: {
    marginTop: 4,
    width: 24,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#2D43B3',
  },

  // --- Credencial destacado ---
  credentialWrapper: {
    top: -20, // flota por encima de la barra
  },
  credentialCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#2D43B3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  credentialCircleSelected: {
    backgroundColor: '#2D43B3',
  },
});



