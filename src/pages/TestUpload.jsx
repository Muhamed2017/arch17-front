import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import axios from "axios";

const TestUpload = () => {
 const formData = new FormData();

 const [upImg, setUpImg] = useState();
 const [imgs, setImgs] = useState([]);
 const imgRef = useRef(null);
 const previewCanvasRef = useRef(null);
 const [crop, setCrop] = useState({ unit: "%", width: 100, aspect: 4 / 3 });
 const [completedCrop, setCompletedCrop] = useState(null);

 function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
   return;
  }

  canvas.toBlob((blob) => {
   const previewUrl = window.URL.createObjectURL(blob);
   const anchor = document.createElement("a");
   anchor.download = "cropPreview.png";
   anchor.href = URL.createObjectURL(blob);
   anchor.click();
   window.URL.revokeObjectURL(previewUrl);
   //  let img = new File([blob], "Name");
   //  setBlobs([...blobs, img]);
   //  formData.append("img[]", blobs);
  }, "image/png");
 }

 const onReady = (canvas, crop) => {
  if (!crop || !canvas) {
   return;
  }

  canvas.toBlob((blob) => {
   const previewUrl = window.URL.createObjectURL(blob);
   window.URL.revokeObjectURL(previewUrl);

   const anchor = document.createElement("a");
   anchor.download = "cropPreview.png";
   anchor.href = URL.createObjectURL(blob);

   //  let img = new File([blob], "Name");
   //  setBlobs([...blobs, img]);
   //  formData.append("img[]", img);
  }, "image/png");
 };

 const onSelectFile = (e) => {
  if (e.target.files && e.target.files.length > 0) {
   const reader = new FileReader();
   reader.addEventListener("load", () => setUpImg(reader.result));
   reader.readAsDataURL(e.target.files[0]);
   //  formData.append("img[]", e.target.files[0]);
   setImgs(e.target.files[0]);
   //  console.log(formData.getAll("img"));
  }
 };
 const handlePostingImages = () => {
  console.log(upImg);
  axios
   .post("http://127.0.0.1:8000/api/upload", {
    "img[]": imgs,
   })
   .then((response) => {
    console.log(response);
   })
   .catch((error) => console.log(error));
  // };
 };
 const onLoad = useCallback((img) => {
  imgRef.current = img;
 }, []);

 useEffect(() => {
  if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
   return;
  }

  const image = imgRef.current;
  const canvas = previewCanvasRef.current;
  const crop = completedCrop;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext("2d");
  const pixelRatio = window.devicePixelRatio;

  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = "high";

  // let img = new File([image], "Name");
  // formData.append("img[]", image);

  console.log(completedCrop);
  // axios
  //  .post("http://127.0.0.1:8000/api/upload", formData)
  //  .then((response) => {
  //   console.log(response);
  //  })
  //  .catch("Error");
  ctx.drawImage(
   image,
   crop.x * scaleX,
   crop.y * scaleY,
   crop.width * scaleX,
   crop.height * scaleY,
   0,
   0,
   crop.width,
   crop.height
  );
 }, [completedCrop]);

 return (
  <div>
   <input type="file" accept="image/*" onChange={onSelectFile} multiple />
   <ReactCrop
    style={{ width: "500px" }}
    src={upImg}
    onImageLoaded={onLoad}
    crop={crop}
    onChange={(c) => setCrop(c)}
    onComplete={(c) => setCompletedCrop(c)}
   />
   <div>
    <canvas
     ref={previewCanvasRef}
     // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
     style={{
      width: Math.round(completedCrop?.width ?? 0),
      height: Math.round(completedCrop?.height ?? 0),
     }}
    />
   </div>
   <p>
    Note that the download below won't work in this sandbox due to the iframe
    missing 'allow-downloads'. It's just for your reference.
   </p>
   <button
    type="button"
    disabled={!completedCrop?.width || !completedCrop?.height}
    onClick={() => generateDownload(previewCanvasRef.current, completedCrop)}
   >
    Download cropped image
   </button>

   <button
    type="button"
    onClick={() => handlePostingImages()}
    // onClick={() => handlePostingImages(previewCanvasRef.current, completedCrop)}
    style={{ background: "#f00" }}
   >
    Save Images
   </button>

   <button type="button" onClick={onReady} style={{ background: "#ff0" }}>
    Ready Images
   </button>
  </div>
 );
};

export default TestUpload;
