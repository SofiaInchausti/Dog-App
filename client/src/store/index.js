import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducer/index'
import thunk from "redux-thunk";

//primero seteamos el store
//haciendo nuestro reducer(anda a ../reducer/index.js)
var store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
//ahora tenemos que hacer nuestra primer action!
//vamos a actions
export default store;