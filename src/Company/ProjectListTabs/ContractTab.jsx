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
  Radio,
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
import moment from "moment";
const { Option } = Select;
const { confirm } = Modal;

class ContractTab extends Component {
  constructor(props) {
    super(props);
    this.updatetotalContract.bind(this);
    this.state = {
      add_contract_modal: false,
      contract_rows: [],
      selectedCurrency: "",
      received_payment_total: 0,
      contracts_total_value: 0,
      received_payment_rows: [],
      first_currency: "",
      contract_to_edit: null,
      contract_to_file: null,
      payment_to_edit: null,
      edit_contract_modal: false,
      loading: true,
      base_currency: this.props?.base_currency,
      _currency: this.props?._currency,
      project_id: this.props?.id,
      shared: this.props.shared,
      scope: this.props.scope,
      permission:this.props.permission,
    };
  }

  deleteModal = () => {
    confirm({
      title: `Do you Want to delete ${this.state.contract_to_delete?.contract_number}  Contract? `,
      icon: <ExclamationCircleFilled />,
      onOk: () => {
        const id = this.state.contract_to_delete?.id;
        this.handleDeleteContract(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  updatetotalContract = (contracts_total_value) => {
    this.props.changeTotalContract(contracts_total_value);
  };

  updateHasTaxable = (taxable, total) => {
    this.props.changeHasContractsTaxable(taxable, total);
  };

 items_without_ex=[
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
  }
 ]

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

  updatetotalPayment = (received_payment_total) => {
    this.props.changeTotalPayment(received_payment_total);
  };

  handleDeleteContract = (id) => {
    const contract_rows = this.state.contract_rows;
    const index = contract_rows.findIndex((contract) => id === contract.id);
    const value = this.state.contract_rows[index]?.total;
    axios.post(`${API}contract-delete/${id}`).then((response) => {
      console.log(response);
      this.setState(
        {
          contract_rows: this.state.contract_rows?.filter((r) => {
            return r.id !== id;
          }),

          contracts_total: (
            parseFloat(this.state.contracts_total) - parseFloat(value)
          ).toFixed(2),
        },
        () => {
          this.updatetotalContract(this.state.contracts_total);
          this.props.changeTotalContractRows(this.state.contract_rows)
          this.setState(
            {
              has_taxable_at_least:
                this.state.contract_rows?.filter((c) => {
                  return c.contract_taxable === "taxable";
                }).length > 0,

              uninvoicedvalue: this.state.contract_rows
                ?.filter((c) => {
                  return c.contract_taxable === "taxable";
                })
                .reduce((accumulator, object) => {
                  return parseFloat(accumulator) + parseFloat(object.total);
                }, 0),
            },
            () => {
              this.updateHasTaxable(
                this.state.has_taxable_at_least,
                this.state.uninvoicedvalue
              );
            }
          );
        }
      );
    });
  };

  componentDidMount() {
    axios.get(`${API}get-contracts/${this.props.id}`).then((response) => {
      this.setState({
        contract_rows: response.data.contracts,
        received_payment_rows: response.data.received_payment,
        first_currency: response.data.contracts[0]?.contract_currency,
        received_payment_total: response.data.received_payment_total,
        contracts_total: response.data.contracts_total_with_tax,

        loading: false,
      });
    });
  }

  onFinish = (values) => {
    const fd = new FormData();
    values["date"] = this.state.date;
    values["contract_value"] = values.contract_value?.replaceAll(",", "");
    let subtotal, total, vat_tax_value;
    if (values.contract_taxable === "taxable") {
      if (values.vat_tax_type === "in") {
        subtotal =
          parseFloat(values.contract_value) /
          parseFloat(1 + parseFloat(values.vat_tax_percentage) / 100);
        total = values.contract_value;
        vat_tax_value = total - subtotal;
      }
      if (values.vat_tax_type === "not") {
        if (parseFloat(values.vat_tax_percentage) === 0) {
          total = values.contract_value;
          subtotal = values.contract_value;
          vat_tax_value = 0;
        }
        if (parseFloat(values.vat_tax_percentage) > 0) {
          vat_tax_value =
            (parseFloat(values.vat_tax_percentage) / 100) *
            parseFloat(values.contract_value);
          subtotal = values.contract_value;
          total = parseFloat(values.contract_value) + vat_tax_value;
        }
      }
    } 
    else {
      total = values.contract_value;
      subtotal = values.contract_value;
      vat_tax_value = 0;
      values["vat_tax_percentage"] = 0;
      values["vat_tax_type"] = "not";
    }
    values["contract_currency"] = this.props._currency;
    values["subtotal"] = subtotal;
    values["vat_tax_value"] = vat_tax_value;
    values["total"] = total;
    if (this.state._currency === this.state.base_currency) {
      values["exchange_rate"] = 1;
    }
    fd.append("contract_taxable", values.contract_taxable);
    fd.append("contract_number", values.contract_number);
    fd.append("contract_referance", values.contract_referance);
    fd.append("contract_currency", values.contract_currency);
    fd.append("contract_value", values.contract_value);
    fd.append("subtotal", values.subtotal);
    fd.append("vat_tax_value", values.vat_tax_value);
    fd.append("vat_tax_percentage", values.vat_tax_percentage);
    fd.append("exchange_rate", values.exchange_rate);
    fd.append("total", values.total);
    fd.append("date", values.date);
    if (values.vat_tax_type) {
      fd.append("vat_tax_type", values.vat_tax_type);
    }
    if (values.vat_tax_value) {
      fd.append("vat_tax_value", values.vat_tax_value);
    }
    console.log(values);
    axios.post(`${API}add-contract/${this.props.id}`, fd).then((response) => {
      values["id"] = response.data.contract.id;
      this.setState(
        {
          contract_rows: [...this.state.contract_rows, values],
          has_taxable_at_least:
            [...this.state.contract_rows, values].filter((c) => {
              return c.contract_taxable === "taxable";
            }).length > 0,

          uninvoicedvalue: [...this.state.contract_rows, values]
            ?.filter((c) => {
              return c.contract_taxable === "taxable";
            })
            .reduce((accumulator, object) => {
              return parseFloat(accumulator) + parseFloat(object.total);
            }, 0),

          contracts_total: (
            parseFloat(this.state.contracts_total) + parseFloat(values.total)
          ).toFixed(2),
        },
        () => {
          this.setState({
            add_contract_modal: false,
            first_currency: this.state.contract_rows[0]?.contract_currency,
          });
          this.updatetotalContract(this.state.contracts_total);
          this.props.changeTotalContractRows(this.state.contract_rows)

          this.updateHasTaxable(
            this.state.has_taxable_at_least,
            this.state.uninvoicedvalue
          );
        }
      );
    });
  };

  editContractFinish = (values) => {
    console.log(values);
    console.log(this.state.contract_to_edit);
    let subtotal, total, vat_tax_value;
    values["contract_value"] = values.contract_value?.replaceAll(",", "");
    if (values.contract_taxable === "taxable") {
      if (values.vat_tax_type === "in") {
        subtotal =
          parseFloat(values.contract_value) /
          parseFloat(1 + parseFloat(values.vat_tax_percentage) / 100);
        total = values.contract_value;
        vat_tax_value = total - subtotal;
      }
      if (values.vat_tax_type === "not") {
        if (parseFloat(values.vat_tax_percentage) === 0) {
          total = values.contract_value;
          subtotal = values.contract_value;
          vat_tax_value = 0;
        }
        if (parseFloat(values.vat_tax_percentage) > 0) {
          vat_tax_value =
            (parseFloat(values.vat_tax_percentage) / 100) *
            parseFloat(values.contract_value);
          subtotal = values.contract_value;
          total = parseFloat(values.contract_value) + vat_tax_value;
        }
      }
      // values["vat_tax_type"] = values?.vat_tax_type||this.state.contract_to_edit?.vat_tax_type;
    } else {
      total = values.contract_value;
      subtotal = values.contract_value;
      vat_tax_value = 0;
      values["vat_tax_percentage"] = 0;
      // values["vat_tax_type"] = values?.vat_tax_type||this.state.contract_to_edit?.vat_tax_type;
    }

    values["subtotal"] = subtotal;
    values["vat_tax_value"] = vat_tax_value;
    values["total"] = total;
    if (this.state._currency === this.state.base_currency) {
      values["exchange_rate"] = 1;
    }

    const fd = new FormData();
    fd.append("contract_number", values.contract_number);
    fd.append("contract_referance", values.contract_referance);
    fd.append("subtotal", values.subtotal);
    fd.append("vat_tax_value", values.vat_tax_value);
    fd.append("vat_tax_percentage", values.vat_tax_percentage);
    fd.append("vat_tax_type", values.vat_tax_type);
    fd.append("total", values.total);
    // fd.append("vat_tax_type", values.vat_tax_type);
    fd.append("contract_taxable", values.contract_taxable);
    fd.append("exchange_rate", values.exchange_rate);
    fd.append("contract_value", values.contract_value);
    fd.append("date", this.state.edited_date);

    console.log(values);
    const contract_rows = this.state.contract_rows;

    const index = contract_rows.findIndex(
      (contract) => this.state.contract_to_edit.id === contract.id
    );

    const less_value = this.state.contract_rows[index].total;
    const plus_value = values.total;
    this.setState(
      {
        contracts_total: (
          parseFloat(this.state.contracts_total) -
          parseFloat(less_value) +
          parseFloat(plus_value)
        ).toFixed(2),
      },
      () => {
        this.updatetotalContract(this.state.contracts_total);

      }
    );

    contract_rows[index].contract_referance = values?.contract_referance;
    contract_rows[index].contract_number = values.contract_number;
    contract_rows[index].contract_value = values.contract_value;
    contract_rows[index].total = values.total;
    contract_rows[index].date = this.state.edited_date;
    contract_rows[index].exchange_rate = values?.exchange_rate;
    contract_rows[index].subtotal = values?.subtotal;
    contract_rows[index].vat_tax_percentage = values?.vat_tax_percentage;

    axios
      .post(`${API}edit-contract/${this.state.contract_to_edit?.id}`, fd)
      .then((response) => {
        console.log(response);
        this.setState(
          {
            contract_rows,
            has_taxable_at_least:
              contract_rows?.filter((c) => {
                return c.contract_taxable === "taxable";
              }).length > 0,

            uninvoicedvalue: contract_rows
              ?.filter((c) => {
                return c.contract_taxable === "taxable";
              })
              ?.reduce((accumulator, object) => {
                return parseFloat(accumulator) + parseFloat(object.total);
              }, 0),

            edit_contract_modal: false,
          },
          () => {
            this.updateHasTaxable(
              this.state.has_taxable_at_least,
              this.state.uninvoicedvalue
            );
        this.props.changeTotalContractRows(this.state.contract_rows)

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

  onValuesEditing = (changedValues, allValues) => {
    const { contract_to_edit } = this.state;
    let subtotal, total, vat_tax_value;
    // contract_to_edit.vat_tax_type = allValues.vat_tax_type;
    contract_to_edit.contract_taxable = allValues.contract_taxable;
    allValues["vat_tax_type"] =
      allValues?.vat_tax_type || this.state.contract_to_edit?.vat_tax_type;
    this.setState(
      {
        contract_to_edit,
      },
      () => {
        console.log(this.state.contract_to_edit);
      }
    );

    if (allValues.vat_tax_type === "in") {
      if (allValues.contract_value && allValues.contract_value > 0) {
        subtotal =
          parseFloat(allValues.contract_value) /
          parseFloat(1 + parseFloat(allValues.vat_tax_percentage) / 100);
        total = allValues.contract_value;
        vat_tax_value = total - subtotal;
      }
    }
    if (allValues.vat_tax_type === "not") {
      if (parseFloat(allValues.vat_tax_percentage) === 0) {
        total = allValues.contract_value;
        subtotal = allValues.contract_value;
        vat_tax_value = 0;
      }
      if (parseFloat(allValues.vat_tax_percentage) > 0) {
        vat_tax_value =
          (parseFloat(allValues.vat_tax_percentage) / 100) *
          parseFloat(allValues.contract_value);
        subtotal = allValues.contract_value;
        total = parseFloat(allValues.contract_value) + vat_tax_value;
      }
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

  addContractValuesChange = (changedValues, allValues) => {
    allValues["contract_value"] = allValues?.contract_value?.replaceAll(
      ",",
      ""
    );
    let subtotal, total, vat_tax_value;

    this.setState(
      {
        taxable: allValues.contract_taxable === "taxable",
      },
      () => {
        console.log(this.state.taxable);
      }
    );

    if (allValues.vat_tax_type === "in") {
      if (allValues.contract_value && allValues.contract_value > 0) {
        subtotal =
          parseFloat(allValues.contract_value) /
          parseFloat(1 + parseFloat(allValues.vat_tax_percentage) / 100);
        total = allValues.contract_value;
        vat_tax_value = total - subtotal;
      }
    }
    if (allValues.vat_tax_type === "not") {
      if (parseFloat(allValues.vat_tax_percentage) === 0) {
        total = allValues.contract_value;
        subtotal = allValues.contract_value;
        vat_tax_value = 0;
      }
      if (parseFloat(allValues.vat_tax_percentage) > 0) {
        vat_tax_value =
          (parseFloat(allValues.vat_tax_percentage) / 100) *
          parseFloat(allValues.contract_value);
        subtotal = allValues.contract_value;
        total = parseFloat(allValues.contract_value) + vat_tax_value;
      }
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
                      items: this.state.scope=='sales_without_ex'?this.items_without_ex:this.items 
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
               {(!this.state.shared || this.state.permission=='write')&&(
                 <button onClick={this.openContractAddModal}>
                 Add Contract +
               </button>
               )}
              </div>
              <div>
                <div className="pom-table">
                  <div className="table-wrapper">
                    <table id="client-lists" className="">
                      <tr>
                        <th className="num-col">NO.</th>
                        <th className="width-300">Contract NO, Date</th>
                        <th className="width-250">Referance</th>
                        <th className="width-200">Value</th>
                       {!this.state.shared?(<>
                        {this.state.base_currency &&
                          this.state.base_currency !== this.state._currency && (
                            <th className="width-300">{`EX.R / ${this.state.base_currency}`}</th>
                          )}
                       </>):(<>
                       {this.state.scope=='sales_with_ex' &&this.state.base_currency &&
                          this.state.base_currency !== this.state._currency && (
                            <th className="width-300">{`EX.R / ${this.state.base_currency}`}</th>
                          )}
                       </>)}
                        <th>Files</th>
                      </tr>
                      {this.state.contract_rows?.map((c, index) => {
                        return (
                          <tr className="white light-hover table-border-row">
                            <td className="relative">
                              <div className="inline-block ">{index + 1}</div>
                            </td>
                            <td>
                              {(!this.state.shared || this.state.permission=='write' )&&(
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
                                            contract_to_edit: c,
                                            edited_date: c?.date,
                                            subtotal: c?.subtotal,
                                            total: c?.total,
                                            vat_tax_value: c?.vat_tax_value,
                                          },
                                          () => {
                                            this.setState({
                                              edit_contract_modal: true,
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
                                            contract_to_delete: c,
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
                              )}

                              <p className="main">{c.contract_number}</p>
                              <p className="sec">{c?.date}</p>
                            </td>
                            <td>
                              <p className="main">{c.contract_referance}</p>
                            </td>
                            <td>
                              <p className="main">
                                {Number(
                                  parseFloat(c.total)?.toFixed(2)
                                )?.toLocaleString()}
                              </p>
                              <p className="sec">{c?.contract_currency}</p>
                            </td>

                           {!this.state.shared?(<>
                           
                            {this.state.base_currency &&
                              this.state.base_currency !==
                                this.state._currency && (
                                <td>
                                  <p className="main">{c.exchange_rate}</p>
                                </td>
                              )}
                           </>):(<>
                           
                            {this.state.scope==='sales_with_ex' &&this.state.base_currency &&
                              this.state.base_currency !==
                                this.state._currency && (
                                <td>
                                  <p className="main">{c.exchange_rate}</p>
                                </td>
                              )}
                           </>)}

                            <td>
                              {c?.contract_files_link ? (
                                <a
                                  target="_blank"
                                  href={c.contract_files_link}
                                  className="underline file-link"
                                >
                                  Get Files
                                </a>
                              ) : (
                                <p
                                  onClick={() => {
                                    this.addFileToContract(c);
                                  }}
                                >
                                  <span className="pointer">Add File Link</span>
                                </p>
                              )}
                            </td>
                          </tr>
                        );
                      })}

                      {this.state.contract_rows.length > 0 && (
                        <>
                          <tr className="border-top-1">
                            <td colSpan={3}>
                              <p className="main">Subtotal Contracts Value</p>
                            </td>
                            <td
                              // colSpan={4}
                              colSpan={
                                this.state.base_currency &&
                                this.state.base_currency !==
                                  this.state._currency
                                  ? ""
                                  : 4
                              }
                            >
                              <p className="main">
                                {Number(
                                  parseFloat(
                                    this.state.contract_rows?.reduce(
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
                                {this.state.contract_rows[0]?.contract_currency}
                              </p>
                            </td>
                            {this.state.base_currency &&
                              this.state.base_currency !==
                                this.state._currency && (
                                <td colSpan={2}>
                                  <p className="main">
                                    {Number(
                                      parseFloat(
                                        this.state.contract_rows?.reduce(
                                          (accumulator, object) => {
                                            return (
                                              parseFloat(accumulator) +
                                              parseFloat(object.subtotal) *
                                                parseFloat(object.exchange_rate)
                                            );
                                          },
                                          0
                                        )
                                      ).toFixed(2)
                                    )?.toLocaleString()}
                                  </p>
                                  <p className="sec">
                                    {this.state.base_currency}
                                  </p>
                                </td>
                              )}
                          </tr>
                          {parseFloat(
                            this.state.contract_rows?.reduce(
                              (accumulator, object) => {
                                return (
                                  parseFloat(accumulator) +
                                  parseFloat(object.vat_tax_value)
                                );
                              },
                              0
                            )
                          ) > 0 && (
                            <tr>
                              <td colSpan={3}>
                                <p className="main">Total VAT Tax</p>
                              </td>
                              <td
                                colSpan={
                                  this.state.base_currency &&
                                  this.state.base_currency !==
                                    this.state._currency
                                    ? ""
                                    : 4
                                }
                              >
                                <p className="main">
                                  {Number(
                                    parseFloat(
                                      this.state.contract_rows?.reduce(
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
                                <p className="sec">
                                  {
                                    this.state.contract_rows[0]
                                      ?.contract_currency
                                  }
                                </p>
                              </td>
                              {this.state.base_currency &&
                                this.state.base_currency !==
                                  this.state._currency && (
                                  <td colSpan={2}>
                                    <p className="main">
                                      {Number(
                                        parseFloat(
                                          this.state.contract_rows?.reduce(
                                            (accumulator, object) => {
                                              return (
                                                parseFloat(accumulator) +
                                                parseFloat(
                                                  object.vat_tax_value
                                                ) *
                                                  parseFloat(
                                                    object.exchange_rate
                                                  )
                                              );
                                            },
                                            0
                                          )
                                        ).toFixed(2)
                                      )?.toLocaleString()}
                                    </p>
                                    <p className="sec">
                                      {this.state.base_currency}
                                    </p>
                                  </td>
                                )}
                            </tr>
                          )}
                          <tr></tr>
                          <tr className="border-top-0">
                            <td colSpan={3}>
                              <p className="high">Total Contracts Value</p>
                            </td>
                            <td
                              colSpan={
                                this.state.base_currency &&
                                this.state.base_currency !==
                                  this.state._currency
                                  ? ""
                                  : 4
                              }
                            >
                              <p className="high">
                                {Number(
                                  parseFloat(
                                    this.state.contracts_total
                                  ).toFixed(2)
                                )?.toLocaleString()}
                              </p>
                              <p className="sec">
                                {this.state.contract_rows[0]?.contract_currency}
                              </p>
                            </td>
                            {this.state.base_currency &&
                              this.state.base_currency !==
                                this.state._currency && (
                                <td colSpan={2}>
                                  <p className="high">
                                    {Number(
                                      parseFloat(
                                        this.state.contract_rows?.reduce(
                                          (accumulator, object) => {
                                            return (
                                              parseFloat(accumulator) +
                                              parseFloat(object.total) *
                                                parseFloat(object.exchange_rate)
                                            );
                                          },
                                          0
                                        )
                                      ).toFixed(2)
                                    )?.toLocaleString()}
                                  </p>
                                  <p className="sec">
                                    {this.state.base_currency}
                                  </p>
                                </td>
                              )}
                          </tr>
                        </>
                      )}
                    </table>
                  </div>
                </div>
              </div>

              <Modal
                footer={false}
                destroyOnClose
                centered
                className="file-modal border-radius"
                open={this.state.add_contract_modal}
                onCancel={() => {
                  this.setState({
                    add_contract_modal: false,
                  });
                }}
                closable
              >
                <p className="modal-header">Add Contract</p>
                <Form
                  onChange={() => {
                    console.log("changed");
                  }}
                  onFinish={this.onFinish}
                  size="large"
                  layout="vertical"
                  onValuesChange={this.addContractValuesChange}
                >
                  <Form.Item
                    name="contract_number"
                    label="Contract NO."
                    rules={[
                      {
                        required: true,
                        message: "Contract Number is required!",
                      },
                    ]}
                  >
                    <Input placeholder="input placeholder" />
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
                    label="Contract Referance"
                    name="contract_referance"
                    rules={[
                      {
                        required: true,
                        message: "Contract Referance is required!",
                      },
                    ]}
                  >
                    <Input placeholder="type contract referance" />
                  </Form.Item>
                  <Row gutter={25}>
                    <Col md={24}>
                      <Form.Item
                        label="Value"
                        name="contract_value"
                        rules={[
                          {
                            required: true,
                            message: "Contract Value is required!",
                          },
                        ]}
                      >
                        <Input placeholder="Contract Value" />
                      </Form.Item>
                    </Col>
                  </Row>

                  {this.state._currency !== this.state.base_currency && (
                    <Form.Item
                      name="exchange_rate"
                      label={`Ex. Rate to ${this.state.base_currency}`}
                    >
                      <Input
                        type="float"
                        placeholder="Input the exchange rate to base currancy"
                      />
                    </Form.Item>
                  )}
                  <Form.Item
                    label="Contract Tax:"
                    name="contract_taxable"
                    layout="horizontal"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 10,
                    }}
                  >
                    <Radio.Group>
                      <Radio value="taxable"> Taxable</Radio>
                      <Radio value="nontaxable">Non-taxable</Radio>
                    </Radio.Group>
                  </Form.Item>
                  {this.state.taxable && (
                    <>
                      <Form.Item
                        name="vat_tax_type"
                        label="Vat Tax"
                        size="large"
                      >
                        <Select
                          placeholder="Select whether tax included or not"
                          style={{
                            width: "100%",
                          }}
                        >
                          {VAT_TAX_OPTIONS.map((v) => {
                            return <Option value={v.value}>{v.label}</Option>;
                          })}
                        </Select>
                      </Form.Item>

                      <Form.Item name="vat_tax_percentage" label="Add Tax %">
                        <Input
                          placeholder="Please add the Tax % of the total Contract"
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
                              {` ${this.formateNumber(
                                this.state.vat_tax_value
                              )}`}
                            </div>
                            <div>
                              <span>Total:</span>
                              {` ${this.formateNumber(this.state.total)}`}
                            </div>
                          </p>
                        )}
                    </>
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

              {/* edit contract modal */}
              <Modal
                footer={false}
                destroyOnClose
                centered
                className="file-modal border-radius"
                open={this.state.edit_contract_modal}
                onCancel={() => {
                  this.setState({
                    edit_contract_modal: false,
                    subtotal:0,
                    total:0,
                    vat_tax_value:0
                  });
                }}
                closable
              >
                <p className="modal-header">Edit Contract</p>
                <Form
                  onFinish={this.editContractFinish}
                  onValuesChange={this.onValuesEditing}
                  onChange={(values) => {
                    console.log(values);
                  }}
                  size="large"
                  layout="vertical"
                  name="edit"
                >
                  <Form.Item
                    name="contract_number"
                    label="Contract NO."
                    initialValue={this.state.contract_to_edit?.contract_number}
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
                      this.state.contract_to_edit?.date,
                      "YYYY. MM. DD"
                    )}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={this.onChangeEdit}
                    />
                  </Form.Item>
                  <Form.Item
                    label="contract_referance"
                    name="contract_referance"
                    initialValue={
                      this.state.contract_to_edit?.contract_referance
                    }
                  >
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                  <Row gutter={25}>
                    <Col md={24}>
                      <Form.Item
                        label="Value"
                        name="contract_value"
                        initialValue={
                          this.state.contract_to_edit?.contract_value
                        }
                      >
                        <Input placeholder="Contract Value" />
                      </Form.Item>
                    </Col>
                  </Row>

                  {this.state._currency !== this.state.base_currency && (
                    <Form.Item
                      name="exchange_rate"
                      initialValue={this.state.contract_to_edit?.exchange_rate}
                      label={`Ex. Rate to ${this.state.base_currency}`}
                    >
                      <Input
                        type="float"
                        placeholder="Input the exchange rate to base currancy"
                      />
                    </Form.Item>
                  )}
                  <Form.Item
                    label="Contract Tax:"
                    name="contract_taxable"
                    layout="horizontal"
                    initialValue={this.state.contract_to_edit?.contract_taxable}
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 10,
                    }}
                  >
                    <Radio.Group>
                      <Radio value="taxable"> Taxable</Radio>
                      <Radio value="nontaxable">Non-taxable</Radio>
                    </Radio.Group>
                  </Form.Item>
                  {this.state.contract_to_edit?.contract_taxable ===
                    "taxable" && (
                    <>
                      <Form.Item
                        name="vat_tax_type"
                        label="Vat Tax"
                        size="large"
                        initialValue={
                          this.state.contract_to_edit?.vat_tax_type ?? ""
                        }
                      >
                        <Select
                          placeholder="Select whether tax included or not"
                          style={{
                            width: "100%",
                          }}
                        >
                          {VAT_TAX_OPTIONS.map((v) => {
                            return <Option value={v.value}>{v.label}</Option>;
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="vat_tax_percentage"
                        label="Add Tax %"
                        initialValue={
                          this.state.contract_to_edit?.vat_tax_percentage ?? 0
                        }
                      >
                        <Input
                          placeholder="Please add the Tax % of the total Contract"
                          suffix="%"
                          max={100}
                          min={0}
                          type="float"
                        />
                      </Form.Item>
                    </>
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
                  <Form.Item name="contract_files_link">
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

export default ContractTab;
