const express = require('express');
const router = express.Router();

const actionModel = require('./actionModel');

router.get('/', (req, res) => {
    actionModel.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({ error: "Cannot get action"})
        })
})
router.get('/:id', (req, res) => {
    const id = req.params.id


    actionModel.get(id)
        .then(project => {
            if(project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({ message: "This Id does not exist" })
            }

        })
        .catch(error => {
            res.status(500).json({ error: "Could not load project"})
        })

})

router.post('/', (req, res) => {
    const pBody = req.body

    if(pBody.name && pBody.description){
        actionModel.insert(pBody)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            console.log(error)
          return res.status(500).json({ error: "Project could not be added"})
        })
    } else {
       return res.status(400).json({ message: "Name and description are required" })
    }

})

router.delete("/:id", validateId, (req, res) => {
    const { id } = req.params;
   actionModel
      .remove(id)
      .then(() => res.status(204).end())
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error deleting Action" });
      });
  });


  router.put("/:id", validateId, validatePost, (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const { notes } = req.body;
    const { completed } = req.body;
    actModel
      .update(id, { description }, { notes }, { completed })
      .then(() => {
       actionModel
          .get(id)
          .then(action => res.status(200).json(action))
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error getting" });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error updating" });
      });
  });
  
  // custom middleware
  
  function validatePostId(req, res, next) {}
  function validateId(req, res, next) {
    const { id } = req.params.id;
   actionModel.get(id).then(action => {
      if (action) {
        next();
      } else {
        res.status(404).json({ error: "Action with this id does not exist" });
      }
    });
  }

  function validatePost(req, res, next) {
    const { id } = req.params;
    const { description } = req.body;
    const { notes } = req.body;
    if (!req.body) {
      return res.status(400).json({ error: "Action requires body" });
    }
    if (!description) {
      return res.status(400).json({ error: "Action requires description" });
    }
    if (!notes) {
      return res.status(400).json({ error: "Action requires notes" });
    }
    req.body = { id, description, notes };
    next();
  }

module.exports = router;
