import * as actions from '../constants';


const initialComponentState={
    side_mobile_menu:false
}

const componentStateReducer = (state= initialComponentState, action)=>{
    switch (action.type) {

    case actions.SET_SIDE_NAVE_MENU:
            return {
                ...state,
                side_mobile_menu: action.payload
            } 

        default:
            return state
    }


}

export default componentStateReducer;