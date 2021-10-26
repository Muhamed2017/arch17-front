import * as actions from '../constants'
import axios from 'axios'
import { toast, Flip, Bounce } from 'react-toastify';


export const getBrandData = (data) => ({
    type: actions.GET_BRAND_DATA,
    payload:data
})

