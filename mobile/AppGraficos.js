import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import axios from 'axios'
import PureChart from 'react-native-pure-chart';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';


export default function AppForm({ route, navigation }) {
    const [items, setItems] = useState([]);
    const [selectedAno, setSelectedAno] = useState();

    useEffect(() => {
        //Database.getItems().then(items => setItems(items));
        axios.get('http://192.168.15.139:5000/gastos')
            .then(items =>
                setItems(items.data)
            )
        setSelectedAno('2021')
    }, [route]);



    /* let sampleData = [
        {x: '2018-01-01', y: 30},
        {x: '2018-01-02', y: 200},
        {x: '2018-01-03', y: 170},
        {x: '2018-01-04', y: 250},
        {x: '2018-01-05', y: 10}
    ] */

    function handleButtonPress() {
        navigation.navigate("AppGraficos", items)
    }

    function pegarDados() {
        var sampleData = []
        var anoEscolhido = ["2020", "2021"]
        var datasEscolhidas = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        let soma
        for (var j = 0; j < anoEscolhido.length; j++) {
            for (var i = 0; i < datasEscolhidas.length; i++) {
                soma = 0
                items.map(item => {
                    if (item.date.substring(5, 7) === datasEscolhidas[i] && item.date.substring(0, 4) === selectedAno) {
                        soma += item.username
                    }
                })
                sampleData.push({ x: selectedAno + "-" + datasEscolhidas[i], y: soma })
            }
        }

        return sampleData
    }


    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.title}>Gráfico de Gastos</Text>
            <View style={styles.selectedDate}>
                <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                    <FontAwesome style={styles.buttonText} name="refresh" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSelect}>
                    <Picker
                        style={{ height: 50, width: 110, justifyContent: 'center' }}
                        selectedValue={selectedAno}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedAno(itemValue)
                        }>
                        <Picker.Item label="2020" value="2020" />
                        <Picker.Item label="2021" value="2021" />
                    </Picker>
                </TouchableOpacity>
                <Text style={styles.textMesAno}>Ano</Text>
            </View>
            <View style={styles.chart}>
                <PureChart height={500} width={'100%'} data={pegarDados()} type='line' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343a40',
        alignItems: 'center',

    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20
    },
    buttonSelect: {
        marginLeft: 7,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center',

    },
    selectedDate: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        borderBottomColor: '#CCC',
        paddingBottom: 10,
        marginTop: 10,
    },
    textMesAno: {
        color: "white",
        fontSize: 15,
        marginBottom: 7,
        marginLeft: 5
    },
    chart: {
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
        flex: 1,
    },
    button: {
        height: 40,
        borderRadius: 10,
        paddingLeft: 35,
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