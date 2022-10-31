import React, { Component } from "react";
import { Row, Col, Input, Spin } from "antd";
import { connect } from "react-redux";
import Cropper from "react-cropper";
import slide from "../../../src/slide1.jpg";
import "cropperjs/dist/cropper.css";
import axios from "axios";
import { goToProjectStep } from "../../redux/actions/addProjectActions";
import { LoadingOutlined } from "@ant-design/icons";
import { API } from "../../utitlties";
import { compressImage } from "../addProduct/OptionsPrice";
import { Redirect } from "react-router-dom";
class CoverStep extends Component {
 constructor(props) {
  super(props);
  this.cropperRef = React.createRef();
  this.state = {
   slides: this.props.covers,
   cropped_cover: "",
   active: slide,
   displayName: this.props.info?.name,
   created: false,
   creating: false,
   cropper: false,
  };
 }

 _crop() {
  const imageElement = this.cropperRef?.current;
  const cropper = imageElement?.cropper;
  const cropped = cropper.getCroppedCanvas().toDataURL();
  this.setState({ cropped_cover: cropped });
 }
 changeImg = (index) => {
  const imageElement = this.cropperRef?.current;
  let cropper = imageElement?.cropper;

  cropper.replace(this.state.slides[index]);
 };
 onChange = (a, b, c) => {
  // console.log(a, b, c);
 };

 dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
   mime = arr[0].match(/:(.*?);/)[1],
   bstr = atob(arr[1]),
   n = bstr.length,
   u8arr = new Uint8Array(n);

  while (n--) {
   u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
 };

 handleSubmitAddPrject = async () => {
  this.setState({ creating: true });
  const {
   blogType,
   category,
   type,
   country,
   city,
   year,
  } = this.props?.project.project_info;
  const fd = new FormData();
  fd.append("name", this.state.displayName);
  fd.append("article_type", blogType);

  category.forEach((c) => {
   fd.append("kind[]", c);
  });

  fd.append("type", type);

  fd.append("country", country);
  fd.append("city", city);
  fd.append("title", "TITLE");
  fd.append(
   "cover",
   await compressImage(this.dataURLtoFile(this.state.cropped_cover, "file"))
  );
  fd.append("content", this.props.project?.project_content);
  this.props.project.role_designers?.forEach((p) => {
   fd.append("users[]", p.id);
  });
  this.props.project.project_covers?.forEach((c) => {
   fd.append("images[]", c);
  });
  this.props.project.role_brands?.forEach((s) => {
   fd.append("stores[]", s.id);
  });
  this.props.project.role_companies?.forEach((s) => {
   fd.append("companies[]", s.id);
  });
  this.props.project.project_tags?.forEach((p) => {
   fd.append("products[]", p);
  });

  if (this.props.cycle_type === "EDIT") {
   fd.append("year", year?._d.getFullYear());

   axios
    .post(`${API}editproject/${this.props.projectId}`, fd)

    .then((response) => {
     console.log(response);
     this.setState({
      created: true,
      creating: false,
      project_id: response.data.project.id,
     });
    })
    .catch((error) => {
     console.log(error);
    });
   console.log("EDIT PROCESS");
  } else {
   fd.append("year", year?._d.getFullYear());

   axios
    .post(
     `${API}addproject/${this.props.params.creatorType}/${this.props.params.creatorId}`,
     fd
    )
    .then((response) => {
     console.log(response);

     this.setState({
      created: true,
      creating: false,
      project_id: response.data.project.id,
     });
    })
    .catch((error) => {
     console.log(error);
    });
  }
 };
 componentDidMount() {}
 render() {
  if (this.state.created)
   return <Redirect to={`/project/${this.state.project_id}`} />;
  return (
   <>
    <div id="project-cover-step" className="p-3 py-5">
     <Row span={24} gutter={25}>
      <Col md={8}>
       <div className="border">
        <div className="prev"></div>
        <div className="info p-3 left">
         <p className="project-name">{this.state.displayName}</p>

         <div className="project-cover-footer ">
          <p>
           {/* {this.props.info?.type?.map((t, index) => {
            return (
             <span key={index} className="px-1">
              {t}
             </span>
            );
           })} */}
           <span>{this.props.info?.type}</span>
          </p>
          <hr className="my-2 w-30" />
          <p>
           {this.props.info?.category?.map((c, index) => {
            return (
             <span key={index} className="px-1">
              {c}
             </span>
            );
           })}
          </p>
         </div>
        </div>
       </div>
      </Col>
      <Col md={16}>
       <div className="cropper-side">
        <Cropper
         aspectRatio={1.5}
         src={this.props.covers[0]}
         viewMode={1}
         style={{ height: "100%", width: "94%" }}
         ref={this.cropperRef}
         cropend={this._crop.bind(this)}
         ready={this._crop.bind(this)}
         crossOrigin="anonymous"
         preview=".prev"
         autoCropArea={1}
         dragMode="move"
         cropBoxMovable={false}
         cropBoxResizable={true}
        />
       </div>
       <div className="cover-thumbs">
        {this.state.slides.map((c, index) => {
         return (
          <div
           onClick={() => {
            this.changeImg(index);
           }}
           style={{
            backgroundImage: `url("${c}")`,
           }}
          ></div>
         );
        })}
       </div>
       <div className="my-5 py-3">
        <Row justify="center" gutter={25}>
         <Col md={4}>
          <span className="form-label">Project Name</span>
         </Col>
         <Col md={12}>
          <Input
           size="large"
           value={this.state.displayName}
           placeholder="Display Name"
           onChange={(e) => this.setState({ displayName: e.target.value })}
          />
         </Col>
        </Row>
       </div>
      </Col>
     </Row>
    </div>
    <div className="next-wrapper">
     <div className="next-inner">
      <button
       className="prev-btn"
       style={{ margin: "0 0px", position: "relative" }}
       onClick={() => this.props.dispatchGoStep(3)}
      >
       Previous
      </button>
      <button
       className="next-btn"
       onClick={this.handleSubmitAddPrject}
       style={{
        background: this.state.creating ? "#ddd" : "",
       }}
      >
       {this.state.creating ? (
        <Spin
         style={{
          minWidth: "120px",
         }}
         size="large"
         indicator={
          <LoadingOutlined style={{ fontSize: "25px", color: "#fff" }} spin />
         }
        />
       ) : (
        "Save & Continue"
       )}
      </button>
     </div>
    </div>
   </>
  );
 }
}
const mapDispatchToProps = (dispatch) => ({
 dispatchGoStep: (step) => dispatch(goToProjectStep(step)),
});
const mapStateToProps = (state) => {
 return {
  covers: state.project.project_covers,
  info: state.project.project_info,
  project: state.project,
  params: state.project?.params,
  cycle_type: state.project?.cycle_type,
  projectId: state.project?.projectId,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(CoverStep);
