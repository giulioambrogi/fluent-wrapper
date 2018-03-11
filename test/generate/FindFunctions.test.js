// const  mount = require('enzyme').mount;
// const React = require('react');
// import Foo from '../testcomponents/Foo';
import {fluentEnzyme} from '../../src/Generator';

let result; 

describe('when spec contains element at root level', () => {

    beforeEach(()=>{
        const specs = [{   
            name : 'mainForm',
            selector: 'form.main'
        }]
        result = fluentEnzyme(specs);
        
    })

    it('related find function is generated', () => {
        expect(result.findMainForm).not.toBe(null);
        expect(typeof(result.findMainForm)).toBe('function');
    })

    describe('and that element contains a child', ()=>{
        beforeEach(()=>{
            const specs = [{   
                name : 'mainForm',
                selector: 'form.main',
                children:[ {name:'confirmButton', selector:'button'}]
            }]
            result = fluentEnzyme(specs);
        })

        it('Child can be retrieve', ()=>{

            const mainForm = result.findMainForm();
            expect(mainForm.findConfirmButton).not.toBe(null);
            expect(typeof(mainForm.findConfirmButton)).toBe('function');
        })
    })

})