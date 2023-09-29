import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProjectPaymentsDeliveryTab from "./ProjectPaymentsDeliveryTab";
import ProjectSalesPurchasesTab from "./ProjectSalesPurchasesTab";

class ProjectSummaryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_id:this.props?.project_id,
      base_currency:this.props?.base_currency,
      currency:this.props?.currency
  
    };
  }
 
  render() {
    return (
      <>
         <div className="sales-tab  po-tab  profile-tabs">
          <Tabs>
            <TabList
             style={{
                textALign: "left",
              }}
            >
              <Tab>Sales / Purchases</Tab>
              <Tab>Payments / Deliveries</Tab>
            </TabList>

            <TabPanel>
              <ProjectSalesPurchasesTab 
              project_id={this.state.project_id}
              base_currency={this.state.base_currency}
              currency={this.state.currency}

              />
            </TabPanel>
            <TabPanel>
              <ProjectPaymentsDeliveryTab 
              base_currency={this.state.base_currency}
              project_id={this.state.project_id}
              currency={this.state.currency}


              />
            </TabPanel>
          </Tabs>
        </div>
      </>
    );
  }
}

export default ProjectSummaryTab;
