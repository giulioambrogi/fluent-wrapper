import {mount} from 'enzyme';
import React from 'react';
import Foo from '../testcomponents/Foo';
import WithList from '../testcomponents/WithList';
import fluentWrapper from '../../index';

let ui,  changeSpy;

const specs = [{
    name : 'mainForm',
    selector: 'form.main',
    simulate:['click','change', 'blur', 'focus'],
    children:[
        {
            name:'emailField',
            selector:'[name="email"]',
            simulate:['change','blur','focus']
        }
    ]
}]


describe('When mounting a component with a form', ()=>{

    beforeEach(()=>{
        changeSpy = jest.fn();
        ui = fluentWrapper(mount(<Foo changeSpy={changeSpy}/>),specs);
    })

    it('an element can be changed', ()=>{
        expect(ui.findMainForm().changeEmailField).toBeDefined();
        ui.findMainForm().changeEmailField({ target: {value:'boo'}});
        expect(changeSpy).toHaveBeenCalledTimes(1);
    })

    it('find function is defined', ()=>{
        expect(ui.findMainForm).toBeDefined();
    })
    
    {
        ['blur', 'focus', 'click','change'].forEach(ev =>{
            it(`ensure ${ev} event for main form is defined`, ()=>{
                expect(ui[ev+'MainForm']).toBeDefined()
            })
        
        })
    }

    {
        ['blur', 'focus', 'change'].forEach(ev =>{
            it(`ensure ${ev} event for email field is defined`, ()=>{
                expect(ui.findMainForm()[ev+'EmailField']).toBeDefined()
            })
        })
    }

})




