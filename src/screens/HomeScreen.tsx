import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import UserDetails from '../components/UserDetails';
import ActionButtons from '../components/ActionsButtons';
import MyAppointments from '../components/MyAppointments';
import BottomNavBar from '../components/BottomNavbar';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <UserDetails />
        <ActionButtons />
        <MyAppointments />
      </ScrollView>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,  // Espacio para la barra inferior
  },
});

export default HomeScreen;
