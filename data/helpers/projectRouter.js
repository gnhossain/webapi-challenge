const express = require("express");
const router = express.Router();
router.use(express.json());

const actionModel = require("./actionRouter");

// router.get("/", (req, res) => {
//     project
// });

router.get("/:id", (req, res) => {});
router.get("/", (req, res) => {
  actionModel
    .get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Cannot get projects" });
    });
});

router.delete("/:id", validateId, (req, res) => {
    const { id } = req.params;
    actionModel
      .remove(id)
      .then(() => res.status(204).end())
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error: deleting Project" });
      });
  });

  router.put("/:id", validateId, (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const { name } = req.body;
    actionModel
      .update(id, { description }, { name })
      .then(() => {
        actionModel
          .get(id)
          .then(project => res.status(200).json(project))
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error getting Project" });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error: updating Project" });
      });
  });

// custom middleware

function validateId(req, res, next) {
    const { id } = req.params.id;
    actionModel.get(id).then(project => {
      if (project) {
        next();
      } else {
        res.status(404).json({ error: "Project with this id does not exist" });
      }
    });
  }

module.exports = router;