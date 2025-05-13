import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const BackgroundLayout = ({ children }) => {
  return (
    <ImageBackground
      source={require('../assets/images/backgrounds/MainBackground.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default BackgroundLayout;
