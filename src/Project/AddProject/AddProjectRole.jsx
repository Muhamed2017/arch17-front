import React , {Component} from 'react';
import Container  from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import '../../../css/forms.css';
import './AddProject.css';
import { BsTrash  } from "react-icons/bs";
import {  BiPlusMedical } from "react-icons/bi";
class AddProjectRole extends Component{
    state = {
        designers:[            {
            id:'150',
            name:'mohamed ahmed',
            iamgePath:'https://www.arch17.com/data/users/171/img/avatar_profile.jpg',
            profession:'Interior Designer',
            email:'mohamed@gmail.com',
            saved:true
            },
        {
            id:'151',
            name:'mohamed ahmed1',
            iamgePath:'https://www.arch17.com/data/users/171/img/avatar_profile.jpg',
            profession:'Interior Designer',
            email:'mohamed1@gmail.com',
            saved:true
            },

        ],
        brands:[],
        ApiDesigners:[],
        ApiBrands:[],
        FilteredDesigners:[],
        FilteredBrands:[],
        addNewDesigner:true,
        addNewBrand:true,
        showDesignersDropdown:false,
        showBrandsDropdown:false
    }
    

    componentDidMount(){
        const ApiDesigners = [
            {
                id:'152',
                name:'mohamed ahmed2',
                iamgePath:'https://www.arch17.com/data/users/171/img/avatar_profile.jpg',
                profession:'Interior Designer',
                email:'mohamed2@gmail.com'
                },
                
            {
                id:'153',
                name:'mohamed ahmed3',
                iamgePath:'https://www.arch17.com/data/users/171/img/avatar_profile.jpg',
                profession:'Interior Designer',
                email:'mohamed3@gmail.com'
                },
                
            {
                id:'154',
                name:'mohamed ahmed4',
                iamgePath:'https://www.arch17.com/data/users/171/img/avatar_profile.jpg',
                profession:'Interior Designer',
                email:'mohamed4@gmail.com'
                },
                
            {
                id:'155',
                name:'mohamed ahmed5',
                iamgePath:'https://www.arch17.com/data/users/171/img/avatar_profile.jpg',
                profession:'Interior Designer',
                email:'mohamed5@gmail.com'
                },
            
        ];
        const ApiBrands = [
            {
                id:'152',
                name:'mohamed ahmed2',
                iamgePath:'https://www.arch17.com/data/stores/58/img/logo.png',
                country:'china'
                },
                
            {
                id:'153',
                name:'mohamed ahmed3',
                iamgePath:'https://www.arch17.com/data/stores/60/img/logo.png',
                country:'china'
                },
                
            {
                id:'154',
                name:'mohamed ahmed4',
                iamgePath:'https://www.arch17.com/data/stores/61/img/logo.png',
                country:'china'
                },
                
            {
                id:'155',
                name:'mohamed ahmed5',
                iamgePath:'https://www.arch17.com/data/stores/62/img/logo.png',
                country:'china'
                },
            
        ];
        this.setState({ApiDesigners:ApiDesigners,ApiBrands:ApiBrands});
    }
    FilterDesignersListOnChange = (event) =>{
        let  value = event.target.value;
        let FilteredDesignersArray =  this.state.ApiDesigners.filter(designer=> designer.email.indexOf(value) !== -1  ||designer.name.indexOf(value) !== -1 );
        this.setState({FilteredDesigners:FilteredDesignersArray});
    }
    FilterBrandsListOnChange = (event) =>{
        let  value = event.target.value;
        let FilteredBrandsArray =  this.state.ApiBrands.filter(brand=> brand.name.indexOf(value) !== -1 );
        this.setState({FilteredBrands:FilteredBrandsArray});
    }
    OnSelectDesigner = (designer) =>{
        console.log(designer);
        let designers = this.state.designers;
        designer.saved = false;
        designers.push(designer);
        this.setState({designers:designers}, ()=>{
            console.log(this.state.designers)
            let FilteredDesignersArray =  this.state.FilteredDesigners.filter(Apidesigner=> Apidesigner.id !== designer.id )
            this.setState({FilteredDesigners:FilteredDesignersArray,addNewDesigner:false,showDesignersDropdown:false},()=>{
                console.log(this.state.FilteredDesigners,FilteredDesignersArray);
            })
        });
    }
    OnSelectBrand = (brand) =>{
        console.log(brand);
        let brands = this.state.brands;
        brand.saved = false;
        brands.push(brand);
        this.setState({brands:brands}, ()=>{
            console.log(this.state.brands)
            let FilteredBrandssArray =  this.state.FilteredBrands.filter(Apibrand=> Apibrand.id !== brand.id )
            this.setState({FilteredBrands:FilteredBrandssArray,addNewBrand:false,showBrandsDropdown:false},()=>{
                console.log(this.state.FilteredBrands,FilteredBrandssArray, this.state);
            })
        });
    }
    OnDeleteDesigner = (designer) =>{
        console.log('Should Designer Deleted From backend');
        let designers = this.state.designers;
        let newDesignersArray = designers.filter(Addeddesigner=> Addeddesigner.id !== designer.id);
        console.log( newDesignersArray);
        this.setState({designers:newDesignersArray}, ()=>{
            console.log(this.state.designers)
        let FilteredDesignersArray =  this.state.FilteredDesigners;
        FilteredDesignersArray.push(designer )
        this.setState({FilteredDesigners:FilteredDesignersArray,addNewDesigner:this.state.designers.length>0?false:true})
        console.log(this.state.FilteredDesigners,this.state.addNewDesigner);
        });
    }
    OnDeleteBrand = (brand) =>{
        console.log('Should brand Deleted From backend');
        let brands = this.state.brands;
        let newBrandsArray = brands.filter(AddedBrand=> AddedBrand.id !== brand.id);
        console.log( newBrandsArray);
        this.setState({brands:newBrandsArray}, ()=>{
            console.log(this.state.brands)
        let FilteredBrandsArray =  this.state.FilteredBrands;
        FilteredBrandsArray.push(brand )
        this.setState({FilteredBrands:FilteredBrandsArray,addNewBrand:this.state.brands.length>0?false:true})
        console.log(this.state.FilteredBrands,this.state.addNewBrand);
        });
    }
    OnAddNewDesigner = () =>{
        console.log(this.state.designers);
        console.log('Should Designer Added to backend');
        let unsavedDesigners = this.state.designers;
        unsavedDesigners[unsavedDesigners.length-1].saved = true;
        this.setState({designers:unsavedDesigners}, ()=>{
            console.log(this.state.designers);
            this.setState({addNewDesigner:true});
        });
    }
    OnAddNewBrand = () =>{
        console.log(this.state.brands);
        console.log('Should Brand Added to backend');
        let unsavedBrands = this.state.brands;
        unsavedBrands[unsavedBrands.length-1].saved = true;
        this.setState({brands:unsavedBrands}, ()=>{
            console.log(this.state.brands);
            this.setState({addNewBrand:true});
        });
    }
    
