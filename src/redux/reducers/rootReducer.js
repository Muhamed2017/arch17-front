import  { combineReducers } from 'redux';
import { firebaseEmailPasswordReducer as regularUser } from './authReducer'
import { normalAuthenticationReducer as normalAuth } from './normalAuthReducer'

import { AddProductReducer as addProduct } from './productReducers/addProductReducer';
import optionsPrice from './OptionsPriceReducer'
import mcs from './componentStateReducer'
import project from './productReducers/addProjectReducer';
const rootReducer = combineReducers({
     regularUser, normalAuth, addProduct,
     project,
     optionsPrice, 
     mcs
})
export default rootReducer
