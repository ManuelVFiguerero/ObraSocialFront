import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { RootStackParamList } from '../types';
import { useTheme } from '../contexts/ThemeContext';


const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 160;
const CIRCLE_SIZE = 60;
const CARD_WIDTH = width - 40;

type HistorialMedicoScreenProp = NavigationProp<RootStackParamList, 'HistorialMedico'>;

export default function HistorialMedicoScreen() {
  const navigation = useNavigation<HistorialMedicoScreenProp>();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // datos de ejemplo:
  const entries = [
    {
      date: '07/03/2025',
      professional: 'Carretto Lucas',
      speciality: 'Ergometrías/Cardiología',
      motive: '-',
      type: 'consulta' as const,
      params: { entryId: 1 },
    },
    {
      date: '17/10/2024',
      professional: 'Ferrario Lorenzo',
      speciality: 'Ortopedia y Traumatología',
      motive: 'DIP',
      type: 'estudio' as const,
      params: { entryId: 2 },
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header con bordes redondeados y botón */}
      <View style={styles.header}>
        <BackButton
          size={CIRCLE_SIZE}
          iconSize={24}
          onPress={() => navigation.goBack()}
          style={{
            top: HEADER_HEIGHT / 2 - CIRCLE_SIZE / 2,
            left: -CIRCLE_SIZE / 4,
            backgroundColor: theme.background
          }}
        />
        <Text style={styles.title}>Historial Médico</Text>
      </View>

      {/* Scroll de contenido */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
      >
        {entries.map((e, i) => (
          <View key={i} style={styles.card}>
            {/* Fecha */}
            <View style={styles.dateBadge}>
              <Text style={styles.dateText}>{e.date}</Text>
            </View>

            {/* Datos */}
            <Text style={styles.line}>
              <Text style={styles.bold}>Profesional: </Text>
              {e.professional}
            </Text>
            <Text style={styles.line}>
              <Text style={styles.bold}>Especialidad: </Text>
              {e.speciality}
            </Text>
            <Text style={styles.line}>
              <Text style={styles.bold}>Motivo: </Text>
              {e.motive}
            </Text>

            {/* Botón acción con navegación */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                if (e.type === 'consulta') {
                  navigation.navigate('ConsultDetail', e.params);
                } else {
                  navigation.navigate('StudyDetail', e.params);
                }
              }}
            >
              <Icon
                name={e.type === 'consulta' ? 'stethoscope' : 'file-document'}
                size={20}
                color={theme.terciary}
              />
              <Text style={styles.actionText}>
                {e.type === 'consulta' ? 'CONSULTA' : 'VER ESTUDIO'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background
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
  title: {
    color: theme.terciary,
    fontSize: 26,
    fontWeight: 'bold',
  },
  scroll: {
    flex: 1,
    marginTop: 20, // Ajuste para que el contenido suba un poco
  },
  content: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: theme.background,
    borderColor: theme.secondary,
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },
  dateBadge: {
    position: 'absolute',
    top: -8,
    left: 12,
    backgroundColor: theme.secondary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dateText: {
    color: theme.terciary,
    fontSize: 12,
    fontWeight: '600'
  },
  line: {
    marginTop: 24,
    color: theme.secondary,
    fontSize: 16,
    lineHeight: 22,
  },
  bold: {
    fontWeight: '700'
  },
  actionButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: theme.primary,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  actionText: {
    color: theme.terciary,
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 14
  },
});