import React, { Component } from "react";

class SalesSummaryTab extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    _tc: parseFloat(this.props?.total_contracts_value).toFixed(2),
    _td: parseFloat(this.props?.deliveries_total_value).toFixed(2),
    _trp: parseFloat(this.props?.received_payment_total).toFixed(2),
    changeTotalContract: this.props?.changeTotalContract,
    changeTotalPayment: this.props?.changeTotalPayment,
    _tb:(parseFloat(this.props?.total_contracts_value) - parseFloat(this.props?.received_payment_total)).toFixed(2),
    _tl:(parseFloat(this.props?.total_contracts_value) - parseFloat(this.props?.deliveries_total_value)).toFixed(2),
    _currency:this.props?._currency

  };

  percentage=(base,part)=>{
        return `${parseFloat((parseFloat(part)/parseFloat(base))*100).toFixed(2)} %`
  }
  render() {
    const {_tc,_td,_trp,_tb,_tl,_currency}=this.state
    
    return (
      <>
        <div className="summary sales-summary tables-page">
          <div className="pom-table">
            <div className="table-wrapper">
              <table>
                <tr>
                  <th className="width-350">Item</th>
                  <th className="width-300">Value, Currency</th>
                  <th className="width-550">% Of total contract</th>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">
                    Total Contract Value
                    </p>
                  </td>
                  <td>
                    <p className="main">
                    {Number(_tc)?.toLocaleString()}
                    </p>
                    <p className="sec">
                      {_currency}
                    </p>
                  </td>
                  <td>
                   <p className="main"></p>
                  </td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">
                    Total Recieved Payments
                    </p>
                  </td>
                  <td>
                     <p className="main">
                    {Number(_trp)?.toLocaleString()}
                    </p>
                    <p className="sec">
                      {_currency}
                    </p>
                  </td>
                  <td>
                  <p className="main">{this.percentage(_tc,_trp)}</p>
                  </td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">
                    Total Balance
                    </p>
                  </td>
                  <td>
                    <p className="main">
                    {Number(_tb)?.toLocaleString()}
                    </p>
                    <p className="sec">
                      {_currency}
                    </p>

                  </td>
                  <td>
                  <p className="main">{this.percentage(_tc,_tb)}</p>
                  </td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">
                    Total Deliveries Value
                    </p>
                  </td>
                  <td>
                    {_td <_trp  &&  (<p 
                     className="main red"
                     >
                    {Number(_td)?.toLocaleString()}
                    </p>)}
                    {_td >=_trp  &&  (<p 
                     className="main"
                     >
                    {Number(_td)?.toLocaleString()}
                    </p>)}
                    <p className="sec">
                      {_currency}
                    </p>
                  </td>
                  <td>
                  <p className="main">
                    {`${this.percentage(_tc,_td)}`}
                    </p>
                  </td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">
                    Total Left Value
                    </p>
                  </td>
                  <td>
                     {_tl === 0 &&  (<p 
                     className="main green"
                     >
                    {Number(_tl)?.toLocaleString()}
                    </p>)}
                    {_tl  <0 &&(<p 
                     className="main red"
                     >
                    {Number(_tl)?.toLocaleString()}
                    </p>)}
                    {_tl > 0 &&  (<p 
                     className="main"
                     >
                    {Number(_tl)?.toLocaleString()}
                    </p>)}
                    <p className="sec">
                      {_currency}
                    </p>
                    <p className="main"></p>
                  </td>
                  <td>
                  <p className="main">{this.percentage(_tc,_tl)}</p>
                  </td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">
                    Recieved Payments vs Deliveries Value
                    </p>
                  </td>
                  <td>
                     {_trp -_td < 0 &&  (<p 
                     className="main red"
                     >
                    {Number(_trp -_td )?.toLocaleString()}
                    </p>)}
                    {_trp -_td >= 0 &&  (<p 
                     className="main"
                     >
                    {Number(_trp -_td )?.toLocaleString()}
                    </p>)}
                    <p className="sec">
                      {_currency}
                    </p>
                  </td>
                  <td>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SalesSummaryTab;
