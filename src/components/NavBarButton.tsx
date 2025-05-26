import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

interface NavBarButtonProps {
  selected?: boolean;
  btnIcon: keyof typeof MaterialIcons.glyphMap;
  screen: keyof RootStackParamList;
}

const NavBarButton: React.FC<NavBarButtonProps> = ({
  selected = false,
  btnIcon,
  screen,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate(screen);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, selected && styles.selectedContainer]}
      activeOpacity={0.7}
    >
      <MaterialIcons
        name={btnIcon}
        size={30}
        color={selected ? '#F3F4F8' : '#465BC6'}
      />
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
    borderRadius: 5,
  },
});

export default NavBarButton;