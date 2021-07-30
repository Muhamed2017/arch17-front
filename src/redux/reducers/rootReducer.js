import  { combineReducers } from 'redux';
import {firebaseEmailPasswordReducer as regularUser} from './authReducer'
import { AddProductReducer as addProduct } from './productReducers/addProductReducer';
const rootReducer = combineReducers({
    regularUser, addProduct
})

export default rootReducer