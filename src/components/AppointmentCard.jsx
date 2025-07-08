import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const AppointmentCard = ({ appointment, reservable = true, onReserve = () => {}, onCancel }) => {
    return (
        <View style={styles.cardWrapper}>
            <View style={styles.colorBar} />
            <View style={styles.appointmentCard}>
                <View style={styles.topView}>
                    <View style={styles.viewContent}>
                        <MaterialIcons name='location-on' size={20} color='#2D43B3' />
                        <Text style={styles.textIcon}>Clinica Santa Clara</Text>
                    </View>
                </View>
                <View style={styles.middleView}>
                    <View style={styles.viewContent}>
                        <MaterialIcons name='person' size={20} color='#2D43B3' />
                        <Text style={styles.textIcon}>{appointment.nombreProfesional}</Text>
                    </View>
                    <View style={styles.viewContent}>
                        <MaterialIcons name='medication' size={20} color='#2D43B3' />
                        <Text style={styles.textIcon}>{appointment.especialidadProfesional}</Text>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <View style={styles.viewContent}>
                        <MaterialIcons name='event' size={20} color='#2D43B3' />
                        <Text style={styles.textIcon}>{appointment.fecha}</Text>
                    </View>
                    {reservable ? 
                        <TouchableOpacity style={styles.button} onPress={onReserve}>
                            <Text style={styles.textButton}>Reservar</Text>
                            <MaterialIcons name='add' size={20} color='#F3F4F8' />
                        </TouchableOpacity>
                    : onCancel ? (
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#B32D2F' }]} onPress={onCancel}>
                            <Text style={styles.textButton}>Cancelar</Text>
                            <MaterialIcons name='close' size={20} color='#F3F4F8' />
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        elevation: 10,
        marginBottom: 15,
        overflow: 'hidden',
        width: '100%'
    },
    colorBar: {
        width: 6,
        backgroundColor: '#2D43B3'
    },
    appointmentCard: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    topView: {
        marginBottom: 0
    },
    middleView: {
        marginBottom: 0
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    viewContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#1226A9',
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textIcon: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '700',
        color: '#000'
    },
    textButton: {
        color: '#F3F4F8',
        fontWeight: '700',
        fontSize: 14,
        marginRight: 5
    }
})

export default AppointmentCard
