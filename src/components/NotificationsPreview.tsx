import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface NotificationsPreviewProps {
  defaultMessage: string;
  messages: string[];
  seeMore: () => void;
}

const NotificationsPreview: React.FC<NotificationsPreviewProps> = ({
  defaultMessage,
  messages,
  seeMore,
}) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      {messages.length > 0 ? (
        <>
          {messages.slice(0, 2).map((msg, index) => (
            <View key={index} style={styles.messageContainer}>
              <View style={styles.textMessageContainer}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[styles.textDefault, { color: theme.text }]}
                >
                  {msg}
                </Text>
              </View>
              <View
                style={[styles.separator, { backgroundColor: theme.border }]}
              />
            </View>
          ))}
          <TouchableOpacity onPress={seeMore}>
            <Text style={[styles.seeMore, { color: theme.primary }]}>Ver más</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={[styles.textDefault, { color: theme.text }]}>
          {defaultMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    minHeight: 150,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    borderWidth: 1,
    padding: 10,
  },
  messageContainer: {
    width: '100%',
  },
  textMessageContainer: {
    padding: 5,
    width: '100%',
  },
  separator: {
    height: 1,
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
  },
  textDefault: {
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Inter_400Regular',
  },
  seeMore: {
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default NotificationsPreview;
