import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useTheme } from '../theme/ThemeContext';

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
  const { theme, isDark } = useTheme();

  const handlePress = () => {
    navigation.navigate(screen);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, selected && { backgroundColor: theme.primary, borderRadius: 5 }]}
      activeOpacity={0.7}
    >
      <MaterialIcons
        name={btnIcon}
        size={30}
        color={selected ? theme.buttonText : (isDark ? theme.text : theme.primary)}
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
});

export default NavBarButton;