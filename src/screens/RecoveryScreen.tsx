import React from 'react';
import { SafeAreaView,View, StyleSheet} from 'react-native';
import RecoveryForm from '../components/RecoveryForm';
import Header from '../components/Header';
import { useTheme } from '../theme/ThemeContext';

const RecoveryScreen = () => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.background }]}> 
      <Header title="Recuperación de datos" />
      <View style={[styles.container, { backgroundColor: theme.card }]}> 
        <RecoveryForm />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F8', // Fondo igual al de los formularios
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default RecoveryScreen;
