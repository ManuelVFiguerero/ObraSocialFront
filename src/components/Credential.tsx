import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export interface CredentialData {
  fullName: string;
  memberNumber: number;
  organization: string;
  dateSince: string;
  tipoAfiliado?: string; // Nuevo campo para mostrar el tipo de afiliado
}

interface CredentialProps {
  credentialData: CredentialData;
  handleDelete: () => void;
}

const Credential: React.FC<CredentialProps> = ({ credentialData, handleDelete }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.organization}>{credentialData.organization}</Text>
        </View>
        <View style={styles.memberRow}>
          <Text style={styles.memberNumber}>{credentialData.memberNumber}</Text>
          <View style={styles.tipoAfiliadoBox}>
            <Text style={styles.labelSmall}>Tipo de afiliado</Text>
            <Text style={styles.tipoAfiliadoValue}>{credentialData.tipoAfiliado || '-'}</Text>
          </View>
        </View>
        <View style={styles.nroSocioRow}>
          <Text style={styles.label}>NRO. SOCIO</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.labelSmall}>Afiliado</Text>
            <Text style={styles.value}>{credentialData.fullName}</Text>
          </View>
          <View style={styles.infoBlockRight}>
            <Text style={styles.labelSmall}>Alta</Text>
            <Text style={styles.value}>{credentialData.dateSince}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <MaterialIcons name="delete" size={20} color="#D32F2F" />
        <Text style={styles.deleteText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 24,
  },
  card: {
    width: 340,
    height: 160,
    borderRadius: 18,
    padding: 20,
    backgroundColor: '#2D43B3', // azul oscuro
    borderWidth: 1.5,
    borderColor: '#3A7BFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 10,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  organization: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  memberNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1.5,
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'sans-serif-medium',
    marginBottom: 0,
  },
  tipoAfiliadoBox: {
    alignItems: 'flex-end',
  },
  tipoAfiliadoValue: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'right',
  },
  nroSocioRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  label: {
    color: '#E3E6F0',
    fontSize: 13,
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  infoBlock: {
    flex: 1,
    alignItems: 'flex-start',
  },
  infoBlockRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  labelSmall: {
    color: '#B3B8D6',
    fontSize: 12,
    marginBottom: 2,
  },
  value: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 10,
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 6,
  },
  deleteText: {
    color: '#D32F2F',
    fontSize: 15,
    marginLeft: 4,
    fontWeight: 'bold',
  },
});

export default Credential;
