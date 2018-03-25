const  mount = require('enzyme').mount;
const React = require('react');
import Foo from '../testcomponents/Foo';
import Toast from '../testcomponents/Toast';
import WithList from '../testcomponents/WithList';
import fluentEnzyme from '../../index';

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
    },
    {
        name:'toastMessage',
        selector:Toast
    }
]



describe('When mounting a component with a form', ()=>{

    beforeEach(()=>{
        ui = fluentEnzyme(mount(<Foo><Toast message="a message" /></Foo>), specs);
    })

    it('Specified form can be found', ()=>{
        const form = ui.findMainForm();
        expect(form.length).toBe(1);
    })

    it('Specified element using React component selector can be found', ()=>{
        const toast = ui.findToastMessage();
        expect(toast.length).toBe(1);
    })

    it('Form child can be found', ()=>{
        const form = ui.findMainForm();
        const confirmButton = form.findConfirmButton();
        expect(confirmButton.length).toBe(1);
    })
})


describe('When looking a list of elements', () => {

    beforeEach(()=>{
        ui = fluentEnzyme(mount(<WithList />), [{ name:'myElement', selector:'.something'}]);
    })

    it('an array is received', () => {
       const result = ui.findMyElement();
       expect(result.length).toBe(3);
    })

    it('each element is an enzyme wrapper', () => {
        const result = ui.findMyElement();
        expect(result.at(0).text()).toBe("Hello");
    })

})