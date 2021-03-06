'use strict';

// const { parse } = require("dotenv/types");

// // in-memory database model
// // this model is meant to be dynamic, meaning it can "get, create, update, delete" any type of resource

class DogsModel {
  constructor() {
    this.id = 0;
    this.barks = true;
    this.legs = 4;
    this.db = [];
  }

  // READ -> will work for returning all items in our db or a specific item
  get(id) {
    if (id) {
      return this.db.find(record => record.id === id);
    } else {
      return this.db;
    }
  }

  // CREATE
  create(obj) {
    let record = {
      id: ++this.id,
      record: obj,
    };

    this.db.push(record);
    // the record we've added to the db array
    return record;
  }

  // UPDATE -> placeholder for "real" update
  update(id, obj) {
    // once we've updated, we'll return the obj we updated it with
    // let id = parseInt(req.params.id);
    if (id) {
      return obj;
    }
  }

  // DELETE -> placeholder for "real" delete
  delete(id) {
    if (id) {
      return null;
    }
  }
}

module.exports = DogsModel;
