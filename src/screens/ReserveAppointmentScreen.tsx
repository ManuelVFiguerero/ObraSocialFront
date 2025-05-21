import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from '../components/BackButton';
import NavBar from '../components/NavBar';
import { RootStackParamList } from '../types';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 160;
const NAVBAR_HEIGHT = 90;
const CIRCLE_SIZE = 60;

const ReserveAppointmentLocationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.screen}>
      {/* HEADER */}
      <View style={styles.header}>
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
        <Icon
          name="hospital"
          size={32}
          color="#fff"
          style={styles.headerIcon}
        />
        <Text style={styles.headerTitle}>
          Reservar turno de consulta médica
        </Text>
      </View>

      {/* CONTENIDO SCROLLABLE (entre header y navbar) */}
      <ScrollView
        style={[
          styles.scrollView,
          { marginTop: HEADER_HEIGHT, marginBottom: NAVBAR_HEIGHT },
        ]}
        contentContainerStyle={styles.content}
      >
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => { /* abrir selector de especialidad */ }}
          >
            <Text style={styles.filterText}>Especialidad</Text>
            <Icon name="plus" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => { /* abrir selector de obra social */ }}
          >
            <Text style={styles.filterText}>Obra social</Text>
            <Icon name="plus" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => { /* abrir selector de profesional */ }}
          >
            <Text style={styles.filterText}>Profesional</Text>
            <Icon name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* NAV BAR */}
      <View style={[styles.navContainer, { height: NAVBAR_HEIGHT }]}>
        <NavBar selectedIcon="home" />
      </View>
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
    backgroundColor: '#4D6EC5',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerIcon: {
    position: 'absolute',
    top: HEADER_HEIGHT / 3.5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
    zIndex: 0,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  filterContainer: {
    width: '100%',
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2D43B3',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  filterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ReserveAppointmentLocationScreen;