    bluer= ()=>{
        setTimeout(() => {
            this.setState({showDesignersDropdown:false});
        }, 150);
    }
    focus= ()=>{
        this.setState({showDesignersDropdown:true});
    }
    bluerBrands = ()=>{
        setTimeout(() => {
            this.setState({showBrandsDropdown:false});
        }, 150);
    }
    focusBrands = ()=>{
        this.setState({showBrandsDropdown:true});
    }
    render(){
        let DesignersList ;
        if(this.state.FilteredDesigners){
            DesignersList = this.state.FilteredDesigners.map((designerItem) => (
            <div key={designerItem.id} className="dropdown-designer border-bottom py-1"  onClick={()=>this.OnSelectDesigner(designerItem)}>
                <div className="dropdown-designer-img">
                    <img src={designerItem.iamgePath} alt="Designer" className="w-100 h-100 rounded-circle" />
                </div>
                <div className="ml-3">
                    <p className="dropdown-designer-name mb-0 pt-0">{designerItem.name}</p>
                    <p className="dropdown-designer-profession mb-0">{designerItem.profession}</p>
                </div>
            </div>)
            );
        }
        let BrandsList ;
        if(this.state.FilteredBrands){
            BrandsList = this.state.FilteredBrands.map((brandItem) => (
            <div key={brandItem.id} className="dropdown-designer border-bottom py-1"  onClick={()=>this.OnSelectBrand(brandItem)}>
                <div className="dropdown-designer-img">
                    <img src={brandItem.iamgePath} alt="Brand" className="w-100 h-100 rounded-circle" />
                </div>
                <div className="ml-3">
                    <p className="dropdown-designer-name mb-0 pt-0">{brandItem.name}</p>
                    <p className="dropdown-designer-profession mb-0 text-left">{brandItem.country}</p>

                </div>
            </div>)
            );
        }
        let AddedDesigners ;
        if(this.state.designers){
            AddedDesigners = this.state.designers.map((designerItem) => (
                <Col key={designerItem.id} xs={12} sm={12} md={12} lg={12} xl={12} className="role-row px-5 py-4">
                    <Row className="text-center justify-content-space-between align-items-center role-head">
                        <Col xs={9} sm={9} md={4} lg={4} xl={4} className="text-left ">
                        <div  className="dropdown-designer" >
                            
                            <div className="dropdown-designer-img">
                                <img src={designerItem.iamgePath} alt="Designer" className="w-100 h-100 rounded-circle" />
                            </div>
                            <div className="ml-3">
                                <p className="dropdown-designer-name mb-0 pt-0">{designerItem.name}</p>
                                <p className="dropdown-designer-profession mb-0">{designerItem.profession}</p>
                            </div>
                        </div>
                        </Col>
                        <Col xs={3} sm={3} md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }} xl={{ span: 4, offset: 4 }} className="d-flex justify-content-center">
                            <button className="btn-trash" onClick={()=>this.OnDeleteDesigner(designerItem)}> <BsTrash /> </button>
                        </Col>
                    </Row>
                </Col>)
                );}
                let designersDropDown = null;
                if (this.state.showDesignersDropdown) {
                    designersDropDown = (
                <div className="designers-dropdown-menu">
                    {DesignersList}
                </div>);
                }
                let AddedBrands ;
                if(this.state.brands){
                    AddedBrands = this.state.brands.map((brandItem) => (
                        <Col key={brandItem.id} xs={12} sm={12} md={12} lg={12} xl={12} className="role-row px-5 py-4">
                            <Row className="text-center justify-content-space-between align-items-center role-head">
                                <Col xs={9} sm={9} md={4} lg={4} xl={4} className="text-left ">
                                <div  className="dropdown-designer" >
                                    <div className="dropdown-designer-img">
                                        <img src={brandItem.iamgePath} alt="Designer" className="w-100 h-100 rounded-circle" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="dropdown-designer-name mb-0 pt-0">{brandItem.name}</p>
                                        <p className="dropdown-designer-profession mb-0 text-left">{brandItem.country}</p>
                                    </div>
                                </div>
                                </Col>
                                <Col xs={3} sm={3} md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }} xl={{ span: 4, offset: 4 }} className="d-flex justify-content-center">
                                    <button className="btn-trash" onClick={()=>this.OnDeleteBrand(brandItem)}> <BsTrash /> </button>
                                </Col>
                            </Row>
                        </Col>)
                        );}
                        let brandsDropDown = null;
                        if (this.state.showBrandsDropdown) {
                            brandsDropDown = (
                        <div className="designers-dropdown-menu">
                            {BrandsList}
                        </div>);
                        }
        return (
            <React.Fragment>
                <Container className="add-project-box p-0 pt-5 pl-5 pr-5">
                    <Row className="justify-content-center">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Row className="justify-content-center text-center">
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                                    <h4 className="p-r-heading"> Designer / Design company </h4>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mt-5 role-row px-5 py-4">
                                    <Row className="text-center justify-content-space-between align-items-center role-head">
                                        <Col xs={9} sm={9} md={4} lg={4} xl={4} className="text-left ">
                                            Name
                                        </Col>
                                        <Col xs={3} sm={3} md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }} xl={{ span: 4, offset: 4 }} className="d-flex justify-content-center">
                                            Delete
                                        </Col>
                                    </Row>
                                </Col>
                                {AddedDesigners}
                                {this.state.addNewDesigner?
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="role-row px-5">
                                    <Row className="text-center justify-content-space-between align-items-center py-3">
                                        <Col xs={9} sm={9} md={6} lg={4} xl={5} >
                                            <input 
                                                className="form-control designer-input" 
                                                type="text"
                                                placeholder="Search Designers / design company by name or e-mail"
                                                onChange={(event)=>this.FilterDesignersListOnChange(event)}
                                                onBlur={this.bluer}
                                                onFocus={this.focus}
                                            />
                                        {designersDropDown}
                                        </Col>
                                        <Col xs={3} sm={3} md={6} lg={8} xl={{ span: 4 , offset:3 }} className="d-flex justify-content-center">
                                            <button className="btn-trash"> <BsTrash /> </button>
                                        </Col>
                                    </Row>
                                </Col>:null
                                }
                                <Col className="d-flex text-center flex-direction-column justify-content-center align-items-center py-3 mt-5">
                                    <button className="btn-plus" onClick={this.OnAddNewDesigner} disabled={this.state.designers.length>0?false:true}>
                                        <BiPlusMedical />
                                    </button>
                                    <p className="btn-desc py-3">Add Designer</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Row className="justify-content-center text-center mt-5">
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                                    <h4 className="p-r-heading"> Add Brand </h4>
                                </Col>
                                <Col  xs={12} sm={12} md={12} lg={12} xl={12} className="mt-5 role-row px-5 py-4">
                                    <Row className="text-center justify-content-space-between align-items-center role-head">
                                        <Col xs={9} sm={9} md={4} lg={4} xl={4} className="text-left ">
                                            Brand Name
                                        </Col>
                                        <Col xs={3} sm={3} md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }} xl={{ span: 4, offset: 4 }} className="d-flex justify-content-center">
                                            Delete
                                        </Col>
                                    </Row>
                                </Col>
                                {AddedBrands}
                                {this.state.addNewBrand?
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="role-row px-5">
                                    <Row className="text-center justify-content-space-between align-items-center py-3">
                                        <Col xs={9} sm={9} md={6} lg={4} xl={5}  >
                                        <input 
                                                className="form-control designer-input" 
                                                type="text"
                                                placeholder="Search Brand By name"
                                                onChange={(event)=>this.FilterBrandsListOnChange(event)}
                                                // onBlur={this.bluerBrands}
                                                onFocus={this.focusBrands}
                                            />
                                            {brandsDropDown}
                                        </Col>
                                        <Col xs={3} sm={3} md={6} lg={8} xl={{ span: 4 , offset:3 }} className="d-flex justify-content-center">
                                            <button className="btn-trash"> <BsTrash /> </button>
                                        </Col>
                                    </Row>
                                </Col>:null
                                }
                                <Col className="d-flex text-center flex-direction-column justify-content-center align-items-center py-3 mt-5">
                                    <button className="btn-plus" onClick={this.OnAddNewBrand} disabled={this.state.brands.length>0?false:true}>
                                        <BiPlusMedical />
                                    </button>
                                    <p className="btn-desc py-3">Add Brand</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }


    
}


export default AddProjectRole;




