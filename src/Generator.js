import {capitalise} from './utils/utils'
function generate(specs){

    let utils = {};
    specs.forEach(spec=>{

        const formattedName = capitalise(spec.name);
        
        
        if(spec.children != null && spec.children.length > 0){
            const foundElement = this.find(spec.selector);
            const recursive = generate.apply(foundElement,[spec.children]);
            utils[`find`+formattedName] = () => Object.assign(this,{name:foundElement}, recursive)
        }else{
            //generate find
            utils[`find`+formattedName] = () => this.find(spec.selector);
        }

    });
    return utils;
}


//entry point 
function fluentEnzyme(specs, wrapper){
    return generate.apply(wrapper, [specs]);
}



module.exports = {fluentEnzyme};

