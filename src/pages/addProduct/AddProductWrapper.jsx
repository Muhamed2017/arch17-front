import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Identity from "./Identity";
import OptionsPrice from "./OptionsPrice";
import ProductFiles from "./ProductFiles";
import { connect } from "react-redux";
import { productIdentity } from "../../redux/actions/addProductActions";
import UploadFiles from "./UploadFiles";
import { useParams } from "react-router-dom";
import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Preview from "./Preview";

const AddProductWrapper = (props) => {
 const [tabIndex, setTabIndex] = useState(props.tabIndex);
 const params = useParams();

 useEffect(() => {
  setTabIndex(props.tabIndex);
  console.log(typeof params.id);
 });

 Tabs.defaultProps = {
  selectedIndex: tabIndex,
 };
 return (
  <React.Fragment>
   <ReactNotification />
   <div id="add-product-wrapper">
    <Tabs OnSelect={(index) => setTabIndex(index)} forceRenderTabPanel={true}>
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
      <Identity id={params.id} />
     </TabPanel>
     <TabPanel forceRender>
      <OptionsPrice id={params.id} />
     </TabPanel>
     <TabPanel forceRender>
      <ProductFiles id={params.id} />
     </TabPanel>
     <TabPanel>
      <UploadFiles id={params.id} forceRender />
     </TabPanel>
     <TabPanel>
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
