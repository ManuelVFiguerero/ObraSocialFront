import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import BackgroundLayout from './BackgroundLayout';
import Logo from '../assets/icons/MainLogo.png';
import NavBar from '../components/NavBar';
import SocialHealthForm from '../components/SocialHealthForm';


/*NOTE: El formulario es lo suficientemente chico 
como para que los elementos entren y lo suficientemente 
grande para que quede atrás del NavBar
Dios se apiade de quien quiera corregirlo.*/
const SocialHealthScreen = () => {

    return (
        <BackgroundLayout>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Image source={Logo} style={styles.logo}/>
                    <Text style={styles.titleText}>Obra social</Text>
                </View>
                <SocialHealthForm/>
                <NavBar/>
            </View>
        </BackgroundLayout>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 108,
    },
    title: {
        marginTop: 40,
        alignItems: 'center',
        marginBottom: 20
        
    },
    titleText: {
        fontSize: 28,
        color: '#F3F4F8',
        fontFamily: 'Inter_700Bold'
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 60,
    }
})
export default SocialHealthScreen;