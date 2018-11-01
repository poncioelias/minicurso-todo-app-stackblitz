import React, { Component } from 'react';
import { render } from 'react-dom';
import './styles/style.scss';

class App extends Component {
  state = {
    tarefas: [
      {
        id: 1,
        descricao: 'Aprender React'
      },
      {
        id: 2,
        descricao: 'Comprar leite'
      },
      {
        id: 3,
        descricao: 'Comprar arroz'
      }
    ],
  }

  render() {

    return (
      <div className="app container">
        <h1 className="titulo">Bem-vindo!</h1>

        <div className="infos">
          <h2>Espero que você curta esse minicurso e aprenda um pouco da maravilha que é o React! 🔥</h2>

          <div className="links">
            <a href="https://stackblitz.com/edit/react-minicurso-final">Código final no StackBlitz</a>
            <a href="https://github.com/roniemeque/minicurso-todo-app-stackblitz">Código com etapas no GitHub</a>
            <a href="https://github.com/roniemeque/minicurso-todo-api">Código da API Laravel no GitHub</a>
            <a href="https://roniemeque.github.io/react-minicurso/">Slides</a>
            <a href="mailto:roniemeque@icloud.com">roniemeque@icloud.com</a>
          </div>
        </div>
        
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
