import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import novoGasto from "./components/create-gasto.component";
import gastoList from "./components/gastos-list.component";
import gastoEdit from "./components/edit-gasto.component";


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={gastoList} />
        <Route path="/create" component={novoGasto} />
        <Route path="/edit/:id" component={gastoEdit} />


      </div>
    </Router>
  );
}

export default App;
