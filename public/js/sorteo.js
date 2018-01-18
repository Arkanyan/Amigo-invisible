const express = require('express');
const router = express.Router();
const mongo = require("mongodb").MongoClient
const url = 'mongodb://localhost:27017/amigoInvisible';

var users = db.collection('users')

console.log("hola")

user.find().toArray(function(err, user) {
  console.log("user")
});