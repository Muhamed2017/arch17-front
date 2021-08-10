import * as actions from '../constants'
import axios from 'axios'
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
    shape,
    kind,
    style,
    places_tags,
    is_outdoor,
    is_for_kids,
    product_file_kind)=>{
    return (dispatch)=>{
        dispatch(addProductIdentity());
        axios.post('http://127.0.0.1:8000/api/identity/1"', {
            name,
            category,
            type,
            material,
            country,
            seats,
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
