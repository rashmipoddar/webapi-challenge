const router = require('express').Router();

const actionsDb = require('../data/helpers/actionModel');

router.get('/', (req, res) => {
  actionsDb.get()
    .then(response => {
      // console.log(response);
      res.status(200).send(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'There was an error in getting actions from the database'});
    })
});

router.get('/:id', (req, res) => {
  const actionId = req.params.id;
  // console.log(actionId);

  actionsDb.get(actionId)
    .then(response => {
      // console.log(response);
      if (response) {
        res.status(200).send(response);
      } else {
        res.status(404).send({message: 'The action with provided id does not exist'});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'There was an error in getting actions from the database'});
    })
});

router.put('/:id', (req, res) => {
  const actionId = req.params.id;
  // console.log(actionId);

  const actionChanges = req.body;
  // console.log(actionChanges);

  if (!actionChanges.notes || !actionChanges.description) {
    res.status(400).send({message: 'Action notes and description are required'});
  } else {
    actionsDb.update(actionId, actionChanges)
      .then(response => {
        // console.log(response);
        if (response) {
          res.status(200).send(response);
        } else {
          res.status(404).send({message: 'The action with provided id does not exist'});
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).send({message: 'The action could not be updated'});
      })
  }
});

router.delete('/:id', (req, res) => {
  const actionId = req.params.id;
  // console.log(actionId);

  actionsDb.remove(actionId) 
  .then(response => {
    // console.log(response);
    if (response !== 0) {
      res.status(200).send({message: `Action with id ${actionId} deleted`});
    } else {
      res.status(404).send({message: 'Action with given id does not exist'});
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).send({message: 'The action could not be deleted'});
  })
});

module.exports = router;