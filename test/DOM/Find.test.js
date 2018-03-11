const  mount = require('enzyme').mount;
const React = require('react');
import Foo from '../testcomponents/Foo';
import {fluentEnzyme} from '../../src/Generator';

let ui;

const specs = [
    {   
        name : 'mainForm',
        selector: 'form.main',
        children:[
            {
                name:'confirmButton',
                click:true,
                selector:'button'
            }
        ]
    }
]


describe('When mounting a component with a form', ()=>{

    beforeEach(()=>{
        ui = fluentEnzyme(specs,mount(<Foo />));
    })

    it('Specified form can be found', ()=>{
        const form = ui.findMainForm();
        expect(form.length).toBe(1);
    })

    it('Form child can be found', ()=>{
        const form = ui.findMainForm();
        const confirmButton = form.findConfirmButton();
        expect(confirmButton.length).toBe(1);
    })
})