import React , {Component} from 'react';
import Container  from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import Form  from 'react-bootstrap/Form';
import CustomSelect from './CustomSelect';
import {categories } from '../../../static/constant';
import '../../../css/forms.css';
import './AddProject.css';
class AddProjectProducts extends Component{
    state = {
        selectedOption: null,
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };
    render(){
        const categoriesOptions = categories.map(cat => {
            return { value: cat, label: cat }
        });
        return (
            <React.Fragment>
                <Container className="add-project-box pt-4">
                    <Row className="justify-content-center">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Row className="justify-content-center text-center">
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                                    <h4 className="p-p-heading mb-4"> Select the used products </h4>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mt-5" >
                                    <Form.Group as={Row}>
                                        <Col xs={12} sm={12} md={4} lg={3} xl={3} className="pl-0 mb-2">
                                            <CustomSelect 
                                                name="project-type"
                                                options={categoriesOptions}
                                                onChange={this.handleChange}
                                                placeholder="All Brands"
                                                isMulti={false}
                                            />
                                        </Col>
                                        <Col xs={12} sm={12} md={4} lg={3} xl={3} className="pl-0 mb-2">
                                            <CustomSelect 
                                                name="project-type"
                                                options={categoriesOptions}
                                                onChange={this.handleChange}
                                                placeholder="All Categories"
                                                isMulti={false}
                                            />
                                        </Col>
                                        <Col xs={12} sm={12} md={4} lg={3} xl={3} className="pl-0 mb-2">
                                            <CustomSelect 
                                                name="project-type"
                                                options={categoriesOptions}
                                                onChange={this.handleChange}
                                                placeholder="All kinds"
                                                isMulti={false}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}


export default AddProjectProducts;




