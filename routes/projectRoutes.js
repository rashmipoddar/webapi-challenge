const projectsDb = require('../data/helpers/projectModel');
const actionsDb = require('../data/helpers/actionModel');

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

router.get('/:id/actions', (req, res) => {
  const projectId = req.params.id;
  // console.log(projectId);

  projectsDb.get(projectId)
    .then(response => {
      // console.log(response);
      if (response) {
        projectsDb.getProjectActions(projectId)
          .then(actionsResponse => {
            res.status(200).send(actionsResponse);
          })
          .catch(error => {
            console.log(error);
            res.status(500).send({message: 'There was a problem in getting projects actions from the database'});
          })
      } else {
        res.status(404).send({message: 'Project with provided id does not exist'});
      }   
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'There was a problem in getting projects actions from the database'});
    })
});

router.post('/:id/actions', (req, res) => {
  const actions = req.body;
  // console.log(actions);

  const projectId = req.params.id;
  // console.log(projectId);

  if (!actions.notes || !actions.description) {
    res.status(400).send({message: 'Action description and notes required'});
  } else {
    projectsDb.get(projectId)
      .then(response => {
        // console.log(response);
        if (response) {
          actionsDb.insert({...req.body, project_id:projectId})
            .then(actionResponse => {
              // console.log(actionResponse);
              res.status(201).send(actionResponse);
            })
            .catch(error => {
              console.log(error);
              res.status(500).send({message: 'The action could not be created'});
            })
        } else {
          res.status(404).send({message: 'Project with provided id does not exist'});
        }   
      })
      .catch(error => {
        console.log(error);
        res.status(500).send({message: 'There was a problem in getting projects from the database'});
      })
  }
});

module.exports = router;

