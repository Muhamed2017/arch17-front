import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Identity from "./Identity";
import EditIdentity from "../editProduct/EditIdentity";
import OptionsPrice from "./OptionsPrice";
import ProductFiles from "./ProductFiles";
import { connect } from "react-redux";
import { productIdentity } from "../../redux/actions/addProductActions";
import FilesUpload from "./FilesUpload";
import { useParams } from "react-router-dom";
import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Preview from "./Preview";
import TableStep from "../TableStep";
// import IdentityStep from "./IdentityStep";
import axios from "axios";
import { API } from "./../../utitlties";
const AddProductWrapper = (props) => {
 const [tabIndex, setTabIndex] = useState(props.tabIndex);
 //  const [tabIndex, setTabIndex] = useState(0);
 const [rows, setRows] = useState([]);
 const [loaded, setLoaded] = useState(false);
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
       <Tab onClick={() => setTabIndex(0)}>1. Product Idntity </Tab>
       <Tab
        onClick={() => {
         setTabIndex(1);
        }}
       >
        2. Options & Price
       </Tab>
       <Tab onClick={() => setTabIndex(2)}>3. Product Description</Tab>
       <Tab onClick={() => setTabIndex(3)}>4. Files Uploads</Tab>
       <Tab onClick={() => setTabIndex(4)}>5. Product Cover</Tab>
      </TabList>
     </div>
     <TabPanel forceRender>
      <EditIdentity
       id={params.id}
       data={{ params }}
       //  collections={props.location.state.collections}
       collections={[
        {
         collection_name: "Collection One",
         id: 5,
        },

        {
         collection_name: "Collection Two",
         id: 15,
        },
        {
         collection_name: "Collection Three",
         id: 25,
        },
        {
         collection_name: "Collection Four",
         id: 35,
        },
       ]}
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
 //  dispatchGotoStep: s() => dispatch(gotoTap(step)),
});

const mapStateToProps = (state) => {
 return {
  tabIndex: state.addProduct.tabIndex,
  // tabIndex: 1,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProductWrapper);
