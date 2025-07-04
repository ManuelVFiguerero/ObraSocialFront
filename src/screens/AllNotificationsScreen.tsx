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
import { useTheme } from '../contexts/ThemeContext';

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
  const { theme } = useTheme();
  const styles = createStyles(theme);
  useEffect(() => {
    setNotifications(testDatas.filter((n) => n.type === type));
  }, [type]);

  const headerTitle = useMemo(() => {
    if (type === 'New') return 'Notificaciones nuevas';
    if (type === 'Read') return 'Todas las notificaciones';
    return 'Noticias';
  }, [type]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <BackButton
          size={60}
          iconSize={24}
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: HEADER_HEIGHT / 2 - 30,
            left: -15,
            backgroundColor: theme.background
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

const createStyles = (theme) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: theme.primary,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerTitle: {
    color: theme.terciary,
    fontSize: 26,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: theme.background,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: theme.neutral
  },
  msg: {
    fontSize: 16,
    color: theme.quaternary,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: theme.neutral,
    textAlign: 'right',
  },
  empty: {
    fontSize: 16,
    color: theme.neutral,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default AllNotificationsScreen;

