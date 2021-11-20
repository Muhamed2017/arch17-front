import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { connect, useDispatch } from "react-redux";
import { productIdentity } from "../../redux/actions/addProductActions";
import { useParams } from "react-router-dom";
import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import axios from "axios";
import { API } from "./../../utitlties";
import { SET_ROWS } from "../../redux/constants";
import EditIdentity from "./EditIdentity";
import OptionsPrice from "./../addProduct/OptionsPrice";
const _rows = [];

const EditProductWrapper = (props) => {
 const [tabIndex, setTabIndex] = useState(props.tabIndex);
 const [rows, setRows] = useState([]);
 const dispatch = useDispatch();
 const [loaded, setLoaded] = useState(false);
 const params = useParams();

 const setinitialRows = (rows) => {
  dispatch({
   type: SET_ROWS,
   payload: rows,
  });
 };
 useEffect(() => {
  setTabIndex(props.tabIndex);
  console.log(props);
  props.location.state.product.options.map((option, index) => {
   if (!option || loaded) return;
   return _rows.push({
    row_index: index,
    row_number: index + 1,

    ver: 0,
    size: {
     L: 1000,
     W: 1000,
     H: 1000,
    },
    material: {
     name: option.material_name,
     image: option.material_image,
     thumbnail: option.material_image,
     nameValidation: true,
     imageValidation: true,
    },
    // productPictures: [
    //  {
    //   url:
    //    "https://res.cloudinary.com/azharuniversity/image/upload/v1637114629/vljckc9udhkofvn239qv.png",
    //   cropped:
    //    "https://res.cloudinary.com/azharuniversity/image/upload/v1637114629/vljckc9udhkofvn239qv.png",
    //  },
    // ],
    offerPrice: option.offer_price ?? null,
    price: option.price ?? null,
    quantity: option.code ?? 0,
    code: option.code ?? null,
    option_id:option.id
   });
  }, []);
  setinitialRows(_rows);
  // localStorage.setItem("rows", JSON.stringify(_rows));

  if (loaded) {
   return;
  }
  axios
   .get(`${API}product/${params.id}`)
   .then((response) => {
    setRows(response.data.product.options);
    console.log(response.data.product);
    setLoaded(true);
    // return;
   })
   .catch((err) => {
    console.log(err);
    setLoaded(true);
    // return;
   });
 });

 Tabs.defaultProps = {
  selectedIndex: tabIndex,
 };
 return (
  <React.Fragment>
   <ReactNotification />
   <div id="add-product-wrapper">
    <Tabs
     OnSelect={(index) => setTabIndex(index)}
     // forceRenderTabPanel={true}
    >
     <div id="tabs-wrapper">
      <TabList>
       <Tab>1. Product Idntity </Tab>
       <Tab>2. Options & Price</Tab>
       <Tab>3. Product Description</Tab>
       <Tab>4. Files Uploads</Tab>
       <Tab>5. Product Preview</Tab>
      </TabList>
     </div>
     <TabPanel forceRender>
      <EditIdentity
       id={params.id}
       data={props.location.state.product.identity[0]}
      />
     </TabPanel>
     <TabPanel forceRender>
      <OptionsPrice
       //  id={params.id}
       id={props.location.state.product.id}
       data={props.location.state.product.options}
      />
     </TabPanel>
     {/* <TabPanel forceRender>
      <ProductFiles id={params.id} />
     </TabPanel> */}
     {/* <TabPanel>
      <UploadFiles id={params.id} forceRender />
     </TabPanel>
     <TabPanel forceRender={false}>
      <Preview id={params.id} />
     </TabPanel> */}
    </Tabs>
   </div>
  </React.Fragment>
 );
};
const mapDispatchToProps = (dispatch) => ({
 dispatchAddIdentity: (
  name,
  category,
  type,
  material,
  country,
  seats,
  shape,
  kind,
  style,
  places_tags,
  is_outdoor,
  is_for_kids,
  id
 ) =>
  dispatch(
   productIdentity(
    name,
    category,
    type,
    material,
    country,
    seats,
    shape,
    kind,
    style,
    places_tags,
    is_outdoor,
    is_for_kids,
    id
   )
  ),

 //  dispatchGotoStep: s() => dispatch(gotoTap(step)),
});

const mapStateToProps = (state) => {
 return {
  tabIndex: state.addProduct.tabIndex,
  // tabIndex: 1,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProductWrapper);
