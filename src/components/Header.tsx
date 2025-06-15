import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import {
  HEADER_HEIGHT,
  HEADER_RADIUS,
  HEADER_BG_COLOR,
  HEADER_TEXT_COLOR,
  HEADER_TITLE_SIZE,
} from '../utils/theme';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Iniciar sesión' }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View style={[
      styles.headerContainer,
      { paddingTop: insets.top + 20, backgroundColor: theme.primary },
    ]}>
      <Text style={[styles.headerText, { color: theme.buttonText }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',       // para solaparse bajo el formulario
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    borderBottomLeftRadius: HEADER_RADIUS,
    borderBottomRightRadius: HEADER_RADIUS,
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 0,                  // detrás del formulario
  },
  headerText: {
    fontSize: HEADER_TITLE_SIZE,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Header;



