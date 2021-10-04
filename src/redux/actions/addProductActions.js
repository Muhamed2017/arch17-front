import * as actions from '../constants'
import axios from 'axios'
import { API } from './../../utitlties';
const addProductIdentity = ()=>{
    return {
        type:actions.ADD_PRODUCT_IDENTITY_REQUEST
    }
}
const addProductIdentitySuccess = (identity) => {
    return {
        type: actions.ADD_PRODUCT_IDENTITY_SUCCESS,
        payload:identity
    }
}

const addProductIOptions = () => {
    return {
        type: actions.ADD_PRODUCT_OPTIONS_AND_PRICES
    }
}

const addProductIOptionsSuccess = (options) => {
    return {
        type: actions.ADD_PRODUCT_OPTIONS_AND_PRICES_SUCCESS,
        payload:options
    }
}
const addProductDescription = () => {
    return {
        type: actions.ADD_PRODUCT_DESCRIPTION
    }
}
const addProductDescriotionSuccess = (description)=>{
    return {
        type:actions.ADD_PRODUCT_DESCRIPTION_SUCCESS,
        payload:description
    }
}
const nextTabAction = () => {
    return {
        type: actions.ADD_PRODUCT_NEXT_TAB
    }
}
const gotoTabStep = (step)=>{
    return {
        type:actions.GO_TO_TAB_STEP,
        payload:step
    }
}

export const productIdentity = (name,
    category,
    type,
    material,
    country,
    seats,
    bases,
    shape,
    kind,
    style,
    places_tags,
    is_outdoor,
    is_for_kids,
    product_file_kind, id)=>{
    return (dispatch)=>{
        dispatch(addProductIdentity());
        axios.post(`${API}identity/${id}`, {
            name,
            category,
            type,
            material,
            country,
            seats,
            bases,
            shape,
            kind,
            style,
            places_tags,
            is_outdoor,
            is_for_kids,
            product_file_kind
        })
        .then(response=>{
            dispatch(addProductIdentitySuccess(response.data.identity))
            console.log(response.data.identity);
        })
        .catch(error=>{
            console.log(error)
        })
    }

}

export const productDescription = (data, id)=>{
    return (dispatch)=>{
        dispatch(addProductDescription());
        axios.post(`${API}desc/${id}`, data)
            .then(response => {
                console.log(response)
                dispatch(addProductDescriotionSuccess())
            }).catch(error => {
                console.log(error)
            })
    }
    
}
export const productOptions = (options) => {
    return (dispatch) => {
        dispatch(addProductIOptions());
        axios.post('', options)
            .then(response => {
                dispatch(addProductIOptionsSuccess())
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })
    }

  
}

export const nextTab = () => {
    return (dispatch)=>{
        dispatch(nextTabAction())        
    }
}

// export const gotoTap = (step) => {
//     return (dispatch) => {
//         dispatch(gotoTabStep(step))
//     }
// }
