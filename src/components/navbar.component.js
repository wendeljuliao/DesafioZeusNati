import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg" >
                <Link to="/list" className="navbar-brand">DesafioZeus</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/list" className="nav-link">Gastos</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Novo gasto</Link>
                        </li>
                        <li>
                            <Link to="/graficos" className="nav-link">Gráficos</Link>
                        </li>
                    </ul>
                </div>
            </nav>

        )

    }

}