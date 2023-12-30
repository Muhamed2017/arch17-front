import React, { Component } from "react";
import { Row, Col ,Modal,Button,Form,Input} from "antd";
// import { Bar } from "@ant-design/charts/node_modules/@ant-design/plots";
import {Bar} from '@ant-design/plots'
import axios from "axios";
import { API } from "../../../utitlties";

class BudgetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_purchases: this.props?.tp,
      project_id: this.props?.project_id,
      base_currency: this.props.base_currency,
      budget: this.props.budget,
      budget_data: [],
      budget_modal:false
    };
  }

  updateBudget=()=>{
    if(this.state.budget>0){
      this.setState({
        budget_data:
          this.state.total_purchases > this.state.budget
            ? [
                {
                  state: "spent",
                  name: "budget",
                  value: parseFloat(
                    this.state.total_purchases -
                      (this.state.total_purchases - this.state.budget)
                  ),
                  type: "TOTAL SPENT",
                  "Spent": `${this.formatNumber( this.state.total_purchases -
                    (this.state.total_purchases - this.state.budget))} ${this.state.base_currency}`
                },
                {
                  state: "overflow",
                  name: "budget",
                  value: parseFloat(
                    this.state.total_purchases - this.state.budget
                  ),
                  type: "OVER BUDGET",
                  "Over Budget": `${ this.formatNumber(  this.state.total_purchases - this.state.budget)} ${this.state.base_currency}`
                },
              ]
            : [
                {
                  state: "spent",
                  name: "budget",
                  value: parseFloat(this.state.total_purchases),
                  type: "TOTAL SPENT",
                  "Spent":  `${ this.formatNumber(this.state.total_purchases)} ${this.state.base_currency}`
                },
                {
                  state: "left",
                  name: "budget",
                  value: parseFloat(
                    this.state.budget - this.state.total_purchases
                  ),
                  type: "TOTAL LEFT",
                  "Left": `${this.formatNumber( this.state.budget - this.state.total_purchases)} ${this.state.base_currency}`
  
                },
              ],
      });
    }
    else{
      this.setState({
        budget_data:[
          {
            state: "spent",
            name: "budget",
            value:0,
            type: "TOTAL SPENT",
            // "Spent": `${this.formatNumber( this.state.total_purchases)} ${this.state.base_currency}`
            "Spent": `0 ${this.state.base_currency}`
          },
          {
            state: "overflow",
            name: "budget",
            value: parseFloat(
              this.state.total_purchases 
            ),
            type: "OVER BUDGET",
            "Over Budget": `${this.formatNumber( this.state.total_purchases)} ${this.state.base_currency}`
          },
        ]
      })
    }
   
  }

  componentDidMount() {
// if(this.state.budget>0){
  this.updateBudget();
// }
  }
  budgetConfig = {
    data: [],
    xField: "value",
    yField: "name",
    seriesField: "state",
    autoFit:true,
    height: 80,
    isStack: true,
    xAxis: {
      visible: false,
      grid: {
        visible: false,
      },
    },
    yAxis: false,
    

    // legend: false,
  };
  setBudgetFinish = (values) => {
    const fd = new FormData();
    fd.append("budget", values.budget);
    axios
      .post(`${API}set-budget/${this.state.project_id}`, fd)
      .then((response) => {
        console.log(response);
        this.setState({
          budget: values.budget,
          budget_modal: false,
        },()=>{
        this.updateBudget()

        });
      });
  };
  formatNumber = (number) => {
    return Number(parseFloat(number).toFixed(2))?.toLocaleString();
  };
  render() {
    const { base_currency, total_purchases, budget } = this.state;
    return (
      <>
        <h6>Budget</h6>
        <div 
        
        className="budget-container shadow-section  mb-5 outer-wrapper">
          <Row justify={"start"} gutter={75} className="mb-3 budget-row" >
            <Col >
              <p className="budget">Total Budget</p>
              <span>
                {this.formatNumber(budget)} {base_currency}
              </span>
            </Col>
            <Col>
              <p className="budget">Total Spent</p>
              <span>
                {this.formatNumber(total_purchases)} {base_currency}
              </span>
            </Col>
            {total_purchases > budget ? (
              <Col>
                <p className="budget">Over Budget By</p>
                <span>{this.formatNumber(total_purchases-budget)} {base_currency}</span>
              </Col>
            ) : (
              <Col >
                <p className="budget">Total Left</p>
                <span>{this.formatNumber(budget-total_purchases)} {base_currency}</span>
              </Col>
            )}
            
          </Row>
          {/* {budget && budget > 0 ? (
            <>
            <Bar
              {...this.budgetConfig}
              data={this.state.budget_data}
             
              label={{
                position: "middle",
                content: (item) => {
                  return `${item.type}: ${(
                    parseFloat(item.value / this.state.budget) * 100
                  ).toFixed(0)} %`;
                },
                style: {
                  fill: "#fff",
                },
              }}
              color={
                total_purchases > budget
                  ? ["#C5733B", "#964B00"]
                  : ["#C5733B", "#E6AA8F"]
              }
             yAxis={false}
             xAxis={false}
             xField="value"
             
             tooltip={{
              fields: this.state.total_purchases > this.state.budget? ["Spent","Over Budget"]:["Spent","Left"],
              domStyles:{
                'g2-tooltip-list-item':{
                 fontSize:10
                }
              }
            }}
            legend={false}
            
            />
            <p className="edit underline align-right pointer"
            onClick={()=>{this.setState({
              budget_modal:true
            })}}
            >
              EDIT Budget
            </p>
            </>
          ) : (
            <p
              className="add-btn-wide pointer"
              onClick={() => this.setState({ budget_modal: true })}
            >
              Set Budget
            </p>
          )} */}
             <Bar
              {...this.budgetConfig}
              data={this.state.budget_data}
             
              label={{
                position: "middle",
                content: (item) => {
                if(budget>0){
                  return `${item.type}: ${(
                    parseFloat(item.value / this.state.budget) * 100
                  ).toFixed(0)} %`;
                }else{
                 if(item.value>0){
                  return `${'Over budget'}: ${this.formatNumber(item.value)} ${base_currency}`;
                 }
                }
                },
                style: {
                  fill: "#fff",
                },
              }}
              color={
                total_purchases > budget
                  ? ["#C5733B", "#964B00"]
                  : ["#C5733B", "#E6AA8F"]
              }
             yAxis={false}
             xAxis={false}
             xField="value"
             
             tooltip={{
              fields: this.state.total_purchases > this.state.budget? ["Spent","Over Budget"]:["Spent","Left"],
              domStyles:{
                'g2-tooltip-list-item':{
                 fontSize:10
                }
              }
            }}
            legend={false}
            
            />
            <p className="edit underline align-right pointer"
            onClick={()=>{this.setState({
              budget_modal:true
            })}}
            >
              EDIT Budget
            </p>
        </div>
     

        {this.state.budget_modal&&(
          <Modal
          footer={false}
          // destroyOnClose
          className="file-modal border-radius"
          open={this.state.budget_modal}
          onCancel={() => {
            this.setState({
              budget_modal: false,
            });
          }}
          closable
        >
          <p className="modal-header">Set Budget</p>
          <Form onFinish={this.setBudgetFinish} size="large" layout="vertical">
            <Form.Item
              name="budget"
              initialValue={this.state.budget}
              rules={[
                {
                  required: true,
                  message: "Budget Value is required!",
                },
              ]}
            >
              <Input placeholder="Please set Project Budget" type="float" />
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
        )}
      </>
    );
  }
}

export default BudgetComponent;
