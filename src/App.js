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
import HomePage from './HomePage/HomePage'
import AuthProvider from './contexts/AuthContext';
import { connect } from 'react-redux';
import NavigationBar from './components/NavigationBar';
// import { ChakraProvider } from "@chakra-ui/react"
import AddProductWrapper from './pages/addProduct/AddProductWrapper';
import AddProjectWrapper from './pages/addProject/AddProjectWrapper';

import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import CreateBrand from './pages/CreateBrand'
import Kind from './pages/addProduct/Kind'
import Product from './pages/Product'
import Project from './pages/Project'
import TextEditor from './pages/TextEditor';
import TestCrop from './pages/TestCrop';
import "react-notifications-component/dist/theme.css";
import UserProfile from './pages/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify'
import Settings from './pages/user_profile_tabs/Settings';
import { Home } from './pages/Home';

import 'antd-country-phone-input/dist/index.css'

import Search from './pages/Search';
import TableStep from './pages/TableStep';
import EditKind from './pages/editProduct/EditKind';
import EditProductWrapper from './pages/editProduct/EditProductWrapper';
import { ParallaxProvider } from "react-scroll-parallax";
import "semantic-ui-css/semantic.min.css";
import EditProjectWrapper from './pages/addProject/EditProjectWrapper';
import Magazine from './pages/Magazine';
import AllBrands from './pages/AllBrands';
import CreateDesignerAccountHelp from './pages/static_pages/CreateDesignerAccountHelp'
import DesignerProducts from './pages/DesignerProducts';
import BoardProjects from './pages/BoardProjects';
import Procurement from './pages/helpPages/Procurement';
import CreateDesigneCompanyWrapper from './Company/CreateDesigneCompanyWrapper';
import Company from './Company/Company'
class App extends Component {
   constructor(props){
     super(props)
     this.state={
     }
   }
  render(){
  return (
    <AuthProvider>
    <React.Fragment>
    <ParallaxProvider>

          {/* <NavigationBar /> */}
          {/* <ConfigProvider locale={en}>
          </ConfigProvider> */}
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
              
              
              <Route path='/product/:id' component={Product} exact/>
              <Route path='/project/:id' component={Project} exact/>
              <Route path='/design-selected' component={Magazine} exact/>
              <Route path='/brands' component={AllBrands} exact/>


              {/* static pages */}
              <Route path='/procurementservice' component={Procurement} exact/>
              <Route path='/designaccountintro' component={CreateDesignerAccountHelp} exact/>


              <Route path='/products' 
              render={(state)=> <Search {...state}/>}
              exact />
               {/* <Route path='/products/:category' 
              render={(state)=> <Search {...state}/>}
              exact />
               <Route path='/products/:category/:type' 
              render={(state)=> <Search {...state}/>}
               exact /> */}
              <Route path='/identity/:id' 
              render={(state)=><AddProductWrapper {...state}/>}
              exact />

              
               <Route path='/edit/:id' 
              render={(state)=><EditProductWrapper {...state}/>}
              exact />
            
           <Route path='/addproject/:type/:id' 
              render={(state)=><AddProjectWrapper {...state}/>}
              exact />

              <Route path='/editproject/:id' 
              render={(state)=><EditProjectWrapper {...state}/>}
              exact />
              
              <Route path="/profile/settings" exact component= {Settings} />
                <Route path="/user/:uid" exact component={UserProfile } />
               
              <Route path='/' exact>
                <HomePage/>
              </Route>
             <Route path="/add-product/:id" exact component={Kind}/>
             <Route path="/edit-product/:id" exact component={EditKind}/>
              <Route path='/designeraccount' component={DesignerAccount} exact />
              <Route path='/createdesigncompany' component={CreateDesigneCompanyWrapper} exact />
             
              <Route path="/editor" exact><TextEditor />
              </Route>
               
              <Route path="/test" exact><TestCrop />
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
              <Route path='/company/:id' component={Company} exact />
              <Route path='/usercollection/:id' component={UserCollection} exact />
              <Route path='/designerproducts/:id' component={DesignerProducts} exact />
              <Route path='/projectcollection/:id' component={BoardProjects} exact />
              <Route path='/types/:store_id/:type_name' component={Type} exact />
               <Route path='/product/edit/122' exact>
                <TableStep/>
              </Route>
              
              
            </Switch>
          </Router>
          
        
          <ToastContainer  />
    </ParallaxProvider>

    </React.Fragment>
    </AuthProvider>

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

