import React, { Component } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
  Select,
  Collapse,
  DatePicker,
} from "antd";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa";

import {
  DeleteOutlined,
  EditOutlined,
  DownloadOutlined,
  // CaretDownOutlined,
  DownOutlined,
  UpOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { API, POINVOICES_TYPES } from "../../utitlties";
import axios from "axios";
const { Option } = Select;

const { confirm } = Modal;
const { Panel } = Collapse;
class PoInvoicesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company_id: this.props.company_id,
      project_id: this.props.project_id,
      poinvoices_sub: {},
      poinvoices_currencies: {},
      poinvoices_tags: {},
      refandable_poinvoices_tags_values: [],
      refandable_poinvoices_tags_keys: [],
      refanded_poinvoices_tags_keys: [],
      refanded_poinvoices_tags_values: [],
      poinvoices_sub_keys: [],
      base_currency: this.props.base_currency,
      render_by: "vendor",
      show_type:true,
      edit_show_type:true,
      total_refandable_poinvoices_amount:[]
    };
  }

  openAddModal = () => {
    this.setState({
      add_modal: true,
    });
  };

  onFinish = (values) => {
    if (this.state.tag_added_with_this_currency) {
      return;
    }
    const fd = new FormData();
    values["value"] = values.value?.replaceAll(",", "");
    let subtotal, total, vat_tax_value;
    subtotal =
      parseFloat(values.value) /
      parseFloat(1 + parseFloat(values.vat_tax_percentage) / 100);
    total = values.value;
    vat_tax_value = total - subtotal;

    values["subtotal"] = subtotal;
    values["vat_tax_value"] = vat_tax_value;
    values["total"] = total;

    if(this.state.base_currency!== this.state.selected_currency){
      values['type']="Non Deductible / non refundable"
    }

    fd.append("invoice_number", values.invoice_number);
    fd.append("supplier_id", values.supplier_id);
    fd.append("value", values.value);
    fd.append("type", values.type);
    fd.append("tag", values.tag);
    fd.append("subtotal", values.subtotal);
    fd.append("vat_tax_value", values.vat_tax_value);
    fd.append("vat_tax_percentage", values.vat_tax_percentage);
    fd.append("total", values.total);

    if (values.vat_tax_value) {
      fd.append("vat_tax_value", values.vat_tax_value);
    }
    console.log(values);
    axios
      .post(`${API}add-poinvoice/${this.props.project_id}`, fd)
      .then((response) => {
        console.log(response);
         if (!this.state.all_tags?.includes(values.tag)) {
            this.setState({
              all_tags: [...this.state.all_tags, ...values.tag],
            },()=>{
              console.log(this.state.all_tags)
            });
          }
        this.getData().then(() => {
          this.setState({
            add_modal: false,
            tag_added_with_this_currency: false,
          });
         
        });
      });
  };

  componentDidMount() {
    this.getData().then(() => {
      console.log(this.state.poinvoices_tags);
      this.setState({
        all_tags: Object.keys(this.state.poinvoices_tags),
        all_tags_values: Object.values(this.state.poinvoices_tags),
      });
    });
  }

  getData = async () => {
    await axios
      .get(
        `${API}get-poinvoices/${this.state.company_id}/${this.state.project_id}`
      )
      .then((response) => {
        console.log(response);
        this.setState({
          suppliers_options: response.data.suppliers_options,
          poinvoices_sub: response.data.poinvoices_sub,

          poinvoices_tags: response.data.poinvoices_tags,
          payments: response.data.payments,
          poinvoices_sub_keys: Object.keys(response.data.poinvoices_sub),
          poinvoices_sub_values: Object.values(response.data.poinvoices_sub),
          poinvoices_currencies: response.data.poinvoices_currencies,
          poinvoices_curr_values: Object.values(
            response.data.poinvoices_currencies
          ),
          poinvoices_tag_values: Object.values(response.data.poinvoices_tags),
          refandable_poinvoices_tags: response.data.refandable_poinvoices_tags,
          refandable_poinvoices_tags_keys: response.data
            .refandable_poinvoices_tags
            ? Object.keys(response.data.refandable_poinvoices_tags)
            : [],
          refandable_poinvoices_tags_values: response.data
            .refandable_poinvoices_tags
            ? Object.values(response.data.refandable_poinvoices_tags)
            : [],
          refanded_poinvoices_tags_keys: response.data.refunded_poinvoices_tags
            ? Object.keys(response.data.refunded_poinvoices_tags)
            : [],
          refanded_poinvoices_tags_values: response.data
            .refunded_poinvoices_tags
            ? Object.values(response.data.refunded_poinvoices_tags)
            : [],
            total_refandable_poinvoices_amount:response.data.poinvoices?.filter((p)=>{
              return p.type==='Refundable ( Refundable tax credits )'
            }),
        });
      });
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
        show_type:this.state.base_currency===this.state.suppliers_options[this.state.suppliers_options?.findIndex((s)=>s.id==allValues.supplier_id)]?.currency
      }
    );
  };

  formateNumber = (number) => {
    return Number(parseFloat(number).toFixed(2))?.toLocaleString();
  };

  onCollapseChange = (active_vendor) => {
    if (active_vendor === this.state.active_vendor) {
      this.setState({
        active_vendor: "",
      });
    } else {
      this.setState({
        active_vendor,
      });
    }
    console.log(active_vendor);
  };
  onCollapseCurrencyChange = (active_currency) => {
    if (active_currency === this.state.active_currency) {
      this.setState({
        active_currency: "",
      });
    } else {
      this.setState({
        active_currency,
      });
    }
    console.log(active_currency);
  };

  onCollapseTagChange = (active_tag) => {
    if (active_tag === this.state.active_tag) {
      this.setState({
        active_tag: "",
      });
    } else {
      this.setState({
        active_tag,
      });
    }
    console.log(active_tag);
  };

  onCollapseRefundedChange = (active_refunded_tag) => {
    if (active_refunded_tag === this.state.active_refunded_tag) {
      this.setState({
        active_refunded_tag: "",
      });
    } else {
      this.setState({
        active_refunded_tag,
      });
    }
    console.log(active_refunded_tag);
  };

  onTagChange = (tags) => {
    console.log(tags);
    if (this.state.selected_currency && tags[0]) {
      console.log("axios");
      const fd = new FormData();
      fd.append("currency", this.state.selected_currency);
      fd.append("tag", tags[0]);
      axios
        .post(`${API}tag-exists/${this.state.project_id}`, fd)
        .then((response) => {
          console.log(response);
          this.setState({
            tag_added_with_this_currency: response.data.exists,
          });
        });
    }
  };

  markAsRefunded = (tag) => {
    this.setState(
      {
        invoices_to_mark: tag?.map((p) => {
          return p.id;
        }),
        tag_currency: tag[0].currency,
        tag_name: tag[0]?.tag,
        tag_total_tax_value: tag?.reduce((accumulator, object) => {
          return parseFloat(
            parseFloat(accumulator) + parseFloat(object.vat_tax_value)
          );
        }, 0),
      },
      () => {
        this.setState({
          mark_modal: true,
        });
        console.log(this.state.invoices_to_mark);
        console.log(this.state.tag_name);
        console.log(this.state.tag_total_tax_value);
      }
    );
  };

  onChangeDate = (d, date) => {
    console.log(d, date);
    this.setState({
      date,
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

  handleDeleteInvoice = (id) => {
    axios.post(`${API}poinvoice-delete/${id}`).then((response) => {
      console.log(response);
      this.getData();
    });
  };

  onMarkFinish = (values) => {
    values["date"] = this.state.date;
    const fd = new FormData();
    this.state.invoices_to_mark?.forEach((i) => {
      fd.append("ids[]", i);
    });
    if (!values["exchange_rate"]) {
      values["exchange_rate"] = "1";
    }
    fd.append("date", values.date);
    fd.append("exchange_rate", values.exchange_rate);
    fd.append("refunded_value", values.refunded_value);
    axios.post(`${API}mark-refunded`, fd).then((response) => {
      console.log(response);
      this.getData().then(() => {
        this.setState({
          mark_modal: false,
        });
      });
    });
  };
  onEditFinish = (values) => {
  
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
    if(this.state.base_currency!== this.state.selected_currency){
      values['type']="Non Deductible / non refundable"
    }
    const fd = new FormData();
    fd.append("invoice_number", values.invoice_number);
    fd.append("supplier_id", values.supplier_id);
    fd.append("subtotal", values.subtotal);
    fd.append("vat_tax_value", values.vat_tax_value);
    fd.append("vat_tax_percentage", values.vat_tax_percentage);
    fd.append("type", values.type);
    fd.append("total", values.total);
    fd.append("tag", values.tag);
    fd.append("value", values.value);
    axios
      .post(`${API}edit-poinvoice/${this.state.poinvoice_to_edit?.id}`, fd)
      .then((response) => {
        console.log(response);
        this.getData().then(() => {
          this.setState({
            edit_modal: false,
          });
        });
      });
  };

  editInvoiceValuesChange = (changedValues, allValues) => {
    allValues["value"] = allValues?.value?.replaceAll(",", "");
    let subtotal, total, vat_tax_value;

    if (allValues.value && allValues.value > 0) {
      subtotal =
        parseFloat(allValues.value) /
        parseFloat(1 + parseFloat(allValues.vat_tax_percentage) / 100);
      total = allValues.value;
      vat_tax_value = total - subtotal;
    }
    const poinvoice_to_edit=this.state.poinvoice_to_edit
    poinvoice_to_edit['currency']=this.state.suppliers_options[this.state.suppliers_options?.findIndex((s)=>s.id==allValues.supplier_id)]?.currency
    this.setState(
      {
        subtotal,
        total,
        vat_tax_value,
        poinvoice_to_edit
      },
      () => {
        console.log(this.state.total);
        console.log(this.state.vat_tax_value);
        console.log(this.state.subtotal);
      }
    );
  };
  render() {
    return (
      <>
        <div className="tables-page">
          <div className="btns-actions">
            <button onClick={this.openAddModal}>Add Invoice +</button>
          </div>

          {this.state.poinvoices_sub_keys?.length > 0 && (
            <div className="pom-table pos pos-table">
                <div className="customized-table invoices-table">
                <span className="table-name render_by">
                  Tax Invoice By Vendors
                </span>
                <div className="header-row table-row">
                  <div>Vendor</div>
                  <div>Tag/Type</div>
                  <div>Invoice No</div>
                  <div>Sub Value</div>
                  <div>Tax Value</div>
                  <div>Total Invoiced Value</div>
                  <div>Total uninvoiced Value</div>
                </div>
                {Object.keys(this.state.poinvoices_sub)?.map((d, index) => {
                  return (
                    <>
                      {this.state.poinvoices_sub_values[index]?.length > 1 ? (
                        <Collapse
                          onChange={() => this.onCollapseChange(d)}
                          activeKey={this.state.active_vendor}
                          className="inner-row"
                        >
                          <Panel
                            header={
                              <div className="table-row data-row collabser-row relative">
                                <div className="edit-delete">
                                  <Row align={"middle"}>
                                    <Col md={8}>
                                      <a
                                        href={`${API}vendor-xls/${this.state.project_id}/${this.state.poinvoices_sub_values[index][0].supplier_id}`}
                                      >
                                        <span>
                                          <SiMicrosoftexcel />
                                        </span>
                                      </a>
                                    </Col>
                                    <Col md={8}>
                                      <a
                                        href={`${API}vendor-pdf/${this.state.project_id}/${this.state.poinvoices_sub_values[index][0].supplier_id}`}
                                      >
                                        <span>
                                          <FaFilePdf />
                                        </span>
                                      </a>
                                    </Col>
                                  </Row>
                                </div>
                                <div>
                                  <p className="main">{d}</p>
                                  <p className="sec">
                                    {
                                      this.state.poinvoices_sub_values[index][0]
                                        ?.currency
                                    }
                                  </p>
                                </div>
                                <div>
                                  {d === this.state.active_vendor ? (
                                    <p className="expand-btn open">
                                      <span className="txt">Hide Content</span>
                                      <span>
                                        <DownOutlined />
                                      </span>
                                    </p>
                                  ) : (
                                    <p className="expand-btn close">
                                      <span className="txt">Show Content</span>{" "}
                                      <span>
                                        <UpOutlined />
                                      </span>
                                    </p>
                                  )}
                                </div>
                                <div></div>
                                <div>
                                  <p className="main total">
                                    {this.formateNumber(
                                      parseFloat(
                                        this.state.poinvoices_sub_values[
                                          index
                                        ].reduce((accumulator, object) => {
                                          return parseFloat(
                                            parseFloat(accumulator) +
                                              parseFloat(
                                                parseFloat(object.total) -
                                                  parseFloat(
                                                    object.vat_tax_value
                                                  )
                                              )
                                          );
                                        }, 0)
                                      ).toFixed(2)
                                    )}
                                  </p>
                                  <p className="sec">
                                    {
                                      this.state.poinvoices_sub_values[index][0]
                                        ?.currency
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="main total">
                                    {this.formateNumber(
                                      parseFloat(
                                        this.state.poinvoices_sub_values[
                                          index
                                        ].reduce((accumulator, object) => {
                                          return parseFloat(
                                            parseFloat(accumulator) +
                                              parseFloat(object.vat_tax_value)
                                          );
                                        }, 0)
                                      ).toFixed(2)
                                    )}
                                  </p>
                                  <p className="sec">
                                    {
                                      this.state.poinvoices_sub_values[index][0]
                                        ?.currency
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="main total">
                                    {this.formateNumber(
                                      parseFloat(
                                        this.state.poinvoices_sub_values[
                                          index
                                        ].reduce((accumulator, object) => {
                                          return parseFloat(
                                            parseFloat(accumulator) +
                                              parseFloat(object.total)
                                          );
                                        }, 0)
                                      ).toFixed(2)
                                    )}
                                  </p>
                                  <p className="sec">
                                    {
                                      this.state.poinvoices_sub_values[index][0]
                                        ?.currency
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="main total">
                                    {this.formateNumber(
                                      parseFloat(
                                        this.state.payments
                                          ?.filter((p) => {
                                            return p.name === d;
                                          })
                                          .reduce((accumulator, object) => {
                                            return parseFloat(
                                              parseFloat(accumulator) +
                                                parseFloat(object.value)
                                            );
                                          }, 0)
                                      ) -
                                        parseFloat(
                                          this.state.poinvoices_sub_values[
                                            index
                                          ].reduce((accumulator, object) => {
                                            return parseFloat(
                                              parseFloat(accumulator) +
                                                parseFloat(object.total)
                                            );
                                          }, 0)
                                        )
                                    )}
                                  </p>
                                  <p className="sec">
                                    {
                                      this.state.poinvoices_sub_values[index][0]
                                        ?.currency
                                    }
                                  </p>
                                </div>
                              </div>
                            }
                            key={d}
                            showArrow={false}
                          >
                            {this.state.poinvoices_sub_values[index]?.map(
                              (de) => {
                                return (
                                  <div className="data-row relative table-row">
                                    <div className="edit-delete">
                                      <Row align={"middle"}>
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
                                                  poinvoice_to_edit: de,
                                                  total: de?.total,
                                                  subtotal: de?.subtotal,
                                                  vat_tax_value:
                                                    de?.vat_tax_value,
                                                    selected_currency:de?.currency
                                                },
                                                () => {
                                                  this.setState({
                                                    edit_modal: true,
                                                  });
                                                }
                                              );
                                            }}
                                          />
                                        </Col>
                                        <Col md={8}>
                                          <DeleteOutlined
                                            onClick={() => {
                                              this.setState(
                                                {
                                                  invoice_to_delete: de,
                                                },
                                                () => {
                                                  this.deleteModal();
                                                }
                                              );
                                            }}
                                          />
                                        </Col>
                                      </Row>
                                    </div>
                                    <div></div>
                                    <div>
                                      <p className="main">{de.tag}</p>
                                      <p className="sec">{de.type}</p>
                                    </div>
                                    <div>
                                      <p className="main">
                                        {de.invoice_number}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="main">
                                        {this.formateNumber(
                                          parseFloat(de.total) -
                                            parseFloat(de.vat_tax_value)
                                        )}
                                      </p>
                                      <p className="sec">
                                        {
                                          this.state.poinvoices_sub_values[
                                            index
                                          ][0]?.currency
                                        }
                                      </p>
                                    </div>
                                    <div>
                                      <p className="main">
                                        {this.formateNumber(de.vat_tax_value)}
                                      </p>
                                      <p className="sec">
                                        {
                                          this.state.poinvoices_sub_values[
                                            index
                                          ][0]?.currency
                                        }
                                      </p>
                                    </div>
                                    <div>
                                      <p className="main">
                                        {this.formateNumber(de.total)}
                                      </p>
                                      <p className="sec">
                                        {
                                          this.state.poinvoices_sub_values[
                                            index
                                          ][0]?.currency
                                        }
                                      </p>
                                    </div>
                                    <div></div>
                                  </div>
                                );
                              }
                            )}
                          </Panel>
                        </Collapse>
                      ) : (
                        <>
                          {this.state.poinvoices_sub_values[index]?.map(
                            (de) => {
                              return (
                                <div className="data-row table-row relative">
                                  <div className="edit-delete">
                                    <Row align={"middle"}>
                                      <Col md={6}>
                                        <a
                                          href={`${API}vendor-xls/${this.state.project_id}/${this.state.poinvoices_sub_values[index][0].supplier_id}`}
                                        >
                                          <span>
                                            <SiMicrosoftexcel />
                                          </span>
                                        </a>
                                      </Col>
                                      <Col md={6}>
                                        <a
                                          href={`${API}vendor-pdf/${this.state.project_id}/${this.state.poinvoices_sub_values[index][0].supplier_id}`}
                                        >
                                          <span>
                                            <FaFilePdf />
                                          </span>
                                        </a>
                                      </Col>
                                      <Col md={6}>
                                        <EditOutlined
                                          onClick={() => {
                                            this.setState(
                                              {
                                                poinvoice_to_edit: de,
                                                total: de?.total,
                                                subtotal: de?.subtotal,
                                                vat_tax_value:
                                                  de?.vat_tax_value,
                                                  selected_currency:de?.currency
                                              },
                                              () => {
                                                this.setState({
                                                  edit_modal: true,
                                                });
                                              }
                                            );
                                          }}
                                        />
                                      </Col>
                                      <Col md={6}>
                                        <DeleteOutlined
                                          onClick={() => {
                                            this.setState(
                                              {
                                                invoice_to_delete: de,
                                              },
                                              () => {
                                                this.deleteModal();
                                              }
                                            );
                                          }}
                                        />
                                      </Col>
                                    </Row>
                                  </div>
                                  <div>
                                    <p className="main">{de.supplier_name}</p>
                                    <p className="sec">
                                      {
                                        this.state.poinvoices_sub_values[
                                          index
                                        ][0]?.currency
                                      }
                                    </p>
                                  </div>
                                  <div>
                                    <p className="main">{de.tag}</p>
                                    <p className="sec">{de.type}</p>
                                  </div>
                                  <div>
                                    <p className="main">{de.invoice_number}</p>
                                  </div>
                                  <div>
                                    <p className="main total">
                                      {this.formateNumber(de.subtotal)}
                                    </p>
                                    <p className="sec">
                                      {
                                        this.state.poinvoices_sub_values[
                                          index
                                        ][0]?.currency
                                      }
                                    </p>
                                  </div>

                                  <div>
                                    <p className="main total">
                                      {this.formateNumber(de.vat_tax_value)}
                                    </p>
                                    <p className="sec">
                                      {
                                        this.state.poinvoices_sub_values[
                                          index
                                        ][0]?.currency
                                      }
                                    </p>
                                  </div>

                                  <div>
                                    <p className="main total">
                                      {this.formateNumber(de.total)}
                                    </p>
                                    <p className="sec">
                                      {
                                        this.state.poinvoices_sub_values[
                                          index
                                        ][0]?.currency
                                      }
                                    </p>
                                  </div>
                                  <div>
                                    <p className="main total">
                                      {this.formateNumber(
                                        parseFloat(
                                          this.state.payments
                                            ?.filter((p) => {
                                              return p.name === d;
                                            })
                                            .reduce((accumulator, object) => {
                                              return parseFloat(
                                                parseFloat(accumulator) +
                                                  parseFloat(object.value)
                                              );
                                            }, 0)
                                        ) -
                                          parseFloat(
                                            this.state.poinvoices_sub_values[
                                              index
                                            ].reduce((accumulator, object) => {
                                              return parseFloat(
                                                parseFloat(accumulator) +
                                                  parseFloat(object.total)
                                              );
                                            }, 0)
                                          )
                                      )}
                                    </p>
                                    <p className="sec">
                                      {
                                        this.state.poinvoices_sub_values[
                                          index
                                        ][0]?.currency
                                      }
                                    </p>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </>
                      )}
                    </>
                  );
                })}
              </div>
              <div className="customized-table invoices-table my-100">
                <span className="table-name">
                  Refandable Tax Invoice By Tag
                </span>
                <div className="header-row table-row">
                  <div>Tag</div>
                  <div>Vendors</div>
                  <div>Invoice No</div>
                  <div>Tax Value</div>
                  <div>Statue</div>
                  <div>Action</div>
                </div>
                {this.state.refandable_poinvoices_tags_keys?.map((d, index) => {
                  return (
                    <>
                      {this.state.refandable_poinvoices_tags_values[index]
                        ?.length > 1 ? (
                        <Collapse
                          onChange={() => this.onCollapseTagChange(d)}
                          activeKey={this.state.active_tag}
                        >
                          <Panel
                            header={
                              <div className="table-row data-row collabser-row relative">
                                <div>
                                  <p className="main">{d}</p>
                                  <p className="sec">
                                    {
                                      this.state
                                        .refandable_poinvoices_tags_values[
                                        index
                                      ][0]?.currency
                                    }
                                  </p>
                                </div>
                                <div>
                                  {d === this.state.active_tag ? (
                                    <p className="expand-btn open">
                                      <span className="txt">Hide Content</span>
                                      <span>
                                        <DownOutlined />
                                      </span>
                                    </p>
                                  ) : (
                                    <p className="expand-btn close">
                                      <span className="txt">Show Content</span>{" "}
                                      <span>
                                        <UpOutlined />
                                      </span>
                                    </p>
                                  )}
                                </div>
                                <div></div>
                                <div>
                                  <p className="main total">
                                    {this.formateNumber(
                                      parseFloat(
                                        this.state.refandable_poinvoices_tags_values[
                                          index
                                        ].reduce((accumulator, object) => {
                                          return parseFloat(
                                            parseFloat(accumulator) +
                                              parseFloat(object.vat_tax_value)
                                          );
                                        }, 0)
                                      ).toFixed(2)
                                    )}
                                  </p>
                                  <p className="sec">
                                    {
                                      this.state
                                        .refandable_poinvoices_tags_values[
                                        index
                                      ][0]?.currency
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="main">Bending</p>
                                </div>
                                <div>
                                  <p
                                    className="main pointer"
                                    onClick={() =>
                                      this.markAsRefunded(
                                        this.state
                                          .refandable_poinvoices_tags_values[
                                          index
                                        ]
                                      )
                                    }
                                  >
                                    Mark as refunded
                                  </p>
                                </div>
                              </div>
                            }
                            key={d}
                            showArrow={false}
                          >
                            {this.state.refandable_poinvoices_tags_values[
                              index
                            ]?.map((de) => {
                              return (
                                <div className="data-row relative table-row">
                                  <div className="edit-delete">
                                    <Row align={"middle"}>
                                      <Col md={8}>
                                        <DeleteOutlined
                                          onClick={() => {
                                            this.setState(
                                              {
                                                invoice_to_delete: de,
                                              },
                                              () => {
                                                this.deleteModal();
                                              }
                                            );
                                          }}
                                        />
                                      </Col>
                                    </Row>
                                  </div>
                                  <div></div>
                                  <div>
                                    <p className="main">{de.supplier_name}</p>
                                    <p className="sec">{de.type}</p>
                                  </div>
                                  <div>
                                    <p className="main">{de.invoice_number}</p>
                                  </div>
                                  <div>
                                    <p className="main">
                                      {this.formateNumber(
                                        parseFloat(de.vat_tax_value)
                                      )}
                                    </p>
                                    <p className="sec">
                                      {
                                        this.state.poinvoices_tag_values[
                                          index
                                        ][0]?.currency
                                      }
                                    </p>
                                  </div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                </div>
                              );
                            })}
                          </Panel>
                        </Collapse>
                      ) : (
                        <>
                          {this.state.refandable_poinvoices_tags_values[
                            index
                          ]?.map((de) => {
                            return (
                              <div className="data-row table-row  relative">
                                <div className="edit-delete">
                                  <Row align={"middle"}>
                                    <Col md={12}>
                                      <DeleteOutlined
                                        onClick={() => {
                                          this.setState(
                                            {
                                              invoice_to_delete: de,
                                            },
                                            () => {
                                              this.deleteModal();
                                            }
                                          );
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                </div>
                                <div>
                                  <p className="main">{de.tag}</p>
                                  <p className="sec">
                                    {
                                      this.state
                                        .refandable_poinvoices_tags_values[
                                        index
                                      ][0]?.currency
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="main">{de.supplier_name}</p>
                                  <p className="sec">{de.type}</p>
                                </div>
                                <div>
                                  <p className="main">{de.invoice_number}</p>
                                </div>
                                <div>
                                  <p className="main total">
                                    {this.formateNumber(de.vat_tax_value)}
                                  </p>
                                  <p className="sec">
                                    {
                                      this.state
                                        .refandable_poinvoices_tags_values[
                                        index
                                      ][0]?.currency
                                    }
                                  </p>
                                </div>

                                <div>
                                  <p className="main">Bending</p>
                                </div>
                                <div>
                                  <p
                                    className="main pointer"
                                    onClick={() =>
                                      this.markAsRefunded(
                                        this.state
                                          .refandable_poinvoices_tags_values[
                                          index
                                        ]
                                      )
                                    }
                                  >
                                    Mark as refunded
                                  </p>
                                </div>
                                <div></div>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </>
                  );
                })}
                {this.state.refandable_poinvoices_tags_keys?.length>0&& this.state.base_currency &&(
                    <div className="data-row table-row relative border-top-row">
                      <div>
                        <p className="main total">Total in {this.state.base_currency}</p>
                      </div>
                      <div></div>
                      <div></div>
                      <div>
                        <p className="main total">
                        {this.formateNumber(
                            this.state.total_refandable_poinvoices_amount?.reduce((accumulator, object) => {
                              return parseFloat(
                                parseFloat(accumulator) +
                                  parseFloat(object.vat_tax_value)
                              );
                            }, 0)
                          )}
                        </p>
                        <p className="sec">{this.state.base_currency}</p>
                      </div>

                      <div></div>
                      <div></div>
                    </div>
                )}
              </div>

              <div className="customized-table invoices-table">
                <span className="table-name">Refunded Tax Amount</span>
                <div className="header-row table-row">
                  <div>Tag</div>
                  <div>Invoice No</div>
                  <div>Tax Value</div>
                  <div>Refunded Amount</div>
                  <div>{`EX.R  ${this.state.base_currency}`}</div>
                  <div>Date</div>
                  <div>Non Refunded Amount</div>
                </div>
                {this.state.refanded_poinvoices_tags_keys?.map((d, index) => {
                  return (
                    <>
                      {this.state.refanded_poinvoices_tags_values[index]
                        ?.length > 1 ? (
                        <Collapse
                          onChange={() => this.onCollapseRefundedChange(d)}
                          activeKey={this.state.active_refunded_tag}
                          className="inner-row"
                        >
                          <Panel
                            header={
                              <div className="table-row data-row collabser-row relative">
                                <div>
                                  <p className="main">{d}</p>
                                  <p className="sec">
                                    {
                                      this.state
                                        .refanded_poinvoices_tags_values[
                                        index
                                      ][0]?.currency
                                    }
                                  </p>
                                </div>

                                <div>
                                  {d === this.state.active_refunded_tag ? (
                                    <p className="expand-btn open">
                                      <span className="txt">Hide Content</span>
                                      <span>
                                        <DownOutlined />
                                      </span>
                                    </p>
                                  ) : (
                                    <p className="expand-btn close">
                                      <span className="txt">Show Content</span>{" "}
                                      <span>
                                        <UpOutlined />
                                      </span>
                                    </p>
                                  )}
                                </div>

                                <div>
                                  <p className="main total">
                                    {this.formateNumber(
                                      parseFloat(
                                        this.state.refanded_poinvoices_tags_values[
                                          index
                                        ].reduce((accumulator, object) => {
                                          return parseFloat(
                                            parseFloat(accumulator) +
                                              parseFloat(object.vat_tax_value)
                                          );
                                        }, 0)
                                      ).toFixed(2)
                                    )}
                                  </p>
                                  <p className="sec">
                                    {
                                      this.state
                                        .refanded_poinvoices_tags_values[
                                        index
                                      ][0]?.currency
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="main total">
                                    {this.formateNumber(
                                      parseFloat(
                                        this.state
                                          .refanded_poinvoices_tags_values[
                                          index
                                        ][0].refunded_value
                                      )
                                    )}
                                  </p>
                                  <p className="sec">
                                    {
                                      this.state
                                        .refanded_poinvoices_tags_values[
                                        index
                                      ][0]?.currency
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="main">
                                    {this.formateNumber(
                                      parseFloat(
                                        this.state
                                          .refanded_poinvoices_tags_values[
                                          index
                                        ][0].exchange_rate
                                      )
                                    )}
                                  </p>
                                </div>
                                <div>
                                  <p className="main">
                                    {
                                      this.state
                                        .refanded_poinvoices_tags_values[
                                        index
                                      ][0].date
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="main total">
                                    {this.formateNumber(
                                      parseFloat(
                                        this.state.refanded_poinvoices_tags_values[
                                          index
                                        ].reduce((accumulator, object) => {
                                          return parseFloat(
                                            parseFloat(accumulator) +
                                              parseFloat(object.vat_tax_value)
                                          );
                                        }, 0)
                                      ) -
                                        parseFloat(
                                          this.state
                                            .refanded_poinvoices_tags_values[
                                            index
                                          ][0].refunded_value
                                        )
                                    )}
                                  </p>
                                  <p className="sec">
                                    {
                                      this.state
                                        .refanded_poinvoices_tags_values[
                                        index
                                      ][0]?.currency
                                    }
                                  </p>
                                </div>
                              </div>
                            }
                            key={d}
                            showArrow={false}
                          >
                            {this.state.refanded_poinvoices_tags_values[
                              index
                            ]?.map((de) => {
                              return (
                                <div className="data-row relative table-row">
                                  <div className="edit-delete">
                                    <Row align={"middle"}>
                                      <Col md={12}>
                                        <DeleteOutlined
                                          onClick={() => {
                                            this.setState(
                                              {
                                                invoice_to_delete: de,
                                              },
                                              () => {
                                                this.deleteModal();
                                              }
                                            );
                                          }}
                                        />
                                      </Col>
                                    </Row>
                                  </div>
                                  <div></div>
                                  <div>
                                    <p className="main">{de.invoice_number}</p>
                                  </div>
                                  <div>
                                    <p className="main">
                                      {this.formateNumber(
                                        parseFloat(de.vat_tax_value)
                                      )}
                                    </p>
                                    <p className="sec">
                                      {
                                        this.state
                                          .refanded_poinvoices_tags_values[
                                          index
                                        ][0]?.currency
                                      }
                                    </p>
                                  </div>
                                  <div>
                                    <p className="main">
                                      {this.formateNumber(
                                        parseFloat(
                                          this.state
                                            .refanded_poinvoices_tags_values[
                                            index
                                          ][0].exchange_rate
                                        )
                                      )}
                                    </p>
                                  </div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                </div>
                              );
                            })}
                          </Panel>
                        </Collapse>
                      ) : (
                        <>
                          {this.state.refanded_poinvoices_tags_values[
                            index
                          ]?.map((de) => {
                            return (
                              <div className="data-row table-row relative  border-top-row">
                                <div className="edit-delete">
                                  <Row align={"middle"}>
                                    <Col md={12}>
                                      <DeleteOutlined
                                        onClick={() => {
                                          this.setState(
                                            {
                                              invoice_to_delete: de,
                                            },
                                            () => {
                                              this.deleteModal();
                                            }
                                          );
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                </div>
                                <div>
                                  <p className="main">{de.tag}</p>
                                  <p className="sec">
                                    {
                                      this.state
                                        .refanded_poinvoices_tags_values[
                                        index
                                      ][0]?.currency
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="main">{de.invoice_number}</p>
                                </div>
                                <div>
                                  <p className="main total">
                                    {this.formateNumber(de.vat_tax_value)}
                                  </p>
                                  <p className="sec">
                                    {
                                      this.state
                                        .refanded_poinvoices_tags_values[
                                        index
                                      ][0]?.currency
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="main total">
                                    {this.formateNumber(
                                      parseFloat(
                                        this.state
                                          .refanded_poinvoices_tags_values[
                                          index
                                        ][0].refunded_value
                                      )
                                    )}
                                  </p>
                                  <p className="sec">
                                    {
                                      this.state
                                        .refanded_poinvoices_tags_values[
                                        index
                                      ][0]?.currency
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="main">
                                    {this.formateNumber(
                                      parseFloat(
                                        this.state
                                          .refanded_poinvoices_tags_values[
                                          index
                                        ][0].exchange_rate
                                      )
                                    )}
                                  </p>
                                </div>
                                <div>
                                  <p className="main">
                                    {
                                      this.state
                                        .refanded_poinvoices_tags_values[
                                        index
                                      ][0]?.date
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="main total">
                                    {this.formateNumber(
                                      parseFloat(de.vat_tax_value) -
                                        parseFloat(
                                          this.state
                                            .refanded_poinvoices_tags_values[
                                            index
                                          ][0].refunded_value
                                        )
                                    )}
                                  </p>
                                  <p className="sec">
                                    {
                                      this.state
                                        .refanded_poinvoices_tags_values[
                                        index
                                      ][0]?.currency
                                    }
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </>
                  );
                })}
                {this.state.refanded_poinvoices_tags_keys?.length > 0 &&
                  this.state.base_currency && (
                    <div className="data-row table-row relative border-top-row">
                      <div>
                        <p className="main total">Total Refunded Amount</p>
                      </div>
                      <div></div>
                      <div>
                        <p className="main total">
                          {this.formateNumber(
                            this.state.refanded_poinvoices_tags_values?.reduce(
                              (acc, obj, ind) => {
                                return (
                                  acc +
                                  obj?.reduce((accumulator, object) => {
                                    return parseFloat(
                                      parseFloat(accumulator) +
                                        parseFloat(object.vat_tax_value)
                                    );
                                  }, 0) *
                                    parseFloat(
                                      this.state
                                        .refanded_poinvoices_tags_values[ind][0]
                                        ?.exchange_rate
                                    )
                                );
                              },
                              0
                            )
                          )}
                        </p>
                        <p className="sec">{this.state.base_currency}</p>
                      </div>
                      <div>
                        <p className="main total">
                          {this.formateNumber(
                            this.state.refanded_poinvoices_tags_values?.reduce(
                              (acc, obj, ind) => {
                                return (
                                  acc +
                                  obj[0]?.refunded_value *
                                    parseFloat(
                                      this.state
                                        .refanded_poinvoices_tags_values[ind][0]
                                        ?.exchange_rate
                                    )
                                );
                              },
                              0
                            )
                          )}
                        </p>
                        <p className="sec">{this.state.base_currency}</p>
                      </div>
                      <div></div>
                      <div></div>
                      <div>
                        <p className="main total">
                          {this.formateNumber(
                            this.state.refanded_poinvoices_tags_values?.reduce(
                              (acc, obj, ind) => {
                                return (
                                  acc +
                                  obj?.reduce((accumulator, object) => {
                                    return parseFloat(
                                      parseFloat(accumulator) +
                                        parseFloat(object.vat_tax_value)
                                    );
                                  }, 0) *
                                    parseFloat(
                                      this.state
                                        .refanded_poinvoices_tags_values[ind][0]
                                        ?.exchange_rate
                                    )
                                );
                              },
                              0
                            ) -
                              this.state.refanded_poinvoices_tags_values?.reduce(
                                (acc, obj, ind) => {
                                  return (
                                    acc +
                                    obj[0]?.refunded_value *
                                      parseFloat(
                                        this.state
                                          .refanded_poinvoices_tags_values[
                                          ind
                                        ][0]?.exchange_rate
                                      )
                                  );
                                },
                                0
                              )
                          )}
                        </p>
                        <p className="sec">{this.state.base_currency}</p>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>

        <Modal
          centered
          destroyOnClose
          footer={false}
          className="file-modal border-radius"
          open={this.state.add_modal}
          onCancel={() => {
            this.setState({
              add_modal: false,
            });
          }}
          closable
        >
          <p className="modal-header">Add Tax Invoice</p>
          <Form
            onFinish={this.onFinish}
            onValuesChange={this.addInvoiceValuesChange}
            size="large"
            layout="vertical"
          >
            <Form.Item
              label="Supplier / Factory"
              name="supplier_id"
              className="form-label mb-4"
              rules={[
                {
                  required: true,
                  message: "Supplier name is required!",
                },
              ]}
            >
              <Select
                allowClear
                onChange={(value) =>
                  this.setState(
                    {
                      selected_currency:
                        this.state.suppliers_options[
                          this.state.suppliers_options.findIndex(
                            (s) => s.id === value
                          )
                        ]?.currency,
                    }
                  )
                }
                size="large"
                placeholder="Supplier/  Factory"
                style={{
                  width: "100%",
                }}
              >
                {this.state.suppliers_options?.map((p) => {
                  return (
                    <Option
                      o
                      value={p.id}
                    >{`${p.name} | ${p?.currency}`}</Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="tag"
              label="Tag"
              rules={[
                {
                  required: true,
                  message: "Tag is required!",
                },
              ]}
            >
              <Select
                allowClear
                size="large"
                placeholder="Select or add new"
                mode="tags"
                onChange={this.onTagChange}
                style={{
                  width: "100%",
                }}
              >
                {this.state.all_tags?.map((tag) => {
                  return (
                    // <Option value={p.id}>{`${p.name} | ${p?.currency}`}</Option>
                    <Option value={tag}>{tag}</Option>
                  );
                })}
              </Select>
            </Form.Item>
            {this.state.tag_added_with_this_currency && (
              <p className="error">
                This Tag used with differnt currency, can't be used with USD
                Invoices
              </p>
            )}

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

           {this.state.show_type  &&  (
              <Form.Item
              name="type"
              label="Type"
              rules={[
                {
                  required: true,
                  message: "Type is required!",
                },
              ]}
            >
              <Select
                allowClear
                size="large"
                placeholder="Select or add new"
                style={{
                  width: "100%",
                }}
              >
                {POINVOICES_TYPES.map((t) => {
                  return <Option value={t}>{t}</Option>;
                })}
              </Select>
            </Form.Item>
           )}

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

        {/* edit modal */}
        <Modal
          centered
          destroyOnClose
          footer={false}
          className="file-modal border-radius"
          open={this.state.edit_modal}
          onCancel={() => {
            this.setState({
              edit_modal: false,
            });
          }}
          closable
        >
          <p className="modal-header">Edit Tax Invoice</p>
          <Form
            onFinish={this.onEditFinish}
            onValuesChange={this.editInvoiceValuesChange}
            size="large"
            layout="vertical"
          >
            <Form.Item
              label="Supplier / Factory"
              name="supplier_id"
              initialValue={this.state.poinvoice_to_edit?.supplier_id}
              className="form-label mb-4"
              rules={[
                {
                  required: true,
                  message: "Supplier name is required!",
                },
              ]}
            >
              <Select
                allowClear
                onChange={(value) =>
                  this.setState(
                    {
                      selected_currency:
                        this.state.suppliers_options[
                          this.state.suppliers_options.findIndex(
                            (s) => s.id === value
                          )
                        ]?.currency,
                    },
                    () => {
                      console.log(this.state.selected_currency);
                    }
                  )
                }
                size="large"
                placeholder="Supplier/  Factory"
                style={{
                  width: "100%",
                }}
              >
                {this.state.suppliers_options?.map((p) => {
                  return (
                    <Option
                      o
                      value={p.id}
                    >{`${p.name} | ${p?.currency}`}</Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="tag"
              label="Tag"
              initialValue={this.state.poinvoice_to_edit?.tag}
              rules={[
                {
                  required: true,
                  message: "Tag is required!",
                },
              ]}
            >
              <Select
                allowClear
                size="large"
                disabled
                placeholder="Select or add new"
                mode="tags"
                onChange={this.onTagChange}
                style={{
                  width: "100%",
                }}
              >
                {this.state.all_tags?.map((tag) => {
                  return (
                    <Option value={tag}>{tag}</Option>
                  );
                })}
              </Select>
            </Form.Item>
            {this.state.tag_added_with_this_currency && (
              <p className="error">
                This Tag used with differnt currency, can't be used with USD
                Invoices
              </p>
            )}

            <Form.Item
              name="invoice_number"
              label="Invoice NO."
              initialValue={this.state.poinvoice_to_edit?.invoice_number}
              rules={[
                {
                  required: true,
                  message: "Invoice Number is required!",
                },
              ]}
            >
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Row gutter={25}>
              <Col md={24}>
                <Form.Item
                  label="Total Value"
                  name="value"
                  initialValue={this.state.poinvoice_to_edit?.value}
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

            <Form.Item
              name="vat_tax_percentage"
              label="Add Tax %"
              initialValue={this.state.poinvoice_to_edit?.vat_tax_percentage}
            >
              <Input
                placeholder="Please add the Tax % of the total invoice total"
                suffix="%"
                max={100.0}
                min={0.0}
                type="float"
              />
            </Form.Item>

            {this.state.poinvoice_to_edit?.currency===this.state.base_currency&&(
               <Form.Item
               name="type"
               label="Type"
               initialValue={this.state.poinvoice_to_edit?.type}
               rules={[
                 {
                   required: true,
                   message: "Type is required!",
                 },
               ]}
             >
               <Select
                 allowClear
                 size="large"
                 placeholder="Select or add new"
                 style={{
                   width: "100%",
                 }}
               >
                 {POINVOICES_TYPES.map((t) => {
                   return <Option value={t}>{t}</Option>;
                 })}
               </Select>
             </Form.Item>
            )}
           

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
          centered
          destroyOnClose
          footer={false}
          className="file-modal border-radius"
          open={this.state.mark_modal}
          onCancel={() => {
            this.setState({
              mark_modal: false,
            });
          }}
          closable
        >
          <p className="modal-header">Refunded Tax Value</p>
          <p className="tag-name"># {this.state.tag_name}</p>
          <Form onFinish={this.onMarkFinish} size="large" layout="vertical">
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

            <Row gutter={25}>
              <Col md={24}>
                <Form.Item
                  label="Refunded Value"
                  name="refunded_value"
                  rules={[
                    {
                      required: true,
                      message: "Refunded Value is required!",
                    },
                  ]}
                >
                  <Input placeholder="Input Refunded Value" />
                </Form.Item>
              </Col>
            </Row>
            <p className="tag-desc">
              {`Total Tax Value of # ${
                this.state.tag_name
              }: ${this.formateNumber(this.state.tag_total_tax_value)}  ${
                this.state.tag_currency
              } `}
            </p>
            {this.state.base_currency !== this.state.tag_currency && (
              <Form.Item
                name="exchange_rate"
                label={`EX.Rate to  ${this.state.base_currency}`}
              >
                <Input placeholder="Input" type="float" />
              </Form.Item>
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
      </>
    );
  }
}

export default PoInvoicesTab;
