import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

export type HistoryCardProps = {
  date: string;
  professional: string;
  specialty: string;
  reason: string;
  buttonLabel: string;
  onPress: () => void;
};

const HistoryCard: React.FC<HistoryCardProps> = ({
  date,
  professional,
  specialty,
  reason,
  buttonLabel,
  onPress,
}) => (
  <View style={styles.card}>
    <Text style={styles.date}>{date}</Text>

    <Text style={styles.line}>
      <Text style={styles.label}>Profesional: </Text>
      {professional}
    </Text>

    <Text style={styles.line}>
      <Text style={styles.label}>Especialidad: </Text>
      {specialty}
    </Text>

    <Text style={styles.line}>
      <Text style={styles.label}>Motivo: </Text>
      {reason}
    </Text>

    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonLabel}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#2D43B3',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignSelf: 'center',
    elevation: 4,
  },
  date: {
    color: '#F3F4F8',
    fontSize: 14,
    marginBottom: 8,
  },
  line: {
    color: '#F3F4F8',
    fontSize: 16,
    marginBottom: 4,
  },
  label: {
    fontWeight: '600',
  },
  button: {
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: '#2D43B3',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default HistoryCard;
