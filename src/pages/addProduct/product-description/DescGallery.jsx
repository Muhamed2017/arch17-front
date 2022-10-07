import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Input, Popover } from "antd";
import axios from "axios";
import { API } from "../../../utitlties";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiCodeSSlashFill } from "react-icons/ri";
// https://www.youtube.com/watch?v=18-Drd3G7XY
// https://www.youtube.com/watch?v=gI5po-iKQo8
// https://www.youtube.com/watch?v=V5nJc3jIGbQ
// https://www.youtube.com/watch?v=mGgoJ97JA1o
// https://www.youtube.com/embed?v=PnBKheT5kM0
class DescGallery extends Component {
 constructor(props) {
  super(props);
  this.state = {
   url: "",
   galleryItmes: [],
   visible: false,
  };
 }

 addImages = (e) => {
  const { galleryItmes } = this.state;
  const previews = [...e.target.files]?.map((file) => {
   return {
    src: URL.createObjectURL(file),
    type: "image",
    file,
   };
  });
  this.setState({
   galleryItmes: [...galleryItmes, ...previews],
  });
  console.log(previews);
 };
 addVideoUrl = () => {
  const { galleryItmes, url } = this.state;
  this.setState(
   {
    galleryItmes: [
     ...galleryItmes,
     {
      type: "video",
      src: url,
     },
    ],
   },
   () => {
    this.setState({
     url: "",
     visible: false,
    });
   }
  );
 };

 handleSaveGallery = () => {
  const videos = [];
  const images = [];
  const { galleryItmes } = this.state;
  for (let i = 0; i < this.state.galleryItmes.length; i++) {
   if (galleryItmes[i].type === "video") {
    videos.push(galleryItmes[i].src);
   } else {
    images.push(galleryItmes[i].file);
   }
  }

  const fd = new FormData();

  images.map((i) => {
   fd.append("desc_gallery_files[]", i);
  });
  videos.map((v) => {
   fd.append("desc_gallery_srcs[]", v);
  });

  axios
   .post(`${API}desc/${5}`, fd)
   .then((response) => {
    console.log(response);
   })
   .catch((err) => {
    console.log(err);
   });
 };
 handleRemoveGalleryItem = (index) => {
  const removeSrc = this.state.galleryItmes[index].src;
  this.setState({
   galleryItmes: this.state.galleryItmes.filter((item) => {
    return item.src !== removeSrc;
   }),
  });
 };
 hide = () => {
  this.setState({
   visible: false,
  });
 };
 handleVisibleChange = (visible) => {
  this.setState({
   visible,
  });
 };
 render() {
  return (
   <div
    className="tab-form-content"
    style={{ position: "relative", padding: "135px 0px 75px 126px" }}
    id="gallery"
   >
    <div
     className="files-previews"
     style={{
      gridTemplateColumns: "repeat(4, 25%) ",
     }}
    >
     {this.state.galleryItmes?.map((item, index) => {
      return (
       <div className="gallery-item">
        {item.type === "video" ? (
         <ReactPlayer url={item.src} width={"100%"} height={"100%"} />
        ) : (
         <img src={item.src} alt="" />
        )}
        <button
         className="delbutton"
         onClick={() => {
          this.handleRemoveGalleryItem(index);
         }}
        >
         Delete
        </button>
       </div>
      );
     })}
    </div>
    <div className="tab-head">
     <h2>Add products’s Gallery photos / videos</h2>
     <div className="tip">
      You can add photos or embed videos from YouTube, Vimeo, DailyMotion,
      Tencent Video (QQ), Youku, iQiyi
     </div>
     <div className="bold-tip">You can skip if informations not available</div>
     <div className="file-icons-tabs" style={{ position: "relative" }}>
      <span
       className="red-bg"
       style={{
        position: "relative",
       }}
      >
       <FaCloudUploadAlt className="m-auto" />

       <Input
        type="file"
        accept="image/*"
        multiple
        onChange={this.addImages}
        style={{
         position: "absolute",
         top: 0,
         bottom: 0,
         left: 0,
         right: 0,
         opacity: 0,
         width: "50px",
        }}
       />
      </span>
      <span className="gray-bg">
       <Popover
        content={
         <Input
          value={this.state.url}
          onChange={(e) => {
           this.setState({ url: e.target.value });
          }}
         />
        }
        title={
         <>
          <button onClick={this.addVideoUrl}>ADD</button>
          <button onClick={this.hide}>Close</button>
         </>
        }
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
       >
        <RiCodeSSlashFill className="m-auto" onClick={this.embedModal_open} />
       </Popover>
      </span>
     </div>
    </div>
   </div>
  );
 }
}

export default DescGallery;
