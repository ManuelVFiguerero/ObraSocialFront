import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NavBarButton = ({selected=false, btnIcon, screen}) => {
    const navigation = useNavigation();

    const handleButton = () => {
        navigation.navigate(screen);
    }

    return (
      <TouchableOpacity
        onPress={handleButton}
        style={[
          styles.container,
          selected && styles.selectedContainer
        ]}
      >
        <MaterialIcons name={btnIcon} size={30} color={selected ? '#F3F4F8' : '#465BC6'} />
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedContainer: {
        backgroundColor: '#2D43B3',
        borderRadius: 5 
    }
})

export default NavBarButton