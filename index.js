const {fluentWrapper} =  require('./src/Generator')

module.exports =  function(reactWrapper, specs){
    return Object.assign(reactWrapper, fluentWrapper(reactWrapper, specs));
}