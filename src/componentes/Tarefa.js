import React from 'react';
import PropTypes from 'prop-types';

const Tarefa = (props) => {

  const tarefa = props.tarefa;
  const toggleConcluida = props.toggleConcluida;
  const toggleArquivada = props.toggleArquivada;

  return (
    <li key={tarefa.id} className="tarefa">
      <span className="tarefa__descricao">{tarefa.descricao}</span>
      <div className="tarefa__botoes">
        <button className="button" onClick={() => toggleConcluida(tarefa.id)}>{tarefa.completa ? 'Desconcluir 🧐' : 'Concluir ✅'}</button>
        <button className="button" onClick={() => toggleArquivada(tarefa.id)}>{tarefa.arquivada ? 'Restaurar 🤙' : 'Arquivar 🔥'}</button>
      </div>
    </li>
  );
}

Tarefa.propTypes = {
  tarefa: PropTypes.object.isRequired,
  toggleConcluida: PropTypes.func.isRequired,
  toggleArquivada: PropTypes.func.isRequired
}

export default Tarefa;