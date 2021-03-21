import React, { Component } from 'react'
import axios from 'axios';
import Chart from 'chart.js';


export default class Graficos extends Component {
    constructor(props) {
        super(props)

        this.chartRef = React.createRef();
        this.state = { gastos: [] };

    }

    componentDidUpdate() {
        const myChartRef = this.chartRef.current.getContext("2d");
        //var ctx = document.getElementById('myChart').getContext('2d');
        var datasEscolhidas = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        var anoEscolhido = ["2020", "2021"]
        var arrayValor = new Array(anoEscolhido.length)
        for (var k = 0; k < arrayValor.length; k++) {
            arrayValor[k] = new Array(datasEscolhidas.length)
        }
        var soma
        for (var j = 0; j < anoEscolhido.length; j++) {
            for (var i = 0; i < datasEscolhidas.length; i++) {
                soma = 0
                this.state.gastos.forEach(currentGasto => {
                    console.log(currentGasto)
                    if (currentGasto.date.substring(5, 7) === datasEscolhidas[i] && currentGasto.date.substring(0, 4) === anoEscolhido[j]) {
                        soma += currentGasto.username
                    }
                });
                arrayValor[j][i] = soma
            }
        }

        new Chart(myChartRef, {
            type: "bar",
            data: {
                //Bring in data
                labels: datasEscolhidas,
                datasets: [
                    {
                        label: "2020",
                        data: arrayValor[0],
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        

                    },
                    {
                        label: "2021",
                        data: arrayValor[1],
                        backgroundColor: 'rgba(54, 162, 235, 0.8)'
                    }
                ],

            },
            options: {
                //Customize chart options
            }
        });
    }


    componentDidMount() {
        axios.get('http://localhost:5000/gastos/')
            .then(response => {
                this.setState({ gastos: response.data })
            })
            .catch((error) => {
                console.log(error);
            })


    }

    render() {
        return (
            <div>
                <h3>Gráfico de Gastos</h3>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }

}