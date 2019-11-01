const projectsDb = require('../data/helpers/projectModel');

const router = require('express').Router();

router.get('/', (req, res) => {
  projectsDb.get()
    .then(response => {
      // console.log(response);
      res.status(200).send(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'There was a problem in getting projects from the database'});
    })
});

router.get('/:id', (req, res) => {
  const projectId = req.params.id;
  // console.log(projectId);

  projectsDb.get(projectId)
    .then(response => {
      // console.log(response);
      if (response) {
        res.status(200).send(response);
      } else {
        res.status(404).send({message: 'Project with provided id does not exist'});
      }   
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'There was a problem in getting projects from the database'});
    })
});

router.post('/', (req, res) => {
  const projectDetails = req.body;
  console.log(projectDetails);

  if(!projectDetails.name || !projectDetails.description) {
    res.status(400).send({message: 'The project name and description are required'});
  } else {
    projectsDb.insert(projectDetails)
      .then(response => {
        console.log(response);
        res.status(201).send(response);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send({message: 'The project could not be created'});
      })
  }
});

router.put('/:id', (req, res) => {
  const projectId = req.params.id;
  // console.log(projectId);
  
  const projectChanges = req.body;
  // console.log(projectChanges);

  if (!projectChanges.name || !projectChanges.description) {
    res.status(400).send({message: 'The project name and changes are required'});
  } else {
    projectsDb.update(projectId, projectChanges)
      .then(response => {
        // console.log(response);
        if (response) {
          res.status(200).send(response);
        } else {
          res.status(404).send({message: 'The project with given id does not exist'});
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).send({message: 'The project could not be updated'});
      })
  }
});

router.delete('/:id', (req, res) => {
  const projectId = req.params.id;
  // console.log(projectId);

  projectsDb.remove(projectId) 
  .then(response => {
    // console.log(response);
    if (response !== 0) {
      res.status(200).send({message: `Project with id ${projectId} deleted`});
    } else {
      res.status(404).send({message: 'Project with given id does not exist'});
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).send({message: 'The project could not be deleted'});
  })
});

module.exports = router;

