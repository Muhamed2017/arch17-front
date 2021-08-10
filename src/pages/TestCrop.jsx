import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";
const defaultSrc =
 "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

let imgs = [];
let formData = new FormData();

export const TestCrop = () => {
 const [image, setImage] = useState(defaultSrc);
 const [cropData, setCropData] = useState("#");
 const [filess, setFiles] = useState([]);
 const [cropper, setCropper] = useState();
 const onChange = (e) => {
  //   e.preventDefault();
  setFiles(e.target.files[0]);
  imgs.push(e.target.files[0]);
  let files;
  if (e.dataTransfer) {
   files = e.dataTransfer.files;
  } else if (e.target) {
   files = e.target.files;
   setFiles(e.target.files[0]);
  }

  const reader = new FileReader();
  reader.onload = () => {
   setImage(reader.result);
  };
  reader.readAsDataURL(files[0]);
 };

 const getCropData = () => {
  if (typeof cropper !== "undefined") {
   setCropData(cropper.getCroppedCanvas().toDataURL());
   formData.append("img[]", imgs[0]);
   //    console.log(imgs);
   axios
    .post("http://127.0.0.1:8000/api/upload", formData)
    .then((response) => {
     console.log(response);
    })
    .catch((err) => console.log(err));
  }
  //   console.log(imgs);
 };

 return (
  <div>
   <div style={{ width: "100%" }}>
    <input type="file" onChange={onChange} />
    <button>Use default img</button>
    <br />
    <br />
    <Cropper
     style={{ height: 400, width: "100%" }}
     zoomTo={0.3}
     initialAspectRatio={1}
     preview=".img-preview"
     src={image}
     viewMode={1}
     minCropBoxHeight={10}
     minCropBoxWidth={10}
     background={false}
     responsive={true}
     autoCropArea={1}
     checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
     onInitialized={(instance) => {
      setCropper(instance);
     }}
     guides={true}
    />
   </div>
   <div>
    <div className="box" style={{ width: "50%", float: "right" }}>
     <h1>Preview</h1>
     <div
      className="img-preview"
      style={{ width: "100%", float: "left", height: "300px" }}
     />
    </div>
    <div
     className="box"
     style={{ width: "50%", float: "right", height: "300px" }}
    >
     <h1>
      <span>Crop</span>
      <button style={{ float: "right" }} onClick={getCropData}>
       Crop Image
      </button>
     </h1>
     <img style={{ width: "100%" }} src={cropData} alt="cropped" />
    </div>
   </div>
   <br style={{ clear: "both" }} />
  </div>
 );
};

export default TestCrop;
