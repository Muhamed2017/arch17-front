import {
  ADD_PROJECT_INFO,
  ADD_PROJECT_ROLE,
  ADD_PROJECT_ROLE_DESIGNER,
  ADD_PROJECT_ROLE_BRAND,
  ADD_PROJECT_CONTENT,
  ADD_PROJECT_TAGS,
  ADD_PROJECT_COVER,
  DELETE_ROLE_DESIGNER,
  DELETE_ROLE_BRAND,
  NEXT_STEP,
  PREV_STEP,
  GO_TO_PROJECT_STEP,
  SET_PROJECT_PARAMS
} from "../../constants.js";
const defaultState ={
   params:null,
   project_info:{},
   project_content:null,
   project_roles:{},
   role_designers:[],
   role_brands:[],
   project_tags:[],
   project_covers:[],
   step:0
    
}
export default function projectReducer(state = defaultState, action) {
  switch (action.type) {
  
      case NEXT_STEP:
      return {...state, 
        step:state.step +=1
      };
       case PREV_STEP:
      return {
        ...state, 
        step:state.step >1 ?state.step -=1:0
      };

       case GO_TO_PROJECT_STEP:
      return {
        ...state, 
        step:action.payload
      };
  case SET_PROJECT_PARAMS:
      return {
        ...state, 
        params:action.payload
      };

    case ADD_PROJECT_INFO:
      return {...state,
        project_info: action.payload,
        step:1
      };
    
    case ADD_PROJECT_CONTENT:
        return {
          ...state, 
          project_content:action.payload,
          // step:2
      }

    case ADD_PROJECT_ROLE:
          return {
            ...state, 
            project_roles:action.payload,
            step:3
      }

      case ADD_PROJECT_ROLE_DESIGNER:
          return {
            ...state,
            role_designers:[...state.role_designers, action.payload] 
      }
         case ADD_PROJECT_ROLE_BRAND:
          return {
            ...state, 
            role_brands:[...state.role_brands, action.payload] ,
      }
       case DELETE_ROLE_DESIGNER:
          return {
            ...state, 
            role_designers:state.role_designers.filter((d)=>{
              return d.id!==action.payload.id
            }) ,
      }
      case DELETE_ROLE_BRAND:
          return {
            ...state, 
            role_brands:state.role_brands.filter((b)=>{
              return b.id!==action.payload.id
            }) 
      }
        case ADD_PROJECT_TAGS:
          return {
            ...state, 
            project_tags:action.payload,
            step:4
      }
      
      case ADD_PROJECT_COVER:
          return {
            ...state, 
            project_covers: [...state.project_covers, action.payload]
      }
    default:
      return state;
  }
}