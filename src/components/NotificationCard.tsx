import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

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
  const { theme } = useTheme();
  const styles = createStyles(theme)
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.hour}>{hour}</Text>
      </View>
      <MaterialCommunityIcons name="file-document-outline" size={28} color={theme.neutral} style={styles.icon} />
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

const createStyles = (theme) => StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.background,
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
    color: theme.neutral,
    fontWeight: 'bold',
    fontSize: 15,
  },
  hour: {
    color: theme.neutral,
    fontSize: 12,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: theme.quaternary,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  description: {
    color: theme.neutral,
    fontSize: 13,
  },
});

export default NotificationCard;