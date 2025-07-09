import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Text, Dimensions, Animated } from 'react-native';
import NotificationCard from './NotificationCard';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

export interface NotificationItem {
  id: string;
  date: string;
  hour: string;
  title: string;
  description: string;
}

interface SwipeableNotificationListProps {
  data: NotificationItem[];
  onPressItem: (item: NotificationItem) => void;
  onDeleteItem: (id: string) => void;
}

const SwipeableNotificationList: React.FC<SwipeableNotificationListProps> = ({ data, onPressItem, onDeleteItem }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme)
  const [deletedId, setDeletedId] = useState<string | null>(null);
  const [showDeleted, setShowDeleted] = useState(false);

  const renderRightActions = (_progress: Animated.AnimatedInterpolation<any>, _dragX: Animated.AnimatedInterpolation<any>, itemId: string) => {
    return (
      <View style={styles.deleteActionContainer}>
        <MaterialCommunityIcons name="trash-can" size={32} color="#fff" />
      </View>
    );
  };

  const renderLeftActions = (_progress: Animated.AnimatedInterpolation<any>, _dragX: Animated.AnimatedInterpolation<any>, itemId: string) => {
    return (
      <View style={styles.deleteActionContainer}>
        <MaterialCommunityIcons name="trash-can" size={32} color="#fff" />
      </View>
    );
  };

  const handleSwipeDelete = (id: string) => {
    setDeletedId(id);
    setShowDeleted(true);
    onDeleteItem(id);
    setTimeout(() => setShowDeleted(false), 1500);
  };

  const renderItem = ({ item }: { item: NotificationItem }) => {
    if (item.id === deletedId) return null;
    return (
      <Swipeable
        renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, item.id)}
        renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}
        onSwipeableOpen={() => handleSwipeDelete(item.id)}
      >
        <NotificationCard
          date={item.date}
          hour={item.hour}
          title={item.title}
          description={item.description}
          onPress={() => onPressItem(item)}
          animatedValue={new Animated.Value(0)}
        />
      </Swipeable>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      {showDeleted && (
        <View style={styles.deletedBanner}>
          <Text style={styles.deletedText}>Notificación eliminada</Text>
        </View>
      )}
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  swipeable: {
    flex: 1,
  },

  deleteActionContainer: {
    backgroundColor: '#FF4D4F',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '90%',
    borderRadius: 12,
    marginVertical: 6,
  },
  deletedBanner: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    backgroundColor: '#FF4D4F',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 40,
  },
  deletedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SwipeableNotificationList;