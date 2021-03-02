'use strict';

const express = require('express');
// const Dogs = require('../models/dogsDb.js');
// here, we instantiate the new dogs model
// const pups = new Dogs();

const dogsRouter = express.Router();

// routes

dogsRouter.get('/dogs', getDogs);
// dogsRouter.get('/dogs/:id', getOneDog);
// dogsRouter.post('/dogs', createDog);
// dogsRouter.put('/dogs/:id', updateDog);
// dogsRouter.delete('/dogs/:id', deleteDog);

// if there are things in the db, this callback will be used to get the thing from the db and send back to the user
function getDogs(req, res) {
  // this is CRUD
  // let all = pups.get();
  // this is REST
  let outputObject = {
    status: 'OK',
    msg: 'dogs route',
  };
  res.status(200).json(outputObject);
}

// function getOneDog(req, res) {
//   let id = parseInt(req.params.id);
//   let item = item.get(id);
//   res.status(200).json(item);
// }

// function createDog(req, res) {
//   let obj = req.body;
//   let newItem = pups.create(obj);
//   // status 201 is proper status code for creating an item (POST)
//   res.status(201).json(newItem);
// }

// // localhost:3333/dogs/:id
// function updateDog(req, res) {
//   let id = parseInt(req.params.id);
//   let content = req.body;
//   let updated = pups.update(id, content);
//   res.status(200).json(updated);
// }

// function deleteDog(req, res) {
//   let id = parseInt(req.params.id);
//   let deleted = pups.delete(id);
//   // status code is 204 for deleting an item; deleted obj is now = null
//   res.status(204).json(deleted);
// }

module.exports = dogsRouter;
