export const hasCapital = new RegExp("^(?=.*[a-z])");
export const hasLower = new RegExp("^(?=.*[A-Z])");
export const hasNumeric = new RegExp("^(?=.*[0-9])");
export const hasSpecial = new RegExp("^(?=.[!@#$%^&])|(?=.*[!@#$%^&*])");
// export const API = "https://arch17-apis.herokuapp.com/api/";
// export const API = "http://localhost:8000/api/";
// export const API = "https://arch17test.live/api/"
export const API = 'https://api.arch17.com/api/'

export const BRAND_TYPES= [
 'Furniture',
 'Outdoor Furniture',
 "Office Furniture" ,
 "Contract",
 "Living Furniture"  ,
 "Lighting",
 "Materials",
 "Finishes Materials",
 "Contsruction Materials",
 "Decore",
 "General Design Products"
]