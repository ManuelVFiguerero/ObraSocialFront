// src/components/NavBar.tsx

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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types';
import ConfirmationModal from './ConfirmationModal';
import Toast from 'react-native-toast-message';
import { useTheme } from '../contexts/ThemeContext';
import { api } from '../api/Client';

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
  const [unreadCount, setUnreadCount] = useState(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme, isDark, toggleTheme } = useTheme();
  const styles = createStyles(theme);

  // Al montar, traemos el count de notificaciones no leídas
  useEffect(() => {
    let mounted = true;
    (async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;
      try {
        const res = await api.get(`/api/notificaciones/usuario/${userId}`);
        if (mounted && Array.isArray(res.data)) {
          setUnreadCount(res.data.filter((n: any) => !n.leida).length);
        }
      } catch {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleDelete = () => {
    setDeleteVisible(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
    if (isDark) toggleTheme();
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
          const isCred = item.key === 'credential';

          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.item, isCred && styles.credentialWrapper]}
              onPress={() => handlePress(item.key, item.screen)}
              activeOpacity={0.7}
            >
              {item.key === 'notifications' ? (
                <View style={{ position: 'relative' }}>
                  <MaterialIcons
                    name={item.icon}
                    size={isSelected ? 32 : 28}
                    color={isSelected ? theme.secondary : theme.neutral}
                  />
                  {unreadCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </Text>
                    </View>
                  )}
                </View>
              ) : isCred ? (
                <View
                  style={[
                    styles.credentialCircle,
                    isSelected && styles.credentialCircleSelected,
                  ]}
                >
                  <MaterialIcons
                    name={item.icon}
                    size={isSelected ? 36 : 32}
                    color={theme.terciary}
                  />
                </View>
              ) : (
                <MaterialIcons
                  name={item.icon}
                  size={isSelected ? 32 : 28}
                  color={isSelected ? theme.secondary : theme.neutral}
                />
              )}
              <Text style={[styles.label, isSelected && styles.labelSelected]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

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

const BAR_HEIGHT = 100;
const CIRCLE_SIZE = 60;

const createStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.background,
    borderTopWidth: 0.2,
    borderTopColor: theme.neutral,
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
    color: theme.neutral,
    marginTop: 4,
  },
  labelSelected: {
    color: theme.secondary,
    fontWeight: '600',
  },
  // badge
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 6,
    minWidth: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  // credential
  credentialWrapper: {
    top: -20,
  },
  credentialCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: theme.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  credentialCircleSelected: {
    backgroundColor: theme.secondary,
  },
});




