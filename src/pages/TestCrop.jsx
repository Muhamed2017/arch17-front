import React, { Component } from "react";
// import "cropperjs/dist/cropper.css";
import imageCompression from "browser-image-compression";

// import axios from "axios";

class TestCrop extends Component {
 constructor(props) {
  super(props);
  this.state = {
   fileSelected: null,
  };
 }

 onChangeInput = (e) => {
  console.log(e.target.files[0].size);
  this.setState({ fileSelected: e.target.files[0] });
 };
 async uploadFile(event) {
  const imageFile = event.target.files[0];
  // const imageFile = this.state.fileSelected;
  console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  const options = {
   maxSizeMB: 1,
   maxWidthOrHeight: 1920,
   useWebWorker: true,
  };
  try {
   const compressedFile = await imageCompression(imageFile, options);
   console.log(
    "compressedFile instanceof Blob",
    compressedFile instanceof Blob
   ); // true
   console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

   console.log(compressedFile);
  } catch (error) {
   console.log(error);
  }
 }
 //  }
 render() {
  return (
   <>
    <div
     style={{
      width: "80vw",
      backgroundColor: "#f8f8f8",
      height: "80vh",
      margin: "auto",
     }}
    >
     <input type="file" onChange={this.uploadFile} />
     <button onClick={this.uploadFile}>Upload</button>
    </div>
   </>
  );
 }
}

export default TestCrop;
