import {mount} from 'enzyme'
import React from 'react';
import Foo from '../testcomponents/Foo';
import {fluentEnzyme} from '../../src/Generator';

let result; 

describe('When specs contain duplicate element names', () => {


    it('related find function is generated', () => {
        const specs = [{   
            name : 'element 1',
            selector: '.btn'
        },{   
            name : 'element 1',
            selector: '.btn.default'
        }]
        expect(()=>fluentEnzyme(mount(<Foo />),specs)).toThrow('Cannot create function findElement 1 because it alredy exists!');
    })
})



