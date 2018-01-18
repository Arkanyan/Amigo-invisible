const express = require('express');
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const url = 'mongodb://localhost:27017/amigoInvisible';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function asign(user1, user2, Users ){ 
	for (let i = user1.length - 1; i >= 0; i--) {
					Users.updateOne({"username": user1[i].username}, {$set: {"aIOf": user2[i].username, "aIOfEmail": user2[i].email, "participant": false }});
					Users.updateOne({"username": user2[i].username}, {$set: {"aI": user1[i].username }});
				}	
};

MongoClient.connect(url, function(error, database){
	var	db = database.db('amigoInvisible');
	var Users = db.collection('users');
	var cursor = Users.find({"participant": true})
	var usersArray = cursor.toArray(function(err, users){
		if (users == null) {

			return;
		} else if (users.length >= 6) {
				var shiftedUsers = []
				for(let i = users.length/2; i!==0; i--){
					let array = users.shift();
					shiftedUsers.push(array);
				};
				var sShiftedUsers = shuffle(shiftedUsers);
				var sUsers = shuffle(users);

				asign(sShiftedUsers, sUsers, Users);

				var sUsers = shuffle(users);

				asign(sUsers, sShiftedUsers, Users);

			database.close();		
		} else {
				console.log("No hay suficientes participantes, solo :", users.length);
				database.close();
				return;
		}
	});
});


