import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import Database from './Database';
import axios from 'axios'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function AppForm({ route, navigation }) {
    const [id, setId] = useState(undefined);
    const [username, setUsername] = useState('');
    const [date, setDate] = useState('');
    const [date2, setDate2] = useState(new Date())
    const [show, setShow] = useState(false);


    useEffect(() => {
        if (!route.params) return;
        setId(route.params.id)
        setUsername(route.params.username);
        setDate(route.params.date.toString());
        
    }, [route])

    function handleDescriptionChange(username) { setUsername(username); }
    function handleQuantityChange(date) { setDate(date); }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date2;
        setDate2(currentDate);
        setShow(false)
      };

      const showDatepicker = () => {
        setShow(true)
      };

    async function handleButtonPress() {
        const listItem = { username: Number(username), date: date };
        // Database.saveItem(listItem, id)
        //     .then(response => navigation.navigate("AppList", listItem));
        if (id === undefined) {
            axios.post('http://192.168.15.139:5000/gastos/add', listItem)
                .then(res => navigation.navigate("AppList", listItem));
        } else {
            axios.post('http://192.168.15.139:5000/gastos/update/' + id, listItem)
                .then(res => navigation.navigate("AppList", listItem));
        }
        setId(undefined)
        setUsername('');
        setDate('');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar gastos</Text>
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
                    value={date2.toString()}
                />
                <Button onPress={showDatepicker} title="Show date picker!" />
                {show && (<DateTimePicker
                    testID="dateTimePicker"
                    value={date2}
                    mode="date"
                    is24Hour={false}
                    display="spinner"
                    onChange={onChange}
                    
                    
                />
                )}

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