import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';




const AppointmentCard = ({ appointment, reservable = true, onReserve = () => {}, onCancel }) => {
    return (
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
                  <TouchableOpacity style={[styles.button, {backgroundColor: '#B32D2F'}]} onPress={onCancel}>
                    <Text style={styles.textButton}>Cancelar</Text>
                    <MaterialIcons name='close' size={20} color='#F3F4F8' />
                  </TouchableOpacity>
                ) : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    appointmentCard: {
        backgroundColor: '#F3F4F8',
        width: '100%',
        flexDirection: 'column',
        borderRadius: 10,
        elevation: 10,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 15
    },
    topView: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    middleView: {
        width: '100%',
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 20
    },
    bottomView: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'

    },
    viewContent: {
        flexDirection: 'row'
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#1226A9',
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textIcon: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 700
    },
    textButton: {
        color: '#F3F4F8',
        fontWeight: 700,
        fontSize: 14,
        height: '100%',
        marginLeft: 5
    }

})

export default AppointmentCard