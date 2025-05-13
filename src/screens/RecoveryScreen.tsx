import React from 'react';
import { View, StyleSheet} from 'react-native';
import RecoveryForm from '../components/RecoveryForm';
import BackgroundLayout from './BackgroundLayout';


const RecoveryScreen = () => {
  return (
    <BackgroundLayout>
      <View style={styles.container}>
        <RecoveryForm />
      </View>
    </BackgroundLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default RecoveryScreen;


