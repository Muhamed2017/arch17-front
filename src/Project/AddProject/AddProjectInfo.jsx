import React , {Component} from 'react';
import Container  from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import Form  from 'react-bootstrap/Form';
import {categories , years , types , Countries} from '../../../static/constant';
import {checkValidity,updateObject} from '../../../static/utility';
import CustomSelect from './CustomSelect';
import '../../../css/forms.css';
import './AddProject.css';

class AddProjectInfo extends Component{
    state = {
        infoForm:{
            projectName:{
                value:'',
                validation:{
                    requierd:true,
                    minLingth:5,
                },
                valid:false,
                touched:false,
                err:null
            },
            projectType:{
                value:'',
                validation:{
                    requierd:true
                },
                valid:false,
                touched:false,
                err:null
            },
            projectCategory:{
                value:[],
                validation:{
                    requierd:true,
                    isArray:true
                },
                valid:false,
                touched:false,
                err:null
            },
            projectCountry:{
                value:'',
                validation:{
                    requierd:true
                },
                valid:false,
                touched:false,
                err:null
            },
            projectCity:{
                value:'',
                validation:{
                    requierd:true
                },
                valid:false,
                touched:false,
                err:null
            },
            projectYear:{
                value:'',
                validation:{
                    isNumeric:true,
                    requierd:true
                },
                valid:false,
                touched:false,
                err:null
            }
        },
        formIsValid:false,
        selectedOption: null,
    };


    inputCangedHandeler = (value,inputIdentifier) =>{
    const updatedFormElement = updateObject(this.state.infoForm[inputIdentifier],
        {
            value: value  ,
            valid: checkValidity( value , this.state.infoForm[inputIdentifier].validation ) ,
            touched:true
        });
        const updatedInfoForm = updateObject(this.state.infoForm , {
            [inputIdentifier]:updatedFormElement
        });
        let formIsValid = true;
        for(let inputIdentifier in updatedInfoForm){
            formIsValid=updatedInfoForm[inputIdentifier].valid && formIsValid
        }
        this.setState({infoForm:updatedInfoForm,formIsValid:formIsValid}, () => {
            console.log('State Updated',this.state);
        });
    }
    render(){
        const categoriesOptions = categories.map(cat => {
            return { value: cat, label: cat }
        });
        const yearsList = years.map(y => {
            return { value: y, label: y }
        });
        const typesOptions = types.map(type => {
            return { value: type, label: type }
        });
        const CountriesList = Countries.all.map(c=>{
            return { value: c.name, label: c.name  }
        });
        return (
            <React.Fragment>
                <Container className="add-project-box">
                    <Row className="justify-content-center">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Row>
                            <Col  xs={12} sm={12} md={9} lg={9} xl={9}>
                                    <Form.Group >
                                        <Form.Label>Project Name</Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col  xs={12} sm={12} md={9} lg={9} xl={9} className="mb-5">
                                    <Form.Group >
                                        <Form.Control 
                                            key="projectName" 
                                            className="add-project-name" 
                                            type="text" 
                                            placeholder="Add the project name"
                                            onChange={(event)=>this.inputCangedHandeler(event.target.value,'projectName')} />
                                    </Form.Group>
                                </Col>
                                <Col  xs={12} sm={12} md={9} lg={9} xl={9}>
                                    <Form.Group >
                                        <Form.Label>Project Category</Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col  xs={12} sm={12} md={12} lg={12} xl={12} className="pl-0">
                                    <Form.Group as={Row}>
                                        <Form.Label column xs={2} sm={2} md={2} lg={1} xl={1} className="p-c-margin">
                                        Type
                                        </Form.Label>
                                        <Col xs={8} sm={8} md={6} lg={4} xl={4} className="pl-0">
                                        <CustomSelect 
                                            name="project-type"
                                            options={typesOptions}
                                            onChange={(event)=>this.inputCangedHandeler(event.map(el=>el.value),'projectCategory')}
                                            placeholder="Project Type"
                                            isMulti={true}
                                            closeMenuOnSelect={false}
                                            hideSelectedOptions={false}
                                        />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col  xs={12} sm={12} md={12} lg={12} xl={12} className="pl-0 mb-5" >
                                    <Form.Group as={Row} >
                                        <Form.Label column xs={2} sm={2} md={2} lg={1} xl={1} className="p-c-margin">
                                        Categoty
                                        </Form.Label>
                                        <Col xs={8} sm={8} md={6} lg={4} xl={4} className="pl-0">
                                        <CustomSelect 
                                            name="project-categor"
                                            options={categoriesOptions}
                                            onChange={(event)=>this.inputCangedHandeler(event.value,'projectType')}
                                            placeholder="Project Category"
                                            isMulti={false}
                                            closeMenuOnSelect={false}
                                        />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col  xs={12} sm={12} md={12} lg={12} xl={12} >
                                    <Form.Group >
                                        <Form.Label>Project Country & City</Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col  xs={12} sm={12} md={12} lg={12} xl={12}  className="mb-5">
                                    <Form.Group as={Row}>
                                        <Col xs={12} sm={12} md={6} lg={4} xl={4} className="mb-3">
                                        <CustomSelect 
                                            name="project-categor"
                                            options={CountriesList}
                                            onChange={(event)=>this.inputCangedHandeler(event.value,'projectCountry')}
                                            placeholder="Project Country"
                                            isMulti={false}
                                            closeMenuOnSelect={true}

                                            />
                                        </Col>                                      
                                        <Col xs={12} sm={12} md={6} lg={4} xl={4} >
                                            <Form.Control className="p-c-margin"type="text" placeholder="Input City" onChange={(event)=>this.inputCangedHandeler(event.target.value,'projectCity')}/>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col  xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Group >
                                        <Form.Label>Year</Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col  xs={12} sm={12} md={6} lg={4} xl={4} className="pr-3 mb-5">
                                <Form.Group>
                                    <CustomSelect 
                                            name="project-year"
                                            options={yearsList}
                                            onChange={(event)=>this.inputCangedHandeler(event.value,'projectYear')}
                                            placeholder="Select Project Year"
                                            isMulti={false}
                                            closeMenuOnSelect={true}
                                        />
                                </Form.Group>
                                </Col>
                            </Form.Row>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }


    
}


export default AddProjectInfo;




