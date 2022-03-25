import * as actions from '../constants'

const addProjectInfoCreator = (info)=>{

    return {
        type:actions.ADD_PROJECT_INFO,
        payload:info
    }
}
export const addProjectInfo= (info)=>{
    return (dispatch)=>{
        dispatch(addProjectInfoCreator(info))
    }
}

const addProjectContentCreator = (content)=>{

    return {
        type:actions.ADD_PROJECT_CONTENT,
        payload:content
    }
}

export const addProjectContent= (content)=>{
    return (dispatch)=>{
        dispatch(addProjectContentCreator(content))
    }
}
const addProjectRolesCreator = (roles)=>{
    return {
        type:actions.ADD_PROJECT_ROLE,
        payload:roles
    }
}

export const addProjectRoles= (roles)=>{
    return (dispatch)=>{
        dispatch(addProjectRolesCreator(roles))
    }
}

const addProjectTagsCreator = (tags)=>{
    return {
        type:actions.ADD_PROJECT_TAGS,
        payload:tags
    }
}

export const addProjectTags= (tags)=>{
    return (dispatch)=>{
        dispatch(addProjectTagsCreator(tags))
    }
}

const addProjectCoverCreator = (cover)=>{
    return {
        type:actions.ADD_PROJECT_COVERS,
        payload:cover
    }
}

export const addProjectCover= (cover)=>{
    return (dispatch)=>{
        dispatch(addProjectCoverCreator(cover))
    }
}