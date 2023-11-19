import React, { Component } from "react";
import { Button, Modal, Input, Form, Row, Col, Spin,
  DatePicker,Dropdown } from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  DownloadOutlined,
  ExclamationCircleFilled
} from "@ant-design/icons";

import toast, { Toaster } from "react-hot-toast";

import { FaFilePdf } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";

import { API } from "../../utitlties";
import moment from "moment";
const { confirm } = Modal;



class DeliveryTab extends Component {
  constructor(props) {
    super(props);
    this.updatetotalDelivery.bind(this);
    this.state = {
      add_delivery_modal: false,
      delivery_rows: [],
      loading: true,
      edit_delivery_modal: false,
      delivery_to_edit: null,
      entity_name:this.props.entity_name,
      entity_id:this.props.entity_id,
      delivery_to_file: null,
      add_file_modal: false,
      contracts_total_value: parseFloat(
        this.props.contracts_total_value
      ).toFixed(2),
      deliveres_total_value: parseFloat(
        this.props.deliveries_total_value
      ).toFixed(2),
      received_payment_total: parseFloat(
        this.props.received_payment_total
      ).toFixed(2),
      _currency: this.props?._currency,
    };
  }

  updatetotalDelivery = (deliveres_total_value) => {
    this.props.changeTotalDelivery(deliveres_total_value);
  };

  componentDidMount() {
    axios.get(`${API}get-deliveres/${this.props.id}`).then((response) => {
      this.setState({
        delivery_rows: response.data.deliveries,
        loading: false,
      });
    });
  }
  
