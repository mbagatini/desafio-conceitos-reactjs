import React, { useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    })
  }, [repositories])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Axios",
      url: "https://github.com/axios/axios",
      techs: ["Node.js"]
    })

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repo => { return repo.id !== id }))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            <h3>{repo.title}</h3>

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
