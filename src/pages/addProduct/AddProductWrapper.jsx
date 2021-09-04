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
       <Tab>1. Product Idntity</Tab>
       <Tab>2. Options & Price</Tab>
       <Tab>3. Product Description</Tab>
       <Tab>4. Files Uploads</Tab>
       {/* <Tab>5. Product Preview</Tab> */}
       {/* <button
       className="save-product-step-btn"
       onClick={tabIndex === 1 ? props.dispatchAddIdentity : ClickNo}
        // onClick={() => handleIdentitySubmit()}
       style={{ background: loading ? "#B4B4B4" : "" }}
      >
       {loading ? (
        <PulseLoader
         style={{ height: "20px" }}
         color="#ffffff"
         loading={loading}
         size={10}
        />
       ) : (
        "Save & Continue"
       )}
      </button> */}
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
      {/* <div className="step-form">
      <div className="step-head">
       <h2>Upload Product Files</h2>
       <p>CAD / 3D, and PDF files</p>
      </div>
      <div className="upload-container">
       <div className="upload-block">
        <div className="upload-head">
         <h6>CAD / 2D Drawings Files</h6>
        </div>
        <div id="" className="upload-btns">
         <div id="uploaded-files"></div>
         <div className="upload-action">
          <input className="file-upload" onChange={handleUpload} type="file" />
          <div className="upload-icon">
           <FaCloudUploadAlt />
          </div>
          <p>Upload Files</p>
         </div>
        </div>
       </div>
       <div className="upload-block">
        <div className="upload-head">
         <h6>3D Files</h6>
        </div>
        <div id="" className="upload-btns">
         <div id="3d-files"></div>
         <div className="upload-action">
          <input
           className="file-upload"
           onChange={handle3DUpload}
           type="file"
          />
          <div className="upload-icon">
           <FaCloudUploadAlt />
          </div>
          <p>Upload Files</p>
         </div>
        </div>
       </div>
       <div className="upload-block">
        <div className="upload-head">
         <h6>Upload PDF and Catalogue files</h6>
        </div>
        <div id="" className="upload-btns">
         <div id="pdf-files"></div>
         <div className="upload-action">
          <input
           className="file-upload"
           onChange={handlePDFUpload}
           type="file"
          />
          <div className="upload-icon">
           <FaCloudUploadAlt />
          </div>
          <p>Upload Files</p>
         </div>
        </div>
       </div>
      </div>
     </div> */}
      <UploadFiles id={params.id} forceRender />
     </TabPanel>
     {/* <TabPanel>SSSS</TabPanel> */}
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
