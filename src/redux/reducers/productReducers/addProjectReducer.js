import {
  ADD_PROJECT_INFO,
  ADD_PROJECT_ROLE,
  ADD_PROJECT_CONTENT,
  ADD_PROJECT_TAGS,
  ADD_PROJECT_COVERS,
  NEXT_STEP,
  PREV_STEP
} from "../../constants.js";
const defaultState ={
   project_info:{},
   project_content:{},
   project_roles:{},
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

    case ADD_PROJECT_INFO:
      return {...state,
        project_info: action.payload,
        step:1
      };
    
    case ADD_PROJECT_CONTENT:
        return {
          ...state, 
          project_content:action.payload,
          step:2
      }

    case ADD_PROJECT_ROLE:
          return {
            ...state, 
            project_roles:action.payload,
            step:3
      }

        case ADD_PROJECT_TAGS:
          return {
            ...state, 
            project_tags:action.payload,
            step:4
      }
      
      case ADD_PROJECT_COVERS:
        // const covers= state.project_covers;
          return {
            ...state, 
            // project_covers:[...covers, action.payload]
            project_covers: action.payload
      }
    default:
      return state;
  }
}