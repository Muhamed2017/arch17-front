import React, { Component } from "react";
import TabPane from "react-bootstrap/TabPane";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Form, Col, Row, Nav, Modal, Button } from "react-bootstrap";
import { FaCloudUploadAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import { MdTitle } from "react-icons/md";
import { RiCodeSSlashFill } from "react-icons/ri";
// import Carousel from "react-elastic-carousel";
// import Item from "../../components/SliderComponents";
import slide4 from "../../../src/slide4.jpg";

class ProductFiles extends Component {
 state = {
  modals: {
   overview_ex_modal: false,
   dimension_ex_modal: false,
   material_ex_modal: false,
  },
 };

 overviewExample_open = () => {
  this.setState({ overview_ex_modal: true });
 };

 overviewExample_close = () => {
  this.setState({ overview_ex_modal: false });
 };

 render() {
  return (
   <div id="product-files-step">
    <Tabs>
     <div id="tabs-wrapper">
      <TabList>
       <Tab>Overview *</Tab>
       <Tab>Material Description</Tab>
       <Tab>Dimensions</Tab>
       <Tab>Photo Gallery</Tab>
       <span className="learn-more">Learn how to add description</span>
      </TabList>
     </div>

     <TabPanel>
      <div className="tab-form-content">
       <div className="tab-head">
        <h2>Add Your Product Overview</h2>
        <div className="tip">
         Tip. Add your products concept or general description{" "}
         <span onClick={this.overviewExample_open}>See example</span>
        </div>
        <div className="bold-tip">
         You can add in English and Chinese or one language
        </div>
        <div className="file-icons-tabs">
         <span className="red-bg">
          <FaCloudUploadAlt />
         </span>
         <span className="gray-bg">
          <MdTitle />
         </span>
         <span className="gray-bg">
          <RiCodeSSlashFill />
         </span>
        </div>
       </div>
      </div>

      {/* overview modal */}

      <>
       <Modal
        show={this.state.overview_ex_modal}
        onHide={this.overviewExample_close}
        // backdrop="static"
        className="example-modals"
        keyboard={false}
       >
        <Modal.Header closeButton>
         <Modal.Title>
          Overview
          <span className="lower">
           <span> CLOUD Sofa</span> By Grado
          </span>
         </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {/* <Carousel>
          <Item>
           <div className="slide-content">
            Home projects the true character of its owner.‎ However one looks
            like outside, he expects himself to be surrounded by the realest and
            most comfortable environment when he comes back home.‎ Just like
            everyone has his or her own personality, home space also has its
            characteristics in line with its owner.‎ The unique shape of Cloud
            Sofa, though used in any space, is a bright spot that should not be
            ignored, yet its soft and perceptual curve and natural and poetic
            form, on the other hand, help avoid incompatibility, allowing it to
            perfectly blend itself into the overall home environment.‎
           </div>
           <div className="slide-content">
            大的座椅靠背和柔软的枕头立即传达出此款扶手椅的两个主要特征：欢迎和隐密。凹形，慷慨环抱的形状营造出一个独一无二的私人空间。它的垫子线条简洁又柔软，正如邀请您体验在它内所带来的放松氛围。Big
            Data
            （意为：大数据）显示了风格、输入和形状的多种影响，它们之间相互沟通，而结果正是一个出色产品的诞生
           </div>
           <div className="slide-image">
            <img src={slide4} alt="" />
           </div>
          </Item>
          <Item>
           <h2>Slide one </h2>
          </Item>
          <Item>
           <h2>Slide one </h2>
          </Item>
         </Carousel> */}
        </Modal.Body>
       </Modal>
      </>

      {/* end of overview modal */}
     </TabPanel>
     <TabPanel>
      <div className="tab-form-content">
       <div className="tab-head">
        <h2>Add Material Description</h2>
        <div className="tip">
         Add the product’s materials specifications, Wood, leather, fabrics,
         etc,. <span>See Example</span>
        </div>
        <div className="bold-tip">
         You can skip if informations not available
        </div>
        {/* <div className='bolder-tip'></div> */}
        <div className="file-icons-tabs">
         <span className="red-bg">
          <FaCloudUploadAlt />
         </span>
         <span className="gray-bg">
          <MdTitle />
         </span>
         <span className="gray-bg">
          <RiCodeSSlashFill />
         </span>
        </div>
       </div>
      </div>
     </TabPanel>
     <TabPanel>
      <div className="tab-form-content">
       <div className="tab-head">
        <h2>Add Size Description</h2>
        <div className="tip">
         Add a picture of the size <span>See Example</span>
        </div>
        <div className="bold-tip">
         You can skip if informations not available
        </div>
        {/* <div className='bolder-tip'></div> */}
        <div className="file-icons-tabs">
         <span className="red-bg">
          <FaCloudUploadAlt />
         </span>
         <span className="gray-bg">
          <MdTitle />
         </span>
         <span className="gray-bg">
          <RiCodeSSlashFill />
         </span>
        </div>
       </div>
      </div>
     </TabPanel>
     <TabPanel>
      <div className="tab-form-content">
       <div className="tab-head">
        <h2>Add products’s Gallery photos / videos</h2>
        <div className="tip">
         You can add photos or embed videos from YouTube, Vimeo, DailyMotion,
         Tencent Video (QQ), Youku, iQiyi
        </div>
        <div className="bold-tip">
         You can skip if informations not available
        </div>
        <div className="file-icons-tabs">
         <span className="red-bg">
          <FaCloudUploadAlt />
         </span>
         {/* <span className='gray-bg'><MdTitle/></span> */}
         <span className="gray-bg">
          <RiCodeSSlashFill />
         </span>
        </div>
       </div>
      </div>
     </TabPanel>
     <TabPanel></TabPanel>
    </Tabs>
   </div>
  );
 }
}

export default ProductFiles;
