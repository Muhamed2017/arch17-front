import React, { Component } from "react";
import { Modal, Form, Input, Button, Row, Col } from "antd";

import axios from "axios";
import { API } from "../../utitlties";
import BudgetComponent from "./TotalSummery/BudgetComponent";
import RealizedSection from "./TotalSummery/RealizedSection";
import PieSection from "./TotalSummery/PieSection";

const config = {
  height: 100,
  autoFit: true,
  percent: 1.5,
  color: ["#C5733B", "#E6AA8F"],
  progressStyle: {
    radius: [0, 0, 15, 15],
    cursor: "pointer",
    fillOpacity: 1,
  },
  label: {
    style: {
      fill: "#000",
      fontSize: 30,
      fontWeight: 700,
      position: "top",
    },
    content: (item) => {
      return parseFloat(1 - item.percent).toFixed(2);
    },
  },
};

const _config1 = {
  data: [
    {
      title: "TOTAL SALES",
      year: "1991",
      value: 3,
      type: "Tax",
    },
    {
      title: "TOTAL SALES",
      year: "1991",
      value: 15,
      type: "Actual",
    },
    {
      title: "TOTAL PURCHASE",
      year: "1992",
      value: 2,
      type: "Tax",
    },
    {
      title: "TOTAL PURCHASE",
      year: "1992",
      value: 10,
      type: "Actual",
    },
    {
      title: "TOTAL PROFIT",
      year: "1993",
      value: 8,
      type: "Tax",
    },
    {
      title: "TOTAL PROFIT",
      year: "1993",
      value: 12,
      type: "Actual",
    },
  ],
  height: 500,
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
    position: "top-left",
    style: {
      padding: 10,
      width: 10,
    },
  },
  seriesField: "type",
  label: {
    position: "middle", // 'top', 'bottom', 'middle'
  },
};
const _config2 = {
  data: [
    {
      year: "1991",
      value: 3,
      type: "Tax",
    },
    {
      year: "1991",
      value: 15,
      type: "Actual",
    },
    {
      year: "1992",
      value: 2,
      type: "Tax",
    },
    {
      year: "1992",
      value: 10,
      type: "Actual",
    },
    {
      year: "1993",
      value: 8,
      type: "Tax",
    },
    {
      year: "1993",
      value: 12,
      type: "Actual",
    },
  ],
  color: ["#E6AA8F", "#C5733B"],
  isStack: true,
  height: 412,
  autoFit: true,
  xField: "year",
  yField: "value",
  yAxis: {
    visible: false,
    grid: { visible: false },
  },
  xAxis: {
    visible: false,
  },
  legend: {
    position: "bottom",
  },
  seriesField: "type",
  label: {
    position: "middle", // 'top', 'bottom', 'middle'
  },
  interactions: [
    {
      type: "active-region",
      enable: false,
    },
  ],
};

class SummaryOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // budget: this.props.budget,
      budget_modal: false,
      project_id: this.props.project_id,
      total_purchases: 400000,
      base_currency: "RMB",
      budget: this.props.budget,
      project_currency:this.props.project_currency,
      budget_data: [],
      tc: this.props.tc,
      tp: this.props.tp,
      tcvt: this.props.tcvt,
      tpvt: this.props.tpvt,
      tpbc: this.props.tpbc,
      tpvtbc: this.props.tpvtbc,
      sub_profit: this.props.sub_profit,
      tcwvt: this.props.tcwvt,
      tpwvt: this.props.tpwvt,
      trpc: this.props.trpc,
      tmpv: this.props.tmpv,
      tissued: this.props.tissued,
      detuct: this.props.detuct,
      refunded: this.props.refunded,
      tc_per_currency:this.props.tc_per_currency,
      tdc:this.props.tdc,
      dvp:this.props.dvp,
      dlp:this.props.dlp
    };
  }

  formatNumber = (number) => {
    return Number(parseFloat(number).toFixed(2))?.toLocaleString();
  };

  render() {
    const {
      budget,
      base_currency,
      tc,
      tp,
      tcvt,
      tpvt,
      tcwvt,
      tpwvt,
      trpc,
      tmpv,
      tissued,
      detuct,
      refunded,
      project_id,
      tdc,
      tc_per_currency,
      dvp,
      dlp,
      project_currency
    } = this.state;
    return (
      <>
        <div id="overall-summary-page">
          <BudgetComponent
            tp={tp}
            budget={budget}
            project_id={project_id}
            base_currency={base_currency}
          />

          <RealizedSection
            tc={tc}
            tp={tp}
            tcvt={tcvt}
            tpvt={tpvt}
            tcwvt={tcwvt}
            tpwvt={tpwvt}
            trpc={trpc}
            tmpv={tmpv}
            tissued={tissued}
            detuct={detuct}
            refunded={refunded}
            base_currency={base_currency}
          />
          <PieSection
            trpc={trpc}
            tc={tc}
            tmpv={tmpv}
            tp={tp}
            base_currency={base_currency}
            tdc={tdc}
            tc_per_currency={tc_per_currency}
            dvp={dvp}
            dlp={dlp}
            project_currency={project_currency}
            
          />
        </div>
      </>
    );
  }
}

export default SummaryOverview;
