// import React, { Component } from "react";
import DropzoneComponent from "react-dropzone-component";
import ReactDOMServer from "react-dom/server";

const Dropzones = () => {
 var componentConfig = {
  postUrl: "/uploadHandler",
 };
 var djsConfig = {
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
   <div className="dz-preview dz-file-preview">
    <div className="dz-details">
     <div className="dz-filename"></div>
     <img data-dz-thumbnail="true" />
    </div>
    <div className="dz-progress"></div>
    <div className="dz-success-mark">
     <span>✔</span>
    </div>
    <div className="dz-error-mark">
     <span>✘</span>
    </div>
    <div className="dz-error-message"></div>
   </div>
  ),
 };
 return (
  <>
   <DropzoneComponent config={componentConfig} djsConfig={djsConfig} />
  </>
 );
};

export default Dropzones;
