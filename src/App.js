import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    api.post("repositories", {
      title: "Aplicativo React.js",
      url: "https://github.com/rocketseat-education/gostack-template-conceitos-reactjs",
      techs: ["Node.js"]
    }).then(response => {
      setRepositories([...repositories, response.data]);
    });
  }



  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {

      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      repositories.splice(repositoryIndex, 1);
      setRepositories([...repositories]);


      console.log("repositorio delatado com sucesso !")
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
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
