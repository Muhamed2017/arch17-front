import React, { Component } from "react";
import { Row, Col, Modal } from "antd";
import ClientList from "./ClientList";
import SupplierList from "./SupplierList";
import ProjectList from "./ProjectList";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "./pom.css";
import POMOverview from "./POMOverview";
class POM extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    company_id: this.props.company_id,
    company_cashflow_base_currency:this.props.company_cashflow_base_currency,
    test_modal: false,
    client_modal: false,
    supplier_modal: false,
    project_modal: false,
    entity_name:this.props.entity_name,
    entity_id:this.props.entity_id,
  };

  render() {
    return (
      <>
        <div className="po-tab profile-tabs sales-tab" id="po-tab">
          <Row justify="start">
            <Col md={24}>
              <Tabs>
                <TabList
                style={{
                    textALign:'left'
                }}
                >
                  <Tab>Overview</Tab>
                  <Tab>Customers</Tab>
                  <Tab>Vendors</Tab>
                  <Tab>Projects</Tab>
                </TabList>
                <TabPanel>
                  <POMOverview
                  company_id={this.state.company_id}
                  entity_id={this.state.entity_id}
                  entity_name={this.state.entity_name}
                  company_cashflow_base_currency={this.state.company_cashflow_base_currency}
                  />
                </TabPanel>
                <TabPanel
                forceRender
                >
                  <ClientList
                    // entity_name="company"
                    entity_name={this.state.entity_name}
                    // entity_id={this.state.company_id}
                    entity_id={this.state.entity_id}
                  />
                </TabPanel>
                <TabPanel
                forceRender
                >
                <SupplierList
                // entity_name="company"
                // entity_id={this.state.company_id}
                entity_id={this.state.entity_id}
                entity_name={this.state.entity_name}
            />
                </TabPanel>
                <TabPanel
                // forceRender
                >
                  <ProjectList
                  //  entity_name="company"
                entity_name={this.state.entity_name}
                entity_id={this.state.entity_id}

                  //  entity_id={this.state.company_id}
                  />
                </TabPanel>
                
              </Tabs>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default POM;
