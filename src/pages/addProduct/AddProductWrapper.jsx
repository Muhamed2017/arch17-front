import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FaCloudUploadAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import "react-tabs/style/react-tabs.css";
import { GO_TO_TAB_STEP } from "../../redux/constants";

import Identity from "./Identity";
import OptionsPrice from "./OptionsPrice";
import ProductFiles from "./ProductFiles";
import { connect } from "react-redux";
import {
 gotoTap,
 productIdentity,
} from "../../redux/actions/addProductActions";
import UploadFiles from "./UploadFiles";

const AddProductWrapper = (props) => {
 const [tabIndex, setTabIndex] = useState(props.tabIndex);

 const handleUpload = () => {
  console.log("uploaded");
  let node = document.getElementById("uploaded-files");
  node.innerHTML += `<div class='box'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-file-cad-box" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M11.25 5.25H12.75V6.38C13.58 6.38 14.25 7.05 14.25 7.88V10.37L14.11 10.5L15.18 12.36C15.55 11.76 15.75 11.07 15.75 10.36H17.25C17.26 11.61 16.81 12.82 16 13.77L18 17.25V18.75L16.7 18L14.84 14.78C13.12 15.91 10.89 15.91 9.16 14.78L7.3 18L6 18.75V17.25L9.89 10.5L9.75 10.37V7.88C9.75 7.05 10.42 6.38 11.25 6.38M12 7.88C11.16 7.88 10.74 8.9 11.34 9.5C11.94 10.08 12.95 9.65 12.94 8.81C12.94 8.29 12.5 7.88 12 7.88M11 11.6L9.91 13.5C11.17 14.36 12.83 14.36 14.09 13.5L13 11.6C12.43 12.11 11.57 12.11 11 11.6Z"/></svg>
  <p>file-name.cad</p>
  </div>`;
 };
 const handle3DUpload = () => {
  let node = document.getElementById("3d-files");
  node.innerHTML += `<div class='box'>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="548.291px" height="548.291px" viewBox="0 0 548.291 548.291" style="enable-background:new 0 0 548.291 548.291;" xml:space="preserve">
<g>
	<path d="M271.216,258.917c-7.494,0-12.325,0.667-15.184,1.318v97.039c2.859,0.652,7.481,0.652,11.66,0.652   c30.365,0.23,50.171-16.493,50.171-51.927C318.073,275.196,300.041,258.917,271.216,258.917z"/>
	<path d="M486.201,196.116h-13.166V132.59c0-0.399-0.062-0.795-0.115-1.2c-0.021-2.522-0.825-5-2.552-6.96L364.657,3.677   c-0.033-0.034-0.064-0.044-0.085-0.075c-0.63-0.704-1.364-1.292-2.143-1.796c-0.229-0.157-0.461-0.286-0.702-0.419   c-0.672-0.365-1.387-0.672-2.121-0.893c-0.2-0.052-0.379-0.134-0.577-0.188C358.23,0.118,357.401,0,356.562,0H96.757   C84.894,0,75.256,9.649,75.256,21.502v174.613H62.092c-16.971,0-30.732,13.756-30.732,30.73v159.81   c0,16.966,13.761,30.736,30.732,30.736h13.164V526.79c0,11.854,9.638,21.501,21.501,21.501h354.776   c11.853,0,21.501-9.647,21.501-21.501V417.392h13.166c16.966,0,30.729-13.764,30.729-30.731V226.854   C516.93,209.872,503.167,196.116,486.201,196.116z M96.757,21.502h249.054v110.006c0,5.94,4.817,10.751,10.751,10.751h94.972   v53.861H96.757V21.502z M353.505,304.902c0,28.384-10.341,47.975-24.64,60.069c-15.617,12.987-39.382,19.149-68.432,19.149   c-17.377,0-29.704-1.102-38.058-2.199V236.247c12.326-1.966,28.383-3.068,45.321-3.068c28.154,0,46.429,5.064,60.728,15.836   C343.827,260.46,353.505,278.722,353.505,304.902z M90.915,378.893l7.252-26.668c6.315,3.28,20.814,9.365,35.315,9.365   c18.48,0,27.83-8.893,27.83-20.347c0-14.982-14.961-21.769-30.641-21.769h-14.496v-25.486h13.793   c11.939-0.241,27.145-4.682,27.145-17.555c0-9.11-7.499-15.89-22.462-15.89c-12.392,0-25.492,5.375-31.806,9.108l-7.258-25.722   c9.121-5.848,27.376-11.47,47.009-11.47c32.52,0,50.534,17.082,50.534,37.905c0,16.137-9.124,28.768-27.84,35.318v0.462   c18.244,3.267,32.969,17.077,32.969,36.956c0,26.897-23.61,46.551-62.207,46.551C116.4,389.665,99.797,384.51,90.915,378.893z    M451.534,520.962H96.757v-103.57h354.776V520.962z M411.801,384.778c-16.93,0-33.666-4.399-42.023-9.024l6.825-27.722   c9.023,4.614,22.889,9.242,37.188,9.242c15.402,0,23.538-6.383,23.538-16.062c0-9.245-7.034-14.52-24.855-20.903   c-24.642-8.588-40.714-22.227-40.714-43.791c0-25.299,21.128-44.673,56.12-44.673c16.708,0,29.035,3.528,37.839,7.488   l-7.486,27.066c-5.942-2.855-16.504-7.047-31.023-7.047c-14.521,0-21.555,6.601-21.555,14.31c0,9.458,8.347,13.637,27.491,20.903   c26.183,9.68,38.51,23.312,38.51,44.221C471.655,363.647,452.51,384.778,411.801,384.778z"/>
</g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
  <p>file-name.3ds</p>
  </div>`;
 };
 const handlePDFUpload = () => {
  let node = document.getElementById("pdf-files");
  node.innerHTML += `<div class='box pdf-box'>
<svg id ="pdf-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64" version="1">
 <path style="opacity:0.2" d="M 14.5,8 C 13.115,8 12,9.115 12,10.5 v 45 c 0,1.385 1.115,2.5 2.5,2.5 h 35 C 50.885,58 52,56.885 52,55.5 V 23 L 38.25,21.75 37,8 Z"/>
 <path fill="#c03630" d="m14.5 7c-1.385 0-2.5 1.115-2.5 2.5v45c0 1.385 1.115 2.5 2.5 2.5h35c1.385 0 2.5-1.115 2.5-2.5v-32.5l-13.75-1.25-1.25-13.75z"/>
 <path style="opacity:0.2" d="m 37,8 v 12.5 c 0,1.3808 1.1193,2.5 2.5,2.5 H 52 Z"/>
 <path fill="#f36961" d="m37 7v12.5c0 1.3808 1.1193 2.5 2.5 2.5h12.5l-15-15z"/>
 <path style="opacity:0.2" d="m 29.976,25.562 c -0.57658,0 -1.1158,0.28221 -1.2462,0.74801 -0.4844,1.7858 0.05775,4.5474 0.96195,7.9883 l -0.27276,0.66618 c -0.69234,1.6876 -1.5578,3.3684 -2.3188,4.8599 -3.1419,6.1475 -5.5861,9.4644 -7.2159,9.6968 l -0.0063,-0.0675 c -0.03537,-0.76682 1.3798,-2.7439 3.2978,-4.3158 0.20006,-0.1618 1.0538,-0.98776 1.0538,-0.98776 0,0 -1.1524,0.60834 -1.4112,0.76522 -2.4035,1.4346 -3.5995,2.872 -3.7945,3.8261 -0.05788,0.2834 -0.02075,0.63212 0.22969,0.7753 l 0.6145,0.30868 c 1.673,0.83744 3.7301,-1.3645 6.465,-6.1578 2.783,-0.91295 6.2554,-1.7725 9.4169,-2.2382 2.83,1.617 6.0762,2.3869 7.3235,2.0545 0.23734,-0.06275 0.487,-0.24905 0.6145,-0.42065 0.1,-0.15789 0.23979,-0.78965 0.23979,-0.78965 0,0 -0.23466,0.31934 -0.42788,0.41348 -0.7894,0.37264 -3.2816,-0.24905 -5.839,-1.5002 2.2112,-0.23535 4.0534,-0.24442 5.0379,0.07025 1.2504,0.39912 1.2514,0.80824 1.2347,0.89158 0.01687,-0.06862 0.07287,-0.34272 0.066,-0.45941 -0.02837,-0.30008 -0.12088,-0.56804 -0.34744,-0.78965 -0.46284,-0.45599 -1.6056,-0.68578 -3.1629,-0.70636 -1.1738,-0.01275 -2.5812,0.09 -4.109,0.30868 -0.70015,-0.40205 -1.439,-0.84402 -2.0244,-1.3912 -1.4846,-1.3866 -2.729,-3.3118 -3.5018,-5.47 0.05275,-0.20691 0.10325,-0.40909 0.1493,-0.61306 0.21479,-0.96589 0.36896,-4.1592 0.36896,-4.1592 0,0 -0.61168,2.399 -0.70778,2.7609 -0.06175,0.22946 -0.13858,0.47438 -0.22684,0.72934 -0.46875,-1.6474 -0.70636,-3.244 -0.70636,-4.455 0,-0.34224 0.02938,-1.0082 0.12631,-1.5348 0.04725,-0.37556 0.18325,-0.57059 0.3245,-0.66474 0.27946,0.06775 0.59229,0.49635 0.91886,1.2132 0.28044,0.61975 0.26271,1.3375 0.26271,1.7818 0,0 0.30076,-1.1 0.23115,-1.7501 -0.04237,-0.39029 -0.4137,-1.3944 -1.2031,-1.3826 h -0.06463 l -0.35174,-0.0038 z m 0.26848,9.9739 c 0.81689,1.6425 1.9435,3.2024 3.4214,4.4536 0.32946,0.27849 0.68,0.54344 1.0409,0.7925 -2.6839,0.49914 -5.5026,1.2013 -8.1219,2.2986 0.47364,-0.84136 0.98576,-1.758 1.5104,-2.7465 1.0159,-1.921 1.6315,-3.4028 2.1492,-4.7981 z"/>
 <path fill="#fff" d="m29.976 24.562c-0.57658 0-1.1158 0.28221-1.2462 0.74801-0.4844 1.7858 0.05775 4.5474 0.96195 7.9883l-0.27276 0.66618c-0.69234 1.6876-1.5578 3.3684-2.3188 4.8599-3.1419 6.1475-5.5861 9.4644-7.2159 9.6968l-0.0063-0.0675c-0.03537-0.76682 1.3798-2.7439 3.2978-4.3158 0.20006-0.1618 1.0538-0.98776 1.0538-0.98776s-1.1524 0.60834-1.4112 0.76522c-2.4035 1.4346-3.5995 2.872-3.7945 3.8261-0.05788 0.2834-0.02075 0.63212 0.22969 0.7753l0.6145 0.30868c1.673 0.83744 3.7301-1.3645 6.465-6.1578 2.783-0.91295 6.2554-1.7725 9.4169-2.2382 2.83 1.617 6.0762 2.3869 7.3235 2.0545 0.23734-0.06275 0.487-0.24905 0.6145-0.42065 0.1-0.15789 0.23979-0.78965 0.23979-0.78965s-0.23466 0.31934-0.42788 0.41348c-0.7894 0.37264-3.2816-0.24905-5.839-1.5002 2.2112-0.23535 4.0534-0.24442 5.0379 0.07025 1.2504 0.39912 1.2514 0.80824 1.2347 0.89158 0.01687-0.06862 0.07287-0.34272 0.066-0.45941-0.02837-0.30008-0.12088-0.56804-0.34744-0.78965-0.46284-0.45599-1.6056-0.68578-3.1629-0.70636-1.1738-0.01275-2.5812 0.09-4.109 0.30868-0.70015-0.40205-1.439-0.84402-2.0244-1.3912-1.4846-1.3866-2.729-3.3118-3.5018-5.47 0.05275-0.20691 0.10325-0.40909 0.1493-0.61306 0.21479-0.96589 0.36896-4.1592 0.36896-4.1592s-0.61168 2.399-0.70778 2.7609c-0.06175 0.22946-0.13858 0.47438-0.22684 0.72934-0.46875-1.6474-0.70636-3.244-0.70636-4.455 0-0.34224 0.02938-1.0082 0.12631-1.5348 0.04725-0.37556 0.18325-0.57059 0.3245-0.66474 0.27946 0.06775 0.59229 0.49635 0.91886 1.2132 0.28044 0.61975 0.26271 1.3375 0.26271 1.7818 0 0 0.30076-1.1 0.23115-1.7501-0.04237-0.39029-0.4137-1.3944-1.2031-1.3826h-0.06463l-0.35174-0.0038zm0.26848 9.9739c0.81689 1.6425 1.9435 3.2024 3.4214 4.4536 0.32946 0.27849 0.68 0.54344 1.0409 0.7925-2.6839 0.49914-5.5026 1.2013-8.1219 2.2986 0.47364-0.84136 0.98576-1.758 1.5104-2.7465 1.0159-1.921 1.6315-3.4028 2.1492-4.7981z"/>
 <path style="opacity:0.2;fill:#ffffff" d="M 14.5,7 C 13.115,7 12,8.115 12,9.5 v 1 C 12,9.115 13.115,8 14.5,8 H 37 c 0,-1 0,0 0,-1 z"/>
</svg> 
  <p>file-name.pdf</p>
  </div>`;
 };

 useEffect(() => {
  setTabIndex(props.tabIndex);
 });

 Tabs.defaultProps = {
  selectedIndex: tabIndex,
 };
 return (
  <div id="add-product-wrapper">
   <Tabs OnSelect={(index) => setTabIndex(index)}>
    <div id="tabs-wrapper">
     <TabList>
      <Tab>1. Product Idntity</Tab>
      <Tab>2. Options & Price</Tab>
      <Tab>3. Product Description</Tab>
      <Tab>4. Files Uploads</Tab>
      <Tab>5. Product Preview</Tab>
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
    <TabPanel>
     <Identity />
    </TabPanel>
    <TabPanel>
     <OptionsPrice />
    </TabPanel>
    <TabPanel>
     <ProductFiles />
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
     <UploadFiles />
    </TabPanel>
    <TabPanel>SSSS</TabPanel>
   </Tabs>
  </div>
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
  is_for_kids
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
    is_for_kids
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
