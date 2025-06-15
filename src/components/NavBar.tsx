import React, { useState, useEffect } from 'react';
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
import { api } from '../api/Client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../theme/ThemeContext';

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
  clearNotifications?: boolean;
}

export default function NavBar({ selectedIcon, clearNotifications }: NavBarProps) {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [notifCount, setNotifCount] = useState<number>(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme, isDark } = useTheme();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return;
        const res = await api.get(`/api/notificaciones/usuario/${userId}`);
        // Solo contar las no leídas
        setNotifCount(res.data.filter((n: any) => !n.leida).length);
      } catch (e) {
        setNotifCount(0);
      }
    };
    fetchNotifications();
  }, [selectedIcon]); // <-- Se actualiza cada vez que cambia la pantalla activa

  // Limpiar contador si clearNotifications es true
  useEffect(() => {
    if (clearNotifications) setNotifCount(0);
  }, [clearNotifications]);

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
      <View style={[styles.container, { backgroundColor: theme.card, borderTopColor: theme.border }]}> 
        {navItems.map(item => {
          const isSelected = item.key === selectedIcon;
          const label = item.label;
          const isCred = item.key === 'credential';
          const isNotif = item.key === 'notifications';
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
                    isSelected && { backgroundColor: theme.primary },
                  ]}
                >
                  <MaterialIcons
                    name={item.icon}
                    size={isSelected ? 36 : 32}
                    color={theme.buttonText}
                  />
                </View>
              ) : (
                <View>
                  <MaterialIcons
                    name={item.icon}
                    size={isSelected ? 32 : 28}
                    color={isSelected ? theme.primary : (isDark ? theme.text : '#777')}
                  />
                  {isNotif && notifCount > 0 && (
                    <View style={{
                      position: 'absolute',
                      top: -4,
                      right: -8,
                      backgroundColor: 'red',
                      borderRadius: 10,
                      minWidth: 18,
                      height: 18,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 4,
                    }}>
                      <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>{notifCount}</Text>
                    </View>
                  )}
                </View>
              )}
              <Text
                style={[
                  styles.label,
                  { color: isSelected ? theme.primary : (isDark ? theme.text : '#777') },
                  isSelected && styles.labelSelected,
                ]}
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
    borderTopWidth: 1,
    height: BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
  labelSelected: {
    fontWeight: '600',
  },
  underline: {
    marginTop: 4,
    width: 24,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#2D43B3',
  },
  credentialWrapper: {
    top: -20,
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
});



