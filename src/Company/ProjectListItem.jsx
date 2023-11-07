import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./pom.css";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

import { API } from "../utitlties";
import { Spin,Row,Col } from "antd";
import SalesTab from "./ProjectListTabs/SalesTab";
import PurchasesTab from "./ProjectListTabs/PurchasesTab";
import ProjectSummaryTab from "./ProjectListTabs/ProjectSummaryTab";

import  {IoIosShareAlt} from 'react-icons/io'
import  {AiOutlineDownload} from 'react-icons/ai'
class ProjecLisItem extends Component {
  constructor(props) {
    super(props);
    this.changeTotalContract.bind(this);
    this.changeTotalDelivery.bind(this);
    this.changeTotalSupplirs.bind(this);
    this.changeTotalPayment.bind(this);
    this.state = {
      p_id: this.props.project_id,
      project: {},
      loading: true,
      deliveries_total_value: 0,
      contracts_total_value: 0,
      received_payment_total: 0,
      currency: null,
      suppliers_options: [],
      company_id: this.props.company_id,
      has_poinvoice_tab:false,
      budget:0
    };
  }

  changeTotalContract = (contracts_total_value) => {
    this.setState({ contracts_total_value });
  };

  changeTotalPayment = (received_payment_total) => {
    this.setState({ received_payment_total });
  };
  changeTotalDelivery = (deliveries_total_value) => {
    this.setState({ deliveries_total_value });
  };
  changeTotalSupplirs = (suppliers_options) => {
    this.setState({ suppliers_options });
  };

 

  componentDidMount() {
    axios.get(`${API}get-projectlist/${this.state.p_id}`).then((response) => {
      this.setState({
        project: response.data.project,
        loading: false,
        deliveries_total_value: parseFloat(response.data.deliveries_total_value),
        contracts_total_value: parseFloat(response.data.contracts_total_with_tax),
        received_payment_total: parseFloat(response.data.received_payment_total),
        currency: response.data.project?.currency,
        po_deliveries:response.data.po_deliveries,
        has_poinvoice_tab:response.data.has_poinvoice_tab,
        budget:response.data.project?.budget
      });
    });
  }

  render() {
    return (
      <>
        {this.state.loading ? (
          <Spin
            size="large"
            indicator={
              <LoadingOutlined
                style={{ fontSize: "36px", color: "#000" }}
                spin
              />
            }
            style={{
              width: "100%",
              margin: "150px auto",
            }}
          />
        ) : (
          <div className="outer-white-page profile-tabs">
            <div className="project-list-item-page">
              <Row
              justify="space-between"
              align={"middle"}
              >
                <Col  md={12}>
                <div className="project-list-info">
                <div className="p-name">
                  <span className="bold">Project Name</span>
                  <span>{this.state.project?.name}</span>
                </div>
                <div className="p-ci">
                  <span className="bold">PI/CI. No</span>
                  <span>{this.state.project?.pi_ci}</span>
                </div>
                <div className="p-client">
                  <span className="bold">Client</span>
                  <span>{this.state.project?.client_name}</span>
                </div>
                <div className="p-client">
                  <span className="bold">Start Date</span>
                  <span>{this.state.project?.start_date}</span>
                </div>
              </div>
                </Col>
                <Col  md={12}>
                  <div className="icons">
                   <span>
                    <AiOutlineDownload/>
                   </span>
                   <span>
                   <IoIosShareAlt/>
                   </span>
                  </div>
                </Col>
              </Row>
              <div className="tabs-wrapper mt-5">
                <Tabs
                
                >
                  <TabList>
                    {this.state.project?.business_type !== "Purchases Only" && (
                      <Tab>Sales</Tab>
                    )}
                    {this.state.project?.business_type !== "Sales Only" && (
                      <Tab>Purchases</Tab>
                    )}
                    <Tab>Summery</Tab>
                  </TabList>

                  {this.state.project?.business_type !== "Purchases Only" && (
                    <TabPanel>
                      <SalesTab
                        id={this.state.p_id}
                        _currency={this.state.project?.currency}
                        deliveries_total_value={
                          this.state.deliveries_total_value
                        }
                        
                        contracts_total_value={this.state.contracts_total_value}
                        received_payment_total={
                          this.state.received_payment_total
                        }
                        company_id={this.state.company_id}
                        base_currency={this.state.project?.base_currency}

                      />
                    </TabPanel>
                  )}
                   {this.state.project?.business_type !== "Sales Only" && (
                       <TabPanel>
                       <PurchasesTab
                          contract_currency={this.state.currency}
                          base_currency={this.state.project?.base_currency}
                          project_id={this.state.p_id}
                          changeTotalSupplirs={this.changeTotalSupplirs}
                          company_id={this.state.company_id}
                          suppliers_options={this.state.suppliers_options}
                          po_deliveries={this.state.po_deliveries}
                          has_poinvoice_tab={this.state.has_poinvoice_tab}
                       />
                     </TabPanel>
                    )}
                    <TabPanel>
                      <ProjectSummaryTab
                      project_id={this.state.p_id}
                      base_currency={this.state.project?.base_currency}
                      currency={this.state.project?.currency}
                      budget={this.state.project?.budget}
                      />
                    </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ProjecLisItem;
