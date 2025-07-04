import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import { RootStackParamList } from '../types';
import { useTheme } from '../contexts/ThemeContext';


const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 160;
const CIRCLE_SIZE = 60;
const SCREEN_PADDING = 20;

const ContactUsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton
          size={CIRCLE_SIZE}
          iconSize={24}
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: HEADER_HEIGHT / 2 - CIRCLE_SIZE / 2,
            left: -CIRCLE_SIZE / 4,
            backgroundColor: theme.background
          }}
        />
        <Text style={styles.headerTitle}> Contáctanos</Text>
      </View>

      {/* Contenido scrollable justo debajo del header */}
      <ScrollView
        style={[styles.scrollView, { marginTop: HEADER_HEIGHT - 40 }]}
        contentContainerStyle={styles.content}
      >
        {/* Dirección y contacto */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📍 Dirección</Text>
          <Text style={styles.cardText}>Av. Hipólito Yrigoyen 3560, Almagro, CABA</Text>

          <Text style={[styles.cardTitle, styles.sectionSpacing]}>📞 Teléfonos</Text>
          <Text style={styles.cardText}>(011) 4321-6789</Text>
        </View>

        {/* Correo y horarios */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📧 Email</Text>
          <Text style={styles.cardText}>consultas@vidaplena.com.ar</Text>

          <Text style={[styles.cardTitle, styles.sectionSpacing]}>⏰ Horarios</Text>
          <Text style={styles.cardText}>Lun–Vie: 8:00–18:00</Text>
          <Text style={styles.cardText}>Sáb: 8:00–13:00 (Dom/fer cerrado)</Text>
        </View>

        {/* Redes sociales */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📱 Redes Sociales</Text>
          <Text style={styles.cardText}>Facebook: facebook.com/VidaPlenaSalud</Text>
          <Text style={styles.cardText}>Instagram: @vidaplena_salud</Text>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerTitle: {
    color: theme.terciary,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: SCREEN_PADDING,
  },
  scrollView: {
    flex: 1,
    zIndex: 0,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: SCREEN_PADDING,
  },
  card: {
    width: '100%',
    backgroundColor: theme.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: theme.neutral
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.secondary,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 14,
    color: theme.neutral,
    textAlign: 'center',
    marginTop: 4,
  },
  sectionSpacing: {
    marginTop: 12,
  },
});

export default ContactUsScreen;
