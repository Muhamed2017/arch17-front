
import React , {useRef }from "react";
import * as htmlToImage from 'html-to-image';

const TestUpload = () => {


const domEl = useRef(null);
const downloadImage = async () => {
        const dataUrl = await htmlToImage.toPng(domEl.current);
       
        // download image
        const link = document.createElement('a');
        link.download = "html-to-img.png";
        link.href = dataUrl;
        link.click();
      }
 return <div>

    <h1>HTML TO IMAGE</h1>

    <div className="box" id="domEl" ref={domEl}>
        <h2>TWEXTsne</h2>
        <h2>TWEXTsne</h2>
        <h2>TWEXTsne</h2>
        <h2>TWEXTsne</h2>
        <h2>TWEXTsne</h2>
    </div>

    <button onClick={downloadImage} >CONVERT</button>
 </div>;
};

export default TestUpload;
