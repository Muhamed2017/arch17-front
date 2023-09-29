import axios from "axios";
import React, { Component } from "react";
import { API } from "../../utitlties";
import { Button, Modal, Input, Form, Row, Col, Select, DatePicker } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  DownloadOutlined,
  ExclamationCircleFilled
} from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
const { confirm } = Modal;

class RecievedPaymentsTab extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    received_payment_rows: this.props?.received_payment_rows ?? [],
    received_payment_total: this.props?.received_payment_total ?? 0,
    changeTotalPayment: this.props?.changeTotalPayment,
    changePaymentRows: this.props?.changePaymentRows,
    _currency: this.props?._currency,
  };
  deleteModal = () => {
    confirm({
      title: `Do you Want to delete ${this.state.payment_to_delete?.referance}  Payment? `,
      icon: <ExclamationCircleFilled />,
      onOk: () => {
        const id = this.state.payment_to_delete?.id;
      this.handleDeletePayment(id)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  handleDeletePayment = (id) => {
    const received_payment_rows = this.state.received_payment_rows;
    const index = received_payment_rows.findIndex(
      (payment) => id === payment.id
    );
    const value = this.state.received_payment_rows[index]?.value;
    axios.post(`${API}rpayment-delete/${id}`).then((response) => {
      console.log(response);
      this.setState(
        {
          received_payment_rows: this.state.received_payment_rows?.filter(
            (r) => {
              return r.id !== id;
            }
          ),
          received_payment_total: (
            parseFloat(this.state.received_payment_total) - parseFloat(value)
          ).toFixed(2),
        },
        () => {
          this.updatetotalPayment(this.state.received_payment_total);
          this.updatePaymentRows(this.state.received_payment_rows)

        }
      );
    });
  };

  updatetotalPayment = (received_payment_total) => {
    this.state.changeTotalPayment(received_payment_total);
  };

  updatePaymentRows = (rows) => {
    this.state.changePaymentRows(rows);
  };
  editPaymentFinish = (values) => {
    console.log(values);
    console.log(this.state.payment_to_edit);
    const fd = new FormData();
    fd.append("referance", values.referance);
    fd.append("value", values.value);
    fd.append("date", this.state.edited_date);

    const received_payment_rows = this.state.received_payment_rows;
    const index = received_payment_rows.findIndex(
      (payment) => this.state.payment_to_edit.id === payment.id
    );
    const less_value = received_payment_rows[index].value;

    received_payment_rows[index].referance = values?.referance;
    received_payment_rows[index].value = values?.value;
    received_payment_rows[index].date = this.state.edited_date;
    const plus_value = values.value;
    this.setState(
      {
        received_payment_total: (
          parseFloat(this.state.received_payment_total) -
          parseFloat(less_value) +
          parseFloat(plus_value)
        ).toFixed(2),
      },
      () => {
        this.updatetotalPayment(this.state.received_payment_total);
      }
    );

    axios
      .post(`${API}edit-rpayment/${this.state.payment_to_edit?.id}`, fd)
      .then((response) => {
        console.log(response);
        this.setState({
          received_payment_rows,
          edit_recieved_payment_modal: false,
        },()=>{
          this.updatePaymentRows(this.state.received_payment_rows)
        });
      });
  };

  onPaymentFinish = (values) => {
    const fd = new FormData();
    values["date"] = this.state.date;

    fd.append("referance", values.referance);
    fd.append("value", values.value);
    fd.append("date", values.date);
    axios.post(`${API}add-rpayment/${this.props.id}`, fd).then((response) => {
      values["id"] = response.data.received_payment.id;
      this.setState(
        {
          received_payment_rows: [...this.state.received_payment_rows, values],
          received_payment_total: (
            parseFloat(this.state.received_payment_total) +
            parseFloat(values.value)
          ).toFixed(2),
        },
        () => {
          this.setState({
            recieved_payment_modal: false,
          });
          this.updatetotalPayment(this.state.received_payment_total);
          this.updatePaymentRows(this.state.received_payment_rows)


        }
      );
    });
  };

  handleCurrencyChange = (selectedCurrency) => {
    this.setState({ selectedCurrency }, () => {
      console.log(this.state.selectedCurrency);
    });
  };

  openContractAddModal = () => {
    this.setState({
      add_contract_modal: true,
    });
  };

  openPaymentAddModal = () => {
    this.setState({
      recieved_payment_modal: true,
    });
  };

  addFileToContract = (contract) => {
    this.setState(
      {
        contract_to_file: contract,
      },
      () => {
        this.setState({
          add_file_modal: true,
        });
      }
    );
  };

  addFileFininsh = (values) => {
    console.log(values);
    const fd = new FormData();
    fd.append("contract_files_link", values.contract_files_link);
    const contract_rows = this.state.contract_rows;
    const index = contract_rows.findIndex(
      (c) => this.state.contract_to_file.id === c.id
    );

    contract_rows[index].contract_files_link = values?.contract_files_link;

    axios
      .post(`${API}pom-file/contract/${this.state.contract_to_file?.id}`, fd)
      .then((response) => {
        console.log(response);
        this.setState({
          add_file_modal: false,
          contract_rows,
        });
      });
  };

  handleCopy = async (text) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text).then((r) => {
        toast("Copied");
      });
    } else {
      return document.execCommand("copy", true, text);
    }
  };

  onChangeEdit = (d, edited_date) => {
    console.log(d, edited_date);
    this.setState({
      edited_date,
    });
  };

  onChangeDate = (d, date) => {
    console.log(d, date);
    this.setState({
      date,
    });
  };

  render() {
    return (
      <>
        <div className="tables-page">
          <div className="btns-actions">
            <button>
              Download{" "}
              <span>
                <DownloadOutlined />
              </span>
            </button>

            <button onClick={this.openPaymentAddModal}>Add Payment +</button>
          </div>
          <div>
            <div className="pom-table">
              <div className="table-wrapper">
                <table id="client-lists">
                  <tr>
                    <th className="num-col">NO.</th>
                    <th className="width-220">Referance, Date</th>
                    <th className="width-600">Value</th>
                  </tr>
                  {this.state.received_payment_rows?.map((payment, index) => {
                    return (
                      <tr className="white light-hover">
                        <td>
                          <div className="inline-block">{index + 1}</div>
                        </td>
                        <td>
                          <div className="edit-delete">
                            <Row gutter={5}>
                              <Col md={8}>
                                <span>
                                  <DownloadOutlined />
                                </span>
                              </Col>
                              <Col md={8}>
                                <EditOutlined
                                  onClick={() => {
                                    this.setState(
                                      {
                                        row_index: index,
                                        payment_to_edit: payment,
                                        edited_date: payment?.date,
                                      },
                                      () => {
                                        this.setState({
                                          edit_recieved_payment_modal: true,
                                        });
                                      }
                                    );
                                  }}
                                />
                              </Col>
                              <Col md={8}>
                                <DeleteOutlined
                                  onClick={() =>
                                    // this.handleDeletePayment(payment.id)
                                    this.setState({
                                      payment_to_delete:payment
                                    },()=>{
                                      this.deleteModal()
                                    })
                                  }
                                />
                              </Col>
                            </Row>
                          </div>
                          <p className="main">{payment.referance}</p>
                          {/* <p className="sec">AUG 9, 2023</p> */}
                          <p className="sec">{payment?.date}</p>
                        </td>
                        <td>
                          <p className="main">
                            {Number(
                              parseFloat(payment.value).toFixed(2)
                            )?.toLocaleString()}
                          </p>
                          <p className="sec">{this.state?._currency}</p>
                        </td>
                      </tr>
                    );
                  })}
                  {this.state.received_payment_rows.length > 0 && (
                    <tr>
                      <td colSpan={2}>
                        <p className="sale">Total Recieved Payments</p>
                      </td>
                      <td colSpan={4}>
                        <p className="main">
                          {Number(
                            parseFloat(
                              this.state.received_payment_total
                            ).toFixed(2)
                          )?.toLocaleString()}
                        </p>
                        <p className="sec">{this.state?._currency}</p>
                      </td>
                    </tr>
                  )}
                </table>
              </div>
            </div>
          </div>
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
            <Form.Item
              name="referance"
              label="Referance"
              rules={[
                {
                  required: true,
                  message: "Referance is required!",
                },
              ]}
            >
              <Input placeholder="type  payment referance" />
            </Form.Item>
            <Form.Item
              name="date"
              label="Date"
              rules={[
                {
                  required: true,
                  message: "Date is required!",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                onChange={this.onChangeDate}
              />
            </Form.Item>

            <Form.Item
              label="Value"
              name="value"
              rules={[
                {
                  required: true,
                  message: "Value is required!",
                },
              ]}
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
              rules={[
                {
                  required: true,
                  message: "Date is required!",
                },
              ]}
              name="date"
              label="Date"
              initialValue={moment(
                this.state.payment_to_edit?.date,
                "YYYY. MM. DD"
              )}
            >
              <DatePicker
                style={{ width: "100%" }}
                onChange={this.onChangeEdit}
              />
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

export default RecievedPaymentsTab;
