import {
  SET_OPTIONS,
  // SET_PRICES,
  ADD_ROW,
  SET_ROWS,
  ADD_MATERIAL,
  ADD_SIZE,
  ADD_INIT_PRICE,
  ADD_OFFER_PRICE,
  ADD_QUANTITY,
  ADD_CODE,
  DELETE_ROW,
  ADD_PRODUCT_PICTURES,
  OPTIONS_STORED,
  ADD_OPTION_ID
} from "../constants";

const defaultState = {
  // covers:JSON.parse(localStorage.getItem('covers'))??[],
  rows:[],
  optionsStored:false,

};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_ROW:
      return {
        rows: [
          ...state.rows,
          {
            row_index: state.rows.length,
            row_number: state.rows.length + 1,
            ver: 0,
            size: {
              L: null,
              W: null,
              H: null,
            },
            material: {
              image: null,
              name: "",
              thumbnail: null,
              nameValidation: false,
              imageValidation: false,
            },
            offerPrice: null,
            price: null,
            quantity: 0,
          },
        ],
      };
    
    case SET_ROWS:
        return {
          rows:action.payload
      }

    // case SET_OPTIONS:
    //       return {
    //         covers:[...state.covers, 
    //         action.payload
    //         ]
    //   }

    case ADD_MATERIAL:
      state.rows[action.row_index]["material"] = action.data;
      state.rows[action.row_index]["ver"] += 1;
      return {
        rows: state.rows,
      };
    
      case ADD_SIZE:
      state.rows[action.row_index]["size"] = action.data;
      state.rows[action.row_index]["ver"] += 1;
      return {
        rows: state.rows,
      };
    case ADD_INIT_PRICE:
      state.rows[action.row_index]["price"] = action.data.price;
      state.rows[action.row_index]["ver"] += 1;
      return {
        rows: state.rows,
      };

    case ADD_OFFER_PRICE:
      state.rows[action.row_index]["offerPrice"] = action.data.offerPrice;
      state.rows[action.row_index]["ver"] += 1;
      return {
        rows: state.rows,
      };
    case ADD_QUANTITY:
      state.rows[action.row_index]["quantity"] = action.data.quantity;
      state.rows[action.row_index]["ver"] += 1;
      return {
        rows: state.rows,
      };
    case ADD_CODE:
      state.rows[action.row_index]["code"] = action.data.code;
      state.rows[action.row_index]["ver"] += 1;
      return {
        rows: state.rows,
      };
    case DELETE_ROW:
      state.rows[action.row_index] = null // we cant remove the index because that would break the delete functionality
      return {
        rows: state.rows,
      };
    case ADD_PRODUCT_PICTURES:
      state.rows[action.row_index]["productPictures"] = action.data;
      state.rows[action.row_index]["ver"] += 1;
      return {
        rows: state.rows,
      };
    case OPTIONS_STORED:
        return {
          ...state,
          optionsStored:true
    }
    case ADD_OPTION_ID:
      state.rows[action.row_index]["option_id"] = action.data.option_id;
      state.rows[action.row_index]["ver"] += 1;
      return {
        rows: state.rows,
      }

    default:
      return state;
  }
}
