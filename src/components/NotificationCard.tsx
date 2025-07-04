import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface NotificationCardProps {
  date: string;
  hour: string;
  title: string;
  description: string;
  onPress: () => void;
  animatedValue: any;
}

const formatDate = (date: string, hour: string) => {
  // date: '03/07', hour: '20:30'
  return `${date} ${hour}hs`;
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  date,
  hour,
  title,
  description,
  onPress,
  animatedValue,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.hour}>{hour}</Text>
      </View>
      <MaterialCommunityIcons name="file-document-outline" size={28} color="#B3B3B3" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
      </View>
      {/* Hacer toda la tarjeta presionable */}
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <View style={{ flex: 1 }}>
          <Text onPress={onPress} style={{ width: '100%', height: '100%' }} accessibilityRole="button" accessibilityLabel="Ver detalle de notificación" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23242A',
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    padding: 12,
    elevation: 2,
  },
  left: {
    alignItems: 'center',
    marginRight: 12,
    minWidth: 45,
  },
  date: {
    color: '#E0E0E0',
    fontWeight: 'bold',
    fontSize: 15,
  },
  hour: {
    color: '#B3B3B3',
    fontSize: 12,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  description: {
    color: '#B3B3B3',
    fontSize: 13,
  },
});

export default NotificationCard;
