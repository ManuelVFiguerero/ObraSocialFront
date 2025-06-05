// App.tsx
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Animated,
  Easing,
  Image,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RecoveryScreen from './src/screens/RecoveryScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SocialHealthScreen from './src/screens/SocialHealthScreen';
import CredentialScreen from './src/screens/CredentialScreen';
import AboutUsScreen from './src/screens/AboutUs';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ReserveAppointmentLocationScreen from './src/screens/ReserveAppointmentLocationScreen';
import ReserveAppointmentScreen from './src/screens/ReserveAppointmentScreen';
import ContactUsScreen from './src/screens/ContactUsScreen';
import AllNotificationsScreen from './src/screens/AllNotificationsScreen';
import MedicalHistoryScreen from './src/screens/MedicalHistoryScreen';

// Tu logo circular
import Logo from './src/assets/icons/MainLogo.png';
import StudyDetailScreen from './src/screens/StudyDetailScreen';
import ConsultDetailScreen from './src/screens/ConsultDetailScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import RecoveryScreenToken from './src/screens/RecoveryScreenToken';
import RecoveryScreenNewPassword from './src/screens/RecoveryScreenNewPassword';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold });
  const [showLoader, setShowLoader] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  // animación de opacidad para el texto
  const textAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!fontsLoaded) return;
    SplashScreen.hideAsync().then(() => setShowLoader(true));

    Animated.loop(
      Animated.sequence([
        Animated.timing(textAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(textAnim, {
          toValue: 0.3,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    const id = setTimeout(() => setAppIsReady(true), 3000);
    return () => clearTimeout(id);
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      {/* Desactivamos translucent para que la barra de estado herede nuestro fondo */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="#4D6EC5"
        translucent={false}
      />

      <View style={{ flex: 1 }}>
        {showLoader && !appIsReady && (
          <View style={styles.loader}>
            <View style={styles.logoWrapper}>
              <Image source={Logo} style={styles.logo} />
            </View>
            <Animated.Text style={[styles.loaderText, { opacity: textAnim }]}>
              Tu obra social
            </Animated.Text>
          </View>
        )}

        {appIsReady && (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="RecoveryPassword" component={RecoveryScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="SocialHealth" component={SocialHealthScreen} />
              <Stack.Screen name="Credential" component={CredentialScreen} />
              <Stack.Screen name="Notifications" component={NotificationsScreen} />
              <Stack.Screen name="AboutUs" component={AboutUsScreen} />
              <Stack.Screen name="ReserveAppointmentLocation" component={ReserveAppointmentLocationScreen} />
              <Stack.Screen name="ReserveAppointment" component={ReserveAppointmentScreen} />
              <Stack.Screen name="ContactUs" component={ContactUsScreen} />
              <Stack.Screen name="AllNotifications" component={AllNotificationsScreen} />
              <Stack.Screen name="MedicalHistory" component={MedicalHistoryScreen} />
              <Stack.Screen name="ConsultDetail" component={ConsultDetailScreen} />
              <Stack.Screen name="StudyDetail" component={StudyDetailScreen} />
              <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}/>
              <Stack.Screen name="RecoveryToken" component={RecoveryScreenToken} />
              <Stack.Screen name="RecoveryNewPassword" component={RecoveryScreenNewPassword} />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </View>

      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  loader: {
    ...StyleSheet.absoluteFillObject,  // cubre TODO, incluso la barra de estado
    backgroundColor: '#2D43B3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#2D43B3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 6,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  loaderText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
});
