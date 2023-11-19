import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./pom.css";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

import { API, POM_SHARE_TYPES } from "../utitlties";
import {
  Spin,
  Row,
  Col,
  Form,
  Modal,
  Select,
  Input,
  Radio,
  Button,
} from "antd";
import SalesTab from "./ProjectListTabs/SalesTab";
import PurchasesTab from "./ProjectListTabs/PurchasesTab";
import ProjectSummaryTab from "./ProjectListTabs/ProjectSummaryTab";

import { IoIosShareAlt } from "react-icons/io";
import { AiOutlineDownload } from "react-icons/ai";
import SharedWithPOM from "./ProjectListTabs/SharedWithPOM";
const { Option } = Select;
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
      search_result: [],
      search_result_companies: [],
      search_result_users: [],
      contracts_total_value: 0,
      received_payment_total: 0,
      currency: null,
      suppliers_options: [],
      company_id: this.props.company_id,
      entity_name: this.props.entity_name,
      entity_id: this.props.entity_id,
      has_poinvoice_tab: false,
      budget: 0,
      share_modal: false,
      shared_with: [],
      shared_with_modal: false,
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

  onShareFinish = (values) => {
    console.log(this.state.p_id);
    console.log(this.state.selected_entity);
    console.log(this.state.selected_entity_id);
    console.log(this.state.selected_entity_name);
    console.log(this.state.selected_entity_type);
    console.log(values);

    const fd = new FormData();
    fd.append("share_for_type", this.state.share_for_type);
    fd.append("share_for_id", this.state.share_for_id);
    fd.append("projectlist_id", this.state.p_id);
    fd.append("sharer_type", this.state.entity_name);
    fd.append("sharer_id", this.state.entity_id);
    fd.append("permission", values.permission);
    fd.append("scope", values.scope);
    console.log(fd);
  };
  addShareValuesChange = (changedValues, allValues) => {
    console.log(allValues);
  };

  handleSearchForShare = (e) => {
    console.log(e.target.value);
    let keyword = e.target.value;
    this.setState({
      selected_entity_name: e.target.value,
      selected_entity: null,
    });
    if (keyword.length > 0) {
      axios.get(`${API}sshare/${keyword}`).then((response) => {
        console.log(response);
        this.setState({
          search_result_companies: response.data.companies,
          search_result_users: response.data.users,
        });
      });
    }
  };
  componentDidMount() {
    axios.get(`${API}get-projectlist/${this.state.p_id}`).then((response) => {
      this.setState({
        project: response.data.project,
        loading: false,
        deliveries_total_value: parseFloat(
          response.data.deliveries_total_value
        ),
        contracts_total_value: parseFloat(
          response.data.contracts_total_with_tax
        ),
        received_payment_total: parseFloat(
          response.data.received_payment_total
        ),
        currency: response.data.project?.currency,
        po_deliveries: response.data.po_deliveries,
        has_poinvoice_tab: response.data.has_poinvoice_tab,
        budget: response.data.project?.budget,
      });
    });
  }

  render() {
    const { share_modal, shared_with_modal } = this.state;
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
              <Row justify="space-between" align={"middle"}>
                <Col md={12}>
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
                <Col md={12}>
                  <div className="icons">
                    <span>
                      <AiOutlineDownload />
                    </span>
                    <span className="pointer" disabled="disabled">
                      <IoIosShareAlt
                        onClick={() => {
                          this.setState({ share_modal: true });
                        }}
                      />
                    </span>
                  </div>
                  <p
                    className="text-right pointer light-text py-1"
                    disabled={true}
                    onClick={() => {
                      this.setState({
                        shared_with_modal: true,
                      });
                    }}
                  >
                    Shared With List
                  </p>
                </Col>
              </Row>
              <div className="tabs-wrapper mt-5">
                <Tabs>
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
                        entity_name={this.state.entity_name}
                        entity_id={this.state.entity_id}
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
                        entity_name={this.state.entity_name}
                        entity_id={this.state.entity_id}
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
                      entity_name={this.state.entity_name}
                      entity_id={this.state.entity_id}
                    />
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        )}

        <Modal
          open={!share_modal}
          destroyOnClose
          className="file-modal border-radius"
          onCancel={() => {
            this.setState({
              share_modal: false,
            });
          }}
          closable
          footer={false}
        >
          <p className="modal-header">Share Project</p>
          <Form
            onFinish={this.onShareFinish}
            onValuesChange={this.addShareValuesChange}
            size="large"
            layout="vertical"
          >
            <Form.Item
              name="shared_with"
              label="Input People E-mail or Search company name"
              className="relative"
            >
              <Input
                placeholder="E-mail / Name"
                value={this.state.selected_entity_name}
                onChange={this.handleSearchForShare}
              />
              {this.state.search_result_companies?.length+this.state.search_result_users?.length > 0 &&
                !this.state.selected_entity && (
                  <div className="list-search absolute">
                    {this.state.search_result_companies?.map((r) => {
                      return (
                        <div
                          className="result-item"
                          onClick={() => {
                            this.setState({
                              selected_entity: r,
                              selected_entity_type:"company",
                              selected_entity_name: r?.name,
                              selected_entity_id: r?.id,
                            });
                          }}
                        >
                          {r?.name}
                        </div>
                      );
                    })}

                    {this.state.search_result_users?.map((r) => {
                      return (
                        <div
                          className="result-item"
                          onClick={() => {
                            this.setState({
                              selected_entity: r,
                              selected_entity_type:"user",
                              selected_entity_name: r?.displayName,
                              selected_entity_id: r?.id,
                            });
                          }}
                        >
                          {r?.displayName}
                        </div>
                      );
                    })}
                  </div>
                )}
            </Form.Item>

            <Form.Item
              label="Shared Items"
              name="scope"
              className="form-label mb-4"
            >
              <Select
                placeholder="Select"
                style={{
                  fontSize: "13px",
                }}
              >
                {POM_SHARE_TYPES.map((t) => {
                  return <Option value={t.value}>{t.label}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item name="permission">
              <Radio.Group>
                <Radio value="edit">Can Edit</Radio>
                <Radio value="read">View Only</Radio>
              </Radio.Group>
            </Form.Item>
            <Row justify={"end"}>
              <Col>
                <Button htmlType="submit" className="arch-btn">
                  Share
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
        <Modal
          open={shared_with_modal}
          destroyOnClose
          className="file-modal border-radius shared-with-modal"
          onCancel={() => {
            this.setState({
              shared_with_modal: false,
            });
          }}
          closable
          footer={false}
        >
          <SharedWithPOM />
        </Modal>
      </>
    );
  }
}

export default ProjecLisItem;
