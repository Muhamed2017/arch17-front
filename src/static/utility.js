export const checkValidity = ( value, rules ) =>{
    let isValid = true;
    if ( !rules ) {
        return true;
    }
    if ( rules.requierd ) {
        isValid = toString(value).trim() !== '' && isValid;
    }
    if ( rules.minLingth ) {
        isValid = value.length >= rules.minLingth && isValid;
    }
    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid;
    }
    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid;
    }
    if ( rules.isArray ) {
        isValid = Array.isArray(value) && value.length !== 0 && isValid;
    }
    return isValid;
}

export const updateObject = (oldObject , updatedProperties) =>{
    return{
        ...oldObject,
        ...updatedProperties
    }
}
const generateString = (length) =>{
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    }
export const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }_${generateString(10)}`;
}
