import * as actions from '../../constants.js'

const initialState = {
    loading:false,
    identity:{},
    options:{},
    tabIndex:0,
    optionsAdded:false
}

export const AddProductReducer = (state= initialState, action)=>{
    switch (action.type) {
        case actions.ADD_PRODUCT_IDENTITY_REQUEST:
            return {
             ...state,
             loading:true, 
            }
        case actions.ADD_PRODUCT_IDENTITY_SUCCESS:
            return {
                ...state,
                loading: false,
                identity:action.payload,
                tabIndex:1
            }
        case actions.ADD_PRODUCT_DESCRIPTION:
            return {
                ...state,
                addingProduct: true,
                currentStep: "description",
                nextStep: "fileUploads",
                loading: true                
            }
        case actions.ADD_PRODUCT_DESCRIPTION_SUCCESS:
            return {
                ...state,
                addingProduct: true,
                loading: false,
                tabIndex:3
            }
        case actions.ADD_PRODUCT_NEXT_TAB:
            return {
                ...state,
                tabIndex:state.tabIndex + 1
            }
        default:
            return state;
    }
}
