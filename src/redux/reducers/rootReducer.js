import  { combineReducers } from 'redux';
import { firebaseEmailPasswordReducer as regularUser } from './authReducer'
import { normalAuthenticationReducer as normalAuth } from './normalAuthReducer'
// import Project from './projectReducer';
// import user from './userReducer'

import { AddProductReducer as addProduct } from './productReducers/addProductReducer';
import optionsPrice from './OptionsPriceReducer'
// import options from './OptionsPriceReducer'
// conimport { normalAuthenticationReducer } from './normalAuthReducer';
const rootReducer = combineReducers({
    // Project,user
     regularUser, normalAuth, addProduct,
     
    //  options, 
      optionsPrice
})
export default rootReducer
