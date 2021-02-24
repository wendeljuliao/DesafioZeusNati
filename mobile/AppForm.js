import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Database from './Database';
import axios from 'axios'

export default function AppForm({ route, navigation }) {
    const id = route.params ? route.params.id : undefined;
    const [username, setUsername] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (!route.params) return;
        setUsername(route.params.username);
        setDate(route.params.date.toString());
    }, [route])

    function handleDescriptionChange(username) { setUsername(username); }
    function handleQuantityChange(date) { setDate(date); }
    async function handleButtonPress() {
        const listItem = { username: Number(username), date: date };
        // Database.saveItem(listItem, id)
        //     .then(response => navigation.navigate("AppList", listItem));
        axios.post('http://172.18.9.221:5000/gastos/add', listItem)
            .then(res => console.log(res.data));
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Item para comprar</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={handleDescriptionChange}
                    placeholder="Digite o valor"
                    keyboardType={'numeric'}
                    clearButtonMode="always"
                    value={username.toString()} />
                <TextInput
                    style={styles.input}
                    onChangeText={handleQuantityChange}
                    placeholder="Digite a data"
                    keyboardType={'numeric'}
                    clearButtonMode="always"
                    value={date.toString()} />
                <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D93600',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
    },
    inputContainer: {
        flex: 1,
        marginTop: 30,
        width: '90%',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    input: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch'
    },
    button: {
        marginTop: 10,
        height: 60,
        backgroundColor: 'blue',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
        shadowColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});