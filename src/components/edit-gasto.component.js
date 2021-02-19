import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditGasto extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: 0,
      date: new Date(),
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/gastos/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const gasto = {
      username: this.state.username,
      date: this.state.date
    }

    console.log(gasto);

    axios.post('http://localhost:5000/gastos/update/' + this.props.match.params.id, gasto)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Editar gasto</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Valor: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Editar gasto" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}