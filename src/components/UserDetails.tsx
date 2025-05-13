import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../assets/images/icons/MainLogo.png';

const UserDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hola, Manuel!</Text>
      <View style={styles.infoBox}>
        <View style={styles.infoPerson}>
          <Text style={styles.name}>MANUEL VICENTE FIGUEROERO</Text>
          <Text style={styles.dni}>20 448123 9 21</Text>
        </View>
        <View>
          <Image source={Logo} style={styles.logo}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 30,
    marginTop: 40,
    flexDirection: 'column',
    
  },
  greeting: {
    color: '#F3F4F8',
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    marginBottom: 30,
  },
  infoBox: {
    backgroundColor: '#1226A9',
    alignItems: 'center',
    minHeight: 80,
    borderRadius: 24,
    elevation: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15
  },
  infoPerson: {
    flexDirection: 'column',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  name: {
    color: '#F3F4F8',
    fontSize: 14,
    marginBottom: 15
  },
  dni: {
    color: '#F3F4F8',
    fontSize: 16,
  },
});

export default UserDetails;
