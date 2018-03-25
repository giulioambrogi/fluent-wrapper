import {fluentEnzyme} from './src/Generator'

export default function(reactWrapper, specs){
    return Object.assign(reactWrapper, fluentEnzyme(reactWrapper, specs));
}