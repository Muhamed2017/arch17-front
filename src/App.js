import React, {Component} from 'react';
import './App.css';
import './Demo.css'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Brand from './pages/Brand'
import DesignerAccount from './pages/DesignerAccount'
import Collection from './pages/Collection'
import UserCollection from './pages/UserCollection'
import Type from './pages/Type'
import TestOptionPrice from './pages/TestOptionPrice'
import HomePage from './HomePage/HomePage'
import AuthProvider from './contexts/AuthContext';
import { connect } from 'react-redux';
import NavigationBar from './components/NavigationBar';
import { ChakraProvider } from "@chakra-ui/react"
import AddProductWrapper from './pages/addProduct/AddProductWrapper';
import AddProjectWrapper from './pages/addProject/AddProjectWrapper';
import TestUpload from './pages/TestUpload';
import TestCrop from './pages/TestCrop';
import Dropzones from './components/Dropzone'
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import CreateBrand from './pages/CreateBrand'
import Kind from './pages/addProduct/Kind'
import Product from './pages/Product'
import Project from './pages/Project'
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
import Search from './pages/Search';
import TableStep from './pages/TableStep';
import EditKind from './pages/editProduct/EditKind';
import MultiStepForm from './pages/Form-Wrpper/MultiStepForm'
import EditProductWrapper from './pages/editProduct/EditProductWrapper';


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
          {/* <NavigationBar /> */}
          <ConfigProvider locale={en}>
          </ConfigProvider>
          <Router>
          <NavigationBar />

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
              <Route path='/project/:id' component={Project} exact/>
              {/* <Route path="/search" component={Search} exact /> */}
              <Route path='/products' 
              render={(state)=> <Search {...state}/>}
              exact />
               <Route path='/products/:category' 
              render={(state)=> <Search {...state}/>}
              exact />
               <Route path='/products/:category/:type' 
              render={(state)=> <Search {...state}/>}
               exact />
              <Route path='/identity/:id' 
              render={(state)=><AddProductWrapper {...state}/>}
              exact />

              
               <Route path='/edit/:id' 
              render={(state)=><EditProductWrapper {...state}/>}
              exact />
              <Route path="/add" exact>
                <MultiStepForm/>
              </Route>
           <Route path='/addproject' 
              render={(state)=><AddProjectWrapper {...state}/>}
              exact />
              <Route path="/profile/settings" exact component= {Settings} />
                <Route path="/user/:uid" exact component={UserProfile } />
               
              <Route path='/' exact>
                <HomePage/>
              </Route>
             <Route path="/add-product/:id" exact component={Kind}/>
             <Route path="/edit-product/:id" exact component={EditKind}/>
              <Route path='/designeraccount' component={DesignerAccount} exact />
             
              <Route path="/editor" exact><TextEditor />
              </Route>
              <Route path='/' exact>
                <Home/>
              </Route>
              <Route path='/brandcreate' exact>
                <CreateBrand />
              </Route>
              <Route path='/brand/:id' component={Brand} exact />
              <Route path='/collection/:id' component={Collection} exact />
              <Route path='/profile' component={UserProfile} exact />
              <Route path='/usercollection/:id' component={UserCollection} exact />
              <Route path='/types/:store_id/:type_name' component={Type} exact />
               <Route path='/product/edit/122' exact>
                <TableStep/>
              </Route>
               <Route path='/prices' 
              render={(state)=><TestOptionPrice {...state}/>}
              exact />
              
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

