
function capitalise(string){
    return string[0].toUpperCase() + string.slice(1);
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  }
  

module.exports = {
    capitalise, camelize
}