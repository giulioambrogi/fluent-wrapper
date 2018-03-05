const  mount = require('enzyme').mount;
const React = require('react');
//const Foo = require('./testcomponents/Foo');
const generate =require('../src/Generator');
let ui;

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

describe('bla', ()=>{

    beforeEach(()=>{
        
    })
    it('bdon\' know', ()=>{
        const result = generate(specs);
        expect(result.findMainForm).not.toBeNull();
    })
})