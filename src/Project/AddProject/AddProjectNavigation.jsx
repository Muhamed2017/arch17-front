import React , {Component,Suspense} from 'react';
import Container  from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { NavLink,Switch,Route,withRouter } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import Spinner from '../../UI/Spinner/Spinner';

import './AddProject.css';
const AddProjectInfo = React.lazy(()=>import('./AddProjectInfo'));
const AddProjectContent = React.lazy(()=>import('./AddProjectContent'));
const AddProjectRole = React.lazy(()=>import('./AddProjectRole'));
const AddProjectProducts = React.lazy(()=>import('./AddProjectProducts'));
const AddProjectCover = React.lazy(()=>import('./AddProjectCover'));
class AddProjectNavigation extends Component{

    render(){
        return (
            <React.Fragment>
                <div className="w-100 bg-white py-3 ">
                    <Container className=" bg-white align-items-center">
                        <Row className="justify-content-center">
                            <Col> 
                                <div className="add-project-nav d-flex justify-content-between align-items-center">
                                        <button className="add-project-back-btn mx-1">
                                            <IoIosArrowBack />   Back
                                        </button>
                                    <Nav className="nav-container">
                                        <Nav.Item>
                                            <NavLink activeClassName="add-project-nav-active" className="add-project-nav-link" to={this.props.match.path+"/info"} >1. Project Info</NavLink>
                                        </Nav.Item>
                                        <span className="nav-link-separator">|</span>
                                        <Nav.Item>
                                            <NavLink activeClassName="add-project-nav-active" className="add-project-nav-link" to={this.props.match.path+"/content"}  >2. Content</NavLink>
                                        </Nav.Item>
                                        <span className="nav-link-separator">|</span>
                                        <Nav.Item>
                                            <NavLink activeClassName="add-project-nav-active" className="add-project-nav-link" to={this.props.match.path+"/role"}  >3. Role</NavLink>
                                        </Nav.Item>
                                        <span className="nav-link-separator">|</span>
                                        <Nav.Item>
                                            <NavLink activeClassName="add-project-nav-active" className="add-project-nav-link" to={this.props.match.path+"/products"}  >4. Tag Products</NavLink>
                                        </Nav.Item>
                                        <span className="nav-link-separator">|</span>
                                        <Nav.Item>
                                            <NavLink activeClassName="add-project-nav-active" className="add-project-nav-link" to={this.props.match.path+"/cover"}  >5. Cover</NavLink>
                                        </Nav.Item>
                                    </Nav>
                                    <div className="add-project-nav-btns">
                                        <button className="add-project-skip-btn mx-1">
                                            Skip
                                        </button>
                                        <button className="add-project-save-btn mx-1">
                                            Save & Continue
                                        </button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Switch>
                    <Route path={this.props.match.path+"/info"}  render={()=>(<Suspense fallback={<Spinner />} ><AddProjectInfo/></Suspense>)}/>
                    <Route path={this.props.match.path+"/content"}  render={()=>(<Suspense fallback={<Spinner />} ><AddProjectContent/></Suspense>)}/>
                    <Route path={this.props.match.path+"/role"} render={()=>(<Suspense fallback={<Spinner />} ><AddProjectRole/></Suspense>)}/>
                    <Route path={this.props.match.path+"/products"} render={()=>(<Suspense fallback={<Spinner />} ><AddProjectProducts/></Suspense>)}/>
                    <Route path={this.props.match.path+"/cover"} render={()=>(<Suspense fallback={<Spinner />} ><AddProjectCover/></Suspense>)}/>
                </Switch>
            </React.Fragment>
        );
    }



}


export default withRouter( AddProjectNavigation);




