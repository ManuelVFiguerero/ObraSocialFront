import React from 'react';
import { SafeAreaView,View, StyleSheet} from 'react-native';
import RecoveryForm from '../components/RecoveryForm';
import Header from '../components/Header';


const RecoveryScreen = () => {
  return (
      <SafeAreaView style={styles.screen}>
      {/* Header fijo con título */}
      <Header title="Recuperación de datos" />

      <View style={styles.container}>
        <RecoveryForm />
      </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default RecoveryScreen;
