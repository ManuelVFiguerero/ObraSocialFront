import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({ title = 'Iniciar sesión' }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top + 20 }]}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute', // El header se pone sobre el formulario
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#4D6EC5',
    width: '100%',
    height: 180,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 0,
    padding:100,
    zIndex: 0, // Se coloca detrás del formulario
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
  },
});

export default Header;


