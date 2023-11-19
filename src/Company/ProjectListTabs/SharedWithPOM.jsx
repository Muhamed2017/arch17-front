import React, { Component } from 'react'
import {Row,Col} from 'antd'

class SharedWithPOM extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( <div className='shared_with'>

           <div className="shared-with-row relative">
           <Row align="middle">
                <Col md={5}>
                    <div className="avatar"></div>
                </Col>
                <Col md={19}>
                    <p>Name</p>
                    <p>Company / People</p>
                    <p>E-mail</p>
                </Col>

            </Row>
            <div className="remove-btn absolute arch-btn">
                Remove
            </div>
           </div>
           <div className="shared-with-row relative">
           <Row align="middle">
                <Col md={5}>
                    <div className="avatar"></div>
                </Col>
                <Col md={19}>
                    <p>Name</p>
                    <p>Company / People</p>
                    <p>E-mail</p>
                </Col>
            </Row>
            <div className="remove-btn absolute arch-btn">
                Remove
            </div>
           </div>
           <div className="shared-with-row relative">
           <Row align="middle">
                <Col md={5}>
                    <div className="avatar"></div>
                </Col>
                <Col md={19}>
                    <p>Name</p>
                    <p>Company / People</p>
                    <p>E-mail</p>
                </Col>
            </Row>
            <div className="remove-btn absolute arch-btn">
                Remove
            </div>
           </div>
           <div className="shared-with-row relative">
           <Row align="middle">
                <Col md={5}>
                    <div className="avatar"></div>
                </Col>
                <Col md={19}>
                    <p>Name</p>
                    <p>Company / People</p>
                    <p>E-mail</p>
                </Col>
            </Row>
            <div className="remove-btn absolute arch-btn">
                Remove
            </div>
           </div>
          
           
        </div> );
    }
}
 
export default SharedWithPOM;