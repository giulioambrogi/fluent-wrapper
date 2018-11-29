const {capitalise, camelize} = require('./utils/utils');
const constants = require('./utils/constants')
const logger = require('./Logger');

function buildName(specName){
    specName = specName.split('-').join(' ') 
    return capitalise(camelize(specName));
}

function buildFunctionName(specName, event){
    const formattedSpecName = buildName(specName);
    return event+formattedSpecName;
}

function generate(specs){

    let utils = {};
    specs.forEach(spec=>{

        const formattedName = buildName(spec.name);
        
        const functionName = `find`+formattedName;
        const clickFunctionName = `click`+formattedName;
        const changeFunctionName = `change`+formattedName;
        
        if(utils[functionName] != null){
            throw `Cannot create function ${functionName} because it alredy exists!`
        }
        if(spec.children != null && spec.children.length > 0){
            const foundElement = this.find(spec.selector);
            const recursive = generate.apply(foundElement,[spec.children]);
            utils[functionName] = () => Object.assign(this,{name:foundElement}, recursive)
        }else{
            utils[functionName] = () => this.find(spec.selector);
        }

        //new event API

        if(spec.simulate){
            spec.simulate.forEach(event =>{
                const functionName = buildFunctionName(spec.name, event)
                utils[functionName] = (args) => this.find(spec.selector).simulate(event,args)
            })
        }else{
            //old API
            if(spec.click){
                logger.warn(`WARNING: 'click' property will be deprecated please use 'events' property instead.`)
                utils[clickFunctionName] = () => this.find(spec.selector).simulate('click');
            }

            if(spec.change){
                logger.warn(`WARNING: 'change' property will be deprecated please use 'events' property instead.`)
                utils[changeFunctionName] = (changeArg) => this.find(spec.selector).simulate('change', changeArg);
            }
        }

        

    });
    return utils;
}

//entry point 
function fluentWrapper(wrapper, specs){
    try{
        return generate.apply(wrapper, [specs]);
    }catch(e){
        console.log(constants.red,e)
        throw e;
    }
}


module.exports = {fluentWrapper};