  deleteModal = () => {
    confirm({
      title: `Do you Want to delete ${this.state.delivery_to_delete?.referance} Delivery? `,
      icon: <ExclamationCircleFilled />,
      onOk: () => {
        const id = this.state.delivery_to_delete?.id;
      this.handleDeleteDelivery(id)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  onFinish = (values) => {
    values["value"] = values.value?.replaceAll(",", "");
    const fd = new FormData();
    values["loading_date"] = this.state.loading_date;

    fd.append("referance", values.referance);
    fd.append("ci_no", values.ci_no);
    fd.append("value", values.value);
    fd.append("loading_date", values.loading_date);
    axios.post(`${API}add-delivery/${this.props.id}`, fd).then((response) => {
      values["id"] = response.data.delivery.id;
      this.setState(
        {
          delivery_rows: [...this.state.delivery_rows, values],
          deliveres_total_value: (
            parseFloat(this.state.deliveres_total_value) +
            parseFloat(values.value)
          ).toFixed(2),
        },
        () => {
          this.setState({
            add_delivery_modal: false,
          });
          this.updatetotalDelivery(this.state.deliveres_total_value);
        }
      );
    });
  };

  openDeliveryAddModal = () => {
    this.setState({
      add_delivery_modal: true,
    });
  };

  
  items = [
    {
      key: "1",
      label: (
        <div
        className="menu-download-item"
        >
          <span>
             With EX.Rate
          </span>
          <a  href={`${API}export-sales/${this.props.id}`}>
          <SiMicrosoftexcel />
          </a>
          <a  href={`${API}sales-pdf/${this.props.id}`}>
          <FaFilePdf />
          </a>
        </div>
      ),
    },
    {
      key: "2",
      label: (
       
        <div
        className="menu-download-item"
        >
          <span>
            Without EX.Rate
          </span>
          <a  href={`${API}export-salesw/${this.props.id}`}>
          <SiMicrosoftexcel />
          </a>
          <a  href={`${API}sales-pdfw/${this.props.id}`}>
          <FaFilePdf />
          </a>
        </div>
      ),
    },
  ];

  handleDeleteDelivery = (id) => {
    const delivery_rows = this.state.delivery_rows;
    const index = delivery_rows.findIndex((d) => id === d.id);
    const value = this.state.delivery_rows[index]?.value;
    axios.post(`${API}delivery-delete/${id}`).then((response) => {
      console.log(response);
      this.setState(
        {
          delivery_rows: this.state.delivery_rows?.filter((r) => {
            return r.id !== id;
          }),
          deliveres_total_value: (
            parseFloat(this.state.deliveres_total_value) - parseFloat(value)
          ).toFixed(2),
        },
        () => {
          this.updatetotalDelivery(this.state.deliveres_total_value);
        }
      );
    });
  };

  addFileToDelivey = (delivery) => {
    this.setState(
      {
        delivery_to_file: delivery,
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
    const delivery_rows = this.state.delivery_rows;
    const index = delivery_rows.findIndex(
      (d) => this.state.delivery_to_file.id === d.id
    );

    delivery_rows[index].contract_files_link = values?.contract_files_link;

    axios
      .post(`${API}pom-file/delivery/${this.state.delivery_to_file?.id}`, fd)
      .then((response) => {
        console.log(response);
        this.setState({
          add_file_modal: false,
          delivery_rows,
        });
      });
  };
  onChangeEdit = (d, edited_loading_date) => {
    console.log(d, edited_loading_date);
    this.setState({
      edited_loading_date,
    });
  };
  editDeliveryFinish = (values) => {

    values["value"] = values.value?.replaceAll(",", "");
    console.log(values);
    console.log(this.state.delivery_to_edit);
    const fd = new FormData();
    fd.append("referance", values.referance);
    fd.append("ci_no", values.ci_no);
    fd.append("value", values.value);
    fd.append("loading_date", this.state.edited_loading_date);
    const deliveres_rows = this.state.delivery_rows;

    const index = deliveres_rows.findIndex(
      (delivery) => this.state.delivery_to_edit.id === delivery.id
    );

    const less_value = this.state.delivery_rows[index].value;
    const plus_value = values.value;
    this.setState({
      deliveres_total_value: (
        parseFloat(this.state.deliveres_total_value) -
        parseFloat(less_value) +
        parseFloat(plus_value)
      ).toFixed(2),
    });

    deliveres_rows[index].referance = values?.referance;
    deliveres_rows[index].ci_no = values.ci_no;
    deliveres_rows[index].value = values.value;

    axios
      .post(`${API}edit-delivery/${this.state.delivery_to_edit?.id}`, fd)
      .then((response) => {
        console.log(response);
        this.setState(
          {
            deliveres_rows,
            edit_delivery_modal: false,
          },
          () => {
            this.updatetotalDelivery(this.state.deliveres_total_value);
          }
        );
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
  onChangeDate = (d, loading_date) => {
    console.log(d, loading_date);
    this.setState({
      loading_date,
    });
  };
  render() {
    return (
      <>
        <div className="tables-page">
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
            <>
              <Toaster
                containerStyle={{
                  top: 100,
                }}
                position="top-center"
                duration={1}
              />
              <div className="btns-actions">
                <button>
                <Dropdown
                  overlayClassName="download-tables-menu"
                   placement="bottomLeft"
                    menu={{
                      items: this.items,
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      Download{" "}
                      <span>
                        <DownloadOutlined />
                      </span>
                    </a>
                  </Dropdown>
                </button>

                <button onClick={this.openDeliveryAddModal}>
                  Add Delivery +
                </button>
              </div>
              <div>
                <div className="pom-table">
                  <table id="client-lists" className="">
                    <tr>
                      <th className="num-col">NO.</th>
                      <th className="width-300">Invoice Number</th>
                      <th className="width-400">Referance</th>
                      <th className="width-250">Value</th>
                      <th>Files</th>
                    </tr>

                    {this.state.delivery_rows?.map((d, index) => {
                      return (
                        <tr className="white light-hover">
                          <td className="relative">
                            <div className="inline-block ">{index + 1}</div>
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
                                          delivery_to_edit: d,
                                          edited_loading_date:d?.loading_date
                                        },
                                        () => {
                                          this.setState({
                                            edit_delivery_modal: true,
                                          });
                                        }
                                      );
                                    }}
                                  />
                                </Col>
                                <Col md={8}>
                                  <DeleteOutlined
                                    onClick={() =>
                                      // this.handleDeleteDelivery(d.id)
                                      this.setState({
                                        delivery_to_delete:d
                                      },()=>{
                                        this.deleteModal()
                                      })
                                    }
                                  />
                                </Col>
                              </Row>
                            </div>
                            <p className="main">{d.ci_no}</p>
                            <p className="sec">{d?.loading_date}</p>
                          </td>
                          <td>
                            <p className="main">{d.referance}</p>
                          </td>
                          <td>
                            <p className="main">
                              {Number(
                                parseFloat(d.value).toFixed(2)
                              ).toLocaleString()}
                            </p>
                            <p className="sec">{this.state._currency}</p>
                          </td>
                          <td
                            onClick={() => {
                              this.addFileToDelivey(d);
                            }}
                          >
                            {d?.contract_files_link ? (
                              <a
                                target="_blank"
                                href={d.contract_files_link}
                                className="underline file-link"
                              >
                                Get Files
                              </a>
                            ) : (
                              <span className="pointer">Add File Link</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {this.state.delivery_rows?.length > 0 && (
                      <tr className="border-top-1">
                        <td colSpan={3}>
                          <p className="sale">Total Deilverd Value</p>
                        </td>
                        <td colSpan={4}>
                          <p className="main">
                            {Number(
                              parseFloat(
                                this.state.deliveres_total_value
                              ).toFixed(2)
                            )?.toLocaleString()}
                          </p>
                          <p className="sec">{this.state._currency}</p>
                        </td>
                      </tr>
                    )}
                  </table>
                </div>
              </div>

              <Modal
                footer={false}
                destroyOnClose
                className="file-modal border-radius"
                open={this.state.add_delivery_modal}
                onCancel={() => {
                  this.setState({
                    add_delivery_modal: false,
                  });
                }}
                closable
              >
                <p className="modal-header">Add Delivery</p>
                <Form onFinish={this.onFinish} size="large" layout="vertical">
                  <Form.Item name="referance" label="Referance"
                  
                  rules={[
                    {
                      required: true,
                      message: "Referance is required!",
                    },
                  ]}
                  >
                    <Input placeholder="input referance" />
                  </Form.Item>

                  <Form.Item label="Commercial No" name="ci_no"
                   rules={[
                    {
                      required: true,
                      message: "Commercial Number is required!",
                    },
                  ]}
                  >
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                  <Form.Item label="Value" name="value"
                   rules={[
                    {
                      required: true,
                      message: "Value is required!",
                    },
                  ]}
                  >
                    <Input placeholder="Value" />
                  </Form.Item>
                  <Form.Item
                    name="loading_date"
                    label="Loading Date"
                    rules={[
                      {
                        required: true,
                        message: "Loading Date is required!",
                      },
                    ]}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={this.onChangeDate}
                    />
                  </Form.Item>

                  <Row justify={"end"}>
                    <Col>
                      <Button className="arch-btn" htmlType="submit">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Modal>

              {/* edit delivery modal */}
              <Modal
                footer={false}
                destroyOnClose
                className="file-modal border-radius"
                open={this.state.edit_delivery_modal}
                onCancel={() => {
                  this.setState({
                    edit_delivery_modal: false,
                  });
                }}
                // title=""
                closable
              >
                <p className="modal-header">Edit Delivery</p>
                <Form
                  onFinish={this.editDeliveryFinish}
                  size="large"
                  layout="vertical"
                  name="edit"
                >
                  <Form.Item
                    name="referance"
                    label="Referance"
                    initialValue={this.state.delivery_to_edit?.referance}
                  >
                    <Input placeholder="input referance" />
                  </Form.Item>

                  <Form.Item
                    label="Commercial No"
                    name="ci_no"
                    initialValue={this.state.delivery_to_edit?.ci_no}
                  >
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                  <Form.Item
                    label="Value"
                    name="value"
                    initialValue={this.state.delivery_to_edit?.value}
                  >
                    <Input placeholder="Value" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Loading Date is required!",
                      },
                    ]}
                    name="loading_date"
                    label="Loading Date"
                    initialValue={moment(
                      this.state.delivery_to_edit?.loading_date,
                      "YYYY. MM. DD"
                    )}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={this.onChangeEdit}
                    />
                  </Form.Item>

                  <Row justify={"end"}>
                    <Col>
                      <Button className="arch-btn" htmlType="submit">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Modal>

              <Modal
                footer={false}
                // width={400}
                className="file-modal border-radius"
                destroyOnClose
                open={this.state.add_file_modal}
                onCancel={() => {
                  this.setState({
                    add_file_modal: false,
                  });
                }}
                closable
              >
                <p className="modal-header">Add File Link</p>
                <Form
                  onFinish={this.addFileFininsh}
                  size="large"
                  layout="vertical"
                >
                  <Form.Item name="contract_files_link" label="Link">
                    <Input placeholder="Add a cloud link where you saved your files" />
                  </Form.Item>
                  <p className="modal-indicator">
                    Google Drive, OneDrive, Cloud
                  </p>

                  <Row justify={"end"}>
                    <Col>
                      <Button className="arch-btn" htmlType="submit">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Modal>
            </>
          )}
        </div>
      </>
    );
  }
}

export default DeliveryTab;
