# fluent-wrapper

The purpose of this package is to extend the `ReactWrapper` you get when you mount/shallow a component with Enzyme with a set of functions that let you find/click/change/etc elements in a fluent way. 

> For example you can specify an element called **confirmButton** and `fluent-wrapper` will add a `findConfirmButton` to the wrapper.

Currently supported events:
* find
* click
* change 

## Why fluent-wrapper? 
- **maintainability:** keep all the selectors in a single place, the `specs`, so you don't mix this mapping with the test logic.
    ```javascript
    const specs = [{name:'confirmButton', selector:'.btn.confirm'},
    {name:'email', selector:'input[name="email"]'}]
    ```
-  make your tests **fluent**
    ```javascript 
    ui.findMainForm().changeEmail('new@value.com')
    ```
## GET STARTED
`npm install fluent-wrapper`

```javascript
    //in your test
    import fluentWrapper from 'fluent-wrapper'
    
    const specs = [{name:'randomElement', selector:'div']; //example
    
    const wrapper = fluentWrapper(mount(<YourComponent whatever={true} />, specs);
    
```

## `specs`' properties

| Property      | Mandatory     | Type  | Description |
| ------------- |:-------------:| -----:|-----:|
| `name`     | yes | string ||
| `selector`    | yes      |   css selector or `React` element ||
| `click` | no (default=`false`)     |   boolean | | 
| `change` | no (default=`false`) |   boolean |  If enabled generates the change function (i.e. `wrapper.changeEmailInput(arg)`). You can pass whatever you would pass to enzyme's `simulate('change')` function.| 
| `children` | no | array of specs | You can nest fluent functions, see Example 3.


## Example1: find
```javascript
    import fluentWrapper from 'fluent-wrapper'
    import {mount} from 'enzyme'
    import MyComponent from '../MyComponent'
    import AnotherComponent from '../AnotherComponent'
    
    const specs = [{name: 'confirmButton',selector:'button'}, {name: 'another', selector: AnotherComponent}]
    
    const wrapper = fluentWrapper(mount(<MyComponent />), specs) 
    
    // The wrapper you get from "mount" has now been extended!
    
    wrapper.findConfirmButton() //returns confirm button's react wrapper
    wrapper.findAnotherComponent() //returns AnotherComponent's react wrapper
```

## Example 2: click
```javascript
    import fluentWrapper from 'fluent-wrapper'
    import {mount} from 'enzyme'
    import MyComponent from '../MyComponent'
    
    const specs = [{name: 'confirmButton',selector:'button', click:true}]
    
    const wrapper = fluentWrapper(mount(<MyComponent />), specs) 
    
    // The wrapper you get from "mount" has now been extended!
    
    wrapper.clickConfirmButton() //generated function will return the button
```
    
## Example 3: element with children 

```javascript
    import fluentWrapper from 'fluent-wrapper'
    import {mount} from 'enzyme'
    import MyComponent from '../MyComponent'
    
    const specs = [{
        name: 'myForm',
        selector:'form', 
        children:[{name: 'emailField', selector:'[name="email"]'}]
    }]
    
    const wrapper = fluentWrapper(mount(<MyComponent />), specs) 
    
    const foundField = wrapper.findMyForm().findEmailField();

    //NOTE: findEmailField is avaiable only on the return value of findMyForm()
    
```


## Example 4: change
```javascript
    import fluentWrapper from 'fluent-wrapper'
    import {mount} from 'enzyme'
    import MyComponent from '../MyComponent'
    
    const specs = [{name: 'username',selector:'input[name="user"]', change:true}]
    
    const wrapper = fluentWrapper(mount(<MyComponent />), specs) 
    
    // The wrapper you get from "mount" has now been extended!
    
    wrapper.changeUsername({target:{value:'elisa'}}) 
```


## More examples
If you want to see more examples have a look at the `test` folder