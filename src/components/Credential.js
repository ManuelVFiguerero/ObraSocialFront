import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

const Credential = ({credentialData, handleDelete}) => {
    
    return (
      <>
          <View style={styles.container}>
              <View style={styles.top}>
                  <Text style={styles.name}>{credentialData.fullName}</Text>
                  <Text style={styles.organization}>{credentialData.organization}</Text>
              </View>
              <View style={styles.middle}>
                  <Text style={styles.credNumber}>{credentialData.memberNumber}</Text>
              </View>
              <View style={styles.bottom}>
                  <Text style={styles.membNumberText}>NRO. SOCIO</Text>
                  <Text style={styles.dateSince}>{credentialData.dateSince}</Text>
              </View>
          </View>
          <View style={styles.delete}>
              <TouchableOpacity onPress={handleDelete} style={styles.deleteTouchable}>
                  <Text style={styles.deleteText}>Eliminar</Text>
                  <MaterialIcons name='delete' size={30} color='#B32D2F'/>
              </TouchableOpacity>
          </View>
      </>
    )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#1226A9',
    flexDirection: 'column',
    padding: 20,
    elevation: 6,
  },
  delete: {
    width: '100%',
    marginBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row-reverse'
  },
  deleteTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    color: '#B32D2F',
    fontFamily: 'Inter_700Bold',
    fontSize: 14
  },
  top: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#F3F4F8'
  },
  organization: {
    fontSize: 24,
    fontFamily: 'Inter_400Regular',
    color: '#F3F4F8'
  },
  middle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15
  },
  credNumber: {
    fontSize: 26,
    fontFamily: 'Inter_400Regular',
    color: '#F3F4F8'    
  },
  bottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  membNumberText: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    color: '#F3F4F8'       
  },
  dateSince: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    color: '#F3F4F8'      
  }

})

export default Credential