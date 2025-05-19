import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RecoveryScreen from './src/screens/RecoveryScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SocialHealthScreen from './src/screens/SocialHealthScreen';
import CredentialScreen from './src/screens/CredentialScreen';
import AboutUsScreen from './src/screens/AboutUs';
import NotificationsScreen from './src/screens/NotificationsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
        />
        <Stack.Screen 
          name="RecoveryPassword" 
          component={RecoveryScreen} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          name="SocialHealth"
          component={SocialHealthScreen}
        />
        <Stack.Screen
          name="Credential"
          component={CredentialScreen}
        />
        <Stack.Screen 
          name="Notifications"
          component={NotificationsScreen}
        />
        <Stack.Screen 
          name="AboutUs"
          component={AboutUsScreen}
        />
        
      </Stack.Navigator>
    </NavigationContainer> 
  );
}


