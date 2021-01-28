import React, { Component } from "react";
import './App.css';
import Card from "./card/Card";
import RegForma from './components/RegForma'
import RegedForma from './components/RegedForma'

import BackEnd from './BackEnd'

class App extends Component {



    render(){
      return(
        <div className="App">
        <div>
          <Card titulo="Cadastrar">
            <RegForma></RegForma>
          </Card>
        </div>

        <div>
          <Card titulo="Cadastrados">
            <RegedForma></RegedForma>
          </Card>
        </div>
    </div>
      )
    }
}

export default App;

