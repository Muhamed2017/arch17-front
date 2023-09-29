import React, { Component } from "react";
import { customLabels } from "../../pages/CreateBrandFinish";
import {
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
  Select,
  Spin,
  InputNumber,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  ExclamationCircleFilled
} from "@ant-design/icons";
// import PhoneInput from "react-phone-input-2";
// import ReactFlagsSelect from "react-flags-select";

import { currency } from "../../contexts/currencies";
import { API } from "../../utitlties";
import axios from "axios";
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;

class POSTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers_with_pos: [],
      suppliers_options: [],
      pos_sup_rows: [],
      pos_rows: [],
      project_id: this.props.project_id,
      pos_rows: [],
      add_modal: false,
      selectedCurrency: "",
      disable: false,
      total_cost_curr_1: 0,
      total_cost_curr_2: 0,
      pos_currencies: {},
      payments_currencies: {},
      total_coast_converted: 0,
      coast_factore: 1,
      paid_factore: 1,
      company_id: this.props.company_id,
      cur_1: null,
      cur_2: null,
      total_coast_1: 0,
      total_paid_2: 0,
      total_coast_2: 0,
      total_paid_1: 0,
      total_balance_1: 0,
      total_balance_2: 0,
    };
  }
  componentDidMount() {
    console.log(this.props.contract_currency);
    this.getData()
   
  }
  getData=async()=>{
    await axios
      .get(
        `${API}suppliers-pos/${this.state.company_id}/${this.state.project_id}`
      )
      .then((response) => {
        let cur_options = [];
        if (Object.keys(response.data.pos_currencies)?.length < 1) {
          cur_options = currency;
          this.setState(
            {
              applied_currencies: [],
            },
            () => {
              console.log(this.state.applied_currencies);
            }
          );
        }

        if (Object.keys(response.data.pos_currencies).length === 1) {
          if (
            this.props.contract_currency &&
            this.props.contract_currency !==
              Object.keys(response.data.pos_currencies)[0]
          ) {
            cur_options = [
              { code: this.props.contract_currency },
              { code: Object.keys(response.data.pos_currencies)[0] },
            ];
          } else {
            cur_options = currency;
            this.setState(
              {
                applied_currencies: [
                  Object.keys(response.data.pos_currencies)[0],
                ],
              },
              () => {
                console.log(this.state.applied_currencies);
              }
            );
          }
        }
        if (Object.keys(response.data.pos_currencies).length > 1) {
          cur_options = [
            { code: Object.keys(response.data.pos_currencies)[0] },
            { code: Object.keys(response.data.pos_currencies)[1] },
          ];
          this.setState(
            {
              applied_currencies: cur_options.map((c) => {
                return c.code;
              }),
            },
            () => {
              console.log(this.state.applied_currencies);
            }
          );
        }
        console.log(response);
        this.setState(
          {
            suppliers_options: response.data.suppliers_options,
            pos_sup_rows: Object.keys(response.data.suppliers_pos),
            pos_rows: Object.values(response.data.suppliers_pos),
            payments_rows: response.data.payments_pos,
            pos_currencies: response.data.pos_currencies,
            payments_currencies: response.data.payments_currencies,
            cur_options,
            cur_1: Object.keys(response.data.pos_currencies)[0] ?? null,
            cur_2: Object.keys(response.data.pos_currencies)[1] ?? null,
          },
          () => {
            console.log(this.state.cur_options);
            this.updateTotalSuppliers(this.state.pos_rows);
            console.log(this.state.cur_1);
            console.log(this.state.cur_2);
            console.log(this.state.pos_currencies);

            this.setState(
              {
                total_coast_1: this.getKeyValue(
                  this.state.cur_1,
                  this.state.pos_currencies,
                  "coast"
                ),
                total_coast_2: this.getKeyValue(
                  this.state.cur_2,
                  this.state.pos_currencies,
                  "coast"
                ),

                total_paid_1: this.getKeyValue(
                  this.state.cur_1,
                  this.state.payments_currencies,
                  "coast"
                ),
                total_paid_2: this.getKeyValue(
                  this.state.cur_2,
                  this.state.payments_currencies,
                  "coast"
                ),
                switch_curency: this.state.cur_1,
                switch_paid_curency: this.state.cur_1,
                switch_balance_curency: this.state.cur_1,
              },
              () => {
                console.log(this.state.total_coast_1);
                console.log(this.state.total_coast_2);
                console.log(this.state.total_paid_1);
                console.log(this.state.total_paid_2);
                this.setState({
                  // total_balance_1:total_coast_1-total_paid_1,
                  // total_balance_2:total_coast_2-total_paid_2,
                  total_coast_final: (
                    this.state.total_coast_2 / this.state.coast_factore +
                    this.state.total_coast_1
                  ).toFixed(2),
                  total_balance_final: (
                    this.state.total_balance_2 / this.state.balance_factore +
                    this.state.total_balance_1
                  ).toFixed(2),
                  total_paid_final: (
                    this.state.total_paid_2 / this.state.paid_factore +
                    this.state.total_paid_1
                  ).toFixed(2),
                  total_coast_converted_2: (
                    this.state.coast_factore * this.state.total_coast_1 +
                    this.state.total_coast_2
                  ).toFixed(2),
                  total_coast_converted_1: (
                    this.state.total_coast_2 / this.state.coast_factore +
                    this.state.total_coast_1
                  ).toFixed(2),
                  total_paid_converted_2: (
                    this.state.paid_factore * this.state.total_paid_1 +
                    this.state.total_paid_2
                  ).toFixed(2),
                  total_paid_converted_1: (
                    this.state.total_paid_2 / this.state.paid_factore +
                    this.state.total_paid_1
                  ).toFixed(2),
                  total_balance_converted_1: (
                    this.state.total_balance_2 / this.state.balance_factore +
                    this.state.total_balance_1
                  ).toFixed(2),
                  total_balance_converted_2: (
                    this.state.balance_factore * this.state.total_balance_1 +
                    this.state.total_balance_2
                  ).toFixed(2),
                });
              }
            );
          }
        );
      });
    console.log(this.state.project_id);
  }

  getKeyValue = (name, obj, type) => {
    let total = 0;
    obj[name]?.map((p) => {
      total += parseInt(p.value);
    });
    return total;
  };

  openSupplierListAddModal = () => {
    this.setState({
      add_modal: true,
    });
  };

 
  updateCurrencyValue = (currency, value) => {
    const { pos_currencies } = this.state;
    const rows = pos_currencies[currency] ?? [];
    rows.push({ value });
    pos_currencies[currency] = rows;
    this.setState({
      pos_currencies,
    });
  };
  
  SupplierChange = (selected_supplier) => {
    const { pos_sup_rows, pos_rows } = this.state;
    const index = pos_sup_rows.findIndex((d) => selected_supplier === d);
    if (index !== -1) {
      const selectedCurrency = pos_rows[index][0].currency;
      this.setState({ selectedCurrency }, () => {
        console.log(this.state.selectedCurrency);
      });
    } else {
      this.setState({ disable: false }, () => {
        this.setState({ selectedCurrency: "" });
      });
    }
    this.setState({ selected_supplier }, () => {
      console.log(this.state.selected_supplier);
    });
  };

  handleCurrencyChange = (selectedCurrency) => {
    this.setState({ selectedCurrency }, () => {
      console.log(this.state.selectedCurrency);
    });
  };

  handleItemsChange = (selectedItems) => {
    this.setState({ selectedItems }, () => {
      console.log(this.state.selectedItems);
    });
  };

  updateTotalSuppliers = (totalSuppliers) => {
    this.props.changeTotalSupplirs(totalSuppliers);
  };

  changeCoastFactor = (value) => {
    if (value > 0) {
      this.setState(
        {
          coast_factore: value,
          total_coast_converted_2: (
            value * this.state.total_coast_1 +
            this.state.total_coast_2
          ).toFixed(2),
          total_coast_converted_1: (
            this.state.total_coast_2 / value +
            this.state.total_coast_1
          ).toFixed(2),
        },
        () => {
          console.log(this.state.total_coast_converted_1);
          console.log(this.state.total_coast_converted_2);
          if (this.state.switch_curency === this.state.cur_1) {
            this.setState({
              total_coast_final: this.state.total_coast_converted_1,
            });
          }
          if (this.state.switch_curency === this.state.cur_2) {
            this.setState({
              total_coast_final: this.state.total_coast_converted_2,
            });
          }
          if (this.state.switch_paid_curency === this.state.cur_1) {
            this.setState({
              total_paid_final: this.state.total_paid_converted_1,
            });
          }
          if (this.state.switch_paid_curency === this.state.cur_2) {
            this.setState({
              total_paid_final: this.state.total_paid_converted_2,
            });
          }
        }
      );
    } else {
      this.setState({ total_coast_final: 0 });
    }
  };
  changePaidFactor = (value) => {
    if (value > 0) {
      this.setState(
        {
          paid_factore: value,
          total_paid_converted_2: (
            value * this.state.total_paid_1 +
            this.state.total_paid_2
          ).toFixed(2),
          total_paid_converted_1: (
            this.state.total_paid_2 / value +
            this.state.total_paid_1
          ).toFixed(2),
        },
        () => {
          if (this.state.switch_paid_curency === this.state.cur_1) {
            this.setState({
              total_paid_final: this.state.total_paid_converted_1,
            });
          }
          if (this.state.switch_paid_curency === this.state.cur_2) {
            this.setState({
              total_paid_final: this.state.total_paid_converted_2,
            });
          }
        }
      );
    } else {
      this.setState({ total_paid_final: 0 });
    }
  };
  changeBalanceFactor = (e) => {
    if (e.target.value != 0) {
      this.setState(
        {
          paid_factore: e.target.value,
          total_paid_converted_2: (
            e.target.value * this.state.total_paid_converted_1 +
            this.state.total_paid_converted_2
          ).toFixed(2),
          total_paid_converted_1: (
            this.state.total_paid_converted_2 / e.target.value +
            this.state.total_paid_converted_1
          ).toFixed(2),
        },
        () => {
          console.log(this.state.total_paid_converted_1);
          console.log(this.state.total_paid_converted_2);
        }
      );
    }
  };

  formatNumbers=(number)=>{
    return  Number(number)?.toLocaleString()
  }
  deleteModal = () => {
    confirm({
      title: `Do you Want to delete ${this.state.po_to_delete?.supplier_name}  with order number ${this.state.po_to_delete?.order_number}? `,
      icon: <ExclamationCircleFilled />,
      onOk  : () =>{
        const id=this.state.po_to_delete?.id
        axios.post(`${API}po-delete/${id}`).then((response) => {
          console.log(response);
          this.getData().then(()=>{
          })
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  onFinish = (values) => {
    console.log(values);
    values["currency"] = this.state.selectedCurrency;
    const { pos_sup_rows, pos_rows } = this.state;
    const index = pos_sup_rows.findIndex((d) => values.pos_supplier === d);

    if (index === -1) {
      pos_sup_rows.push(values.pos_supplier);
      pos_rows.push([
        {
          supplier_name: values.pos_supplier,
          referance: values.pos_referance,
          value: values.pos_value,
          items: values.items,
          order_number: values.pos_order_number,
        },
      ]);
    } else {
      const pos = pos_rows[index];
      pos.push({
        supplier_name: values.pos_supplier,
        referance: values.pos_referance,
        value: values.pos_value,
        items: values.items,
        order_number: values.pos_order_number,
      });

      pos_rows[index] = pos;
    }
   
    const _index = this.state.suppliers_options.findIndex((d) => values.pos_supplier === d.name);
    const supplier_id=this.state.suppliers_options[_index]?.id
    const currency=this.state.suppliers_options[_index]?.currency
    const fd = new FormData();
    fd.append("supplier_name", values.pos_supplier);
    fd.append("supplier_id", supplier_id);
    fd.append("projectlist_id", this.state.project_id);
    fd.append("items[0]", values.items[0]);
    fd.append("value", values.pos_value);
    fd.append("order_number", values.pos_order_number);
    fd.append("referance", values.pos_referance);
    fd.append("currency", currency);
    axios.post(`${API}add-po/${this.state.project_id}`, fd).then((response) => {
      console.log(response);
      this.setState({ pos_rows, pos_sup_rows, add_modal: false }, () => {
        this.updateTotalSuppliers(this.state.pos_rows);
        this.updateCurrencyValue(currency, values.pos_value);
        if (
          this.state.selectedCurrency ===
          Object.keys(this.state.pos_currencies)[0]
        ) {
          this.setState(
            {
              total_coast_1: this.getKeyValue(
                this.state.selectedCurrency,
                this.state.pos_currencies,
                "coast"
              ),
            },
            () => {
              console.log(this.state.total_coast_1);
            }
          );
        } else {
          this.setState(
            {
              total_coast_2: this.getKeyValue(
                this.state.selectedCurrency,
                this.state.pos_currencies,
                "coast"
              ),
            },
            () => {
              console.log(this.state.total_coast_2);
            }
          );
        }
      });
      this.getData()
    });
  };


  onFinishEdit=(values)=>{

    const id=this.state.po_to_edit?.id
    console.log(values)

    const _index = this.state.suppliers_options.findIndex((d) => values.pos_supplier === d.name);
    const supplier_id=this.state.suppliers_options[_index]?.id
    const currency=this.state.suppliers_options[_index]?.currency

    const fd = new FormData();
    fd.append("supplier_name", values.pos_supplier);
    fd.append("supplier_id", supplier_id);
    fd.append("currency", currency);
    fd.append("projectlist_id", this.state.project_id);
    fd.append("items[0]", values.items[0]);
    fd.append("value", values.pos_value);
    fd.append("order_number", values.pos_order_number);
    fd.append("referance", values.pos_referance);

    axios.post(`${API}edit-po/${id}`,fd).then((response)=>{
      console.log(response)
      this.getData().then(()=>{
        this.setState({
          edit_po_modal:false
        })
      })
      
    })
  }
  render() {
    return (
      <>
        <div>
        <span className="table-name">Purchase Orders</span>
          <div className="pom-table pos">
            <table id="client-lists">
              <tr>
                <th className="width-50">NO</th>
                <th className="width-130">Name</th>
                <th className="width-130">Product Type</th>
                <th className="width-150">Order NO.</th>
                <th className="width-150">Referance</th>
                <th className="width-130">Value</th>
                <th className="width-130">Total Value</th>
                <th className="width-130">Paid</th>
                <th className="width-130">Balance</th>
                {/* <th className="width-100">Files</th> */}
              </tr>

              {this.state.pos_sup_rows?.map((p, index) => {
                return (
                  <tr className="grid-td white">
                    <td>{index + 1}</td>
                    <td>{p}</td>
                    <td className="">
                      {this.state.pos_rows[index]?.map((t) => {
                        return <div
                        className="relative"
                        >{t.items[0]}
                        
                        <div className="inline-block absolute right-5 top-5">
                            <span
                              className="block"
                              onClick={() => {
                                this.setState(
                                  {
                                    po_to_edit: t,
                                  },
                                  () => {
                                    this.setState({
                                      edit_po_modal: true,
                                    });
                                  }
                                );
                              }}
                            >
                              <EditOutlined />
                            </span>
                            <span
                              className="block"
                              onClick={()=>{
                                this.setState({
                                  po_to_delete:t
                                },()=>{
                                  this.deleteModal()
                                })
                              }}
                              // onClick={() => this.handleDeleteContract(t.id)}
                            >
                              <DeleteOutlined />
                            </span>
                          </div>
                        </div>;
                      })}
                      
                    </td>

                    <td>
                      {this.state.pos_rows[index]?.map((o) => {
                        return <div
                        // className="relative"
                        >{o.order_number}
                      
                        </div>;
                      })}
                    </td>
                    <td>
                      {this.state.pos_rows[index]?.map((r) => {
                        return <div>{r.referance}</div>;
                      })}
                    </td>
                    <td>
                      {this.state.pos_rows[index]?.map((v) => {
                        return (
                          <div>
                            {/* {v.value}  */}
                            {`${this.formatNumbers(v.value)} ${v.currency}`}
                            {/* {} */}
                            {/* <span>{v.currency}</span> */}
                          </div>
                        );
                      })}
                    </td>

                    <td>
                      {this.state.pos_rows[index].reduce(
                        (accumulator, object) => {
                          return `${
                            parseInt(accumulator) + parseInt(object.value)
                          }
                          ${object.currency}`;
                        },
                        0
                      )}
                    </td>

                    <td>
                      {this.state.payments_rows[p] ? (
                        <>
                          {`${
                          //   this.getKeyValue(
                          //   p,
                          //   this.state.payments_rows,
                          //   "value"
                          // )
                          this.formatNumbers(
                              this.getKeyValue(
                            p,
                            this.state.payments_rows,
                            "value"
                          )
                          )
                          } ${this.state.payments_rows[p][0]?.currency}`}
                        </>
                      ) : (
                        0
                      )}
                    </td>

                    <td>
                      {this.state.payments_rows[p] ? (
                        <>
                          {`${
                           this.formatNumbers(
                            this.state.pos_rows[index].reduce(
                              (accumulator, object) => {
                                return (
                                  parseInt(accumulator) + parseInt(object.value)
                                );
                              },
                              0
                            ) -
                            this.getKeyValue(
                              p,
                              this.state.payments_rows,
                              "value"
                            )
                           )
                          }
                      ${this.state.payments_rows[p][0]?.currency}
                      `}
                        </>
                      ) : (
                        <>
                          {this.state.pos_rows[index].reduce(
                            (accumulator, object) => {
                              return `${
                                parseInt(accumulator) + parseInt(object.value)
                              } ${object?.currency}`;
                            },
                            0
                          )}
                        </>
                      )}
                    </td>
                    {/* <td>ADD File</td> */}
                  </tr>
                );
              })}
              <tr className="dark totals">
                <th colSpan={3}>Total Coast</th>
                <td colSpan={7}>
                  <>
                    <Row align={"middle"} gutter={12}>
                      <Col md={8}>
                        <span className="value">
                          {this.state.cur_1 && (
                            <>{`${this.state.cur_1} ${
                              // this.state.total_coast_1
                              this.formatNumbers(this.state.total_coast_1)
                            }`}</>
                          )}
                        </span>

                        <span className="value">
                          {this.state.cur_2 && (
                            <>{`${this.state.cur_2} ${
                              // this.state.total_coast_2
                              this.formatNumbers(this.state.total_coast_2)
                            }`}</>
                          )}
                        </span>
                      </Col>
                     {this.state.cur_1?.length>0&&this.state.cur_2?.length>0&&(
                      <>
                       <Col md={8}>
                        <div>
                          <span>
                            <span className="exch">
                              EX.Rate{" "}
                              {`${this.state.cur_1} to ${this.state.cur_2}`}
                            </span>
                            <InputNumber
                              className="factor"
                              onChange={(e) => this.changeCoastFactor(e)}
                              value={this.state.coast_factore}
                              defaultValue={0}
                              placeholder="Input a number"
                              size="large"
                            />
                          </span>
                        </div>
                      </Col>
                      <Col md={8}>
                        {this.state.cur_1 && this.state.cur_2 && (
                          <>
                              <span
                          className="light  px-2"
                          >Total</span>
                            <span
                              onClick={() => {
                                this.setState({
                                  switch_curency: this.state.cur_1,
                                  total_coast_final:
                                    this.state.total_coast_converted_1,
                                });
                              }}
                              className={
                                this.state.switch_curency === this.state.cur_1
                                  ? "bold currency-swicth"
                                  : "currency-swicth"
                              }
                            >
                              {this.state.cur_1}
                            </span>
                            <span
                              onClick={() => {
                                this.setState({
                                  switch_curency: this.state.cur_2,
                                  total_coast_final:
                                    this.state.total_coast_converted_2,
                                });
                              }}
                              className={
                                this.state.switch_curency === this.state.cur_2
                                  ? "bold currency-swicth"
                                  : "currency-swicth"
                              }
                            >
                              {this.state.cur_2}
                            </span>
                          <span>{`${
                            // this.state.total_coast_final
                            this.formatNumbers(this.state.total_coast_final)
                            }  ${this.state.switch_curency}`}</span>

                          </>
                        )}
                      </Col>
                      </>
                     )}
                    </Row>
                  </>
                </td>
              </tr>
              <tr className="dark totals">
                <th colSpan={3}>Total Paid</th>
                <td colSpan={7}>
                  <Row align={"middle"} gutter={12}>
                    <Col md={8}>
                      {this.state.cur_1 && (
                        <div>
                          <span className="value">
                            {`${this.state.cur_1} ${
                              // this.state.total_paid_1
                              this.formatNumbers(this.state.total_paid_1)
                              }`}
                          </span>
                          {this.state.cur_2 && (
                            <span className="value">{`${this.state.cur_2} ${
                              // this.state.total_paid_2
                              this.formatNumbers(this.state.total_paid_2)
                            }`}</span>
                          )}
                        </div>
                      )}
                    </Col>
                    {this.state.cur_1?.length>0&&this.state.cur_2?.length>0&&(
                      <>
                       <Col md={8}>
                      <span>
                        <span className="exch">
                          EX.Rate {`${this.state.cur_1} to ${
                            this.state.cur_2}`}
                        </span>
                        <InputNumber
                          className="factor"
                          onChange={(e) => this.changePaidFactor(e)}
                          value={this.state.paid_factore}
                          defaultValue={0}
                          placeholder="Input a number"
                          size="large"
                        />
                      </span>
                    </Col>
                    <Col md={8}>
                      {this.state.cur_1 && this.state.cur_2 && (
                        <>
                          <span
                          className="light  px-2"
                          >Total</span>
                          <span
                            onClick={() => {
                              this.setState({
                                switch_paid_curency: this.state.cur_1,
                                total_paid_final:
                                  this.state.total_paid_converted_1,
                              });
                            }}
                            className={
                              this.state.switch_paid_curency === this.state.cur_1
                                ? "bold currency-swicth"
                                : "currency-swicth"
                            }
                          >
                            {this.state.cur_1}
                          </span>
                          <span
                            onClick={() => {
                              this.setState({
                                switch_paid_curency: this.state.cur_2,
                                total_paid_final:
                                  this.state.total_paid_converted_2,
                              });
                            }}
                            className={
                              this.state.switch_paid_curency === this.state.cur_2
                                ? "bold currency-swicth"
                                : "currency-swicth"
                            }
                          >
                            {this.state.cur_2}
                          </span>
                          <span>{`${
                            // this.state.total_paid_final
                            this.formatNumbers(this.state.total_paid_final)
                            }  ${this.state.switch_paid_curency}`}</span>
                        </>
                      )}
                    </Col>
                      </>
                    )}
                    {/* */}
                  </Row>
                </td>
              </tr>
              <tr className="dark totals">
                <th colSpan={3}>Total Balance</th>
                <td colSpan={7}>
                  {this.state.cur_1 && (
                    <span
                    className="value">
                    <>{`${this.state.cur_1} ${
                      // this.state.total_coast_1 - this.state.total_paid_1
                      this.formatNumbers(this.state.total_coast_1 - this.state.total_paid_1)
                    }`}</>
                  </span>
                    )}

                  {this.state.cur_2 && (
                    <span
                    className="value"
                    >{`${this.state.cur_2} ${
                      // this.state.total_coast_2 - this.state.total_paid_2
                      this.formatNumbers(this.state.total_coast_2 - this.state.total_paid_2)
                    }`}</span>
                  )}
                </td>
              </tr>
              <tr className="add-tr" style={{ width: "100%" }}>
                <td onClick={this.openSupplierListAddModal}>ADD</td>
              </tr>
            </table>
          </div>
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
          <p className="modal-header">Add Purchase Order</p>
          <Form onFinish={this.onFinish} size="large" layout="vertical">
            <Form.Item
              label="Supplier / Factory"
              name="pos_supplier"
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
                size="large"
                placeholder="Supplier/  Factory"
                style={{
                  width: "100%",
                }}
                onChange={this.SupplierChange}
              >
                {this.state.suppliers_options.map((p) => {
                  return (
                    <>
                      <Option value={p.name}>{p.name}</Option>
                    </>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="items"
              label="Items"
              className="form-label mb-4"
              rules={[
                {
                  required: true,
                  message: "One Item at least is required!",
                },
              ]}
            >
              <Select
                showSearch
                mode="tags"
                onChange={this.handleItemsChange}
                value={this.state.selectedItems}
                placeholder="Please select Items"
                style={{
                  fontSize: "13px",
                }}
              >
                {[].map((p) => {
                  return <Option value={p}>{p}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item 
             rules={[
              {
                required: true,
                message: "Referance is required!",
              },
            ]}
            name="pos_referance" label="Referance">
              <Input placeholder="type  payment referance" />
            </Form.Item>

            <Form.Item label="Order NO" name="pos_order_number"
             rules={[
              {
                required: true,
                message: "Order number is required!",
              },
            ]}
            >
              <Input placeholder="order number" />
            </Form.Item>
            <Row gutter={25}>
              {/* <Col md={6}>
                <Form.Item
                 rules={[
                  {
                    required: true,
                    message: "Currency is required!",
                  },
                ]}
                  label="Value"
                  // name="pos_currency"
                  className="form-label mb-4"
                >
                  <Select
                    showSearch
                    value={this.state.selectedCurrency}
                    onChange={this.handleCurrencyChange}
                    disabled={this.state.disable}
                    placeholder="Please select Currency"
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    {this.state.cur_options?.map((p) => {
                      return (
                        <>
                          <Option value={p.code}>{p.code}</Option>
                        </>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col> */}
              <Col md={24}>
                <Form.Item label="Value" name="pos_value"
                 rules={[
                  {
                    required: true,
                    message: "Purchase value is required!",
                  },
                ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
            </Row>
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
          open={this.state.edit_po_modal}
          onCancel={() => {
            this.setState({
              edit_po_modal: false,
            });
          }}
          closable
        >
          <p className="modal-header">Edit Purchase Order</p>
          <Form onFinish={this.onFinishEdit} size="large" layout="vertical">
            <Form.Item
              label="Supplier / Factory"
              name="pos_supplier"
              className="form-label mb-4"
              initialValue={this.state.po_to_edit?.supplier_name}
               rules={[
                {
                  required: true,
                  message: "Supplier name is required!",
                },
              ]}
              
            >
              <Select
                allowClear
                size="large"
                placeholder="Supplier/  Factory"
                style={{
                  width: "100%",
                }}
                onChange={this.SupplierChange}
              >
                {this.state.suppliers_options.map((p) => {
                  return (
                    <>
                      <Option value={p.name}>{p.name}</Option>
                    </>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="items"
              label="Items"
              initialValue={this.state.po_to_edit?.items}
              className="form-label mb-4"
              rules={[
                {
                  required: true,
                  message: "One Item at least is required!",
                },
              ]}
            >
              <Select
                showSearch
                mode="tags"
                onChange={this.handleItemsChange}
                value={this.state.selectedItems}
                placeholder="Please select Items"
                style={{
                  fontSize: "13px",
                }}
              >
                {[].map((p) => {
                  return <Option value={p}>{p}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item 
              initialValue={this.state.po_to_edit?.referance}


             rules={[
              {
                required: true,
                message: "Referance is required!",
              },
            ]}
            name="pos_referance" label="Referance">
              <Input placeholder="type  payment referance" />
            </Form.Item>

            <Form.Item label="Order NO" name="pos_order_number"
              initialValue={this.state.po_to_edit?.order_number}

            
             rules={[
              {
                required: true,
                message: "Order number is required!",
              },
            ]}
            >
              <Input placeholder="order number" />
            </Form.Item>
            <Row gutter={25}>
              {/* <Col md={6}>
                <Form.Item
                
              // initialValue={this.state.po_to_edit?.currency}
                
                 rules={[
                  {
                    required: true,
                    message: "Currency is required!",
                  },
                ]}
                  label="Value"
                  // name="pos_currency"
                  className="form-label mb-4"
                >
                  <Select
                    showSearch
                    disabled
                    // defaultValue={this.state.po_to_edit?.currency}
                    value={this.state.po_to_edit?.currency}
                    onChange={this.handleCurrencyChange}
                    // disabled={this.state.disable}
                    placeholder="Please select Currency"
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    {this.state.cur_options?.map((p) => {
                      return (
                        <>
                          <Option value={p.code}>{p.code}</Option>
                        </>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col> */}
              <Col md={24}>
                <Form.Item label="Value" name="pos_value"
              initialValue={this.state.po_to_edit?.value}

                 rules={[
                  {
                    required: true,
                    message: "Purchase value is required!",
                  },
                ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
            </Row>
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

export default POSTab;
