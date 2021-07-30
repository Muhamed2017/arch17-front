import * as actions from '../../constants.js'


const initialState = {
    loading:false,
    identity:{},
    options:{},
    tabIndex:0
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
                LoadingSpinner: true
            }
        default:
            return state;
    }
}
