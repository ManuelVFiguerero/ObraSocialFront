import React, { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import BackButton from '../components/BackButton';
import Header from '../components/Header'; // opcional si lo quieres usar
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type NotificationType = 'New' | 'Read' | 'Announcement';

interface Notification {
  message: string;
  date: Date;
  type: NotificationType;
}

type AllNotifsRouteProp = RouteProp<RootStackParamList, 'AllNotifications'>;
type AllNotifsNavProp = StackNavigationProp<RootStackParamList, 'AllNotifications'>;

interface Props {
  route: AllNotifsRouteProp;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 160;

const testDatas: Notification[] = [
  { message: 'Tienes una nueva cita',        date: new Date(), type: 'New' },
  { message: 'Actualiza tus datos',           date: new Date(), type: 'Read' },
  { message: '¡Oferta este mes!',             date: new Date(), type: 'Announcement' },
];

const AllNotificationsScreen: React.FC<Props> = ({ route }) => {
  const { type } = route.params;
  const navigation = useNavigation<AllNotifsNavProp>();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(testDatas.filter((n) => n.type === type));
  }, [type]);

  const headerTitle = useMemo(() => {
    if (type === 'New') return 'Notificaciones nuevas';
    if (type === 'Read') return 'Notificaciones leídas';
    return 'Noticias';
  }, [type]);

  return (
    <View style={styles.screen}>
      {/* --- HEADER CUSTOM --- */}
      <View style={styles.header}>
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
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      </View>

      {/* --- SCROLLVIEW STARTING UNDER HEADER --- */}
      <ScrollView
        style={{ marginTop: HEADER_HEIGHT - 150 }}
        contentContainerStyle={[
          styles.content,
          { minHeight: SCREEN_HEIGHT - HEADER_HEIGHT },
        ]}
      >
        {notifications.length > 0 ? (
          notifications.map((n, i) => (
            <View key={i} style={styles.card}>
              <Text style={styles.msg}>{n.message}</Text>
              <Text style={styles.date}>
                {n.date.toLocaleDateString()}{' '}
                {n.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.empty}>No hay notificaciones</Text>
        )}
      </ScrollView>
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
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  msg: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  empty: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default AllNotificationsScreen;

