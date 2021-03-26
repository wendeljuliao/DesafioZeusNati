import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import RaisedButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)

        this.state = {
            username: '',
            password: '',
            valores: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/login/')
            .then(response => {
                this.setState({ valores: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleClick(e) {
        e.preventDefault()

        window.location = '/list'
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div style={centralizado}>
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            id="standard-basic" label="Usuário"
                            onChange={this.onChangeUsername} value={this.state.username}
                        />
                        <br />
                        <TextField
                            type="password"
                            id="standard-basic" label="Senha"
                            onChange={this.onChangePassword} value={this.state.password}
                        />
                        <br />
                        <RaisedButton label="Submit" variant="contained" color='primary' style={style} onClick={(event) => this.handleClick(event)}>Entrar</RaisedButton>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
    backgroundcolor: 'black'
};

const centralizado = {
    widht: '100%',
    justifyContent: 'center',
    paddingTop: '20%',
    paddingLeft: '35%',
    alignItems: 'center',


}
export default Login;