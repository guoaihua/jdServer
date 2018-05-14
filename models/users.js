var mongoose = require('mongoose');
var Users = require('../schemas/users');

mongoose.model('Users',Users);