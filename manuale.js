

const specs_old = {
    confirmButton: {
        selector:'div.btn-confirm',
        find:true,
        children:{
            tooltip1:{
                find:true,
            }
        }
    },
    editButton: {
        selector:'div.btn-confirm',
        find:true,
        click: true
    }
}

const specs = [
    {   
        name : 'mainForm',
        selector: 'form.main',
        children:[
            {
                name:'confirmButton',
                click:true
            }
        ]
    }
]


function capitalise(string){
    return string[0].toUpperCase() + string.slice(1);
}

function generateTestUtils(specs){

    let utils = {};
    specs.forEach(spec=>{

        const formattedName = capitalise(spec.name);
        
        //find by default
        if(spec.children != null && spec.children.length > 0){
            utils[`find`+formattedName] = () => Object.assign({name:"thisshouldbethis.find()"}, generateTestUtils(spec.children))
        }else{
            //generate find
            utils[`find`+formattedName] = () => this.find(spec.selector);
        }

        // if(spec.click == true){
        //     //generate find
        //     utils[`find`+formattedName] = () => { el: formattedName}//this.find(spec.selector);
        //     //generate click (that uses find)
        //     utils[`click`+formattedName] = () => utils[`find`+formattedName]().simulate('click');
        // }

        // if(spec.children != null && spec.children.length > 0 ){
        //     //generate children
        //     const recursivelyGenerate = generateTestUtils.bind(utils[`find`+formattedName]);
        //     recursivelyGenerate(spec.children)
        // }

    });
    return utils;
}

const result = generateTestUtils(specs);
console.log("RESULT", result.findMainForm())
