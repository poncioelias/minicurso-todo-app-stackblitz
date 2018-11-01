import React from 'react';
import PropTypes from 'prop-types';
import Tarefa from './Tarefa';

const Lista = (props) => {

  console.log(props);

  const tarefas = props.tarefas;
  const toggleConcluida = props.toggleConcluida;
  const toggleArquivada = props.toggleArquivada;

  return (
    <ul className="lista-tarefas">
      {!!tarefas.length 
        ? tarefas.map(tarefa => 
          <Tarefa tarefa={tarefa} toggleConcluida={toggleConcluida} toggleArquivada={toggleArquivada} />
        ) 
        : <li>Sem tarefas</li>}
    </ul>
  );
}

Lista.propTypes = {
  tarefas: PropTypes.array.isRequired,
  toggleConcluida: PropTypes.func.isRequired,
  toggleArquivada: PropTypes.func.isRequired
}

export default Lista;