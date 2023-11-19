import React, { Component } from "react";

import { Row, Col } from "antd";
import { Column, Bar } from "@ant-design/charts/node_modules/@ant-design/plots";

const _config1 = {
  height: 500,
  padding: [30, 0, 75, 0],
  color: ["#E6AA8F", "#C5733B"],
  isStack: true,
  autoFit: false,
  xField: "title",
  yField: "value",
  yAxis: false,
  xAxis: {
    visible: true,
  },
  legend: {
    position: "bottom",
  },
  seriesField: "type",
  label: {
    position: "middle", // 'top', 'bottom', 'middle'
    fontWeight: 600,
    style: {
      fill: "#fff",
      fontSize: 16,
      fontWeight: 700,
      position: "middle",
    },
    // content: (item) => {
    //   return `${Number(parseFloat(item.value).toFixed(2)).toLocaleString()}`;
    // },
    content: (item) => {
      if (item.value > 0)
        return `${Number(parseFloat(item.value).toFixed(2)).toLocaleString()}`;
    },
  },
};
const _config2 = {
  color: ["#964B00", "#E6AA8F", "#C5733B"],
  padding: [10, 0, 75, 0],
  isStack: true,
  height: 500,
  autoFit: true,
  xField: "title",
  yField: "value",

  yAxis: {
    visible: false,
    grid: { visible: false },
  },
  xAxis: {
    // visible: false,
  },

  seriesField: "type",
  legend: {
    position: "bottom",
  },

  label: {
    position: "middle", // 'top', 'bottom', 'middle'
    fontWeight: 600,
    style: {
      fill: "#fff",
      fontSize: 16,
      fontWeight: 700,
      position: "middle",
    },
    content: (item) => {
      if (item.value > 0)
        return `${Number(parseFloat(item.value).toFixed(2)).toLocaleString()}`;
    },
  },
};
class RealizedSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tc: this.props.tc,
      tp: this.props.tp,
      base_currency: this.props.base_currency,
      tpvt: this.props.tpvt,
      tcvt: this.props.tcvt,
      sprofit: this.props.tc - (this.props.tp + this.props.tcvt),
      tprofit:
        this.props.tc - (this.props.tp + this.props.tcvt) + this.props.tpvt,
      tcwvt: this.props.tcwvt,
      tpwvt: this.props.tpwvt,
      unrealized_data: [],
      realized_data: [],
      trpc: this.props.trpc,
      tmpv: this.props.tmpv,
      tissued: this.props.tissued,
      detuct: this.props.detuct,
      refunded: this.props.refunded,
      condition: this.props.detuct - this.props.tissued,
      remain:
        this.props.detuct - this.props.tissued > 0
          ? this.props.detuct - this.props.tissued
          : 0,
      right_hand_budget: 0,
      budget_data: [],
      // right_budget:(((trpc-(tmpv+tissued)))+(detuct+refunded))-remain)+(this.props.detuct-this.props.tissued>0?this.props.detuct-this.props.tissued:0)
    };
  }
  formatNumber = (number) => {
    return Number(parseFloat(number).toFixed(2))?.toLocaleString();
  };
  componentDidMount() {
    const {
      tc,
      tp,
      tcvt,
      tpvt,
      tprofit,
      sprofit,
      tcwvt,
      tpwvt,
      trpc,
      tmpv,
      tissued,
      detuct,
      refunded,
      remain,
      base_currency,
    } = this.state;
    const right_hand_budget =
      trpc - (tmpv + tissued) + (detuct + refunded) - remain + remain;

    const _realiezed_common_data = [
      {
        title: "Received Payments",
        year: "1991",
        value: tc >= trpc ? 0 : trpc - tc,
        type: "Overflow",
        Overflow: `${
          tc >= trpc ? 0 : this.formatNumber(trpc - tc)
        } ${base_currency}`,
      },
      {
        title: "Received Payments",
        year: "1991",
        value: tc >= trpc ? tc - trpc : 0,
        type: "Unrealized",
        Unrealized: `${
          tc >= trpc ? this.formatNumber(tc - trpc) : 0
        } ${base_currency}`,
      },
      {
        title: "Received Payments",
        year: "1991",
        value: trpc,
        type: "Realized",
        Realized: `${this.formatNumber(trpc)} ${base_currency}`,
      },

      {
        title: "Made Payments",
        year: "1992",
        value: tp >= tmpv ? 0 : tmpv - tp,
        type: "Overflow",
        Overflow: `${
          tp >= tmpv ? 0 : this.formatNumber(tmpv - tp)
        } ${base_currency}`,
      },

      {
        title: "Made Payments",
        year: "1992",
        value: tp >= tmpv ? tp - tmpv : 0,
        type: "Unrealized",
        Unrealized: `${
          tp >= tmpv ? this.formatNumber(tp - tmpv) : 0
        } ${base_currency}`,
      },
      {
        title: "Made Payments",
        year: "1992",
        value: tmpv,
        type: "Realized",
        Realized: `${this.formatNumber(tmpv)} ${base_currency}`,
      },
    ];
    this.setState({
      budget_data:
        right_hand_budget > tprofit
          ? [
              {
                state: "Realized",
                name: "budget",
                value: parseFloat(right_hand_budget),

                type: "TOTAL SPENT",
                Realized: `${this.formatNumber(
                  right_hand_budget
                )} ${base_currency}`,
              },
              {
                state: "Overflow",
                name: "budget",
                value: parseFloat(right_hand_budget - tprofit),
                type: "OVER BUDGET",
                Overflow: `${this.formatNumber(
                  right_hand_budget - tprofit
                )} ${base_currency}`,
              },
            ]
          : [
              {
                state: "Realized",
                name: "budget",
                value: parseFloat(right_hand_budget),
                type: "TOTAL SPENT",
                Realized: `${this.formatNumber(
                  right_hand_budget
                )} ${base_currency}`,
              },
              {
                state: "Unrealized",
                name: "budget",
                value: parseFloat(tprofit - right_hand_budget),
                type: "TOTAL LEFT",
                Unrealized: `${this.formatNumber(
                  tprofit - right_hand_budget
                )} ${base_currency}`,
              },
            ],
      unrealized_data: [
        {
          title: "TOTAL SALES",
          year: "1991",
          value: tcvt,
          type: "Tax",
          Tax: `${this.formatNumber(tcvt)} ${base_currency}`,
        },
        {
          title: "TOTAL SALES",
          year: "1991",
          value: tcwvt,
          type: "Actual",
          Actual: `${this.formatNumber(tcwvt)} ${base_currency}`,
        },
        {
          title: "TOTAL PURCHASE",
          year: "1992",
          value: tpvt,
          type: "Tax",
          Tax: `${this.formatNumber(tpvt)} ${base_currency}`,
        },
        {
          title: "TOTAL PURCHASE",
          year: "1992",
          value: tpwvt,
          type: "Actual",
          Actual: `${this.formatNumber(tpwvt)} ${base_currency}`,
        },
        {
          title: "TOTAL PROFIT",
          year: "1993",
          value: tprofit - sprofit,
          type: "Tax",
          Tax: `${this.formatNumber(tprofit - sprofit)} ${base_currency}`,
        },
        {
          title: "TOTAL PROFIT",
          year: "1993",
          value: sprofit,
          type: "Actual",
          Actual: `${this.formatNumber(sprofit)} ${base_currency}`,
        },
      ],

      realized_data:
        tcvt > 0
          ? [
              ..._realiezed_common_data,
              {
                title: "Issued Tax",
                year: "1993",
                value: tcvt >= tissued ? 0 : tissued - tcvt,
                type: "Overflow",
                Overflow: `${
                  tcvt >= tissued ? 0 : this.formatNumber(tissued - tcvt)
                } ${base_currency}`,
              },
              {
                title: "Issued Tax",
                year: "1993",
                value: tcvt >= tissued ? tcvt - tissued : 0,
                type: "Unrealized",
                Unrealized: `${
                  tcvt >= tissued ? this.formatNumber(tcvt - tissued) : 0
                } ${base_currency}`,
              },
              {
                title: "Issued Tax",
                year: "1993",
                value: tissued,
                type: "Realized",
                Realized: `${this.formatNumber(tissued)} ${base_currency}`,
              },
            ]
          : [..._realiezed_common_data],
    });
  }
  budgetConfig = {
    data: [],
    xField: "value",
    yField: "name",
    seriesField: "state",
    height: 100,
    isStack: true,
    xAxis: false,
    barStyle: {},
    yAxis: false,
    // tooltip: false,

    legend: {
      position: "bottom",
      autoFit: true,
    },
  };
  render() {
    const {
      tc,
      tp,
      tcvt,
      tpvt,
      unrealized_data,
      tprofit,
      sprofit,
      trpc,
      tmpv,
      realized_data,
      tissued,
      refunded,
      detuct,
      remain,
      right_hand_budget,
      base_currency,
    } = this.state;

    return (
      <>
        <div className="my-5">
          <div className="unrealized-container mb-5">
            <h6>Unrealized</h6>
            <Row gutter={24}>
              <Col md={7}>
                <div className="stack-side">
                  <div className="inner-section shadow-section  outer-wrapper">
                    <div className="side-cell">
                      <p>Total Sales Contract Value</p>
                      <span>
                        {this.formatNumber(tc)} {base_currency}
                      </span>
                    </div>
                    <hr />
                    {tcvt > 0 && (
                      <>
                        <div className="side-cell">
                          <p>Sales Tax Value</p>
                          <span>
                            {this.formatNumber(tcvt)} {base_currency}
                          </span>
                        </div>
                        <hr />
                      </>
                    )}

                    <div className="side-cell">
                      <p>Total Purchases Value</p>
                      <span>
                        {this.formatNumber(tp)} {base_currency}
                      </span>
                    </div>
                    <hr />

                    <div className="side-cell">
                      <p>Total Purchases Vat Tax Value</p>
                      <span>
                        {this.formatNumber(tpvt)} {base_currency}
                      </span>
                    </div>
                    <hr />

                    <div className="side-cell">
                      <p>Subtotal Profit Value</p>
                      <span>
                        {this.formatNumber(sprofit)} {base_currency}
                      </span>
                    </div>
                    <hr />

                    <div className="side-cell">
                      <p>Total Profit</p>
                      <span>
                        {this.formatNumber(tprofit)} {base_currency}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={17}>
                <div className="chart-inner shadow-section  outer-wrapper relative">
                  <div className="relative">
                    <Column
                    //  animation={false}
                      {..._config1}
                      data={unrealized_data}
                      tooltip={{ fields: ["Tax", "Actual"] }}
                      // label={{}}
                    />
                  </div>
                  <div className="absolute-charts">
                    <Row justify="space-">
                      <Col md={8}>
                        <span>
                          {this.formatNumber(tc)} {base_currency}
                        </span>
                      </Col>
                      <Col md={8}>
                        <span>
                          {this.formatNumber(tp)} {base_currency}
                        </span>
                      </Col>
                      <Col md={8}>
                        <span>
                          {this.formatNumber(tprofit)} {base_currency}
                        </span>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="unrealized-container my-3">
            <h6>Realized</h6>
            <Row gutter={24}>
              <Col md={7}>
                <div className="stack-side">
                  <div className="inner-section shadow-section  outer-wrapper">
                    <div className="side-cell">
                      <p>Total Received Payments From Customer</p>
                      <span>
                        {this.formatNumber(trpc)} {base_currency}
                      </span>
                    </div>
                    <hr />
                    <div className="side-cell">
                      <p>Total Made Payments To Vendors</p>
                      <span>
                        {this.formatNumber(tmpv)} {base_currency}
                      </span>
                    </div>
                    <hr />
                    {tissued > 0 && (
                      <>
                        <div className="side-cell">
                          <p>Issued Sales Tax</p>
                          <span>
                            {this.formatNumber(tissued)} {base_currency}
                          </span>
                        </div>
                        <hr />
                      </>
                    )}
                    <div className="side-cell">
                      <p>Received Purchase Tax Value</p>
                      {/* <span>{this.formatNumber(refunded + detuct)} {base_currency}</span> */}
                      <p className="indicator">
                        Deductible Credit{" "}
                        <span>
                          {this.formatNumber(detuct)} {base_currency}
                        </span>
                      </p>

                      <p className="indicator">
                        Refunded Credit{" "}
                        <span>
                          {this.formatNumber(refunded)} {base_currency}
                        </span>
                      </p>
                    </div>
                    <hr />
                    <div className="side-cell">
                      <p>Subtotal Realized Profit/Loss</p>
                      <span>
                        {this.formatNumber(trpc - (tmpv + tissued))}{" "}
                        {base_currency}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={17}>
                <div className="chart-inner shadow-section  outer-wrapper relative">
                  <Column
                    {..._config2}
                    data={realized_data}
                    // animation={false}
                    padding={tcvt > 0 ? [10, 0, 75, 0] : [10, 120, 75, 120]}
                    tooltip={{
                      fields: ["Unrealized", "Realized", "Overflow"],
                    }}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="budget-container shadow-section outer-wrapper my-5">
            <Row gutter={55}>
              <Col>
                <p>Subtotal Realized Profit/Loss</p>
                <span>
                  {this.formatNumber(trpc - (tmpv + tissued))} {base_currency}
                </span>
              </Col>
              <Col>
                <p>Deductible Tax Credit</p>
                <span>
                  {this.formatNumber(detuct)} {base_currency}
                </span>
              </Col>
              <Col>
                <p>Refunded Tax Credit</p>
                <span>
                  {this.formatNumber(refunded)} {base_currency}
                </span>
              </Col>
              <Col>
                <p>Total Realized Profit/Loss</p>
                <span>
                  {this.formatNumber(
                    trpc - (tmpv + tissued) + (detuct + refunded) - remain
                  )}{" "}
                  {base_currency}
                </span>
              </Col>
              <Col>
                <p>Remain Deductible Tax Credit</p>
                <span>
                  {remain} {base_currency}
                </span>
              </Col>
            </Row>
            <Bar
            // animation={false}
              {...this.budgetConfig}
              data={this.state.budget_data}
              label={{
                position: "middle",
                content: (item) => {
                  return `${this.formatNumber(
                    parseFloat(item.value).toFixed(2)
                  )} ${base_currency}`;
                },
                style: {
                  fill: "#fff",
                },
              }}
              tooltip={{
                fields:
                  right_hand_budget > tprofit
                    ? ["Realized", "Overflow"]
                    : ["Realized", "Unrealized"],
              }}
              color={
                right_hand_budget > tprofit
                  ? ["#C5733B", "#964B00"]
                  : ["#C5733B", "#E6AA8F"]
              }
            />
            {/* <Bar {...this.budgetConfig}/> */}
          </div>
        </div>
      </>
    );
  }
}

export default RealizedSection;
