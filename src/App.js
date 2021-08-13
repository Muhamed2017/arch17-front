import React from 'react';
import './App.css';
import './Demo.css'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthProvider from './contexts/AuthContext';
import { connect } from 'react-redux';
import NavigationBar from './components/NavigationBar';
import { ChakraProvider } from "@chakra-ui/react"
import AddProductWrapper from './pages/addProduct/AddProductWrapper';
import TestUpload from './pages/TestUpload';
import TestCrop from './pages/TestCrop';
import Dropzones from './components/Dropzone'
import Kind from './pages/addProduct/Kind'
import Product from './pages/Product'
import CoverTab from './pages/addProduct/CoverTab';
import Identity from './pages/addProduct/Identity';
const  App=(props)=>{
  return (
    <ChakraProvider>
    <AuthProvider>
    <React.Fragment>
          <NavigationBar />
          <Router>
            <Switch>
              <Route path="/signup" exact>
                {props.isLoggedIn ? <Redirect to="/" /> : <Register />}
              </Route>
              <Route path="/signin" exact>
                {props.isLoggedIn ? <Redirect to="/" /> : <Login />}
              </Route>
              {/* <Route path="/identity">
                <AddProductWrapper />
              </Route> */}
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
              <Route path='/identity/:id' component={AddProductWrapper} exact />
                {/* <Product/> */}
              {/* </Route> */}
              <Route path="/multi" exact>
                <CoverTab/>
              </Route>
             <Route path="/add-product" exact><Kind />
       </Route>
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
    </React.Fragment>
    </AuthProvider>
    </ChakraProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.regularUser.isLoggedIn,
    user:state.regularUser.user
  }
}
export default connect(mapStateToProps)(App);

