import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar.component"
import novoGasto from "./components/create-gasto.component";
import gastoList from "./components/gastos-list.component";
import gastoEdit from "./components/edit-gasto.component";
import Graficos from './components/graficos.component.js'
import Login from './components/tela-login.component.js'

//teste
function App() {


  return (
    <Router >
      <div className="container">
        <Route path="/" exact component={Login}/>

        {window.location.pathname !== "/" ? <Navbar /> : ''}
        <br />
        <Route path="/list" exact component={gastoList} />
        <Route path="/create" component={novoGasto} />
        <Route path="/edit/:id" component={gastoEdit} />
        <Route path="/graficos" component={Graficos} />


      </div>
    </Router>
  );
}

export default App;
