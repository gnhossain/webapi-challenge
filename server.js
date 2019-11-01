const express = require("express");
const server = express();

server.use(express.json());
server.use(logger);

function logger(req, res, next) {

  console.log(req.method, req.url, Date.now());
  next();
};

// const projectRouter = require('./data/helpers/projectRouter');
// server.use('/api/project', projectRouter);

// server.use('/action', actionRouter)
// server.use('/project', projectRouter)

// const server = require('./data/helpers/actionRouter')

// const port = 5000;

// const projectsRouter = require("./projects/projects-router");
// server.use("/api/projects", projectsRouter);


server.get('/', (req, res) => {
    res.send(`<h2>Hello !!</h2>`);
  });

  module.exports = server;