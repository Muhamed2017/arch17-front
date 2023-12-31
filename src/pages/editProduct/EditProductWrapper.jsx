import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { connect, useDispatch } from "react-redux";
import {
 productIdentity,
 gotoTap,
} from "../../redux/actions/addProductActions";
import { useParams } from "react-router-dom";
import "react-notifications-component/dist/theme.css";
import axios from "axios";
import { API } from "./../../utitlties";
import { SET_ROWS } from "../../redux/constants";
import EditIdentity from "./EditIdentity";
import Preview from "./../addProduct/Preview";
import OptionsStep from "./../addProduct/OptionsStep";
import ProductFiles from "./../addProduct/ProductFiles";
import FilesUpload from "./../addProduct/FilesUpload";
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
   if (loaded) return;

   return _rows.push({
    key: index,
    option_id: option.id,
    covers: option.covers,
    code: option.code,
    material: option.material_name,
    price: option.price,
    offer_price: option.offer_price,
    quantity: option.quantity,
    size: option.size,
   });
  });
  setinitialRows(_rows);
  if (loaded) {
   return;
  }
  axios
   .get(`${API}product/${params.id}`)
   .then((response) => {
    setRows(response.data?.product?.options);
    console.log(response.data.product);
    setLoaded(true);
   })
   .catch((err) => {
    console.log(err);
    setLoaded(true);
   });
 });

 Tabs.defaultProps = {
  selectedIndex: tabIndex,
 };
 return (
  <React.Fragment>
   <div id="add-product-wrapper">
    <Tabs OnSelect={(index) => setTabIndex(index)}>
     <div id="tabs-wrapper">
      <TabList>
       <Tab
        onClick={() => {
         props.dispatchMoveToTab(0);
        }}
       >
        1. Product Idntity{" "}
       </Tab>
       <Tab
        onClick={() => {
         props.dispatchMoveToTab(1);
        }}
       >
        2. Options & Price
       </Tab>
       <Tab
        onClick={() => {
         props.dispatchMoveToTab(2);
        }}
       >
        3. Product Description
       </Tab>
       <Tab
        onClick={() => {
         props.dispatchMoveToTab(3);
        }}
       >
        4. Files Uploads
       </Tab>
       <Tab
        onClick={() => {
        }}
       >
        5. Product Cover
       </Tab>
      </TabList>
     </div>
     <TabPanel forceRender>
      <EditIdentity
       id={params.id}
       data={props?.location?.state?.product?.identity[0]}
       selected_companies={props?.location?.state?.product?.companies}
       collections={props?.location?.state?.product?.store?.collections}
       store={props?.location?.state?.product?.store}
       store2={props.location?.state?.product}
       category={props?.location?.state?.category}
       selected_designers={props?.location?.state?.product?.designers}
       selected_collections={props.location.state?.selected_collections ?? []}
      />
     </TabPanel>
     <TabPanel forceRender>
      <OptionsStep
       id={props?.location?.state?.product?.id}
       rows={props?.location?.state?.product?.options}
       edit={true}
      />
     </TabPanel>
     <TabPanel forceRender>
      <ProductFiles
       id={params.id}
       edit={true}
       galleries={props?.location?.state?.product?.gallery}
       description={props?.location?.state?.product?.description[0]}
      />
     </TabPanel>
     <TabPanel forceRender={false}>
      <FilesUpload
       id={params.id}
       files={props?.location?.state?.product?.files}
      />
     </TabPanel>
     <TabPanel forceRender={false}>
      <Preview
       id={params.id}
       initialDisplayName={props?.location?.state?.product?.identity[0].name}
       initialPreviewCover={
        props?.location.state?.product?.identity[0].preview_cover
       }
       initialDisplayPrice={
        props?.location.state?.product?.identity[0].preview_price
       }
       covers={props?.location?.state?.product?.options}
       edit={true}
      />
     </TabPanel>
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

 dispatchMoveToTab: (step) => dispatch(gotoTap(step)),
});

const mapStateToProps = (state) => {
 return {
  tabIndex: state.addProduct.tabIndex,
  identity: state.addProduct.identity,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProductWrapper);
