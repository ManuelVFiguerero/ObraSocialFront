import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BackButton from '../components/BackButton';
import NavBar from '../components/NavBar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { api } from '../api/Client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';
import SwipeableNotificationList, { NotificationItem } from '../components/SwipeableNotificationList';
import Header from '../components/Header';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 310;
const NAVBAR_HEIGHT = 0;

type AllNotificationsNavProp = StackNavigationProp<RootStackParamList, 'AllNotifications'>;

const NotificationsScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme)
  const navigation = useNavigation<AllNotificationsNavProp>();
  const [allNotifications, setAllNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');

        if (!userId) return;
        // Marcar todas como leídas al entrar
        //await api.put(`/api/notificaciones/usuario/${userId}/marcar-leidas`);
        // Obtener todas las notificaciones
        const res = await api.get(`/api/notificaciones/usuario/${userId}`);
        setAllNotifications(res.data);


      } catch (e) {
        setAllNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const formatDateTime = (fecha: Date) => {
    // Ejemplo: 10/06/2025 10:00hs
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    const hora = fecha.getHours().toString().padStart(2, '0');
    const min = fecha.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${anio} ${hora}:${min}hs`;
  };

  // Filtrar notificaciones por turnoId, mostrando solo la más reciente por reserva
  const notificationMap = new Map();
  for (const n of allNotifications) {
    if (!n.turnoId) continue;
    // Si ya hay una notificación para este turno, comparar fechas y dejar la más reciente
    const actual = notificationMap.get(n.turnoId);
    const fechaN = n.fecha ? new Date(n.fecha) : new Date();
    if (!actual || (actual.fecha && new Date(actual.fecha) < fechaN)) {
      notificationMap.set(n.turnoId, n);
    }
  }
  const notificationItems: NotificationItem[] = Array.from(notificationMap.values()).map(n => {
    const fecha = n.fecha ? new Date(n.fecha) : new Date();
    return {
      id: n.id?.toString() || Math.random().toString(),
      date: formatDateTime(fecha).split(' ')[0],
      hour: formatDateTime(fecha).split(' ')[1],
      title: n.titulo || 'Notificación',
      description: formatNotificationDescription(n.mensaje),
    };
  });

  // Formatea la descripción para mostrar fechas amigables si detecta un string tipo 2025-06-10T10:00
  function formatNotificationDescription(mensaje: string) {
    const regex = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/;
    const match = mensaje.match(regex);
    if (match) {
      const fechaTurno = new Date(match[1]);
      if (!isNaN(fechaTurno.getTime())) {
        const dia = fechaTurno.getDate().toString().padStart(2, '0');
        const mes = (fechaTurno.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaTurno.getFullYear();
        const hora = fechaTurno.getHours().toString().padStart(2, '0');
        const min = fechaTurno.getMinutes().toString().padStart(2, '0');
        const fechaFormateada = `${dia}/${mes}/${anio} ${hora}:${min}hs`;
        return mensaje.replace(match[1], fechaFormateada);
      }
    }
    return mensaje;
  }


  const handlePressItem = (item: NotificationItem) => {
    // Buscar el turnoId real de la notificación original
    const noti = Array.from(notificationMap.values()).find(n => (n.id?.toString() || '') === item.id);
    if (noti && noti.turnoId) {
      navigation.navigate('TurnoDetail', { turnoId: noti.turnoId });
    } else {
      // fallback: navega a ConsultDetail si no hay turnoId
      navigation.navigate('ConsultDetail', { notification: item });
    }
  };

  const handleDeleteItem = async (id: string) => {
    setAllNotifications(prev => prev.filter((n: any) => (n.id?.toString() || '') !== id));
    try {
      await api.delete(`/api/notificaciones/${id}`);
    } catch (error) {
      // Opcional: mostrar feedback de error
      console.error('Error eliminando notificación en backend:', error);
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <Header title="Notificaciones" />


      <View style={{ flex: 1, marginTop: HEADER_HEIGHT - 150, marginBottom: NAVBAR_HEIGHT }}>
        <SwipeableNotificationList
          data={notificationItems}
          onPressItem={handlePressItem}
          onDeleteItem={handleDeleteItem}
        />
      </View>

      {/* --- NAVBAR --- */}
      <NavBar selectedIcon="notifications" />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default NotificationsScreen;