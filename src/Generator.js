function generate(specs){

    let utils = {};
    specs.forEach(spec=>{

        const formattedName = capitalise(spec.name);
        
        //find by default
        if(spec.children != null && spec.children.length > 0){
            utils[`find`+formattedName] = () => Object.assign({name:this.find(spec.selector)}, generateTestUtils(spec.children))
        }else{
            //generate find
            utils[`find`+formattedName] = () => this.find(spec.selector);
        }

    });
    return utils;
}


function capitalise(string){
    return string[0].toUpperCase() + string.slice(1);
}

module.exports = generate;