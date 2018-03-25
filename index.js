import {fluentWrapper} from './src/Generator'

export default function(reactWrapper, specs){
    return Object.assign(reactWrapper, fluentWrapper(reactWrapper, specs));
}