export const hasCapital = new RegExp("^(?=.*[a-z])");
export const hasLower = new RegExp("^(?=.*[A-Z])");
export const hasNumeric = new RegExp("^(?=.*[0-9])");
export const hasSpecial = new RegExp("^(?=.[!@#$%^&])|(?=.*[!@#$%^&*])");
// export const API = "https://arch17-apis.herokuapp.com/api/";
// export const API = "http://localhost:8000/api/";
export const LAPI = "http://localhost:8000/api/";
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

export const MONTHS=[
    {label:"JAN",value:'01'},
    {label:"FEB",value:'02'},
    {label:"MAR",value:'03'},
    {label:"APR",value:'04'},
    {label:"MAY",value:'05'},
    {label:"JUN",value:'06'},
    {label:"JUL",value:'07'},
    {label:"AUG",value:'08'},
    {label:"SEP",value:'09'},
    {label:"OCT",value:'10'},
    {label:"NOV",value:'11'},
    {label:"DEC",value:'12'},
]

export  const   VAT_TAX_OPTIONS=[
    {label:"Vat Tax included in the contract Value", value:"in"},
    {label:"Vat Tax not included in the contract Value", value:"not"}
]
export  const   POINVOICES_TYPES=[
    'Non Deductible / non refundable',
    'Deductible ( Deducted from sales Tax Value )',
    'Refundable ( Refundable tax credits )'
]