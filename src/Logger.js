
const constants = require('./utils/constants');

function warn(message){
    console.log(constants.yellow, message)
}

function error(message){
    console.log(constants.red, message);
}

function success(message){
    console.log(constants.green, message);
}


module.exports = {warn, error, success}