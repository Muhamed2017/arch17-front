import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ContractTab from "./ContractTab";
import { Button, Modal, Input, Form, Row, Col, Select, Spin } from "antd";
import axios from "axios";
import { API } from "../../utitlties";
import RecievedPaymentsTab from "./RecievedPaymentsTab";
import DeliveryTab from "./DeliveryTab";
import SalesSummaryTab from "./SalesSummaryTab";

const { Option } = Select;
class SalesTab extends Component {
  constructor(props) {
    super(props);
    this.changeTotalContract.bind(this);
    this.changeTotalDelivery.bind(this);
    this.changeTotalSupplirs.bind(this);
    this.changeTotalPayment.bind(this);
  }
  state = {
    deliveries_total_value: this.props?.deliveries_total_value,
    contracts_total_value: this.props?.contracts_total_value,
    received_payment_total: this.props?.received_payment_total,
    received_payment_rows:[],
    company_id: this.props?.company_id,
    currency:this.props?._currency
  };
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
    axios.get(`${API}get-contracts/${this.props.id}`).then((response) => {
      this.setState({
        contract_rows: response.data.contracts,
        received_payment_rows: response.data.received_payment,
        first_currency: response.data.contracts[0]?.contract_currency,
        received_payment_total: response.data.received_payment_total,
        // contracts_total: response.data.contracts_total,
        // contracts_total: response.data.contracts_total,
        contracts_total: response.data.contracts_total_with_tax,
        // contracts_total_value: response.data.contracts_total,
        contracts_total_value: response.data.contracts_total_with_tax,
        loading: false,
      });
    });
  }
  changePaymentRows=(received_payment_rows) => {
    this.setState({ received_payment_rows });
  };
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
              <Tab>Contracts</Tab>
              <Tab>Received Payments</Tab>
              <Tab>Deliveries</Tab>
              <Tab>Summary</Tab>
            </TabList>
            <TabPanel>
              <ContractTab
                id={this.props.id}
                _currency={this.state.currency}
                changeTotalContract={this.changeTotalContract}
                changeTotalPayment={this.changeTotalPayment}
               changeTotalDelivery={this.changeTotalDelivery}
               changeTotalSupplirs={this.changeTotalSupplirs}
              />
            </TabPanel>
            <TabPanel>
              <RecievedPaymentsTab
                // forceRender
                id={this.props.id}
                _currency={this.state.currency}
                received_payment_rows={this.state.received_payment_rows}
                received_payment_total={this.state.received_payment_total}
                changeTotalContract={this.changeTotalContract}
                changeTotalPayment={this.changeTotalPayment}
                changePaymentRows={this.changePaymentRows}
               changeTotalDelivery={this.changeTotalDelivery}
               changeTotalSupplirs={this.changeTotalSupplirs}
              />
            </TabPanel>
            <TabPanel>
              <DeliveryTab
                id={this.props.id}
                deliveries_total_value={this.state.deliveries_total_value}
                contracts_total_value={this.state.contracts_total_value}
                received_payment_total={this.state.received_payment_total}
                _currency={this.state.currency}
                company_id={this.state.company_id}
                changeTotalContract={this.changeTotalContract}
                changeTotalPayment={this.changeTotalPayment}
               changeTotalDelivery={this.changeTotalDelivery}
               changeTotalSupplirs={this.changeTotalSupplirs}
              />
            </TabPanel>
            <TabPanel>
              <SalesSummaryTab
                changeTotalContract={this.changeTotalContract}
                changeTotalPayment={this.changeTotalPayment}
               changeTotalDelivery={this.changeTotalDelivery}
               changeTotalSupplirs={this.changeTotalSupplirs}
                total_contracts_value={this.state.contracts_total_value}
                deliveries_total_value={this.state.deliveries_total_value}
                received_payment_total={this.state.received_payment_total}
                _currency={this.state.currency}

              />
            </TabPanel>
          </Tabs>
        </div>

        <Modal
          footer={false}
          destroyOnClose
          className="file-modal border-radius"
          open={this.state.recieved_payment_modal}
          onCancel={() => {
            this.setState({
              recieved_payment_modal: false,
            });
          }}
          closable
        >
          <p className="modal-header">Add Received Payment</p>
          <Form onFinish={this.onPaymentFinish} size="large" layout="vertical">
            <Form.Item name="referance" label="Referance">
              <Input placeholder="type  payment referance" />
            </Form.Item>

            <Form.Item label="Value" name="value">
              <Input placeholder="Payment Value" />
            </Form.Item>

            <Row justify={"end"}>
              <Col>
                <Button htmlType="submit" className="arch-btn">
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>

        {/* edit payment  */}
        <Modal
          footer={false}
          destroyOnClose
          className="file-modal border-radius"
          open={this.state.edit_recieved_payment_modal}
          onCancel={() => {
            this.setState({
              edit_recieved_payment_modal: false,
            });
          }}
          closable
        >
          <p className="modal-header">Edit Received Payment</p>
          <Form
            onFinish={this.editPaymentFinish}
            size="large"
            layout="vertical"
          >
            <Form.Item
              name="referance"
              label="Referance"
              initialValue={this.state.payment_to_edit?.referance}
            >
              <Input placeholder="input placeholder" />
            </Form.Item>

            <Form.Item
              label="Value"
              name="value"
              initialValue={this.state.payment_to_edit?.value}
            >
              <Input placeholder="Payment Value" />
            </Form.Item>

            <Row justify={"end"}>
              <Col>
                <Button htmlType="submit" className="arch-btn">
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </>
    );
  }
}

export default SalesTab;
