import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Logo from '../assets/images/icons/MainLogo.png';

const { width } = Dimensions.get('window');

const UserDetails = () => {
  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <View style={styles.infoPerson}>
          <Text style={styles.name}>MANUEL VICENTE FIGUERERO</Text>
          <Text style={styles.dni}>20 448123 9 21</Text>
        </View>
        <Image source={Logo} style={styles.logo} />
      </View>
    </View>
  );
};

const BOX_WIDTH = width - 40;  // deja 20px de margen a cada lado

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',         // centra el box horizontalmente
  },
  infoBox: {
    width: BOX_WIDTH,             // ancho más grande
    backgroundColor: '#4D6EC5',
    borderRadius: 16,
    paddingVertical: 24,          // padding superior/inferior aumentado
    paddingHorizontal: 20,        // padding izquierdo/derecho aumentado
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoPerson: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    color: '#fff',
    fontSize: 18,                 // fuente más grande
    fontWeight: '600',
    marginBottom: 4,
  },
  dni: {
    color: '#fff',
    fontSize: 16,                 // fuente más grande
  },
  logo: {
    width: 60,                    // logo más grande
    height: 60,
    borderRadius: 30,
  },
});

export default UserDetails;

