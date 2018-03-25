import {mount} from 'enzyme'
import React from 'react';
import Foo from '../testcomponents/Foo';
import {fluentWrapper} from '../../src/Generator';

let result; 


const cases = [ {name: 'mainMenu', expected:'MainMenu'},
{name: 'main menu', expected:'MainMenu'},
{name: 'main menu blue', expected:'MainMenuBlue'},
{name: 'main-menu', expected:'MainMenu'},];



describe('Element name', () => {

    cases.forEach(c=>{

        it(`Find function for "${c.name}" should be rendered as "find${c.expected}"`, ()=>{
            const ui = fluentWrapper(mount(<Foo />), [{name:c.name, selector:'.foo'}]);
            expect(ui[`find${c.expected}`]).toBeDefined()
        })
    })
})



