import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import EditIdentity from "../editProduct/EditIdentity";
import ProductFiles from "./ProductFiles";
import { connect } from "react-redux";
import {
 productIdentity,
 gotoTap,
} from "../../redux/actions/addProductActions";
import FilesUpload from "./FilesUpload";
import { useParams } from "react-router-dom";
// import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Preview from "./Preview";
import TableStep from "../TableStep";
import axios from "axios";
import { API } from "./../../utitlties";
const AddProductWrapper = (props) => {
 const [tabIndex, setTabIndex] = useState(props.tabIndex);
 //  const [tabIndex, setTabIndex] = useState(0);
 const [rows, setRows] = useState([]);
 const [loaded, setLoaded] = useState(false);
 const [collections, setCollections] = useState([]);
 //  const [designers, setDesigners] = useState([]);
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
    setCollections(response.data.product.store.collections);
    setStore(response.data.product.store);
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
          props.dispatchMoveToTab(1);
         }
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
       <Tab onClick={() => props.dispatchMoveToTab(4)}>5. Product Cover</Tab>
      </TabList>
     </div>
     <TabPanel forceRender>
      <EditIdentity
       id={params.id}
       data={{ params }}
       store={store}
       collections={props.location.state?.collections}
       //  designers={designers}
       selected_collections={props.location.state?.selected_collections}
       category={props.location.state?.category}
      />
     </TabPanel>
     <TabPanel forceRender id="options-step">
      <TableStep edit={false} id={params.id} rows={rows} />
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
