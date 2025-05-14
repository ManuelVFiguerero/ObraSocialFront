import { View, StyleSheet} from 'react-native'
import React from 'react'
import NavBarButton from './NavBarButton'

export default function NavBar({ selectedIcon }) {
  return (
    <View style={styles.bottomNavBar}>
      <NavBarButton selected={selectedIcon === 'home'} btnIcon={'home'} screen={'Home'} />
      <NavBarButton selected={selectedIcon === 'person'} btnIcon={'person'} screen={'Profile'} />
      <NavBarButton selected={selectedIcon === 'badge'} btnIcon={'badge'} screen={'Credential'} />
      <NavBarButton selected={selectedIcon === 'notifications'} btnIcon={'notifications'} screen={'Notifications'} />
      <NavBarButton selected={selectedIcon === 'logout'} btnIcon={'logout'} screen={'Login'} />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    //backgroundColor: '#F3F4F8',
    backgroundColor: '#F3F4F8',
    height: 60,
    position: 'absolute',
    bottom: 48, //Posicion absoluta para que no se superponga con los botones de Android
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

