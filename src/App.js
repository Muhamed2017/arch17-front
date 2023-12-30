import React, {Component} from 'react';
import './App.css';
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
import TestUpload from './pages/TestUpload';
import "react-notifications-component/dist/theme.css";
import UserProfile from './pages/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify'
import Settings from './pages/user_profile_tabs/Settings';
import { Home } from './pages/Home';
import  Categories from './pages/Categories'
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
import Designers from './pages/Designers';
import CreateDesignerAccountHelp from './pages/static_pages/CreateDesignerAccountHelp'
import DesignerProducts from './pages/DesignerProducts';
import BoardProjects from './pages/BoardProjects';
import Procurement from './pages/helpPages/Procurement';
import AboutArch17 from './pages/helpPages/AboutArch17';
import SellProducts from './pages/helpPages/SellProducts';
import Arch17com from './pages/helpPages/Arch17com';
import DesignerHelp from './pages/helpPages/DesignerHelp';
import CompanyHelp from './pages/helpPages/CompanyHelp';

import DesignSelected from './pages/helpPages/DesignSelected';

import CreateDesigneCompanyWrapper from './Company/CreateDesigneCompanyWrapper';
import Company from './Company/Company'
import ClientList from './Company/ClientList'
import SupplierList from './Company/SupplierList'
import ProjectList from './Company/ProjectList'
import ProjectListItem from './Company/ProjectListItem'
import 'react-phone-input-2/lib/style.css'

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
              <Route path='/designers' component={Designers} exact/>
              <Route path='/categories' component={Categories} exact/>


              {/* static pages */}
              <Route path='/procurementservice' component={Procurement} exact/>
              <Route path='/aboutarch17' component={AboutArch17} exact/>
              <Route path='/sellproducts' component={SellProducts} exact/>
              <Route path='/arch17com' component={Arch17com} exact/>
              <Route path='/companyintro' component={CompanyHelp} exact/>
              <Route path='/designerintro' component={DesignerHelp} exact/>
              
              <Route path='/designselected' component={DesignSelected} exact/>
              
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
              <Route path="/clientlist/:entity/:id" component={ClientList} exact  />
              <Route path="/supplierlist/:entity/:id" component={SupplierList} exact  />
              <Route path="/projectList/:entity/:id" component={ProjectList} exact  />
              <Route path="/plistitem/:id" component={ProjectListItem} exact  />
              <Route path="/test" exact><TestCrop />
              </Route>
              <Route path="/htmltoimage" exact><TestUpload />
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
              {/* <Route path='/usercollection/:id' component={UserCollection} exact /> */}
              {/* <Route path='/projectcollection/:id' component={BoardProjects} exact /> */}

              <Route path='/:username/:collectionname/collections/:id' component={UserCollection} exact />
              <Route path='/:username/:collectionname/sets/:id' component={BoardProjects} exact />

              <Route path='/designerproducts/:id' component={DesignerProducts} exact />
              <Route path='/companyproducts/:id' component={DesignerProducts} exact />
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

