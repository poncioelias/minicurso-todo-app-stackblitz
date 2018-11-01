import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './styles/style.scss';
import { API_URL, USERNAME } from './configs.js';

class App extends Component {
  state = {
    tarefas: []
  }

  //lifecycle que executa quando o componente esta pronto
  componentDidMount(){
    //vamos buscar as tarefas na api
    this.buscaTarefas()
      .then(tarefas => this.setState({
        //isso eh o mesmo que fazer tarefas: tarefas
        tarefas
      }));
  }

  buscaTarefas = async () => {
    try {
      const response = await axios.get(`${API_URL}/${USERNAME}/tarefas`);
      //dentro do response temos um objeto data, e dentro dele um objeto tarefas
      return response.data.tarefas;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    //eh uma boa pratica puxar aqui o que vamos usar
    const tarefas = this.state.tarefas;
    //tambem pode ser escrito como const {tarefas} = this.state;

    return (
      <div className="app container">
        <div className="tarefas">
          <h1 className="titulo">Minhas tarefas</h1>
          
          <ul className="lista-tarefas">
            {!!tarefas.length 
              ? tarefas.map(tarefa => <li className="tarefa">{tarefa.descricao}</li>) 
              : <li>Sem tarefas</li>}
          </ul>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
