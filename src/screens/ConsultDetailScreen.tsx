import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type RouteProps = RouteProp<RootStackParamList, 'ConsultDetail'>;
type NavProp = StackNavigationProp<RootStackParamList, 'ConsultDetail'>;

const ConsultDetailScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavProp>();
  const { date, professional, specialty, reason } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} size={40} iconSize={24} />
        <Header title="Detalle de Consulta" />
      </View>
      <View style={styles.content}>
        <Text>Fecha: {date}</Text>
        <Text>Profesional: {professional}</Text>
        <Text>Especialidad: {specialty}</Text>
        <Text>Motivo: {reason}</Text>
        {/* Aquí podrías incrustar más info o PDF */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { height: 160 },
  content: { flex: 1, padding: 20 },
});

export default ConsultDetailScreen;
