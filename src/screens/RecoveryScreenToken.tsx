import React from 'react';
import { SafeAreaView,View, StyleSheet} from 'react-native';
import RecoveryTokenForm from '../components/RecoveryTokenForm';
import Header from '../components/Header';


const RecoveryScreenToken = () => {
  return (
      <SafeAreaView style={styles.screen}>
      {/* Header fijo con título */}
      <Header title="Recuperación de datos" />

      <View style={styles.container}>
        <RecoveryTockenForm />
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

export default RecoveryScreenToken;
