
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BackButton from '../components/BackButton';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { api } from '../api/Client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../theme/ThemeContext';
import SwipeableNotificationList, { NotificationItem } from '../components/SwipeableNotificationList';

type AllNotifsRouteProp = RouteProp<RootStackParamList, 'AllNotifications'>;
type AllNotifsNavProp = StackNavigationProp<RootStackParamList, 'AllNotifications'>;

interface Props {
  route: AllNotifsRouteProp;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 160;

const AllNotificationsScreen: React.FC<Props> = ({ route }) => {
  const { theme } = useTheme();
  const { type } = route.params;
  const navigation = useNavigation<AllNotifsNavProp>();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return;
        const res = await api.get(`/api/notificaciones/usuario/${userId}`);
        setNotifications(res.data);
      } catch (e) {
        setNotifications([]);
      }
    };
    fetchNotifications();
  }, []);

  const headerTitle = useMemo(() => {
    if (type === 'New') return 'Notificaciones nuevas';
    if (type === 'Read') return 'Todas las notificaciones';
    return 'Noticias';
  }, [type]);

  // Mapear notificaciones a formato NotificationItem
  const notificationItems: NotificationItem[] = notifications.map((n: any) => {
    const fecha = n.fecha ? new Date(n.fecha) : new Date();
    return {
      id: n.id?.toString() || Math.random().toString(),
      date: fecha.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' }),
      hour: fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: n.titulo || 'Notificación',
      description: n.mensaje,
    };
  });

  const handlePressItem = (item: NotificationItem) => {
    // Navegar a pantalla de detalle (puedes crearla o mostrar un modal)
    navigation.navigate('ConsultDetail', { notification: item });
  };

  const handleDeleteItem = (id: string) => {
    setNotifications(prev => prev.filter((n: any) => (n.id?.toString() || '') !== id));
    // Aquí puedes llamar a la API para eliminar la notificación si lo deseas
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}> 
      {/* --- HEADER CUSTOM --- */}
      <View style={[styles.header, { backgroundColor: theme.primary }]}> 
        <BackButton
          size={60}
          iconSize={24}
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: HEADER_HEIGHT / 2 - 30,
            left: -15,
          }}
        />
        <Text style={[styles.headerTitle, { color: theme.buttonText }]}>{headerTitle}</Text>
      </View>

      <View style={{ flex: 1, marginTop: HEADER_HEIGHT - 150 }}>
        <SwipeableNotificationList
          data={notificationItems}
          onPressItem={handlePressItem}
          onDeleteItem={handleDeleteItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: '#2D43B3',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 26,

    fontWeight: 'bold',
  },
});

export default AllNotificationsScreen;

