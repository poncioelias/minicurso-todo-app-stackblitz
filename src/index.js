import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './styles/style.scss';
import { API_URL, USERNAME } from './configs.js';
import Lista from './componentes/Lista';

class App extends Component {
  state = {
    tarefas: [],
    novaTarefa: '',
    mostrarArquivadas: false
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

  togglePrioridade = id => {
    this.alteraTarefa(id, 'prioridade')
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

  toggleMostrarArquivadas = () => {
    const mostrarArquivadas = this.state.mostrarArquivadas;
    this.setState({
      mostrarArquivadas: !mostrarArquivadas
    })
  }

  render() {
    //eh uma boa pratica puxar aqui o que vamos usar
    const tarefas = this.state.tarefas;
    const novaTarefa = this.state.novaTarefa;
    //tambem pode ser escrito como const {tarefas} = this.state;
    const mostrarArquivadas = this.state.mostrarArquivadas;

    const tarefasFiltradas = mostrarArquivadas ? tarefas : tarefas.filter(tarefa => !tarefa.arquivada);
    const tarefasOrdenadas = tarefasFiltradas.sort((tarefaA, tarefaB) => tarefaA.prioridade > tarefaB.prioridade ? -1 : 1);
    const naoCompletas = tarefasOrdenadas.filter(tarefa => !tarefa.completa);
    const completas = tarefasOrdenadas.filter(tarefa => tarefa.completa);

    return (
      <div className="app container">
        <h1 className="titulo">Minhas tarefas</h1>

        <form className="form" onSubmit={this.onAdicionarSubmit}>
          <input type="text" className="input input-nova-tarefa" value={novaTarefa} placeholder="Nova tarefa" onChange={this.handleInput} />
        </form>
        
        <div className="tarefas">
          <h2 className="titulo-2">Pendentes</h2>
          <Lista tarefas={naoCompletas} togglePrioridade={this.togglePrioridade} toggleConcluida={this.toggleConcluida} toggleArquivada={this.toggleArquivada} />
        </div>

        <div className="tarefas">
          <h2 className="titulo-2">Concluídas</h2>
          <Lista tarefas={completas} togglePrioridade={this.togglePrioridade} toggleConcluida={this.toggleConcluida} toggleArquivada={this.toggleArquivada} />
        </div>

        <button onClick={this.toggleMostrarArquivadas} className="button button-arquivadas">{mostrarArquivadas ? 'Esconder arquivadas' : 'Mostrar arquivadas'}</button>
        
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
