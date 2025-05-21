import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import SocialHealthForm from '../components/SocialHealthForm';

// Ajusta según tu tema
const HEADER_HEIGHT = 160;
const NAVBAR_HEIGHT = 90;

const SocialHealthScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Header title="Obra social" />

      <ScrollView
        style={[styles.scrollView, { marginTop: HEADER_HEIGHT, marginBottom: NAVBAR_HEIGHT }]}
        contentContainerStyle={styles.content}
      >
        <SocialHealthForm />
      </ScrollView>

      <View style={[styles.navContainer, { height: NAVBAR_HEIGHT }]}>      
        <NavBar selectedIcon="home" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  navContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default SocialHealthScreen;