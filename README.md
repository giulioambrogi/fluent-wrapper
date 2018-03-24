# FLUENT ENZYME

The purpose of this package is to generate a set of eloquent functions you will use to `find` the sub-elements of the component you are testing. 

In other words, it extends the `ReactWrapper` you get from enzyme `mount` by adding all the functions (i.e. `findConfirmButton`) looking at the specs you provide. 

With fluent-enzyme you will :
- keep all the selectors in a single place, the `specs`
- generate a set of functions that will be binded to the `ReactWrapper` you are testing.


## Example
```javascript
    import fluentEnzyme from 'fluent-enzyme'
    import {mount} from 'enzyme'
    import MyComponent from '../MyComponent'
    
    const specs = [{name: 'confirmButton',selector:'button'}]
    
    const ui = fluentEnzyme(mount(<MyComponent />), specs) //how you would normally 
    
    ui.findConfirmButton() //generated function, will return the button
```
    
 with their own selectors