import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import "./gastos-list.component.css"

const Gasto = props => (
  <tr>
    <td>{props.gasto.username}</td>
    <td>{props.gasto.date.substring(0, 10)}</td>
    <td>
      {/* <Link to={"/edit/" + props.gasto._id}>Editar</Link> | <a href="#" onClick={() => { props.deleteGasto(props.gasto._id) }}>Deletar</a> */}
      <Link to={"/edit/" + props.gasto._id}><button type="button" class="btn btn-link">Editar</button></Link> | <button type="button" class="btn btn-danger" onClick={() => { props.deleteGasto(props.gasto._id) }}>Deletar</button>
    </td>
  </tr>

)

export default class GastosList extends Component {
  constructor(props) {
    super(props);

    this.deleteGasto = this.deleteGasto.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeAno = this.handleChangeAno.bind(this)
    this.somaMes = this.somaMes.bind(this)

    this.state = { gastos: [], dataEscolhida: '01', anoEscolhido: '2021' };

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

  handleChange(event) {
    this.setState({ dataEscolhida: event.target.value });
  }

  handleChangeAno(event) {
    this.setState({ anoEscolhido: event.target.value });
  }



  deleteGasto(id) {
    if (window.confirm('Você tem certeza que quer deletar?')) {
      axios.delete('http://localhost:5000/gastos/' + id)
        .then(response => { console.log(response.data) });

      this.setState({
        gastos: this.state.gastos.filter(el => el._id !== id)
      })
    }
  }

  /* GastosList() {
    return this.state.gastos.map(currentGasto => {
      return <Gasto gasto={currentGasto} deleteGasto={this.deleteGasto} key={currentGasto._id} />;
    })
  } */

  GastosList() {
    return this.state.gastos.map(currentGasto => {
      if (currentGasto.date.substring(5, 7) === this.state.dataEscolhida && currentGasto.date.substring(0, 4) === this.state.anoEscolhido) {
        return <Gasto gasto={currentGasto} deleteGasto={this.deleteGasto} key={currentGasto._id} />;
      }
    })
  }

  /* totalGastos() {
    let soma = 0;
    this.state.gastos.forEach(currentGasto => {
      soma += currentGasto.username
    })
    return soma
  } */

  somaMes() {
    let soma = 0;
    this.state.gastos.forEach(currentGasto => {
      if (currentGasto.date.substring(5, 7) === this.state.dataEscolhida && currentGasto.date.substring(0, 4) === this.state.anoEscolhido) {
        soma += currentGasto.username
      }
    })

    return soma
  }

  render() {
    return (
      <div>
        <h3>Lista de Gastos</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th width="25%">Valor (R$)</th>
              <th width="25%">Data</th>
              <th width="25%">Ações</th>
              <th>Ano</th>
              <th width="15%">
                
                <select class="form-control" value={this.state.anoEscolhido} onChange={this.handleChangeAno}>
                  <option>2020</option>
                  <option>2021</option>
                </select>
              </th>
              <th>Mês</th>
              <th width="10%">

                <select class="form-control" value={this.state.dataEscolhida} onChange={this.handleChange}>
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                  <option>04</option>
                  <option>05</option>
                  <option>06</option>
                  <option>07</option>
                  <option>08</option>
                  <option>09</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.GastosList()}
          </tbody>
          <tr>
            <th>Total: R$ {this.somaMes()}</th>
          </tr>
        </table>
        {/* <select class="form-control" value={this.state.dataEscolhida} onChange={this.handleChange}>
          <option>01</option>
          <option>02</option>
          <option>03</option>
          <option>04</option>
          <option>05</option>
          <option>06</option>
          <option>07</option>
          <option>08</option>
          <option>09</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
        </select> */}
        {/*         Total:{this.somaMes()} */}
      </div>
    )
  }
}