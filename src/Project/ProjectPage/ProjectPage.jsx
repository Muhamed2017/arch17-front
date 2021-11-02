import React , {Component, Suspense} from 'react';
import {Img} from 'react-image';
import { Col, Container, Row ,Carousel} from 'react-bootstrap';
import { withRouter } from "react-router";
import { generateKey } from './../../../static/utility';
import { FaFacebookF , FaWeibo , FaPinterestP , FaTwitter, FaEllipsisV} from "react-icons/fa";
import {MdLocationOn} from 'react-icons/md';
import {AiFillLike , AiOutlinePlus} from 'react-icons/ai';
import {BsEnvelopeFill} from 'react-icons/bs'; 
import {GrNext,GrPrevious} from 'react-icons/gr';
import './Projectpage.css';
import { BsPlus } from 'react-icons/bs';

class ProjectPage extends Component{
    state={
        projectId : '',
        info:{},
        content:[],
        Designers:[],
        Brands:[],
        actionbtns:false,
        actionbtnsFixed:''
    }
    componentDidMount(){
        const projectId = this.props.match.params.id;
        const info = {
            cover:'./media_2-8.png',
            name:'Project Name',
            country:'china',
            city:'shengen',
            year:'2020',
            likes:'50'
        }
        const content = [
        {id:generateKey("text"),type: "text", value: '<p><span style="font-family: jura;"><span style="font-size: 24pt;">Some </span><span style="color: #169179;">Bla </span><span style="background-color: #e03e2d; color: #ffffff;">Bla </span>Bla</span></p>'},
        {id:generateKey("embed"),type: "embed", value: "https://www.youtube.com/embed/18-Drd3G7XY"},
        {id:generateKey("image"),type: "image", value: "https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2FGlitch-Error-Rainbow-Mug-hires.png"},
        {id:generateKey("text"),type: "text", value: "Office space serves as a powerful tool to boost engagement, fuel innovation and drive production. But what is an optimal office space like? Grado believes it is able to help partners of industries yield more space design inspirations through systematic methodology."},
        {id:generateKey("image"),type: "image", value: "https://www.arch17.com/assets/img/home/main-03.jpg"},
        {id:generateKey("text"),type: "text", value: "Office space serves as a powerful tool to boost engagement, fuel innovation and drive production. But what is an optimal office space like? Grado believes it is able to help partners of industries yield more space design inspirations through systematic methodology."},
        {id:generateKey("embed"),type: "embed", value: "https://www.youtube.com/embed/gI5po-iKQo8"},
        {id:generateKey("text"),type: "text", value: "Office space serves as a powerful tool to boost engagement, fuel innovation and drive production. But what is an optimal office space like? Grado believes it is able to help partners of industries yield more space design inspirations through systematic methodology."},
        {id:generateKey("image"),type: "image", value: "https://www.arch17.com/assets/img/home/main-04.jpg"},
        {id:generateKey("embed"),type: "embed", value: "https://www.youtube.com/embed/PnBKheT5kM0"},
        {id:generateKey("text"),type: "text", value: "Office space serves as a powerful tool to boost engagement, fuel innovation and drive production. But what is an optimal office space like? Grado believes it is able to help partners of industries yield more space design inspirations through systematic methodology."},
    ];
    const Designers = [
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
    const Brands = [
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
        this.setState({projectId:projectId,info:info,content:content,Designers:Designers,Brands:Brands});
        window.addEventListener('scroll', () => {
            let descFromTop = document.getElementById('project-desc').offsetTop;
            // let descHeight = document.getElementById('project-desc').clientHeight;
            // console.log('Element Height',descFromTop ,'Screent position', window.scrollY);
            if(window.scrollY > descFromTop){
                this.setState({ actionbtnsFixed:'actions-container-scroll' });
            }else{
                this.setState({ actionbtnsFixed:''});
            }
            // if (window.scrollY > (descFromTop+descHeight)) {
            //     this.setState({ actionbtnsFixed:''});
            // }
        });
    }

    showActionsBtnsHandeler = () => {
        this.setState({actionbtns:!this.state.actionbtns});
    }
    render(){
        const projectContent = this.state.content.map(
            contentElement => {
                // project content video
                if (contentElement.type === 'embed') {
                    return (<div className="content-embed py-2" key={contentElement.id} >
                            <iframe 
                                src={contentElement.value}
                                frameBorder='0'
                                allow='autoplay; encrypted-media'
                                allowFullScreen
                                title='video'
                                className="w-100 "
                                style={{'height': '400px' }}
                                />
                        </div>)
                }
                // project content text
                if (contentElement.type === 'text') {
                    return (<div className="content-text py-2" key={contentElement.id} dangerouslySetInnerHTML={{__html: contentElement.value}} />)
                }
                // project content image
                if (contentElement.type === 'image') {
                    return (<div className="content-teimagext py-2" key={contentElement.id} >
                            <Suspense fallback={<p> loading images from supsencd </p>} >
                                <Img 
                                src={contentElement.value}
                                key={contentElement.value}
                                loader={<p> loading images from supsencd </p>}
                                unloader={<button  > failed </button>}
                                className="img-fluid w-100 "/>
                            </Suspense>
                            </div>)
                }
                return true;
            }
        );
        const info = (
            <div className="w-100 project-info bg-white">
                <h1> {this.state.info.name}</h1>
                <hr className="w-50 mb-1"/>
                <div className="w-100 project-info-detailes">
                    <span> <MdLocationOn /> {this.state.info.country}, </span>
                    <span> {this.state.info.city} </span> |
                    <span> {this.state.info.year} </span> 
                    <span> <AiFillLike className="ml-2"/> {this.state.info.likes} </span>
                </div>
            </div>
        );
        const designers = this.state.Designers.slice(0, 2).map(
            designerItem => {
                return (<div key={designerItem.id} className="my-4 bg-white d-flex">
                        <Suspense fallback={<p> loading images from supsencd </p>} >
                                <Img 
                                src={designerItem.iamgePath}
                                key={designerItem.iamgePath}
                                loader={<p> loading images from supsencd </p>}
                                unloader={<button  > failed </button>}
                                className="designer-image"
                                />
                        </Suspense>
                        <div className="designer-info ml-4 ">
                            <p className="designer-info-name mb-1">{designerItem.name}</p>
                            <p className="designer-info-profession mb-3 mt-0">{designerItem.profession}</p>
                            <button className="btn btn-transparent py-1 border-secondary mr-2"> <BsEnvelopeFill className="text-secondary" style={{fontSize:'21px'}}/> </button>
                            <button className="btn py-1 follow-btn"><AiOutlinePlus className="color-white" style={{fontSize:'20px'}}/> Follow</button>
                        </div>
                    </div>);
            }
        );
        const brands = this.state.Brands.map(
            brandItem => {
            return (
                <Carousel.Item key={brandItem.id}>
                    <div className="my-4 bg-white d-flex">
                        <Suspense fallback={<p> loading images from supsencd </p>} >
                                <Img 
                                src={brandItem.iamgePath}
                                key={brandItem.iamgePath}
                                loader={<p> loading images from supsencd </p>}
                                unloader={<button  > failed </button>}
                                className="brand-image"
                                />
                        </Suspense>
                        <div className="brand-info ml-4 ">
                            <p className="brand-info-name mb-1">{brandItem.name}</p>
                            <p className="brand-info-country mb-3 mt-0">{brandItem.country}, {brandItem.country}</p>
                            <button className="btn btn-transparent py-1 border-secondary mr-2">  <BsEnvelopeFill className="text-secondary" style={{fontSize:'21px'}}/> </button>
                            <button className="btn py-1 follow-btn"><AiOutlinePlus className="color-white" style={{fontSize:'20px'}}/> Follow</button>
                        </div>
                    </div>
                    <div className="brand-products">
                        <div className="brand-product">
                            <Suspense fallback={<p> loading images from supsencd </p>} >
                                <Img 
                                src={brandItem.iamgePath}
                                key={brandItem.iamgePath}
                                loader={<p> loading images from supsencd </p>}
                                unloader={<button  > failed </button>}
                                />
                            </Suspense>
                        </div>
                        <div className="brand-product">
                            <Suspense fallback={<p> loading images from supsencd </p>} >
                                <Img 
                                src={brandItem.iamgePath}
                                key={brandItem.iamgePath}
                                loader={<p> loading images from supsencd </p>}
                                unloader={<button  > failed </button>}
                                />
                            </Suspense>
                        </div>
                        <div className="brand-product">
                            <Suspense fallback={<p> loading images from supsencd </p>} >
                                <Img 
                                src={brandItem.iamgePath}
                                key={brandItem.iamgePath}
                                loader={<p> loading images from supsencd </p>}
                                unloader={<button  > failed </button>}
                                />
                            </Suspense>
                        </div>
                        <div className="brand-product">
                            <Suspense fallback={<p> loading images from supsencd </p>} >
                                <Img 
                                src={brandItem.iamgePath}
                                key={brandItem.iamgePath}
                                loader={<p> loading images from supsencd </p>}
                                unloader={<button  > failed </button>}
                                />
                            </Suspense>
                        </div>
                        <div className="brand-product">
                            <Suspense fallback={<p> loading images from supsencd </p>} >
                                <Img 
                                src={brandItem.iamgePath}
                                key={brandItem.iamgePath}
                                loader={<p> loading images from supsencd </p>}
                                unloader={<button  > failed </button>}
                                />
                            </Suspense>
                        </div>
                        <div className="brand-product">
                            <Suspense fallback={<p> loading images from supsencd </p>} >
                                <Img 
                                src={brandItem.iamgePath}
                                key={brandItem.iamgePath}
                                loader={<p> loading images from supsencd </p>}
                                unloader={<button  > failed </button>}
                                />
                            </Suspense>
                        </div>
                    </div>
                </Carousel.Item>);
            }
        );
        return (
            <React.Fragment>
                <div className="w-100">
                <Container fluid>
                    <div className="w-100 mt-2 project-page-header none-mobile" style={{backgroundImage:'url(https://www.arch17.com/data/projects/340/cover/img/cover.jpg)'}}></div>
                    <Row className="justify-content-md-center pt-4 ">
                        <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                            <Row>
                                <Col xs={1} sm={1} md={1} lg={1} xl={1} className={`pr-0 mr-0 justify-content-end sticky-top none-mobile ${this.state.actionbtnsFixed.length !== ''?this.state.actionbtnsFixed:''}`} style={{height:'100%'}}>
                                    <ul className="list-unstyled bg-white">
                                        <li className="p-2 my-1 d-flex justify-content-center border action-li" key={'FaFacebookF'}><FaFacebookF style={{fontSize:'28px',borderRadius:'7px'}}/></li>
                                        <li className="p-2 my-1 d-flex justify-content-center border action-li" key={'FaWeibo'}><FaWeibo style={{fontSize:'28px',borderRadius:'7px'}}/></li>
                                        <li className="p-2 my-1 d-flex justify-content-center border action-li" key={'FaPinterestP'}><FaPinterestP style={{fontSize:'28px',borderRadius:'7px'}}/></li>
                                        <li className="p-2 my-1 d-flex justify-content-center border action-li" key={'FaTwitter'}><FaTwitter style={{fontSize:'28px',borderRadius:'7px'}}/></li>
                                        <li className="p-2 my-1 d-flex justify-content-center border action-li" key={'AiFillLike'}><AiFillLike style={{fontSize:'28px',borderRadius:'7px'}}/></li>
                                        <li className="p-2 my-1 d-flex justify-content-center border action-li" key={'BsPlus'}><BsPlus style={{fontSize:'28px',borderRadius:'7px'}}/> </li>
                                        <p className="bg-transparent text-left ">save</p>
                                    </ul>
                                </Col>
                                <Col xs={2} sm={1} md={1} lg={1} xl={1} className="fixed-bottom none-descktop" >
                                {this.state.actionbtns ?
                                    <ul className="list-unstyled bg-white">
                                        <li className="p-2 my-1 d-flex justify-content-center border action-li" key={'FaFacebookF'}><FaFacebookF  className="actions-btn-mobile"/></li>
                                        <li className="p-2 my-1 d-flex justify-content-center border action-li" key={'FaWeibo'}><FaWeibo  className="actions-btn-mobile"/></li>
                                        <li className="p-2 my-1 d-flex justify-content-center border action-li" key={'FaPinterestP'}><FaPinterestP className="actions-btn-mobile"/></li>
                                        <li className="p-2 my-1 d-flex justify-content-center border action-li" key={'FaTwitter'}><FaTwitter  className="actions-btn-mobile"/></li>
                                        <li className="p-2 my-1 d-flex justify-content-center border action-li" key={'AiFillLike'}><AiFillLike  className="actions-btn-mobile"/></li>
                                        <li className="p-2 my-1 d-flex justify-content-center border action-li" key={'BsPlus'}><BsPlus  className="actions-btn-mobile"/> </li>
                                    </ul>:null}
                                    <ul className="list-unstyled bg-white">
                                        <li className="p-2 my-1 d-flex justify-content-center mb-3 border action-li" onClick={this.showActionsBtnsHandeler} ><FaEllipsisV className="actions-btn-mobile"/> </li>
                                    </ul>
                                </Col>
                                <Col xs={12} sm={12} md={11} lg={11} xl={11}  className="project-left-side p-4 bg-white">
                                    {info}
                                    <div className="project-page-desc " id="project-desc">
                                        {projectContent}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={{span:11,offset:1}} lg={{span:4,offset:0}} xl={{span:4,offset:0}} className="project-page-right-side">
                            <div className="w-100 descigner-box">
                                <h5> Design By</h5>
                                {designers}
                                {this.state.Designers.length > 2 ? <p className="descigner-more mb-0"> See All </p> :null}
                            </div>
                            <div className="w-100 brand-box mt-5">
                                <h5> Products By</h5>
                                <Carousel prevIcon={<GrPrevious style={{fontSize:'25px'}}/>} nextIcon={<GrNext style={{fontSize:'25px'}}/>}>
                                    {brands}
                                </Carousel>
                            </div>
                        </Col>
                    </Row>
                </Container>
                </div>
            </React.Fragment>
        );
    }
}
export default withRouter(ProjectPage);