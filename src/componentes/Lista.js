import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tarefa from './Tarefa';

class Lista extends Component {
  state= {
    filtro: ''
  }

  handleInput = e => {
    //esse evento tem um currentTarget
    //dentro do currentTarget temos o value
    const value = e.currentTarget.value;
    this.setState({
      filtro: value
    })
  }

  render() {
    //usando destructuring
    const {filtro} = this.state;
    const {tarefas, toggleArquivada, toggleConcluida} = this.props;

    //ao inves de usar os lowerCase eh possivel usar regex
    const tarefasFiltradas = filtro ? tarefas.filter(({descricao}) => descricao.toLowerCase().includes(filtro.toLowerCase())) : tarefas;

    return (
      <ul className="lista-tarefas">
        <input type="text" className="input input-busca" value={filtro} placeholder="Filtrar" onChange={this.handleInput} />
        {!!tarefasFiltradas.length 
          ? tarefasFiltradas.map(tarefa => 
            <Tarefa tarefa={tarefa} toggleConcluida={toggleConcluida} toggleArquivada={toggleArquivada} />
          ) 
          : <li>Sem tarefas</li>}
      </ul>
    );
  }
}

Lista.propTypes = {
  tarefas: PropTypes.array.isRequired,
  toggleConcluida: PropTypes.func.isRequired,
  toggleArquivada: PropTypes.func.isRequired
}

export default Lista;