const  mount = require('enzyme').mount;
const React = require('react');
import Foo from '../testcomponents/Foo';
import WithList from '../testcomponents/WithList';
import fluentEnzyme from '../../index';

let ui,  changeSpy;

const specs = [
    {   
        name : 'mainForm',
        selector: 'form.main',
        click:true,
        change:true,
        children:[
            {
                name:'emailField',
                click:true,
                change:true,
                selector:'[name="email"]'
            }
        ]
    }
]


describe('When mounting a component with a clickable form', ()=>{

    beforeEach(()=>{
        changeSpy = jest.fn();
        ui = fluentEnzyme(mount(<Foo changeSpy={changeSpy}/>),specs);
    })

    it('an element can be changed', ()=>{
        expect(ui.findMainForm().changeEmailField).toBeDefined();
        ui.findMainForm().changeEmailField({ target: {value:'boo'}});
        expect(changeSpy).toHaveBeenCalledTimes(1);
    })

})
