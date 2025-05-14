import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import BackgroundLayout from './BackgroundLayout'
import Logo from '../assets/images/icons/MainLogo.png';
import NavBar from '../components/NavBar';
import NotificationsPreview from '../components/NotificationsPreview';


const testMessages = ['Lorem ipsum dolor sit amet, consectetur adipiscing',
    'Lorem ipsum dolor sit amet, consectetur adipiscing',
    'Lorem ipsum dolor sit amet, consectetur adipiscing'
]

const NotificationsScreen = () => {
    return (
      <BackgroundLayout>
          <View style={styles.title}>
              <Image source={Logo} style={styles.logo}/>
              <Text style={styles.titleText}>Notificaciones</Text>
          </View>
          <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.notificationContainer}>
                    <Text style={styles.notificationHeader}>Nuevas notificaciones</Text>
                    <NotificationsPreview defaultMessage={'Ya has visto todas las notificaciones'} messages={testMessages}/>
                </View>

                <View style={styles.notificationContainer}>
                    <Text style={styles.notificationHeader}>Notificaciones ya vistas</Text>
                    <NotificationsPreview defaultMessage={'No tienes notificaciones'} messages={[testMessages[0]]}/>
                </View>

                <View style={styles.notificationContainer}>
                    <Text style={styles.notificationHeader}>Noticias</Text>
                    <NotificationsPreview defaultMessage={'No hay noticias para mostrar'} messages={testMessages}/>
                </View>
          </ScrollView>
          <NavBar selectedIcon={'notifications'}/>
      </BackgroundLayout>
    )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 200,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginTop: 40
  },
  titleText: {
    fontSize: 28,
    color: '#F3F4F8',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center'
  },
  notificationContainer: {
    width: '100%',
    flexDirection: 'column',
    marginBottom: 30
  },
  notificationHeader: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  }

})

export default NotificationsScreen