import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import BackButton from '../components/BackButton';
import NavBar from '../components/NavBar';
import NotificationsPreview from '../components/NotificationsPreview';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { api } from '../api/Client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 160;
const NAVBAR_HEIGHT = 90;

type AllNotificationsNavProp =
  StackNavigationProp<RootStackParamList, 'AllNotifications'>;

const NotificationsScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<AllNotificationsNavProp>();
  const [allNotifications, setAllNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return;
        // Marcar todas como leídas al entrar
        await api.put(`/api/notificaciones/usuario/${userId}/marcar-leidas`);
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

  // Últimas no leídas (máximo 2)
  const nuevas = allNotifications.filter(n => !n.leida).slice(0, 2);
  // Últimas notificaciones del usuario (por ejemplo, las 2 más recientes)
  const ultimas = allNotifications.slice(-2).reverse();
  // Todas
  const todas = allNotifications;
  // Noticias institucionales
  const noticias = [
    'Próximamente: modo oscuro para la app',
    '¡Nuevas funcionalidades en camino!',
    'Mejoras de rendimiento y seguridad',
  ];

  const handleSeeMore = (type: 'New' | 'Read' | 'Announcement') => {
    navigation.navigate('AllNotifications', { type });
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
        <Text style={[styles.headerTitle, { color: theme.buttonText }]}>
          Notificaciones
        </Text>
      </View>

      {/* --- CONTENIDO SCROLLABLE --- */}
      <ScrollView
        style={[
          styles.scrollView,
          { marginTop: HEADER_HEIGHT - 150, marginBottom: NAVBAR_HEIGHT },
        ]}
        contentContainerStyle={styles.content}
      >
        <View
          style={[
            styles.notificationContainer,
            { backgroundColor: theme.card },
          ]}
        >
          <Text style={[styles.notificationHeader, { color: theme.text }]}>
            Nuevas notificaciones
          </Text>
          <NotificationsPreview
            defaultMessage="No tienes notificaciones nuevas"
            messages={ultimas.map(n => n.mensaje)}
            seeMore={() => handleSeeMore('New')}
          />
        </View>
        <View
          style={[
            styles.notificationContainer,
            { backgroundColor: theme.card },
          ]}
        >
          <Text style={[styles.notificationHeader, { color: theme.text }]}>
            Todas las notificaciones
          </Text>
          <NotificationsPreview
            defaultMessage="No tienes notificaciones"
            messages={todas.map(n => n.mensaje)}
            seeMore={() => handleSeeMore('Read')}
          />
        </View>
        <View
          style={[
            styles.notificationContainer,
            { backgroundColor: theme.card },
          ]}
        >
          <Text style={[styles.notificationHeader, { color: theme.text }]}>
            Noticias
          </Text>
          <NotificationsPreview
            defaultMessage="No hay noticias para mostrar"
            messages={noticias}
            seeMore={() => {}}
          />
        </View>
      </ScrollView>
      {/* --- NAVBAR --- */}
      <View style={[styles.navContainer, { height: NAVBAR_HEIGHT }]}>
        <NavBar selectedIcon="notifications" clearNotifications />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F8',
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
    color: '#F3F4F8',
    fontSize: 26,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  notificationContainer: {
    backgroundColor: '#F3F4F8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  notificationHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  navContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default NotificationsScreen;



