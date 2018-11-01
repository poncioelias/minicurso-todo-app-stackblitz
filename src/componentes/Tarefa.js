import React from 'react';
import PropTypes from 'prop-types';

const Tarefa = ({tarefa, toggleArquivada, toggleConcluida, togglePrioridade}) => {

  //nao eh preciso fazer aqui pois foi feito em cima
  //const {tarefa, toggleArquivada, toggleConcluida, togglePrioridade} = this.props;

  return (
    <li key={tarefa.id} className="tarefa">
      <span className="tarefa__descricao">{tarefa.descricao}</span>
      <div className="tarefa__botoes">
        <button className="button" onClick={() => toggleConcluida(tarefa.id)}>{tarefa.completa ? 'Desconcluir 🧐' : 'Concluir ✅'}</button>
        <button className="button" onClick={() => toggleArquivada(tarefa.id)}>{tarefa.arquivada ? 'Restaurar 🤙' : 'Arquivar 🔥'}</button>
        <button className="button" onClick={() => togglePrioridade(tarefa.id)}>{tarefa.prioridade ? '😨' : '😎'}</button>
      </div>
    </li>
  );
}

Tarefa.propTypes = {
  tarefa: PropTypes.object.isRequired,
  toggleConcluida: PropTypes.func.isRequired,
  toggleArquivada: PropTypes.func.isRequired,
  togglePrioridade: PropTypes.func.isRequired
}

export default Tarefa;