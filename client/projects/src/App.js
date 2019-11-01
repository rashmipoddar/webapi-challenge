import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [ projects, setProjects ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        // console.log(response);
        setProjects(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <div>
      <h1>Projects</h1>
      {projects && projects.map(project => {
        return(
          <div key={project.id}>
            <h1>{project.name}</h1>
            <h3>{project.description}</h3>
          </div>
        )
      })}
    </div>
  );
}

export default App;
