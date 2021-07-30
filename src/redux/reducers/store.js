import { createStore, applyMiddleware, compose } from 'redux'

import thunk from 'redux-thunk'
import rootReducer from './rootReducer';


export default function configureStore(initialState) {
    const composerEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(rootReducer, initialState, composerEnhancers(applyMiddleware(thunk)))
}

