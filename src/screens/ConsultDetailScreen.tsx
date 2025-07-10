import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { ScrollView } from 'react-native-gesture-handler';

type RouteProps = RouteProp<RootStackParamList, 'ConsultDetail'>;
type NavProp = StackNavigationProp<RootStackParamList, 'ConsultDetail'>;

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 160;
const CIRCLE_SIZE = 60;
const CARD_WIDTH = width - 40;


const ConsultDetailScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavProp>();
  const {
    fecha,
    profesional,
    motivo,
    descripcion,
    fotoUrl,
    userId,
    id
  } = route.params;

  const { theme } = useTheme();
  const styles = createStyles(theme);
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
        <Text style={styles.title}>Detalle de Consulta</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{fecha}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textBold}>Profesional: </Text>
          <Text style={styles.text}>{profesional}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textBold}>Motivo: </Text>
          <Text style={styles.text}>{motivo}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.textBold}>Descripción: </Text>
          <Text style={styles.text}>{descripcion}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          {fotoUrl && (<>
            <Text style={styles.textBold}>Imagen adjunta: </Text>
            <Image source={{ uri: fotoUrl }} style={styles.image} />
          </>
          )}
        </View>


      </ScrollView>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
    header: {
    height: HEADER_HEIGHT,
    backgroundColor: theme.primary,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  content: { flex: 1, padding: 20, marginHorizontal: 20, borderRadius: 8, backgroundColor: theme.background, elevation: 6 },
  textBold: { color: theme.quaternary, marginBottom: 10, fontWeight: 700, fontSize: 20 },
  text: { color: theme.quaternary, marginBottom: 10, fontSize: 18 },
  image: { width: '100%', height: 200, marginTop: 20, borderRadius: 10 },
  dateContainer: {
    flexDirection: 'row-reverse',
    width: '100%',
    marginBottom: 20
  },
  dateText: { fontSize: 20, color: theme.neutral },
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20
  },
  descriptionContainer: {
    flexDirection: 'column',
    marginBottom: 20
  },
  title: {
    color: theme.terciary,
    fontSize: 26,
    fontWeight: 'bold',
  },
});

export default ConsultDetailScreen;

