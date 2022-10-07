import * as actions from '../constants'
import axios from 'axios'
import { API } from './../../utitlties';
// import { dispatch } from 'react-hot-toast/dist/core/store';
// import { getBrandData } from './dataActions';
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
const addProductDescription = (description) => {
    return {
        type: actions.ADD_PRODUCT_DESCRIPTION,
        payload:description
    }
}

const addProductFiles = (files) => {
    return {
        type: actions.ADD_PRODUCT_FILES,
        payload:files
    }
}
// const addProductDescriotionSuccess = (description)=>{
//     return {
//         type:actions.ADD_PRODUCT_DESCRIPTION_SUCCESS,
//         payload:description
//     }
// }
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
const saveOpts = (options)=>{

    return {
        type:actions.SAVE_OPTIONS,
        payload:options
    }
}
const resetAddProductAction = ()=>{
    return {
        type:actions.RESET_ADD_PRODUCT,
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
    product_file_kind, id,
    // collections, designers
    )=>{
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
            product_file_kind,
    // collections, designers

        })
        .then(response=>{
            dispatch(addProductIdentitySuccess(response.data.identity))

            localStorage.setItem('identity' ,JSON.stringify(response.data.identity))
            console.log(response.data.identity);
            dispatch(gotoTap(1))
            localStorage.setItem("tabIndex" ,1)

        })
        .catch(error=>{
            console.log(error)
        })
    }

}
export const collectionsAndDesigners = (data)=>{
    localStorage.setItem('coldes', JSON.stringify(data))
return (dispatch =>{
    dispatch(setCollectionsAndDesigners(data))
})
}
const setCollectionsAndDesigners = (data)=>{
      return {
        type: actions.SET_COLLECTIONS_AND_DESIGNERS,
        payload:data
    }
}

export const productDescription = (desc)=>{
    
    localStorage.setItem('description', JSON.stringify(desc))
    return (dispatch)=>{
        dispatch(addProductDescription(desc));

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

export const productFiles = (files)=>{
    
    localStorage.setItem('files', JSON.stringify(files))
    return (dispatch)=>{
        dispatch(addProductFiles(files));
    }
}

export const saveOptions = (options)=>{
      return (dispatch)=>{
        dispatch(saveOpts(options))
        localStorage.setItem('options', JSON.stringify(options))
}}
export const resetAddProduct = ()=>{
    localStorage.removeItem('identity')
    localStorage.removeItem('options')
    localStorage.removeItem('files')
    localStorage.removeItem('description')
    localStorage.removeItem('covers')
    localStorage.removeItem('coldes')
    localStorage.setItem('tabIndex', 0)
      return (dispatch)=>{
        dispatch(resetAddProductAction())
        // localStorage.setItem('options', JSON.stringify(options))
}}
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
    localStorage.setItem("tabIndex" ,JSON.stringify(step))
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