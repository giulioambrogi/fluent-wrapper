import {mount} from 'enzyme';
import React from 'react';
import Foo from '../testcomponents/Foo';
import WithList from '../testcomponents/WithList';
import fluentWrapper from '../../index';

let ui,  formClickSpy,buttonClickSpy;

const specs = [
    {   
        name : 'mainForm',
        selector: 'form.main',
        click:true,
        children:[
            {
                name:'confirmButton',
                click:true,
                selector:'button'
            }
        ]
    }
]


describe('When mounting a component with a clickable form', ()=>{

    beforeEach(()=>{
        formClickSpy = jest.fn(),buttonClickSpy = jest.fn();
        ui = fluentWrapper(mount(<Foo formClickSpy={formClickSpy} buttonClickSpy={buttonClickSpy}/>),specs);
    })

    it('Specified form can be clicked', ()=>{
        ui.update;
        expect(ui.clickMainForm).toBeDefined();
        ui.clickMainForm();
        expect(formClickSpy).toHaveBeenCalledTimes(1)
    })

    it('child has click function', ()=>{
        expect(ui.findMainForm().clickConfirmButton).toBeDefined();
        ui.findMainForm().clickConfirmButton();
        expect(buttonClickSpy).toHaveBeenCalledTimes(1)
        
    })

    it('child click function is not propagated to the global scope', ()=>{
        expect(ui.clickConfirmButton).not.toBeDefined();
    })

})
