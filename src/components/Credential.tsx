import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';


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
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.name}>{credentialData.fullName}</Text>
          <Text style={styles.organization}>{credentialData.organization}</Text>
        </View>
        <View style={styles.middle}>
          <Text style={styles.credNumber}>{credentialData.memberNumber}</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.membNumberText}>NRO. SOCIO</Text>
          <Text style={styles.dateSince}>{credentialData.dateSince}</Text>
        </View>
        {credentialData.tipoAfiliado && (
          <View style={styles.tipoAfiliadoBox}>
            <Text style={styles.tipoAfiliadoLabel}>Tipo de afiliado:</Text>
            <Text style={styles.tipoAfiliadoValue}>{credentialData.tipoAfiliado}</Text>
          </View>
        )}
      </View>
      <View style={styles.delete}>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteTouchable}>
          <Text style={styles.deleteText}>Eliminar</Text>
          <MaterialIcons name="delete" size={30} color="#B32D2F" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    backgroundColor: theme.primary,
    flexDirection: 'column',
    padding: 20,
    elevation: 6,
  },
  delete: {
    width: '100%',
    marginBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row-reverse',
  },
  deleteTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    color: '#B32D2F',
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
  },
  top: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: theme.terciary,
  },
  organization: {
    fontSize: 24,
    fontFamily: 'Inter_400Regular',
    color: theme.terciary,
  },
  middle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  credNumber: {
    fontSize: 26,
    fontFamily: 'Inter_400Regular',
    color: theme.terciary,
  },
  bottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  membNumberText: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    color: theme.terciary,
  },
  dateSince: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    color: theme.terciary,
  },
  tipoAfiliadoBox: {
    marginTop: 10,
    backgroundColor: theme.secondary,
    borderRadius: 8,
    padding: 8,
    alignSelf: 'flex-start',
  },
  tipoAfiliadoLabel: {
    color: theme.terciary,
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
  },
  tipoAfiliadoValue: {
    color: theme.terciary,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
});

export default Credential;
