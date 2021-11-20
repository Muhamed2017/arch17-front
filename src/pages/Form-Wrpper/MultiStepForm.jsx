import React, { Component } from "react";
import { Tabs } from "antd";
import Identity from "./../addProduct/Identity";
// import OptionsPrice from "./../addProduct/OptionsPrice";
import OptionStep from "./Steps/OptionRow";

const { TabPane } = Tabs;
class MultiStepForm extends Component {
 constructor(props) {
  super(props);
  this.state = {
   activeStep: "0",
  };
 }

 render() {
  return (
   <>
    <div style={{ minHeight: "100vh" }} className="options-wrapper step-form">
     <Tabs defaultActiveKey={this.state.activeStep} centered>
      <TabPane tab="1.Identity" key={1}>
       <Identity />
      </TabPane>
      <TabPane tab="2.Options & Prices" key={2}>
       {/* Content of Tab Pane 2 */}
       <OptionStep />
      </TabPane>
      <TabPane tab="3.Product Description" key={3}>
       Content of Tab Pane 3
      </TabPane>
      <TabPane tab="4.Files Uploads" key={4}>
       Content of Tab Pane 4
      </TabPane>
      <TabPane tab="5.Product Preview" key={5}>
       Content of Tab Pane 5
      </TabPane>
     </Tabs>
    </div>
   </>
  );
 }
}

export default MultiStepForm;
