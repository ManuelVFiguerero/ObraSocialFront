import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export type ModalType = 'warning' | 'success';

export interface ConfirmationModalProps {
  visible: boolean;
  type: ModalType;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  onCancel?: () => void;
}

const iconMap: Record<ModalType, keyof typeof MaterialIcons.glyphMap> = {
  warning: 'fmd-bad',
  success: 'check-circle',
};

const colorMap: Record<ModalType, string> = {
  warning: '#B32D2F',
  success: '#2D43B3',
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  type,
  title,
  message,
  onConfirm,
  onClose,
  onCancel,
}) => {
  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <MaterialIcons
            name={iconMap[type]}
            size={40}
            color={colorMap[type]}
          />
          <Text style={[styles.title, { color: colorMap[type] }]}>
            {title}
          </Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colorMap[type] }]}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#F3F4F8',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    marginTop: 10,
  },
  message: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginVertical: 20,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#2D43B3',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: '#F3F4F8',
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
  },
});

export default ConfirmationModal;