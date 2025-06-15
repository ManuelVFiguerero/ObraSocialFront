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
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 160;
const CIRCLE_SIZE = 60;
const SCREEN_PADDING = 20;

const ContactUsScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <BackButton
          size={CIRCLE_SIZE}
          iconSize={24}
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: HEADER_HEIGHT / 2 - CIRCLE_SIZE / 2,
            left: -CIRCLE_SIZE / 4,
          }}
        />
        <Text style={[styles.headerTitle, { color: theme.buttonText }]}> Contáctanos</Text>
      </View>

      {/* Contenido scrollable justo debajo del header */}
      <ScrollView
        style={[styles.scrollView, { marginTop: HEADER_HEIGHT - 40 }]}
        contentContainerStyle={styles.content}
      >
        {/* Dirección y contacto */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>📍 Dirección</Text>
          <Text style={[styles.cardText, { color: theme.text }]}>Av. Hipólito Yrigoyen 3560, Almagro, CABA</Text>

          <Text style={[styles.cardTitle, styles.sectionSpacing, { color: theme.text }]}>📞 Teléfonos</Text>
          <Text style={[styles.cardText, { color: theme.text }]}> (011) 4321-6789</Text>
        </View>

        {/* Correo y horarios */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>📧 Email</Text>
          <Text style={[styles.cardText, { color: theme.text }]}>consultas@vidaplena.com.ar</Text>

          <Text style={[styles.cardTitle, styles.sectionSpacing, { color: theme.text }]}>⏰ Horarios</Text>
          <Text style={[styles.cardText, { color: theme.text }]}>Lun–Vie: 8:00–18:00</Text>
          <Text style={[styles.cardText, { color: theme.text }]}>Sáb: 8:00–13:00 (Dom/fer cerrado)</Text>
        </View>

        {/* Redes sociales */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>📱 Redes Sociales</Text>
          <Text style={[styles.cardText, { color: theme.text }]}>Facebook: facebook.com/VidaPlenaSalud</Text>
          <Text style={[styles.cardText, { color: theme.text }]}>Instagram: @vidaplena_salud</Text>
        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: '#2D43B3',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerTitle: {
    color: '#fff',
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
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A237E',
    textAlign: 'center',
  },
  cardText: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginTop: 4,
  },
  sectionSpacing: {
    marginTop: 12,
  },
});

export default ContactUsScreen;
