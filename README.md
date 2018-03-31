
# fluent-wrapper

Extends the `ReactWrapper` you get when you mount/shallow a component with Enzyme with a set of functions that let you find/click/change/etc elements in a fluent way. 

![fluent-wrapper demo](http://giulioambrogi.com/img/fluentWrapper.gif)


Currently supported events:
* find
* click
* change 
* focus
* blur
* and all the events provided by enzyme's `simulate`

## Why fluent-wrapper? 
- **maintainability:** keep all the selectors in a single place, the `specs`, so you don't mix this mapping with the test logic.
    ```javascript
    const specs = [{
        name:'mainForm', 
        selector:'form.main',
        children:[
            {name:'email', selector:'input[name="email"]'}
        ]},
    ]
    ```
-  make your tests **fluent**
    ```javascript 
    ui.findMainForm().changeEmail('new@value.com')
    ```

## Get started

`npm install -D fluent-wrapper`

`import fluentWrapper from 'fluent-wrapper'`


```javascript

    //example of a spec
    const specs = [{name:'randomElement', selector:'p']; 
    
    //pass mounted component and specs to fluentWrapper
    const wrapper = fluentWrapper(mount(<YourComponent whatever={true} />, specs);
    
    //find your element
    const myElement = wrapper.findRandomElement(); // ReactWrapper 
    
```

## API
Properties of a `spec`.

| Property      | Mandatory     | Type    | Description |
| :------------- | :------- | :-------------- | :--------- |
| `name`     | yes | string | unique name you want the element to have. [See here](#nameconversion) how `name` is used in generated functions. |
| `selector`    | yes      |   css selector or `React` element |It's the same selector you would pass to enzyme|
| `events` | no | list of strings| All the events you want to *simulate*. I.e. `events=['click', 'blur']` for *confirmButton* will generate `clickConfirmButton` and `blurConfirmButton`. You can pass any event supported by [enzyme's `simulate`](http://airbnb.io/enzyme/docs/api/).
| `children` | no | array of specs | You can nest fluent functions, see [Example 3](Spec-name-conversion).|
| `click` (will be deprecated) | no (default=`false`)     |   boolean | If enabled it generates the click event (i.e. `wrapper.clickConfirmButton()`)| 
| `change`  (will be deprecated)| no (default=`false`) |   boolean |  If enabled generates the change function (i.e. `wrapper.changeEmailInput(arg)`). You can pass whatever you would pass to enzyme's `simulate('change')` function.| 


## Spec name conversion
The name is converted to a camel case name and composed with the generated function. 
See examples below:

| Spec name | Generated functions |
| :------- | :------- |
| mybutton | findMybutton, clickMybutton, etc. |
| Mybutton | findMybutton, clickMybutton, etc. |
| my button | findMybutton, clickMybutton, etc. |
| my Button | findMyButton, clickMyButton, etc. |
| my-button | findMyButton, clickMyButton, etc. |

## Example1: simple find
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
    
    const specs = [{name: 'confirmButton',selector:'button', events:['click']}]
    
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
    
    const specs = [{name: 'username',selector:'input[name="user"]', events:['change']}]
    
    const wrapper = fluentWrapper(mount(<MyComponent />), specs) 
    
    // The wrapper you get from "mount" has now been extended!
    
    wrapper.changeUsername({target:{value:'elisa'}}) 
```

## Example 5: multiple events and child elements

```javascript
    import fluentWrapper from 'fluent-wrapper';
    import {mount} from 'enzyme';
    import MyComponent from '../MyComponent'
    
    const specs = [{
        name: 'myForm',
        selector:'form', 
        events: ['focus'],
        children:[{
            name: 'emailField', 
            selector:'[name="email"]', 
            events['change','blur','focus']
        }],
    }]
    
    const wrapper = fluentWrapper(mount(<MyComponent />), specs) 
    
    wrapper.focusMyForm();
    const form = wrapper.findMyForm();
    form.focusEmailField();
    form.changeEmailField('me@giulioambrogi.com');
    form.blurEmailField();
    
```
## More examples
If you want to see more examples have a look at the `test` folder