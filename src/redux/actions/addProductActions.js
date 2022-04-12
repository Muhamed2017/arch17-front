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

const openProductRequest=()=>{
    return {
        type:actions.OPEN_PRODUCT_REQUEST_MODAL
    }
}

const closeProductRequest=()=>{
    return {
        type:actions.CLOSE_PRODUCT_REQUEST_MODAL
    }
}
const gotoTabStep=(step)=>{
    return {
        type:actions.GO_TO_TAB_STEP,
        payload:step
    }
}
const addOptions = (options)=>{

    return {
        type:actions.SET_OPTIONS,
        payload:options
    }
}

const addPrices = (prices)=>{

    return {
        type:actions.SET_PRICES,
        payload:prices
    }
}
const resetPrices = ()=>{

    return {
        type:actions.RESET_PRICES,
    }
}


const addModalCodes = (codes)=>{

    return {
        type:actions.SET_MODAL_CODES,
        payload:codes
    }
}
const resetModalCodes = ()=>{

    return {
        type:actions.RESET_MODAL_CODES,
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
      lighting_types,
  installations,
  colorTempratures,
  bulbTypes,
  applied_on,
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
              lighting_types,
  installations,
  colorTempratures,
  bulbTypes,
  applied_on,
            places_tags,
            is_outdoor,
            is_for_kids,
            product_file_kind
        })
        .then(response=>{
            dispatch(addProductIdentitySuccess(response.data.identity))
            console.log(response.data.identity);
            dispatch(gotoTap(1))
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
export const addProductPrices = (price)=>{
      return (dispatch)=>{
        dispatch(addPrices(price))
    }
}
export const resetProductPrices =()=>{
     return (dispatch)=>{
        dispatch(resetPrices())
    }
}
export const addProductModalCodes = (code)=>{
      return (dispatch)=>{
        dispatch(addModalCodes(code))
    }
}
export const resetProductModalCodes =()=>{
     return (dispatch)=>{
        dispatch(resetModalCodes())
    }
}



export const nextTab = () => {
    return (dispatch)=>{
        dispatch(nextTabAction())        
    }
}
export const addOptionAction=(option)=>{
    return (dispatch)=>{
        dispatch(addOptions(option))
    }
}

export const openProductRequestAction=()=>{
 return (dispatch)=>{
     dispatch(openProductRequest())
 }   
}
export const closeProductRequestAction=()=>{
 return (dispatch)=>{
     dispatch(closeProductRequest())
 }   
}

export const gotoTap = (step) => {
    return (dispatch) => {
        dispatch(gotoTabStep(step))
    }
}

const setSearchTermActionCreator = (term) => {
    return {
        type: actions.SET_SEARCH_TERM,
        payload:term
    }
}

export const setSearchTerm= (term)=>{
  return (dispatch) => {
        dispatch(setSearchTermActionCreator(term))
    }   
}

const setAllBrandsCreator = (brands) => {
    return {
        type: actions.SET_ALL_BRANDS,
        payload:brands
    }
}

export const setAllBrands= (brands)=>{
  return (dispatch) => {
        dispatch(setAllBrandsCreator(brands))
    }   
}