import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthProvider from './contexts/AuthContext';
import { connect } from 'react-redux';
import NavigationBar from './components/NavigationBar';
import { ChakraProvider } from "@chakra-ui/react"
// import Kind from './pages/addProduct/Kind.jsx';
// import AddProductWrapper from './pages/addProduct/AddProductWrapper';
// import MultiStepForm from './pages/Form-Wrpper/MultiStepForm';
// import TestUpload from './pages/TestUpload';
// import Steper from './pages/Stepers';
// import TestCrop from './pages/TestCrop';
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

