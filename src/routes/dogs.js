'use strict';

const express = require('express');
const Dogs = require('../models/dogsModel.js');
const validator = require('../middleware/validator.js');

// here, we instantiate the new dogs model
const pups = new Dogs();

const dogsRouter = express.Router();

// routes

dogsRouter.get('/dogs', getDogs);
dogsRouter.get('/dogs/:id', validator, getOneDog);
dogsRouter.post('/dogs', createDog);
dogsRouter.put('/dogs/:id', validator, updateDog);
dogsRouter.delete('/dogs/:id', validator, deleteDog);

// route callbacks

// if there are things in the db, this callback will be used to get the things from the db and send back to the user
function getDogs(req, res) {
  // this is CRUD -> get all items from the database
  let all = pups.get();
  // this is REST -> send those items back to the user
  res.status(200).json(all);
}

function getOneDog(req, res) {
  // this is coming from a URL, so you have to parse the string to get the number
  let id = parseInt(req.params.id);
  let item = pups.get(id);
  res.status(200).json(item);
}

function createDog(req, res) {
  let obj = req.body;
  let newItem = pups.create(obj);
  // status 201 is proper status code for creating an item (POST)
  res.status(201).json(newItem);
}

// localhost:3333/dogs/:id
function updateDog(req, res) {
  let id = parseInt(req.params.id);
  let content = req.body;
  let updated = pups.update(id, content);
  res.status(200).json(updated);
}

function deleteDog(req, res) {
  let id = parseInt(req.params.id);
  let deleted = pups.delete(id);
  // status code is 204 for deleting an item; deleted obj is now = null
  res.status(204).json({ itemDeleted: `${deleted}` });
}

module.exports = dogsRouter;
