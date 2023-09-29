import React, { Component } from 'react';

class SupplierPDFLayout extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (<div
        className='supplier-pdf'
        >{this.props.payment?.name}</div>);
    }
}
 
export default SupplierPDFLayout;