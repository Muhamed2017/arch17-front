import  { combineReducers } from 'redux';
import {firebaseEmailPasswordReducer as regularUser} from './authReducer'
// import Project from './projectReducer';
// import user from './userReducer'

import { AddProductReducer as addProduct } from './productReducers/addProductReducer';
import optionsPrice from './OptionsPriceReducer'
import options from './OptionsPriceReducer'
const rootReducer = combineReducers({
    // Project,user
     regularUser, addProduct, options, 
      optionsPrice
})
export default rootReducer
