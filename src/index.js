import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './styles/style.scss';
import { API_URL, USERNAME } from './configs.js';

class App extends Component {
  state = {
    tarefas: [],
    novaTarefa: ''
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

  //altera uma tarefa com base em um id e uma acao e retorna uma promise
  alteraTarefa = async (id, acao) => {
    try {
      const response = await axios.post(`${API_URL}/${USERNAME}/tarefas/${id}/${acao}`);
      console.log(response);
      //dentro do response temos um objeto data, e dentro dele um objeto tarefas
      return response.data.tarefas;
    } catch (error) {
      console.error(error);
    }
  }

  toggleConcluida = id => {
    this.alteraTarefa(id, 'completar')
      //alterar as tarefas retorna a lista novamente
      .then(tarefas => this.setState({
        tarefas
      }));
  }

  toggleArquivada = id => {
    this.alteraTarefa(id, 'arquivar')
      //alterar as tarefas retorna a lista novamente
      .then(tarefas => this.setState({
        tarefas
      }));
  }

  criaNovaTarefa = async descricao => {
    try {
      const response = await axios.post(`${API_URL}/${USERNAME}/tarefas`, {
        descricao
      });
      console.log(response);
      //dentro do response temos um objeto data, e dentro dele um objeto tarefas
      return response.data.tarefas;
    } catch (error) {
      console.error(error);
    }
  }

  handleInput = e => {
    //esse evento tem um currentTarget
    //dentro do currentTarget temos o value
    const value = e.currentTarget.value;
    this.setState({
      novaTarefa: value
    })
  }

  onAdicionarSubmit = e => {
    //isso impede que recarrege a pagina
    e.preventDefault();

    //pegando o texto atual
    const novaTarefa = this.state.novaTarefa;
    this.criaNovaTarefa(novaTarefa)
      .then(tarefas => this.setState({
        tarefas
      }));
  }

  render() {
    //eh uma boa pratica puxar aqui o que vamos usar
    const tarefas = this.state.tarefas;
    const novaTarefa = this.state.novaTarefa;
    //tambem pode ser escrito como const {tarefas} = this.state;

    const naoCompletas = tarefas.filter(tarefa => !tarefa.completa);
    const completas = tarefas.filter(tarefa => tarefa.completa);

    return (
      <div className="app container">
        <div className="tarefas">
          <h1 className="titulo">Minhas tarefas</h1>

          <form className="form" onSubmit={this.onAdicionarSubmit}>
            <input type="text" className="input input-nova-tarefa" value={novaTarefa} placeholder="Nova tarefa" onChange={this.handleInput} />
          </form>
          
          <ul className="lista-tarefas">
            {!!naoCompletas.length 
              ? naoCompletas.map(tarefa => 
                <li key={tarefa.id} className="tarefa">
                  <span className="tarefa__descricao">{tarefa.descricao}</span>
                  <div className="tarefa__botoes">
                    <button className="button" onClick={() => this.toggleConcluida(tarefa.id)}>Feito ✅</button>
                    <button className="button" onClick={() => this.toggleArquivada(tarefa.id)}>🔥</button>
                  </div>
                </li>
              ) 
              : <li>Sem tarefas</li>}
          </ul>

          <h2 className="titulo-2">Concluídas</h2>
          <ul className="lista-tarefas">
            {!!completas.length 
              ? completas.map(tarefa => 
                <li key={tarefa.id} className="tarefa">
                  <span className="tarefa__descricao">{tarefa.descricao}</span>
                  <div className="tarefa__botoes">
                    <button className="button" onClick={() => this.toggleConcluida(tarefa.id)}>Não concluída 🧐</button>
                    <button className="button" onClick={() => this.toggleArquivada(tarefa.id)}>🔥</button>
                  </div>
                </li>
              ) 
              : <li>Sem tarefas</li>}
          </ul>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
