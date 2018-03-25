const {capitalise, camelize} = require('./utils/utils');

function buildName(specName){
    specName = specName.split('-').join(' ') 
    return capitalise(camelize(specName));
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

        if(spec.click){
            utils[clickFunctionName] = () => this.find(spec.selector).simulate('click');
        }

        if(spec.change){
            utils[changeFunctionName] = (changeArg) => this.find(spec.selector).simulate('change', changeArg);
        }

    });
    return utils;
}

//entry point 
function fluentWrapper(wrapper, specs){
    return generate.apply(wrapper, [specs]);
}


module.exports = {fluentWrapper};

