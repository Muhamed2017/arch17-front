import React , {Component,Suspense} from 'react';
import Container  from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import Dropdown  from 'react-bootstrap/Dropdown';
import ReactFileReader from 'react-file-reader';
import {Img} from 'react-image';
import '../../../css/forms.css';
import './AddProject.css';
import TextEditor from './TextEditor';
import { BsCodeSlash } from "react-icons/bs";
import { FaCloudUploadAlt,FaPencilAlt } from 'react-icons/fa';
import { BiPlusMedical } from "react-icons/bi";
import { generateKey } from './../../../static/utility';
import LoadingSpinner from './loadingSpinner';
class AddProjectContent extends Component{
    state = {
        content:[],
    };
    componentDidMount(){
        this.setState({content:[   
            {id:generateKey("text"),type: "text", value: '<p><span style="font-family: jura;"><span style="font-size: 24pt;">Some </span><span style="color: #169179;">Bla </span><span style="background-color: #e03e2d; color: #ffffff;">Bla </span>Bla</span></p>'},
            {id:generateKey("embed"),type: "embed", value: "https://www.youtube.com/embed/TxuFSkQxeUE"},
            {id:generateKey("image"),type: "image", value: "https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2FGlitch-Error-Rainbow-Mug-hires.png"},
            {id:generateKey("text"),type: "text", value: "Some Bla Bla Bla"},
            {id:generateKey("image"),type: "image", value: "https://www.arch17.com/assets/img/home/main-03.jpg"},
            {id:generateKey("text"),type: "text", value: "Some Bla Bla Bla"},
            {id:generateKey("embed"),type: "embed", value: "https://www.youtube.com/embed/TxuFSkQxeUE"},
            {id:generateKey("text"),type: "text", value: "Some Bla Bla Bla"},
            {id:generateKey("image"),type: "image", value: "https://www.arch17.com/assets/img/home/main-04.jpg"},
            {id:generateKey("embed"),type: "embed", value: "https://www.youtube.com/embed/TxuFSkQxeUE"},
            {id:generateKey("text"),type: "text", value: "Some Bla Bla Bla"},
            {id:generateKey("embed"),type: "embed", value: "https://www.youtube.com/embed/TxuFSkQxeUE"},
            {id:generateKey("embed"),type: "embed", value: "https://www.youtube.com/embed/TxuFSkQxeUE"}
            ]},()=> console.log('COMPONENT DID MOUNT',this.state));
    }
    handleNewFiles = files => {
        files.base64.map(
            // eslint-disable-next-line array-callback-return
            file =>
            {
        const updatedFormElement = [...this.state.content,{id:generateKey('image'),type: 'image'  ,value:file}];
        this.setState({content:updatedFormElement},()=>console.log(this.state.content.filter(
            img=>{
                console.log(this.state.content);
                console.log('Image' , 'Should Be Uploaded');
                return img.type === 'image';
            }
        )));
        });
    }
    handelNewTextEditor = ()=>{
        const updatedFormElement = [...this.state.content,{id:generateKey('image'),type: 'text'  ,value:'Some Bla Bla Bla'}];
        this.setState({content:updatedFormElement},()=>console.log(this.state.content.filter(
            text=>{
                console.log(this.state.content);
                console.log('Text' , 'Should Be Inserted');
                return text.type === 'text';
            }
        )));   
    }
    handelNewVideoPlayer = () =>{
        const updatedFormElement = [...this.state.content,{id:generateKey('image'),type: 'embed'  ,value:'https://www.youtube.com/embed/TxuFSkQxeUE'}];
        this.setState({content:updatedFormElement},()=>console.log(this.state.content.filter(
            embed=>{
                console.log(this.state.content);
                console.log('Embed' , 'Should Be shown');
                return embed.type === 'embed';
            }
        )));
    }
    updateContentObject = (newValue ,id )=>{
        let content = [...this.state.content];
        let objec= content.filter(resule=>resule.id === id);
        let object = {...objec[0]}
        objec[0].value = newValue;
        let objectIndex = content.indexOf(object);
        content[objectIndex] = object;
        this.setState({content},()=>console.log(content[objectIndex]));
    }
    deleteContentObject = id =>{
        const updatedArray = this.state.content.filter(result =>{
                console.log(result.id , id);    
            return result.id !== id
            });
            console.log('DELETE',updatedArray);
        this.setState({
            content:updatedArray
        })
    }
    render(){
        let content;
            if (this.state.content.length > 0 ) {
                content = this.state.content.map(
                    (element,index )=>{
                        let contendesc = [];
                        if(element.type === 'text'){
                            contendesc.push(( 
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="desc-ele desc-text p-0 my-3" key={index}>
                                    <Dropdown className="controles border-circel">
                                        <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                            <FaPencilAlt />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="p-0 ">
                                            <Dropdown.Item className="bg-dark text-white " onClick={()=>this.deleteContentObject(element.id)}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <div key={index} >
                                        
                                        <TextEditor onEditorChange={(content)=>this.updateContentObject(content ,element.id)}  initialValue={element.value} />
                                    </div>
                                </Col>));
                        }else if(element.type === 'image'){
                            contendesc.push(( 
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="desc-ele p-0 my-3" key={index} >
                                    <Dropdown className="controles border-circel">
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            <FaPencilAlt />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="p-0 ">
                                            <div className="bg-dark text-white dropdown-item" >
                                                <ReactFileReader base64={true} multipleFiles={true} Types={[".png",".jpg"]}  handleFiles={(files)=>this.updateContentObject(files.base64,element.id)}>
                                                    <button  className="replace-file-btn" > Replace </button>
                                                </ReactFileReader>
                                            </div>
                                            <Dropdown.Item className="bg-dark text-white " onClick={()=>this.deleteContentObject(element.id)}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <div key={index}>
                                        <Suspense fallback={<p> loading images from supsencd </p>} >
                                            <Img 
                                            src={element.value} 
                                            key={element.value} 
                                            loader={<LoadingSpinner />}
                                            unloader={<button  > failed </button>}
                                            className="img-fluid w-100 h-auto "/>
                                        </Suspense>
                                    </div>
                                </Col>));
                        }else if(element.type === 'embed'){
                            contendesc.push(( 
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="desc-ele p-0 my-3" key={index}>
                                    <Dropdown className="controles border-circel">
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            <FaPencilAlt />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="p-0 ">
                                            <Dropdown.Item className="bg-dark text-white " onClick={()=>this.updateContentObject('https://www.youtube.com/embed/fbculX825dM' ,element.id)} >  
                                                    Replace 
                                            </Dropdown.Item>
                                            <Dropdown.Item className="bg-dark text-white " onClick={()=>this.deleteContentObject(element.id)}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <iframe 
                                        src={element.value}
                                        frameBorder='0'
                                        allow='autoplay; encrypted-media'
                                        allowFullScreen
                                        title='video'
                                        className="w-100 "
                                        style={{'height': '40vw' }}
                                    />
                                </Col>));
                        }
                        return contendesc;
                    }
                );
                console.log( 'Maping ',content);
            }

            let addBtns ;
            if (this.state.content.length > 0) {
                addBtns = (           
                        <Col className="w-100 d-flex text-center flex-direction-column justify-content-center align-items-center py-3 mt-5">
                            <Dropdown>
                                <Dropdown.Toggle className="btn-plus " >
                                <BiPlusMedical />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="conten-dropdown-menu">
                                    <div className="conten-dropdown-item dropdown-item" style={{cursor:'pointer'}}>
                                        <ReactFileReader base64={true} multipleFiles={true} Types={[".png",".jpg"]}  handleFiles={this.handleNewFiles}>
                                                <button className="conten-dropdown-btn" ><FaCloudUploadAlt className="mr-1" /> Add Media</button>
                                        </ReactFileReader>
                                    </div>
                                    <div className="conten-dropdown-item dropdown-item" style={{cursor:'pointer'}}>
                                        <button className="conten-dropdown-btn" onClick={this.handelNewTextEditor}>
                                            <span className="btn-content-text mr-2">T</span> Add Text
                                        </button>
                                    </div>
                                    <div className="conten-dropdown-item dropdown-item" style={{cursor:'pointer'}}>
                                        <button className="conten-dropdown-btn"  onClick={this.handelNewVideoPlayer}>
                                            <BsCodeSlash className="mr-1" /> Add Embed
                                        </button>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>);
            }else{
                addBtns= (
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                        <Row className="justify-content-center text-center">
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mb-5">
                                <h4 className="p-c-heading"> Add Your Project Content </h4>
                            </Col>
                            <Row className="w-100 justify-content-center">
                                <Col xs={3} sm={3} md={3} lg={6} xl={8} >
                                    <Row >
                                        <Col xs={3} sm={3} md={3} lg={4} xl={4} >
                                            <div className="d-flex justify-content-center">
                                                <ReactFileReader base64={true} multipleFiles={true} Types={[".png",".jpg"]}  handleFiles={this.handleNewFiles}>
                                                    <button className="btn-content btn-content-media">
                                                        <FaCloudUploadAlt className="icon-upload" style={{cursor:'pointer'}}/>
                                                    </button>
                                                </ReactFileReader>
                                            </div>
                                            <p className="content-btn-desc mt-2">Add Media</p>
                                        </Col>
                                        <Col xs={3} sm={3} md={3} lg={4} xl={4} >
                                            <div className="d-flex justify-content-center">
                                                <button className="btn-content btn-content-text" onClick={this.handelNewTextEditor}>
                                                    <span>T</span>
                                                </button>
                                            </div>
                                            <p className="content-btn-desc mt-2">Add Text</p>
                                        </Col>
                                        <Col xs={3} sm={3} md={3} lg={4} xl={4}>
                                            <div className="d-flex justify-content-center">
                                                <button className="btn-content" onClick={this.handelNewVideoPlayer}>
                                                    <BsCodeSlash />
                                                </button>
                                            </div>
                                            <p className="content-btn-desc mt-2">Embed Video</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    );
            }
        return (
            <React.Fragment>
                <Container className="add-project-box">
                    <Row className="justify-content-center">
                        {this.state.content.length>0?content:null}
                        {addBtns}
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}


export default AddProjectContent;









