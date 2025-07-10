import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { RootStackParamList } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { api } from '../api/Client';


const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 160;
const CIRCLE_SIZE = 60;
const CARD_WIDTH = width - 40;

type HistorialMedicoScreenProp = NavigationProp<RootStackParamList, 'HistorialMedico'>;

type EntryType = {
  id: number;
  fecha: string;
  profesional: string;
  motivo: string;
  descripcion: string;
  userId: number;
  fotoUrl?: string;
};

export default function HistorialMedicoScreen() {
  const navigation = useNavigation<HistorialMedicoScreenProp>();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [entries, setEntries] = useState<EntryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await api.get('/api/historial-medico');
        const data = response.data;


        // Filtramos por user_id = 3
        const filtered = data.filter((entry: EntryType) => entry.userId === 3);
        setEntries(filtered);
      } catch (error) {
        console.error('Error al obtener historial médico:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')
      }/${date.getFullYear()}`;
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton
          size={CIRCLE_SIZE}
          iconSize={24}
          onPress={() => navigation.goBack()}
          style={{
            top: HEADER_HEIGHT / 2 - CIRCLE_SIZE / 2,
            left: -CIRCLE_SIZE / 4,
            backgroundColor: theme.background,
          }}
        />
        <Text style={styles.title}>Historial Médico</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {entries.map((e, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.dateBadge}>
              <Text style={styles.dateText}>{formatDate(e.fecha)}</Text>
            </View>

            <Text style={styles.line}>
              <Text style={styles.bold}>Profesional: </Text>
              {e.profesional}
            </Text>
            <Text style={styles.line}>
              <Text style={styles.bold}>Motivo: </Text>
              {e.motivo}
            </Text>
            <Text numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.line}>
              <Text style={styles.bold}>Descripción: </Text>
              {e.descripcion}
            </Text>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                navigation.navigate('ConsultDetail', {
                  id: e.id,
                  fecha: e.fecha,
                  profesional: e.profesional,
                  motivo: e.motivo,
                  descripcion: e.descripcion,
                  userId: e.userId,
                  fotoUrl: e.fotoUrl,
                });
              }}
            >
              <Icon name="stethoscope" size={20} color={theme.terciary} />
              <Text style={styles.actionText}>CONSULTA</Text>
            </TouchableOpacity>
          </View>
        ))
        }
      </ScrollView >
    </View >
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