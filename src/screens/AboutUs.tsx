import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import BackButton from '../components/BackButton';  // Tu componente reutilizable
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';

const HEADER_HEIGHT = 160;
const CIRCLE_SIZE = 60;

const AboutUsScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }] }>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.primary }] }>
        <BackButton
          size={CIRCLE_SIZE}
          iconSize={24}
          style={{
            top: HEADER_HEIGHT / 2 - CIRCLE_SIZE / 2,
            left: -CIRCLE_SIZE / 4,
          }}
        />
        <Text style={[styles.title, { color: theme.buttonText }]}>Acerca de nosotros</Text>
      </View>

      {/* Contenido */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* ¿Quiénes somos? */}
        <View style={[styles.card, { backgroundColor: theme.card }] }>
          <View style={styles.cardHeader}>
            <Icon name="users" size={20} color={theme.primary} />
            <Text style={[styles.cardTitle, { color: theme.primary }]}>¿Quiénes somos?</Text>
          </View>
          <Text style={[styles.cardText, { color: theme.text }] }>
            Somos un equipo de profesionales comprometidos con tu salud y bienestar. 
            Nuestra organización se basa en la excelencia, la empatía y la innovación.
          </Text>
        </View>

        {/* Nuestra misión */}
        <View style={[styles.card, { backgroundColor: theme.card }] }>
          <View style={styles.cardHeader}>
            <Icon name="bullseye" size={20} color={theme.primary} />
            <Text style={[styles.cardTitle, { color: theme.primary }]}>Nuestra misión</Text>
          </View>
          <Text style={[styles.cardText, { color: theme.text }] }>
            Ofrecer servicios de salud de alta calidad, enfocados en la atención personalizada y accesible para todos. 
            Mejorar la calidad de vida de nuestros afiliados con una atención integral y confiable.
          </Text>
        </View>

        {/* Nuestra visión */}
        <View style={[styles.card, { backgroundColor: theme.card }] }>
          <View style={styles.cardHeader}>
            <Icon name="eye" size={20} color={theme.primary} />
            <Text style={[styles.cardTitle, { color: theme.primary }]}>Nuestra visión</Text>
          </View>
          <Text style={[styles.cardText, { color: theme.text }] }>
            Ser la red de salud más confiable y accesible, garantizando el bienestar de nuestros afiliados 
            mediante la innovación y la mejora continua de nuestros servicios.
          </Text>
        </View>

        {/* Nuestros valores */}
        <View style={[styles.card, { backgroundColor: theme.card }] }>
          <View style={styles.cardHeader}>
            <Icon name="heart" size={20} color={theme.primary} />
            <Text style={[styles.cardTitle, { color: theme.primary }]}>Nuestros valores</Text>
          </View>
          <Text style={[styles.cardText, { color: theme.text }] }>
            • Compromiso con la salud de nuestros afiliados.{'\n'}
            • Ética y transparencia en todas nuestras acciones.{'\n'}
            • Innovación constante para brindar mejores servicios.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor:'#2D43B3',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignSelf: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // centra icono + título
    marginBottom: 8,
  },
  cardTitle: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#1A237E',
    textAlign: 'center',
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    textAlign: 'center', // centra el texto de la card
  },
});

export default AboutUsScreen;
