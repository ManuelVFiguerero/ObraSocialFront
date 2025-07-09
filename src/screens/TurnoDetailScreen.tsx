
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { api } from '../api/Client';
import BackButton from '../components/BackButton';
import { useTheme } from '../contexts/ThemeContext';

const TurnoDetailScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme)
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { turnoId } = route.params;
  const [turno, setTurno] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTurno = async () => {
      try {
        const res = await api.get(`/api/turnos/${turnoId}`);
        setTurno(res.data);
      } catch (e) {
        setError('No se pudo cargar el turno');
      } finally {
        setLoading(false);
      }
    };
    fetchTurno();
  }, [turnoId]);

  function formatFechaHora(fechaIso: string) {
    if (!fechaIso) return '-';
    const fecha = new Date(fechaIso);
    if (isNaN(fecha.getTime())) return '-';
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    const hora = fecha.getHours().toString().padStart(2, '0');
    const min = fecha.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${anio} ${hora}:${min}hs`;
  }

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color={theme.secondary} />;
  }

  if (error) {
    return <View style={styles.container}><Text style={styles.error}>{error}</Text></View>;
  }

  if (!turno) {
    return <View style={styles.container}><Text>No se encontró el turno</Text></View>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackButton onPress={() => navigation.goBack()} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Detalle del Turno</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.row}><Text style={styles.label}>Fecha y hora:</Text><Text style={styles.value}>{formatFechaHora(turno.fecha)}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Estado:</Text><Text style={styles.value}>{turno.estado || '-'}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Médico:</Text><Text style={styles.value}>{turno.nombreProfesional || '-'}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Especialidad:</Text><Text style={styles.value}>{turno.especialidadProfesional || '-'}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Paciente:</Text><Text style={styles.value}>{turno.nombreUsuario || '-'}</Text></View>
      </View>
    </View>
  );
};


const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 24,
    marginTop: 20
  },
  backBtn: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2,
  },
  title: {
    color: theme.secondary,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: theme.background,
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    color: theme.neutral,
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  value: {
    color: theme.quaternary,
    fontSize: 16,
    flex: 2,
    textAlign: 'right',
    fontWeight: 500
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default TurnoDetailScreen;