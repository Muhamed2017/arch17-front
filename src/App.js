import React, {Component} from 'react';
import './App.css';
import './Demo.css'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Brand from './pages/Brand'
import AuthProvider from './contexts/AuthContext';
import { connect } from 'react-redux';
import NavigationBar from './components/NavigationBar';
import { ChakraProvider } from "@chakra-ui/react"
import AddProductWrapper from './pages/addProduct/AddProductWrapper';
import TestUpload from './pages/TestUpload';
import TestCrop from './pages/TestCrop';
import Dropzones from './components/Dropzone'
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import CreateBrand from './pages/CreateBrand'

import Kind from './pages/addProduct/Kind'
import Product from './pages/Product'
import CoverTab from './pages/addProduct/CoverTab';
import TextEditor from './pages/TextEditor';
import "react-notifications-component/dist/theme.css";
import UserProfile from './pages/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify'
import Settings from './pages/user_profile_tabs/Settings';
import { Home } from './pages/Home';
import { ConfigProvider } from 'antd-country-phone-input';
import en from 'world_countries_lists/data/en/world.json';

import 'antd/dist/antd.css';
import 'antd-country-phone-input/dist/index.css'

class App extends Component {
   constructor(props){
     super(props)
     this.state={
     }
   }
  render(){
  return (
    <ChakraProvider>
    <AuthProvider>
    <React.Fragment>
          <NavigationBar />
          <ConfigProvider locale={en}>
          </ConfigProvider>
          <Router>
            <Switch>
              <Route path="/signup" exact>
                {this.props.isLoggedIn ? <Redirect to="/" /> : <Register />}
              </Route>
              <Route path="/signin" exact>
                {this.props.isLoggedIn ? <Redirect to="/" /> : <Login />}
              </Route>
              <Route exact path="/callback" component={LinkedInPopUp} />
              <Route path='/cropper' exact>
                <TestUpload />
              </Route>
              <Route path='/cropper2' exact>
                <TestCrop />
              </Route>
              <Route path="/dropzone" exact>
                <Dropzones/>
              </Route>
              <Route path='/product/:id' component={Product} exact/>
              <Route path='/identity/:id' 
              render={(state)=><AddProductWrapper {...state}/>}
              exact />
              <Route path="/multi" exact>
                <CoverTab/>
              </Route>
               <Route path="/user" exact>
                <UserProfile/>
              </Route>
              <Route path='/user/settings' exact>
                <Settings/>
              </Route>
             <Route path="/add-product/:id" exact component={Kind}/>
              <Route path="/editor" exact><TextEditor />
              </Route>
              <Route path='/' exact>
                <Home/>
              </Route>
              <Route path='/brandcreate' exact>
                <CreateBrand />
              </Route>
              <Route path='/brand/:id' component={Brand} exact />

            </Switch>
          </Router>
        {/* <Router>
          <Switch>
            <Route path="/signup" exact>
              {props.isLoggedIn ? <Redirect to="/" /> : <Register />}
            </Route>
            <Route path="/signin" exact>
              {props.isLoggedIn ? <Redirect to="/" /> : <Login />}
            </Route>
            {/* <Route path="/add-product" exact>
       <Kind />
      </Route> */}
            {/* <Route path="/identity">
       <AddProductWrapper />
      </Route> */}
            {/* 
      <Route path="/form">
       <MultiStepForm />
      </Route> */}

            {/* <Route path='/file'>
                <TestUpload />
              </Route> */}
            {/* <Route path='/stepper'>
                  <Steper />
                </Route>
                <Route path='/cropper'>
                  <TestUpload />
                </Route> */}
          {/* </Switch> */}

        {/* </Router> */} 
          <ToastContainer  />

    </React.Fragment>
    </AuthProvider>
    </ChakraProvider>
  );
              }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.regularUser.isLoggedIn,
    user:state.regularUser.user,
    info:state.regularUser.info
  }
}
export default connect(mapStateToProps)(App);

