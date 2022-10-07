import * as actions from '../constants'


 const setMenuAction = (visible) => {
    return {
    type: actions.SET_SIDE_NAVE_MENU,
    payload: visible
    }
 }

export const setMenu = (visible)=>{
    return (dispatch)=>{
    dispatch(setMenuAction(visible))
}
}


// const deleteProjectRoleBrandCreator = (brand)=>{
//     return {
//         type:actions.DELETE_ROLE_BRAND,
//         payload:brand
//     }
// }

// export const deleteProjectRoleBrand= (brand)=>{
//     return (dispatch)=>{
//         dispatch(deleteProjectRoleBrandCreator(brand))
//     }
// }

