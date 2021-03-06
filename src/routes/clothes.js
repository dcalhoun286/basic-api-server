'use strict';

const express = require('express');
const Clothes = require('../models/clothesModel.js');
const validator = require('../middleware/validator.js');
// here, we instantiate the new clothes model
const clothing = new Clothes();

const clothesRouter = express.Router();

// routes

clothesRouter.get('/clothes', getClothes);
clothesRouter.get('/clothes/:id', validator, getOneClothingItem);
clothesRouter.post('/clothes', createClothingItem);
clothesRouter.put('/clothes/:id', validator, updateClothingItem);
clothesRouter.delete('/clothes/:id', validator, deleteClothingItem);

// if there are things in the db, this callback will be used to get the thing from the db and send back to the user
function getClothes(req, res) {
  // this is CRUD -> get all items from the database
  let all = clothing.get();
  // this is REST -> send those items back to the user
  res.status(200).json(all);
}

function getOneClothingItem(req, res) {
// this is coming from a URL, so you have to parse the string to get the number
  let id = parseInt(req.params.id);
  let item = clothing.get(id);
  res.status(200).json(item);
}

function createClothingItem(req, res) {
  let obj = req.body;
  let newItem = clothing.create(obj);
  // status 201 is proper status code for creating an item (POST)
  res.status(201).json(newItem);
}

function updateClothingItem(req, res) {
  let id = parseInt(req.params.id);
  let content = req.body;
  let updated = clothing.update(id, content);
  res.status(200).json(updated);
}

function deleteClothingItem(req, res) {
  let id = parseInt(req.params.id);
  let deleted = clothing.delete(id);
  // status code is 204 for deleting an item; deleted obj is now = null
  res.status(204).send(`ITEM DELETED: ${deleted}`);
}

module.exports = clothesRouter;
