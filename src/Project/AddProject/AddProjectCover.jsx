import React , {Component} from 'react';
import Container  from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import Form  from 'react-bootstrap/Form';
import Cropper from 'react-cropper';
import '../../../css/forms.css';
import './AddProject.css';
import 'cropperjs/dist/cropper.css'; 
class AddProjectCover extends Component {
    state={
        image:'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg',
        rangeVal:1
    }
    _crop() {
        // image in dataUrl
        console.log(this.cropper.getData())
    }
    onCropperInit(cropper) {
        this.cropper = cropper;
    }
    handelZoomInput = (event) => {
    let    rangeValueAfterChange = parseFloat(event.target.value) / 10;
    if (rangeValueAfterChange === 0) {
        this.cropper.reset();
    }
    else if (rangeValueAfterChange === 0.1  && this.state.rangeVal <= 0.075 ) {
        this.cropper.zoomTo(1);
    }
    else if (rangeValueAfterChange > this.state.rangeVal) {
        this.cropper.zoom(rangeValueAfterChange);
    }
    else if (rangeValueAfterChange < this.state.rangeVal) {
        this.cropper.zoom(-this.state.rangeVal);
    }
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.rangeVal = rangeValueAfterChange;
            
    } 
    render(){
        return (
            <React.Fragment>
                <Container className="add-project-box p-0 pt-5 pl-5 pr-5">
                    <Row >
                        <Col xs={12} sm={12} md={12} lg={4} xl={4} className="h-100">
                            <div className="project-box border">
                                <div className="project-img image-preview">
                                    <img src={this.state.image} alt="Project Preview" className="img-fluid "/>
                                </div>
                                <div className="project-desc ">
                                    <div className="project-name mb-4 mt-2">
                                        <h4>Project Name</h4>
                                    </div>
                                    <div className="project-category">
                                        <p className="mb-1"> Restaurant </p> 
                                    </div>
                                    <div className="w-25 pl-3"><hr className="m-0 p-0 "/></div>
                                    <div className="project-type d-flex justify-content-start align-items-center pb-2">
                                        <p className=" my-1 mr-1"> Interior design </p>  <p className=" my-1 mr-1 ml-1"> Architecture </p>  <p className=" my-1 mr-1 ml-1"> Restaurant </p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={8} xl={8} className="border-left h-100">
                            <Cropper
                                src={this.state.image}
                                style={{height: 400, width: '100%'}}
                                // Cropper.js options
                                initialAspectRatio={16 / 9}
                                guides={false}
                                crop={this._crop.bind(this)}
                                onInitialized={this.onCropperInit.bind(this)}
                                crossOrigin="anonymous"
                                preview=".image-preview"
                                aspectRatio={1.5/1}
                                autoCropArea={1}
                                viewMode={2}
                                rotatable={false}
                                scalable={false}
                                zoomOnWheel={false}
                                dragMode="move"
                                />
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mt-5 d-flex justify-content-center">
                                        <input 
                                        type="range" 
                                        name="zoom" 
                                        id="zoom" 
                                        className="image-zoom-input w-50" 
                                        min="0"  
                                        defaultValue="0"
                                        max="1" 
                                        step="0.01"  
                                        onInput={(event)=>this.handelZoomInput(event)}/>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mt-5 d-flex justify-content-center">
                                        <div className="w-75 d-flex justify-content-start">
                                            <div className="image-thum-box">
                                                <img src={this.state.image} alt="Project Preview" className="img-fluid "/>
                                            </div>
                                            <div className="image-thum-box">
                                                <img src={this.state.image} alt="Project Preview" className="img-fluid "/>
                                            </div>
                                            <div className="image-thum-box">
                                                <img src={this.state.image} alt="Project Preview" className="img-fluid "/>
                                            </div>
                                            <div className="image-thum-box">
                                                <img src={this.state.image} alt="Project Preview" className="img-fluid "/>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mt-5 d-flex justify-content-center">
                                        <Form.Group className="w-75">
                                            <Form.Row>
                                                <Form.Label column="lg" lg={4} style={{'fontSize':'20px','fontWeight':'bold'}}>
                                                    Display Name
                                                </Form.Label>
                                                <Col>
                                                <Form.Control size="lg" type="text" defaultValue="Project Name" style={{'height':'60px','fontSize':'20px','fontWeight':'bold','color':'#000'}} placeholder="Large text" />
                                                </Col>
                                            </Form.Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }

}

export default AddProjectCover;