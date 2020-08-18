import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [ repo, setRepo ] = useState([]);

  useEffect(() => {

      api.get('projects').then(response => {
        setRepo(response.data);
      });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('projects', {
      title: `Novo repositorio: ${Date.now()}`,
      url: 'https://github.com/Vinidevsantos/Desafio-03-Conceitos-do-ReactJS',
      techs: ['Repository', 'desafio']
    });

    const repository = response.data;

    setRepo([...repo, repository]);
  }

  async function handleRemoveRepository(id) {
      
    await api.delete(`projects/${id}`);
    setRepo(repo.filter(repository => repository.id !== id ));
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repo.map(repository => 
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
