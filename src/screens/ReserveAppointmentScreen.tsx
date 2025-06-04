import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  FlatList,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from '../components/BackButton';
import NavBar from '../components/NavBar';
import { RootStackParamList } from '../types';
import { MaterialIcons } from '@expo/vector-icons';
import AppointmentCard from '../components/AppointmentCard';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 160;
const NAVBAR_HEIGHT = 90;
const CIRCLE_SIZE = 60;

const testSpecialities = [
  'Ortopedia',
  'Cardiología',
  'Dermatología',
  'Pediatría',
  'Ginecología',
  'Oftalmología',
  'Neurología',
  'Psicología',
  'Otorrinolaringología',
  'Endocrinología',
  'Gastroenterología',
  'Reumatología',
  'Urología',
  'Neumonología',
  'Oncología',
  'Medicina General',
  'Traumatología',
  'Nefrología',
  'Hematología',
  'Alergología'
];

const testHealthInsurances = [
  'OSDE', 'Swiss Medical', 'Galeno', 'Medifé', 'Omint', 'Hospital Italiano', 'OSPEDYC',
  'PAMI', 'IOMA', 'Union Personal', 'OSDEPYM', 'Accord Salud', 'Sancor Salud',
  'Federada Salud', 'Prevención Salud', 'Luis Pasteur', 'Jerárquicos Salud',
  'OSMECON', 'AMFFA', 'ASE Nacional'
];


const testAppointment = {
  id: 1,
  estado: 'DISPONIBLE', //CANCELADO - COMPLETADO - DISPONIBLE - RESERVADO
  fecha: new Date(),
  nombre: 'Hernandez Juan Ignacio',
  especialidad: 'Traumatología',
  ubicacion: 'Clinica Santa Isabel' //TODO: Falta la ubicacion y la obra social que trabaja el profesional en la BD 

}

const ReserveAppointmentLocationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isSpecialityModalVisible, setIsSpecialityModalVisible] = useState(false);
  const [isInsuranceModalVisible, setIsInsuranceModalVisible] = useState(false);
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>([]);
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>([]);
  const [appointmentsAvailable, setAppointmentsAvailable] = useState<object[]>([]);

  const addSpeciality = (speciality: string) => {
    if (!selectedSpecialities.includes(speciality)) {
      setSelectedSpecialities([...selectedSpecialities, speciality]);

      setAppointmentsAvailable([testAppointment])
    }
  };

  const addInsurance = (insurance: string) => {
    if (!selectedInsurances.includes(insurance)) {
      setSelectedInsurances([...selectedInsurances, insurance]);

      setAppointmentsAvailable([testAppointment])
    }
  };


  const renderListModal = (
    title: string,
    items: string[],
    onSelect: (value: string) => void,
    onClose: () => void,
    visible: boolean
  ) => (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <FlatList
            data={items}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

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
        <Icon name="hospital" size={32} color="#fff" style={styles.headerIcon} />
        <Text style={styles.headerTitle}>
          Reservar turno de consulta médica
        </Text>
      </View>

      {/* CONTENIDO */}
      <ScrollView
        style={[styles.scrollView, { marginTop: HEADER_HEIGHT - 160, marginBottom: NAVBAR_HEIGHT }]}
        contentContainerStyle={styles.content}
      >
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setIsSpecialityModalVisible(true)}
          >
            <Text style={styles.filterText}>
              Especialidad
            </Text>
            <Icon name="plus" size={20} color="#F3F4F8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setIsInsuranceModalVisible(true)}
          >
            <Text style={styles.filterText}>
              Obra social
            </Text>
            <Icon name="plus" size={20} color="#F3F4F8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => { }}
          >
            <Text style={styles.filterText}>Profesional</Text>
            <Icon name="search" size={20} color="#F3F4F8" />
          </TouchableOpacity>
        </View>
        <View style={styles.tagsContainer}>
          {selectedSpecialities.map((item, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{item}</Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedSpecialities(prev =>
                    prev.filter(speciality => speciality !== item)
                  )
                  setAppointmentsAvailable([])
                }
                }
              >
                <MaterialIcons name='close' size={20} color='#F3F4F8' />
              </TouchableOpacity>

            </View>
          ))
          }
        </View>
        <View style={styles.tagsContainer}>
          {selectedInsurances.map((item, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{item}</Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedInsurances(prev =>
                    prev.filter(speciality => speciality !== item)
                  )
                  setAppointmentsAvailable([])
                }

                }
              >
                <MaterialIcons name='close' size={20} color='#F3F4F8' />
              </TouchableOpacity>

            </View>
          ))
          }
        </View>

        <View style={styles.appointmentsContainer}>
          {appointmentsAvailable.map((appointment, index) => (
            <AppointmentCard key={index} appointment={appointment} />
          ))
          }
        </View>


      </ScrollView>

      {/* NAV BAR */}
      <View style={[styles.navContainer, { height: NAVBAR_HEIGHT }]}>
        <NavBar selectedIcon="home" />
      </View>

      {/* Modales */}
      {renderListModal(
        'Seleccionar especialidad',
        testSpecialities,
        addSpeciality,
        () => setIsSpecialityModalVisible(false),
        isSpecialityModalVisible
      )}

      {renderListModal(
        'Seleccionar obra social',
        testHealthInsurances,
        addInsurance,
        () => setIsInsuranceModalVisible(false),
        isInsuranceModalVisible
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3F4F8' },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: '#2D43B3',
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
    color: '#F3F4F8',
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
    backgroundColor: '#1226A9',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  filterText: {
    color: '#F3F4F8',
    fontSize: 20,
    fontWeight: '600',
  },
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  modalCloseText: {
    color: '#2D43B3',
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5
  },
  tag: {
    backgroundColor: '#2D43B3',
    padding: 8,
    borderRadius: 6,
    marginBottom: 5,
    width: 'auto',
    flexDirection: 'row',
    marginRight: 10
  },
  tagText: {
    marginRight: 10,
    color: '#F3F4F8',
    fontSize: 16
  },
  appointmentsContainer: {
    minHeight: 500,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

export default ReserveAppointmentLocationScreen;
