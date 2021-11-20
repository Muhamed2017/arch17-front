import React, { useState, useEffect } from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
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
// import IdentityStep from "./IdentityStep";
import axios from "axios";
import { API } from "./../../utitlties";
import { Tabs } from "antd";
// import Identity from "./../addProduct/Identity";
// import OptionsPrice from "./../addProduct/OptionsPrice";
// import OptionStep from "./Steps/OptionRow";

const { TabPane } = Tabs;
const NewWrapper = (props) => {
 const [tabIndex, setTabIndex] = useState(props.tabIndex);
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
  // <React.Fragment>
  //  <ReactNotification />
  //  <div id="add-product-wrapper">
  //   <Tabs
  //    OnSelect={(index) => setTabIndex(index)}
  //    // forceRenderTabPanel={true}
  //   >
  //    <div id="tabs-wrapper">
  //     <TabList>
  //      <Tab>1. Product Idntity </Tab>
  //      <Tab>2. Options & Price</Tab>
  //      <Tab>3. Product Description</Tab>
  //      <Tab>4. Files Uploads</Tab>
  //      <Tab>5. Product Preview</Tab>
  //     </TabList>
  //    </div>
  //    <TabPanel forceRender>
  //     {/* <Identity id={params.id} /> */}
  //     <Identity id={params.id} />
  //    </TabPanel>
  //    <TabPanel forceRender>
  //     <OptionsPrice id={params.id} rows={rows} />
  //    </TabPanel>
  //    <TabPanel forceRender>
  //     <ProductFiles id={params.id} />
  //    </TabPanel>
  //    <TabPanel>
  //     <UploadFiles id={params.id} forceRender />
  //    </TabPanel>
  //    <TabPanel forceRender={false}>
  //     <Preview id={params.id} />
  //    </TabPanel>
  //   </Tabs>
  //  </div>
  // </React.Fragment>

  <React.Fragment>
   <ReactNotification />
   {/* <div id="add-product-wrapper"> */}
   <Tabs defaultActiveKey={"1"} centered>
    <TabPane tab="1.Identity" key={1}>
     {/* <Identity /> */}
     <Identity id={params.id} />
    </TabPane>
    <TabPane tab="2.Options & Prices" key={2}>
     <OptionsPrice id={params.id} rows={rows} />
    </TabPane>
    <TabPane tab="3.Product Description" key={3}>
     <ProductFiles id={params.id} />
    </TabPane>
    <TabPane tab="4.Files Uploads" key={4}>
     <UploadFiles id={params.id} forceRender />
    </TabPane>
    <TabPane tab="5.Product Preview" key={5}>
     {/* Content of Tab Pane 5 */}
     <Preview id={params.id} />
    </TabPane>
   </Tabs>
   {/* </div> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(NewWrapper);
