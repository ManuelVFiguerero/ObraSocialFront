import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../components/Header'


const testData = {
    message: 'Lorem ipsum dolor sit amet consectetur adipiscing elit scelerisque est vestibulum conubia, turpis montes cum gravida potenti auctor ullamcorper primis lectus. Non vehicula metus suscipit orci auctor dui, tellus egestas malesuada pretium. Imperdiet venenatis vivamus arcu phasellus lacinia fames laoreet elementum volutpat habitant, inceptos sollicitudin eleifend egestas sociosqu sociis vehicula id.',
    date: new Date(),
    type: 'New'
}
const testData1 = {
    message: 'Lorem ipsum dolor sit amet consectetur adipiscing elit scelerisque est vestibulum conubia, turpis montes cum gravida potenti auctor ullamcorper primis lectus. Non vehicula metus suscipit orci auctor dui, tellus egestas malesuada pretium. Imperdiet venenatis vivamus arcu phasellus lacinia fames laoreet elementum volutpat habitant, inceptos sollicitudin eleifend egestas sociosqu sociis vehicula id.',
    date: new Date(),
    type: 'Read'
}
const testData2 = {
    message: 'Lorem ipsum dolor sit amet consectetur adipiscing elit scelerisque est vestibulum conubia, turpis montes cum gravida potenti auctor ullamcorper primis lectus. Non vehicula metus suscipit orci auctor dui, tellus egestas malesuada pretium. Imperdiet venenatis vivamus arcu phasellus lacinia fames laoreet elementum volutpat habitant, inceptos sollicitudin eleifend egestas sociosqu sociis vehicula id.',
    date: new Date(),
    type: 'Announcement'
}
const testDatas = [testData, testData1, testData2]

//type tiene que indicar que tipo de notificaciones queremos ver:
//['New', 'Read', 'Announcement']
const AllNotificationsScreen = ({ type }) => {
    const [notifications, setNotifications] = useState([])
    let headerText;

    
    useEffect(() => {
        //TODO: Llamar al back para traernos notificaciones según el tipo
        const response = testDatas.filter((obj) => {return obj.type === type})
        setNotifications(response)
        
        switch(type){
            case 'New':
                headerText = 'Notificaciones nuevas';
                break;
            case 'Read':
                headerText = 'Notificaciones leídas';
                break;
            case 'Announcement':
                headerText = 'Noticias';
        }
    }, [])

    return (
        <View style={styles.screen}>
            <Header title={headerText}/>
            <ScrollView>
                <Text>AllNotificationsScreen</Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F8',
  },
})

export default AllNotificationsScreen