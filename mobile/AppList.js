import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AppItem from './AppItem';
import Database from './Database';
import axios from 'axios'
import { Picker } from '@react-native-picker/picker';

export default function AppList({ route, navigation }) {
    const [items, setItems] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState();
    var soma = 0
    useEffect(() => {
        //Database.getItems().then(items => setItems(items));
        axios.get('http://192.168.15.139:5000/gastos')
            .then(items =>
                setItems(items.data)
            )

    }, [route]);


    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.title}>Lista de Gastos</Text>
            <TouchableOpacity style={styles.buttonSelect}>
                <Picker
                    style={{ height: 50, width: 100, justifyContent: 'center' }}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="01" value="01" />
                    <Picker.Item label="02" value="02" />
                    <Picker.Item label="03" value="03" />
                    <Picker.Item label="04" value="04" />
                    <Picker.Item label="05" value="05" />
                    <Picker.Item label="06" value="06" />
                    <Picker.Item label="07" value="07" />
                    <Picker.Item label="08" value="08" />
                    <Picker.Item label="09" value="09" />
                    <Picker.Item label="10" value="10" />
                    <Picker.Item label="11" value="11" />
                    <Picker.Item label="12" value="12" />
                </Picker>
            </TouchableOpacity>
            <ScrollView

                style={styles.scrollContainer}
                contentContainerStyle={styles.itemsContainer}>
                {items.map(item => {
                    if (selectedLanguage === item.date.substring(5, 7)) {
                        soma += item.username
                        return <AppItem key={item._id} id={item._id} item={item.date.substring(0, 10) + '   R$ ' + item.username} navigation={navigation} />
                    }
                })}

                <Text style={{ fontSize: 22 }}>Total: R$ {soma}</Text>

            </ScrollView>
        </View >

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343a40',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20
    },
    scrollContainer: {
        flex: 1,
        width: '90%',
        backgroundColor: '#fff'
    },
    itemsContainer: {

        marginTop: 10,
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    buttonSelect: {
        marginLeft: 20,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center',

    },
});