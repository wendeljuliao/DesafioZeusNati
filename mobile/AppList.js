import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import AppItem from './AppItem';
import Database from './Database';
import axios from 'axios'

export default function AppList({ route, navigation }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Database.getItems().then(items => setItems(items));
        axios.get('http://172.18.9.221:5000/gastos')
            .then(items =>
                setItems(items.data)
            )

    }, [route]);


    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.title}>Lista de Compras</Text>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.itemsContainer}>
                {items.map(item => {
                    return <AppItem key={item._id} id={item._id} item={item.date.substring(0,10) + '  de ' + item.username} navigation={navigation} />
                })}
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D93600',
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
        width: '90%'
    },
    itemsContainer: {
        flex: 1,
        marginTop: 10,
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
});