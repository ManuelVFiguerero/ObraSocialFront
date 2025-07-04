import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';


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
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      {messages.length > 0 ? (
        <>
          {messages.slice(0, 2).map((msg, index) => (
            <View key={index} style={styles.messageContainer}>
              <View style={styles.textMessageContainer}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.textDefault}
                >
                  {msg}
                </Text>
              </View>
              <View style={styles.separator} />
            </View>
          ))}
          <TouchableOpacity onPress={seeMore}>
            <Text style={styles.seeMore}>Ver más</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.textDefault}>{defaultMessage}</Text>
      )}
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: theme.background,
    minHeight: 150,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    borderWidth: 1,
    borderColor: theme.neutral,
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
    backgroundColor: theme.neutral,
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
  },
  textDefault: {
    fontSize: 16,
    color: theme.neutral,
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Inter_400Regular',
  },
  seeMore: {
    fontSize: 16,
    color: theme.primary,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default NotificationsPreview;
