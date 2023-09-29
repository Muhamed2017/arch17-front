import * as actions from '../../constants.js'

const initialState = {
    loading:false,
    identity: JSON.parse(localStorage.getItem('identity'))?? null,
    // options:[],
    options:JSON.parse(localStorage.getItem('options'))?? 
        [
        {
         key: 0,
         code: null,
         covers: [],
         size: {
          l: null,
          h: null,
          w: null,
         },
         price: null,
         offer_price: "",
         material: {
          name: null,
          image: null,
         },
         quantity: null,
         option_id: null,
        },
       ],  
    description: JSON.parse(localStorage.getItem('description'))??{},
    files :JSON.parse(localStorage.getItem('files'))??[],
    // tabIndex:0,
    tabIndex: JSON.parse(localStorage.getItem('tabIndex'))?? 0,
    optionsAdded:false,
  covers:JSON.parse(localStorage.getItem('covers'))??[],
    requesting:false,
    share_modal:false,
    creator_name:"",
    searchTerm:null,
    prices:[],
    modal_codes:[],
    brands:[],
    selected_collections: JSON.parse(localStorage.getItem('coldes'))?.collections ?? [],
    selected_designers:JSON.parse(localStorage.getItem('coldes'))?.designers ?? []
}
// const product = JSON.parse(localStorage.getItem("addproduct")) ?? initialState;

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
             case actions.SAVE_OPTIONS:
            return {
                ...state,
                options:action.payload,
                tabIndex:2
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
             case actions.SET_OPTIONS:
          return {
            ...state,
            covers:[...state.covers, 
            action.payload
            ]
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
               case actions.RESET_ADD_PRODUCT:
            return {
                ...state,
                tabIndex:0,
                options:[
                    {
         key: 0,
         code: null,
         covers: [],
         size: {
          l: null,
          h: null,
          w: null,
         },
         price: null,
         offer_price: "",
         material: {
          name: null,
          image: null,
         },
         quantity: null,
         option_id: null,
        },
                ],
                files:[],
                identity:null,
                description:{},
                selected_collections:[],
                selected_designers:[],
                covers:[]
            }
            case actions.SET_COLLECTIONS_AND_DESIGNERS:
                return {
                    ...state,
                    selected_collections:action.payload.collections,
                    selected_designers:action.payload.designers
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
                share_modal:true,
                creator_name:action.payload
            }
              case actions.CLOSE_SHARE_COLLECTION_MODAL:
            return {
                ...state,
                share_modal:false,
                creator_name:""

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
