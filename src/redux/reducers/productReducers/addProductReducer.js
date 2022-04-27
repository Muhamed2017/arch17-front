import * as actions from '../../constants.js'

const initialState = {
    loading:false,
    identity: null,
    options:{},
    tabIndex:0,
    optionsAdded:false,
    requesting:false,
    share_modal:false,
    searchTerm:null,
    prices:[],
    modal_codes:[],
    brands:[]
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

              case actions.GO_TO_TAB_STEP:
            return {
                ...state,
                tabIndex:action.payload
            }
            case actions.OPEN_PRODUCT_REQUEST_MODAL:
            return {
                ...state,
                requesting:true
            }
              case actions.CLOSE_PRODUCT_REQUEST_MODAL:
            return {
                ...state,
                requesting:false
            }

            case actions.OPEN_SHARE_COLLECTION_MODAL:
            return {
                ...state,
                share_modal:true
            }
              case actions.CLOSE_SHARE_COLLECTION_MODAL:
            return {
                ...state,
                share_modal:false
            }
            
            case actions.SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm:action.payload
            }

              case actions.SET_ALL_BRANDS:
            return {
                ...state,
                brands:action.payload
            }
        case actions.SET_PRICES:
           return {
             ...state, 
             prices:action.payload >0 ?[...state.prices, action.payload]:[...state.prices],

          } 
          case actions.RESET_PRICES:
           return {
             ...state, 
             prices:[],
          } 
          case actions.SET_MODAL_CODES:
           return {
             ...state, 
             modal_codes:action.payload?[...state.modal_codes, action.payload]:[...state.modal_codes],

          } 
          case actions.RESET_MODAL_CODES:
           return {
             ...state, 
             modal_codes:[],
          } 
        default:
            return state;
    }
}
