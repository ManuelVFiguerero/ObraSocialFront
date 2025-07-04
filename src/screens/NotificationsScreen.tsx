import React from 'react';
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
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 160;
const NAVBAR_HEIGHT = 90;

type AllNotificationsNavProp =
  StackNavigationProp<RootStackParamList, 'AllNotifications'>;

const testMessages: string[] = [
  'Lorem ipsum dolor sit amet…',
  'Sed do eiusmod tempor…',
  'Ut enim ad minim veniam…',
];

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<AllNotificationsNavProp>();

  const handleSeeMore = (type: 'New' | 'Read' | 'Announcement') => {
    navigation.navigate('AllNotifications', { type });
  };
  const { theme } = useTheme();
  const styles = createStyles(theme);

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
        <Text style={styles.headerTitle}>Notificaciones</Text>
      </View>

      <ScrollView
        style={[
          styles.scrollView,
          { marginTop: HEADER_HEIGHT - 150, marginBottom: NAVBAR_HEIGHT },
        ]}
        contentContainerStyle={styles.content}
      >
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationHeader}>Nuevas notificaciones</Text>
          <NotificationsPreview
            defaultMessage="Ya has visto todas las notificaciones"
            messages={testMessages}
            seeMore={() => handleSeeMore('New')}
          />
        </View>

        <View style={styles.notificationContainer}>
          <Text style={styles.notificationHeader}>Todas las notificaciones</Text>
          <NotificationsPreview
            defaultMessage="No tienes notificaciones"
            messages={[testMessages[0]]}
            seeMore={() => handleSeeMore('Read')}
          />
        </View>

        <View style={styles.notificationContainer}>
          <Text style={styles.notificationHeader}>Noticias</Text>
          <NotificationsPreview
            defaultMessage="No hay noticias para mostrar"
            messages={testMessages}
            seeMore={() => handleSeeMore('Announcement')}
          />
        </View>
      </ScrollView>

      {/* --- NAVBAR --- */}
      <View style={[styles.navContainer, { height: NAVBAR_HEIGHT }]}>
        <NavBar selectedIcon="notifications" />
      </View>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  notificationContainer: {
    backgroundColor: theme.background,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  notificationHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: theme.quaternary
  },
  navContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default NotificationsScreen;



