import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import ProductFiles from "./ProductFiles";
import { connect } from "react-redux";
import {
 productIdentity,
 gotoTap,
} from "../../redux/actions/addProductActions";
import FilesUpload from "./FilesUpload";
import { useParams } from "react-router-dom";
import "react-notifications-component/dist/theme.css";
import Preview from "./Preview";
import OptionsStep from "../addProduct/OptionsStep";
import axios from "axios";
import { API } from "./../../utitlties";
import IdentityStep from "./IdentityStep";
const AddProductWrapper = (props) => {
 const [tabIndex, setTabIndex] = useState(props.tabIndex);
 const [rows, setRows] = useState([]);
 const [loaded, setLoaded] = useState(false);
 const [collections, setCollections] = useState([]);
 const [store, setStore] = useState([]);
 const params = useParams();

 useEffect(() => {
  setTabIndex(props.tabIndex);
  if (loaded) {
   return;
  }
  axios
   .get(`${API}product/${params.id}`)
   .then((response) => {
    setRows(response.data.product.options);
    console.log(response.data.product);
    setCollections(response.data.product?.store?.collections);
    setStore(response.data.product.stores);
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
  selectedIndex: props.tabIndex,
 };

 return (
  <React.Fragment>
   <div id="add-product-wrapper">
    <Tabs>
     <div id="tabs-wrapper">
      <TabList>
       <Tab onClick={() => props.dispatchMoveToTab(0)}>1. Product Idntity </Tab>
       <Tab
        onClick={() => {
         if (props.identity) {
          // props.dispatchMoveToTab(1);
          if (props.tabIndex > 1) {
           props.dispatchMoveToTab(1);
          }
         }
        }}
       >
        2. Options & Price
       </Tab>
       <Tab
        onClick={() => {
         if (props.tabIndex > 2) {
          props.dispatchMoveToTab(2);
         }
        }}
       >
        3. Product Description
       </Tab>
       <Tab
        onClick={() => {
         if (props.tabIndex > 3) {
          props.dispatchMoveToTab(3);
         }
        }}
       >
        4. Files Uploads
       </Tab>
       <Tab>5. Product Cover</Tab>
      </TabList>
     </div>
     <TabPanel forceRender>
      <IdentityStep
       id={params.id}
       data={{ params }}
       store={store}
       pidentity={JSON.parse(localStorage.getItem("identity"))}
       collections={props.location.state?.collections}
       selected_collections={props.location.state?.selected_collections}
       category={props.location.state?.category}
      />
     </TabPanel>
     <TabPanel forceRender id="options-step">
      <OptionsStep edit={false} id={params.id} rows={rows} />
     </TabPanel>
     <TabPanel forceRender>
      <ProductFiles id={params.id} edit={false} />
     </TabPanel>
     <TabPanel>
      <FilesUpload id={params.id} forceRender />
     </TabPanel>
     <TabPanel forceRender={false}>
      <Preview id={params.id} />
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
 dispatchMoveToTab: (tab) => dispatch(gotoTap(tab)),
});

const mapStateToProps = (state) => {
 return {
  tabIndex: state.addProduct.tabIndex,
  identity: state.addProduct.identity,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProductWrapper);
