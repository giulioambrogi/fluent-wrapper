import {capitalise} from './utils/utils'
function generate(specs){

    let utils = {};
    specs.forEach(spec=>{

        const formattedName = capitalise(spec.name);
        
        const functionName = `find`+formattedName;
        
        if(utils[functionName] != null){
            throw `Cannot create function ${functionName} because it alredy exists!`
        }
        if(spec.children != null && spec.children.length > 0){
            const foundElement = this.find(spec.selector);
            const recursive = generate.apply(foundElement,[spec.children]);
            // if()
            utils[functionName] = () => Object.assign(this,{name:foundElement}, recursive)
        }else{
            utils[functionName] = () => this.find(spec.selector);
        }

    });
    return utils;
}

//entry point 
function fluentEnzyme(specs, wrapper){
    return generate.apply(wrapper, [specs]);
}


module.exports = {fluentEnzyme};

