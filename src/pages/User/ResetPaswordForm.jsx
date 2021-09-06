import React , { Component } from "react";
import Container  from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../css/forms.css';
import { NavLink } from 'react-router-dom';
class ResetPassword extends Component{


    render(){      
        return(
            <div>
                <Container fluid="md m-t-global">
                    <Row className="justify-content-center text-center align-items-center">
                        <Col xs={12} sm={12} md={8} lg={6} xl={6} className="create-busines-Account-form-container p-5">
                            <div>
                                <div className="form-header py-3">
                                    <h1 >Reset Passowrd</h1>
                                </div>
                                <Form.Row>
                                    <Col  xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Group  className="my-1">
                                            <Form.Control type="password" placeholder="Please input your e-mail" />
                                        </Form.Group>
                                    </Col>
                                </Form.Row> 
                                <Col  xs={12} sm={12} md={12} lg={12} xl={12} className="px-0 py-3">
                                    <Button type="submit" className="w-100 btn-submit coninue-btn ">Continue</Button>
                                </Col>  
                                <div className="form-footer py-3 text-center">
                                    <p>
                                    <NavLink to="/signup" className="form-link"> Return to Sign in</NavLink>
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>


            </div>
        );
    }
}
export default ResetPassword;