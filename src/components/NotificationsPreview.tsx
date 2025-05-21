import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: '#F3F4F8',
    minHeight: 150,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    borderWidth: 1,
    borderColor: '#ddd',
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
    backgroundColor: '#ccc',
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
  },
  textDefault: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Inter_400Regular',
  },
  seeMore: {
    fontSize: 16,
    color: '#2D43B3',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default NotificationsPreview;
