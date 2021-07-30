
// import * as actions from '../constants'
// import axios from 'axios'

// export const addPostRequest = () =>{
//     return {
//         type: actions.ADD_POST_REQUEST
//     }
// }

// export const addPostSuccess = (data) =>{
//     return {
//         type : actions.ADD_POST_SUCCESS,
//         payload:data
//     }
// }

// export const addPostFailure = (error)=>{
//     return {
//         type:actions.ADD_POST_FAILUIER,
//         payload:error
//     }
// }


// export const addPostContent = (title, content)=>{
//     return (dispatch) =>{
//         dispatch(addPostRequest());
//         axios.post('https://jsonplaceholder.typicode.com/posts', {
//             title:title,
//             content:content,
//             userId: 1
//         }).then((data)=>{
//             dispatch(addPostSuccess(data.data))
//             console.log('success')
//         }).catch((error)=>{
//             dispatch(addPostFailure(error.message))
//         })
//     }   
// }