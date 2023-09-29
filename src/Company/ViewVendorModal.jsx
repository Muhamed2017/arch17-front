import React, { Component } from "react";
import { Row, Col } from "antd";
import { regionNames } from "./../redux/constants";
class ViewVendorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendor: this.props?.vendor,
    };
  }
  state = {};
  render() {
    const { vendor } = this.state;
    return (
      <div className="vendor-modal-content">
        <Row className="mb-3">
          <Col>
            <p className="name">{vendor?.name}</p>
            <span className="cur">{vendor?.currency}</span>
          </Col>
          <Col>
            <div className="vendors-actions"></div>
          </Col>
        </Row>
        <div className="frac">
          <p className="frac-label">Business Value</p>
          <p className="frac-content">
            {Number(parseFloat(vendor?.total).toFixed(2)).toLocaleString()}{" "}
            <span className="cur">{vendor?.currency}</span>
          </p>
        </div>
        <div className="frac">
          <p className="frac-label">Country, City</p>
          <p className="frac-content">
            {`${regionNames.of(vendor?.country)}, ${vendor?.city}`}
          </p>
        </div>
        {vendor?.address && (
          <div className="frac">
            <p className="frac-label">Add</p>
            <p className="frac-content">{vendor?.address}</p>
          </div>
        )}
        <div className="frac">
          <p className="frac-label">Contacts</p>
         
          {vendor?.attn && vendor?.attn != "null" && (
             <p className="frac-content">{vendor?.attn}</p>
          )}

          {vendor?.phone && vendor?.phone != "null" && (
            <p className="frac-content">+ {vendor?.phone}</p>
          )}
         
          {vendor?.email && vendor?.email != "null" && (
             <p className="frac-content">{vendor?.email}</p>
          )}
        </div>
        <div className="frac">
          <p className="frac-label">Bank Account</p>
          <p className="frac-content">{vendor?.bank_account}</p>
        </div>
        <div className="frac">
          <p className="frac-label">Products/Services</p>
          {vendor?.products?.map((p) => {
            return (
              <>
                <p className="frac-content">{`- ${p}`}</p>
              </>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ViewVendorModal;
