import React, { Component } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
  Select,
  Spin,
  Dropdown,
  Space,
  DatePicker,
} from "antd";
import axios from "axios";
import { FaFilePdf } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import { API, VAT_TAX_OPTIONS } from "../../utitlties";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  DownloadOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
const { Option } = Select;
const { confirm } = Modal;

class InvoicesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add_invoice_modal: false,
      invoices_rows: [],
      invoices_total_value: 0,
      invoice_to_edit: null,
      invoice_to_file: null,
      edit_invoice_modal: false,
      loading: true,
      base_currency: this.props?.base_currency,
      _currency: this.props?._currency,
      project_id: this.props?.id,
    };
  }

  items = [
    {
      key: "1",
      label: (
        <div className="menu-download-item">
          <span>With EX.Rate</span>
          <a href={`${API}export-sales/${this.props.id}`}>
            <SiMicrosoftexcel />
          </a>
          <a href={`${API}sales-pdf/${this.props.id}`}>
            <FaFilePdf />
          </a>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="menu-download-item">
          <span>Without EX.Rate</span>
          <a href={`${API}export-salesw/${this.props.id}`}>
            <SiMicrosoftexcel />
          </a>
          <a href={`${API}sales-pdfw/${this.props.id}`}>
            <FaFilePdf />
          </a>
        </div>
      ),
    },
  ];
  handleDeleteInvoice = (id) => {
    const invoices_rows = this.state.invoices_rows;
    const index = invoices_rows.findIndex((invoice) => id === invoice.id);
    const value = this.state.invoices_rows[index]?.total;
    axios.post(`${API}invoice-delete/${id}`).then((response) => {
      console.log(response);
      this.setState(
        {
          invoices_rows: this.state.invoices_rows?.filter((invoice) => {
            return invoice.id !== id;
          }),
          total_invoices_value: this.state.invoices_rows
            ?.filter((invoice) => {
              return invoice.id !== id;
            })
            ?.reduce((accumulator, object) => {
              return parseFloat(accumulator) + parseFloat(object.total);
            }, 0),
        },
        () => {
          this.props.changeTotalInvoices(this.state.total_invoices_value);
        }
      );
    });
  };

  onFinish = (values) => {
    const fd = new FormData();
    values["value"] = values.value?.replaceAll(",", "");
    let subtotal, total, vat_tax_value;
    subtotal =
      parseFloat(values.value) /
      parseFloat(1 + parseFloat(values.vat_tax_percentage) / 100);
    total = values.value;
    vat_tax_value = total - subtotal;

    values["currency"] = this.props._currency;
    values["subtotal"] = subtotal;
    values["vat_tax_value"] = vat_tax_value;
    values["total"] = total;

    fd.append("invoice_number", values.invoice_number);
    fd.append("referance", values.referance);
    fd.append("currency", values.currency);
    fd.append("value", values.value);
    fd.append("subtotal", values.subtotal);
    fd.append("vat_tax_value", values.vat_tax_value);
    fd.append("vat_tax_percentage", values.vat_tax_percentage);
    fd.append("total", values.total);

    if (values.vat_tax_value) {
      fd.append("vat_tax_value", values.vat_tax_value);
    }
    console.log(values);
    axios.post(`${API}add-invoice/${this.props.id}`, fd).then((response) => {
      values["id"] = response.data.invoice.id;
      this.setState(
        {
          invoices_rows: [...this.state.invoices_rows, values],
          total_invoices_value: [...this.state.invoices_rows, values]?.reduce(
            (accumulator, object) => {
              return parseFloat(accumulator) + parseFloat(object.total);
            },
            0
          ),
        },
        () => {
          this.setState({
            add_invoice_modal: false,
          });

          this.props.changeTotalInvoices(this.state.total_invoices_value);
        }
      );
    });
  };

  deleteModal = () => {
    confirm({
      title: `Do you Want to delete ${this.state.invoice_to_delete?.invoice_number}  Invoice? `,
      icon: <ExclamationCircleFilled />,
      onOk: () => {
        const id = this.state.invoice_to_delete?.id;
        this.handleDeleteInvoice(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  editInvoiceFinish = (values) => {
    console.log(values);
    console.log(this.state.invoice_to_edit);
    let subtotal, total, vat_tax_value;
    values["value"] = values.value?.replaceAll(",", "");
    subtotal =
      parseFloat(values.value) /
      parseFloat(1 + parseFloat(values.vat_tax_percentage) / 100);
    total = values.value;
    vat_tax_value = total - subtotal;

    values["subtotal"] = subtotal;
    values["vat_tax_value"] = vat_tax_value;
    values["total"] = total;
    const fd = new FormData();
    fd.append("invoice_number", values.invoice_number);
    fd.append("subtotal", values.subtotal);
    fd.append("vat_tax_value", values.vat_tax_value);
    fd.append("vat_tax_percentage", values.vat_tax_percentage);
    fd.append("total", values.total);
    fd.append("referance", values.referance);
    fd.append("value", values.value);

    console.log(values);
    const invoices_rows = this.state.invoices_rows;

    const index = invoices_rows.findIndex(
      (invoice) => this.state.invoice_to_edit.id === invoice.id
    );

    invoices_rows[index].referance = values?.referance;
    invoices_rows[index].invoice_number = values.invoice_number;
    invoices_rows[index].value = values.value;
    invoices_rows[index].total = values.total;
    invoices_rows[index].subtotal = values?.subtotal;
    invoices_rows[index].vat_tax_percentage = values?.vat_tax_percentage;

    axios
      .post(`${API}edit-invoice/${this.state.invoice_to_edit?.id}`, fd)
      .then((response) => {
        console.log(response);
        this.setState(
          {
            invoices_rows,
            edit_invoice_modal: false,
            total_invoices_value: invoices_rows?.reduce(
              (accumulator, object) => {
                return parseFloat(accumulator) + parseFloat(object.total);
              },
              0
            ),
          },
          () => {
            this.props.changeTotalInvoices(this.state.total_invoices_value);
          }
        );
      });
  };

  componentDidMount() {
    axios.get(`${API}get-invoices/${this.props.id}`).then((response) => {
      this.setState({
        contracts: response.data.contracts,
        invoices_rows: response.data.invoices,
        receivedpayments:response.data.receivedpayments,
        loading: false,
      });
    });
  }
  onValuesEditing = (changedValues, allValues) => {
    allValues["value"] = allValues?.value?.replaceAll(",", "");
    let subtotal, total, vat_tax_value;

    if (allValues.value && allValues.value > 0) {
      subtotal =
        parseFloat(allValues.value) /
        parseFloat(1 + parseFloat(allValues.vat_tax_percentage) / 100);
      total = allValues.value;
      vat_tax_value = total - subtotal;
    }
    this.setState(
      {
        subtotal,
        total,
        vat_tax_value,
      },
      () => {
        console.log(this.state.total);
        console.log(this.state.vat_tax_value);
        console.log(this.state.subtotal);
      }
    );
  };

  addInvoiceValuesChange = (changedValues, allValues) => {
    allValues["value"] = allValues?.value?.replaceAll(",", "");
    let subtotal, total, vat_tax_value;

    if (allValues.value && allValues.value > 0) {
      subtotal =
        parseFloat(allValues.value) /
        parseFloat(1 + parseFloat(allValues.vat_tax_percentage) / 100);
      total = allValues.value;
      vat_tax_value = total - subtotal;
    }
    this.setState(
      {
        subtotal,
        total,
        vat_tax_value,
      },
      () => {
        console.log(this.state.total);
        console.log(this.state.vat_tax_value);
        console.log(this.state.subtotal);
      }
    );
  };

  openInvoiceAddModal = () => {
    this.setState({
      add_invoice_modal: true,
    });
  };

  addFileFininsh = (values) => {
    console.log(values);
    const fd = new FormData();
    fd.append("invoice_files_link", values.invoice_files_link);
    const invoices_rows = this.state.invoices_rows;
    const index = invoices_rows.findIndex(
      (c) => this.state.invoice_to_file.id === c.id
    );

    invoices_rows[index].invoice_files_link = values?.invoice_files_link;

    axios
      .post(
        `${API}pom-file/invoice/${this.state.invoice_to_file_to_file?.id}`,
        fd
      )
      .then((response) => {
        console.log(response);
        this.setState({
          add_file_modal: false,
          invoices_rows,
        });
      });
  };
  addFileToInvoice = (invoice) => {
    this.setState(
      {
        invoiceto_file: invoice,
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
    fd.append("invoice_files_link", values.invoice_files_link);
    const invoices_rows = this.state.invoices_rows;
    const index = invoices_rows.findIndex(
      (c) => this.state.invoice_to_file.id === c.id
    );

    invoices_rows[index].invoice_files_link = values?.invoice_files_link;

    axios
      .post(`${API}pom-file/invoice/${this.state.invoice_to_file?.id}`, fd)
      .then((response) => {
        console.log(response);
        this.setState({
          add_file_modal: false,
          invoices_rows,
        });
      });
  };
  formateNumber = (number) => {
    return Number(parseFloat(number).toFixed(2))?.toLocaleString();
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
                <button onClick={this.openInvoiceAddModal}>
                  Add Invoice +
                </button>
              </div>
              <div>
                <div className="pom-table">
                  <div className="table-wrapper">
                    <table id="client-lists" className="">
                      <tr>
                        <th className="num-col">NO.</th>
                        <th className="width-250">Referance</th>

                        <th className="width-300">Invoice NO, Date</th>
                        <th className="width-200">Sub Value</th>
                        <th className="width-150">Tax %</th>
                        <th className="width-200">Tax Value</th>
                        <th className="width-200">Total Value</th>
                        <th className="width-150">Files</th>
                      </tr>
                      {this.state.invoices_rows?.map((invoice, index) => {
                        return (
                          <tr className="white light-hover cells">
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
                                            invoice_to_edit: invoice,
                                            subtotal: invoice?.subtotal,
                                            total: invoice?.total,
                                            vat_tax_value:
                                              invoice?.vat_tax_value,
                                          },
                                          () => {
                                            this.setState({
                                              edit_invoice_modal: true,
                                            });
                                          }
                                        );
                                      }}
                                    />
                                  </Col>
                                  <Col md={8}>
                                    <DeleteOutlined
                                      onClick={() =>
                                        this.setState(
                                          {
                                            invoice_to_delete: invoice,
                                          },
                                          () => {
                                            this.deleteModal();
                                          }
                                        )
                                      }
                                    />
                                  </Col>
                                </Row>
                              </div>
                              <p className="main">{invoice?.referance}</p>
                            </td>
                            <td>
                              <p className="main">{invoice.invoice_number}</p>
                            </td>
                            <td>
                              <p className="main">
                                {this.formateNumber(invoice?.subtotal)}
                              </p>
                              <p className="sec">{invoice?.currency}</p>
                            </td>
                            <td>
                              <p className="main">
                                {this.formateNumber(
                                  invoice?.vat_tax_percentage
                                )}
                                {"  %"}
                              </p>
                            </td>
                            <td>
                              <p className="main">
                                {this.formateNumber(invoice?.vat_tax_value)}
                              </p>
                              <p className="sec">{invoice?.currency}</p>
                            </td>
                            <td>
                              <p className="main">
                                {Number(
                                  parseFloat(invoice.total)?.toFixed(2)
                                )?.toLocaleString()}
                              </p>
                              <p className="sec">{invoice?.currency}</p>
                            </td>

                            <td>
                              {invoice?.invoice_files_link ? (
                                <a
                                  target="_blank"
                                  href={invoice.invoice_files_link}
                                  className="underline file-link"
                                >
                                  Get Files
                                </a>
                              ) : (
                                <p
                                  onClick={() => {
                                    this.addFileToInvoice(invoice);
                                  }}
                                >
                                  <span className="pointer">Add File Link</span>
                                </p>
                              )}
                            </td>
                          </tr>
                        );
                      })}

                      {this.state.invoices_rows.length > 0 && (
                        <>
                          <tr className="calcs-sep border-top-1">
                            <td colSpan={3}>
                              <p className="high">Total Tax Invoiced Value</p>
                            </td>
                            <td colSpan={2}>
                              <p className="high">
                                {Number(
                                  parseFloat(
                                    this.state.invoices_rows?.reduce(
                                      (accumulator, object) => {
                                        return (
                                          parseFloat(accumulator) +
                                          parseFloat(object.subtotal)
                                        );
                                      },
                                      0
                                    )
                                  ).toFixed(2)
                                )?.toLocaleString()}
                              </p>
                              <p className="sec">
                                {this.state.invoices_rows[0]?.currency}
                              </p>
                            </td>
                            <td>
                              <p className="high">
                                {Number(
                                  parseFloat(
                                    this.state.invoices_rows?.reduce(
                                      (accumulator, object) => {
                                        return (
                                          parseFloat(accumulator) +
                                          parseFloat(object.vat_tax_value)
                                        );
                                      },
                                      0
                                    )
                                  ).toFixed(2)
                                )?.toLocaleString()}
                              </p>
                              <p className="sec">{this.state.base_currency}</p>
                            </td>
                            <td colSpan={2}>
                              <p className="high">
                                {Number(
                                  parseFloat(
                                    this.state.invoices_rows?.reduce(
                                      (accumulator, object) => {
                                        return (
                                          parseFloat(accumulator) +
                                          parseFloat(object.total)
                                        );
                                      },
                                      0
                                    )
                                  ).toFixed(2)
                                )?.toLocaleString()}
                              </p>
                              <p className="sec">{this.state.base_currency}</p>
                            </td>
                          </tr>
                        </>
                      )}
                      <tr className="">
                        <td colSpan={6}>
                          <p className="high">Total un-issued taxable Value</p>
                        </td>
                        <td>
                          <p className="high">
                            {
                             this.formateNumber( parseFloat(
                              this.state.receivedpayments?.reduce(
                                (accumulator, object) => {
                                  return (
                                    parseFloat(accumulator) +
                                    parseFloat(object.value)
                                  );
                                },
                                0
                              )
                            )- parseFloat(
                              this.state.invoices_rows?.reduce(
                                (accumulator, object) => {
                                  return (
                                    parseFloat(accumulator) +
                                    parseFloat(object.total)
                                  );
                                },
                                0
                              )
                            ))
                            }
                          </p>
                          <p className="sec">{this.state.base_currency}</p>
                        </td>
                        <td></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <Modal
                footer={false}
                destroyOnClose
                centered
                className="file-modal border-radius"
                open={this.state.add_invoice_modal}
                onCancel={() => {
                  this.setState({
                    add_invoice_modal: false,
                  });
                }}
                closable
              >
                <p className="modal-header">Add Invoice</p>
                <Form
                  onChange={() => {
                    console.log("changed");
                  }}
                  onFinish={this.onFinish}
                  size="large"
                  layout="vertical"
                  onValuesChange={this.addInvoiceValuesChange}
                >
                  <Form.Item
                    name="invoice_number"
                    label="Invoice NO."
                    rules={[
                      {
                        required: true,
                        message: "Invoice Number is required!",
                      },
                    ]}
                  >
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                  <Form.Item
                    label="Referance"
                    name="referance"
                    rules={[
                      {
                        required: true,
                        message: "Invoice Referance is required!",
                      },
                    ]}
                  >
                    <Input placeholder="type invoice referance" />
                  </Form.Item>
                  <Row gutter={25}>
                    <Col md={24}>
                      <Form.Item
                        label="Total Value"
                        name="value"
                        rules={[
                          {
                            required: true,
                            message: "Invoice Value is required!",
                          },
                        ]}
                      >
                        <Input placeholder="Invoice Value" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item name="vat_tax_percentage" label="Add Tax %">
                    <Input
                      placeholder="Please add the Tax % of the total invoice total"
                      suffix="%"
                      max={100.0}
                      min={0.0}
                      type="float"
                    />
                  </Form.Item>
                  {this.state.vat_tax_value &&
                    this.state.vat_tax_value > 0 &&
                    this.state.subtotal &&
                    this.state.subtotal > 0 &&
                    this.state.total &&
                    this.state.total > 0 && (
                      <p className="fs-18 monitor">
                        <div>
                          <span>Sub-total:</span>
                          {` ${this.formateNumber(this.state.subtotal)}`}
                        </div>
                        <div>
                          <span>Vat Tax:</span>
                          {` ${this.formateNumber(this.state.vat_tax_value)}`}
                        </div>
                        <div>
                          <span>Total:</span>
                          {` ${this.formateNumber(this.state.total)}`}
                        </div>
                      </p>
                    )}
                  <Row justify={"end"}>
                    <Col>
                      <Button htmlType="submit" className="arch-btn">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Modal>

              {/* edit invoice modal */}
              <Modal
                footer={false}
                destroyOnClose
                className="file-modal border-radius"
                open={this.state.edit_invoice_modal}
                onCancel={() => {
                  this.setState({
                    edit_invoice_modal: false,
                    subtotal: 0,
                    total: 0,
                    vat_tax_value: 0,
                  });
                }}
                closable
              >
                <p className="modal-header">Edit Invoice</p>
                <Form
                  onFinish={this.editInvoiceFinish}
                  onValuesChange={this.onValuesEditing}
                  size="large"
                  layout="vertical"
                  name="edit"
                >
                  <Form.Item
                    label="Referance"
                    name="referance"
                    initialValue={this.state.invoice_to_edit?.referance}
                  >
                    <Input placeholder="input placeholder" />
                  </Form.Item>

                  <Form.Item
                    name="invoice_number"
                    label="Invoice NO."
                    initialValue={this.state.invoice_to_edit?.invoice_number}
                  >
                    <Input placeholder="input placeholder" />
                  </Form.Item>

                  <Row gutter={25}>
                    <Col md={24}>
                      <Form.Item
                        label="Total Value"
                        name="value"
                        initialValue={this.state.invoice_to_edit?.value}
                      >
                        <Input placeholder="Invoice Value" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="vat_tax_percentage"
                    label="Add Tax %"
                    initialValue={
                      this.state.invoice_to_edit?.vat_tax_percentage ?? 0
                    }
                  >
                    <Input
                      placeholder="Please add the Tax % of the total Invoice Value"
                      suffix="%"
                      max={100}
                      min={0}
                      type="float"
                    />
                  </Form.Item>
                  {this.state.vat_tax_value &&
                    this.state.vat_tax_value > 0 &&
                    this.state.subtotal &&
                    this.state.subtotal > 0 &&
                    this.state.total &&
                    this.state.total > 0 && (
                      <p className="fs-18 monitor">
                        <div>
                          <span>Sub-total:</span>
                          {` ${this.formateNumber(this.state.subtotal)}`}
                        </div>
                        <div>
                          <span>Vat Tax:</span>
                          {` ${this.formateNumber(this.state.vat_tax_value)}`}
                        </div>
                        <div>
                          <span>Total:</span>
                          {` ${this.formateNumber(this.state.total)}`}
                        </div>
                      </p>
                    )}
                  <Row justify={"end"}>
                    <Col>
                      <Button htmlType="submit" className="arch-btn">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Modal>
              <Modal
                footer={false}
                destroyOnClose
                className="file-modal border-radius"
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
                  <Form.Item name="invoice_files_link">
                    <Input placeholder="Add a cloud link where you saved your files" />
                  </Form.Item>
                  <p className="modal-indicator">
                    Google Drive, OneDrive, Cloud
                  </p>

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
          )}
        </div>
      </>
    );
  }
}

export default InvoicesTab;
