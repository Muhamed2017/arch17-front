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
const setProjectTypeSearchCreator = (type)=>{

    return {
        type:actions.SET_PROJECT_TYPE_SEARCH,
        payload:type
    }
}
export const setProjectTypeSearch= (lighting_bulbTypes)=>{
    return (dispatch)=>{
        dispatch(setProjectTypeSearchCreator(lighting_bulbTypes))
    }
}
// SET_PROJECT_TYPE_SEARCH
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
        type:actions.ADD_PROJECT_COVER,
        payload:cover
    }
}

export const addProjectCover= (cover)=>{
    return (dispatch)=>{
        dispatch(addProjectCoverCreator(cover))
    }
}

const goToProjectStepCreator = (step)=>{
    return {
        type:actions.GO_TO_PROJECT_STEP,
        payload:step
    }
}

export const goToProjectStep= (step)=>{
    return (dispatch)=>{
        dispatch(goToProjectStepCreator(step))
    }
}

const addProjectRoleDesignerCreator = (designer)=>{
    return {
        type:actions.ADD_PROJECT_ROLE_DESIGNER,
        payload:designer
    }
}

const addProjectRoleCompanyCreator = (company)=>{
    return {
        type:actions.ADD_PROJECT_ROLE_COMPANY,
        payload:company
    }
}
export const addProjectRoleDesigner= (designer)=>{
    return (dispatch)=>{
        dispatch(addProjectRoleDesignerCreator(designer))
    }
}
export const addProjectRoleCompany= (company)=>{
    return (dispatch)=>{
        dispatch(addProjectRoleCompanyCreator(company))
    }
}
const addProjectRoleBrandCreator = (brand)=>{
    return {
        type:actions.ADD_PROJECT_ROLE_BRAND,
        payload:brand
    }
}

export const addProjectRoleBrand= (brand)=>{
    return (dispatch)=>{
        dispatch(addProjectRoleBrandCreator(brand))
    }
}

const deleteProjectRoleBrandCreator = (brand)=>{
    return {
        type:actions.DELETE_ROLE_BRAND,
        payload:brand
    }
}

export const deleteProjectRoleBrand= (brand)=>{
    return (dispatch)=>{
        dispatch(deleteProjectRoleBrandCreator(brand))
    }
}

const deleteProjectRoleDesignerCreator = (designer)=>{
    return {
        type:actions.DELETE_ROLE_DESIGNER,
        payload:designer
    }
}

export const deleteProjectRoleDesigner= (designer)=>{
    return (dispatch)=>{
        dispatch(deleteProjectRoleDesignerCreator(designer))
    }
}

const deleteProjectRoleCompanyCreator = (company)=>{
    return {
        type:actions.DELETE_ROLE_COMPANY,
        payload:company
    }
}
export const deleteProjectRoleCompany= (company)=>{
    return (dispatch)=>{
        dispatch(deleteProjectRoleCompanyCreator(company))
    }
}
const editProjectCreator = (project)=>{
    return {
        type:actions.SET_INTITIAL_PROJECT_FOR_EDIT,
        payload:project
    }
}

export const editProject= (project)=>{
    return (dispatch)=>{
        dispatch(editProjectCreator(project))
    }
}