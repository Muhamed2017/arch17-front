import React, { Component } from "react";
import { Pie } from "@ant-design/charts/node_modules/@ant-design/plots";

import { Row, Col } from "antd";
const data = [
  {
    type: "Left Products",
    value: 25,
    percent: 50,
  },
  {
    type: "Delivered Products",
    value: 25,
    percent: 50,
  },
];

class PieSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trpc: this.props.trpc,
      tmpv: this.props.tmpv,
      tc: this.props.tc,
      tp: this.props.tp,
      base_currency: this.props.base_currency,
      sales_data: [],
      purchases_data: [],
      dvp: this.props.dvp,
      project_currency: this.props.project_currency,
    };
  }

  componentDidMount() {
    console.log(this.state.dvp);
    this.setState({
      sales_data: [
        {
          type: "Left Products",
          value: this.props.tc_per_currency - this.props.tdc,
          percent:
            ((this.props.tc_per_currency - this.props.tdc) /
              this.props.tc_per_currency) *
            100,
          Left: `${this.formatNumber(this.props.tc_per_currency - this.props.tdc)} ${
            this.state.project_currency
          }`,
        },
        {
          type: "Delivered Products",
          value: this.props.tdc,
          percent:
            100 -
            ((this.props.tc_per_currency - this.props.tdc) /
              this.props.tc_per_currency) *
              100,
          Delivered: `${this.formatNumber(this.props.tdc)} ${
            this.state.project_currency
          }`,
        },
      ],

      purchases_data: [
        {
          type: "Left Products",
          value: this.props.dlp,
          Left: `${parseFloat(this.props.dlp).toFixed(2)} %`,
        },
        {
          type: "Delivered Products",
          value: this.props.dvp,
          Delivered: `${parseFloat(this.props.dvp).toFixed(2)} %`,
        },
      ],
    });
  }
  formatNumber = (number) => {
    return Number(parseFloat(number).toFixed(2))?.toLocaleString();
  };
  config = {
    appendPadding: 1,
    data: [],
    color: ["#E6AA8F", "#C5733B"],
    angleField: "value",
    colorField: "type",
    radius: 0.85,
    innerRadius: 0.76,
    legend: {
      position: "bottom",
    },
    label: {
      type: "inner",
      offset: "-50%",
      content: (item) => {
        return `${parseFloat(item.percent).toFixed(2) * 100} %`;
      },
      style: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
      },
    },
  };
  render() {
    const { trpc, tc, tmpv, tp, base_currency, project_currency } = this.state;
    return (
      <>
        <div className="my-5">
          <h6>Product Deliveries</h6>
          <Row gutter={24}>
            <Col md={7} className="shadow-section">
              <div>
                <div className="stack-side">
                  <div className="inner-section  outer-wrapper">
                    <div className="side-cell">
                      <p>Total Received Payments From Customer</p>
                      <span>
                        {this.formatNumber(trpc)} {base_currency}
                      </span>
                      <p className="indicator">
                        <span>
                          {parseFloat((trpc / tc) * 100).toFixed(1)} % OF Total
                          Sales Contracts
                        </span>
                      </p>
                    </div>
                    <hr />
                    <div className="side-cell">
                      <p>Total Received VS Paid Payments</p>
                      <span>
                        {this.formatNumber(trpc - tmpv)} {base_currency}
                      </span>
                    </div>
                    <hr />

                    <div className="side-cell">
                      <p>Total Made payment to Vendor</p>
                      <span>
                        {this.formatNumber(tmpv)} {base_currency}
                      </span>
                      <p className="indicator">
                        <span>
                          {parseFloat((tmpv / tp) * 100).toFixed(1)} % OF Total
                          Purchases Contracts
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col md={17}>
              <div className="shadow-section">
                <Row gutter={50}>
                  <Col>
                    <Pie
                      {...this.config}
                      // animation={false}
                      data={this.state.sales_data}
                      statistic={{
                        title: false,
                        content: {
                          style: {
                            whiteSpace: "pre-wrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontWeight: 500,
                            fontSize: 20,
                          },
                          content: `SALES / ${this.state.project_currency}`,
                        },
                      }}
                      tooltip={{
                        fields: ["Delivered", "Left"],
                      }}
                    />
                  </Col>
                  <Col>
                    <Pie
                      {...this.config}
                      // animation={false}
                      data={this.state.purchases_data}
                      tooltip={{
                        fields: ["Delivered", "Left"],
                      }}
                      label={{
                        type: "inner",
                        offset: "-50%",
                        content: (item) => {
                          return `${parseFloat(item.value).toFixed(0)} %`;
                        },
                        style: {
                          textAlign: "center",
                          fontSize: 14,
                          fontWeight: "bold",
                        },
                      }}
                      statistic={{
                        title: false,
                        content: {
                          style: {
                            whiteSpace: "pre-wrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontWeight: 500,
                            fontSize: 20,
                          },
                          content: `Purchases / ${base_currency}`,
                        },
                      }}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default PieSection;
