import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NavBarButton = ({btnIcon, screen}) => {
    const navigation = useNavigation();

    const handleButton = () => {
        navigation.navigate(screen);
    }

    return (
        <TouchableOpacity onPress={handleButton} style={styles.container}>
        <MaterialIcons name={btnIcon} size={30} color='#465BC6'/>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default NavBarButton