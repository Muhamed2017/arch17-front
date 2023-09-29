import { jsPDF } from "jspdf";

import React, { useRef } from "react";
import SupplierPDFLayout from "./SupplierPDFLayout";
import {DownloadOutlined}  from "@ant-design/icons";
// 


const GeneratePdf= (props) => {
  const certificateTemplateRef = useRef(null)

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px"
    });

    // doc.html(<SupplierPDFLayout payment={props.payment}/> )

    // doc.html(<h2>mdnsknskns</h2>)

    // doc.save("Payment");

    // Adding the fonts
    // doc.setFont("Anton-Regular", "normal");

    // doc.html(certificateTemplateRef.current, {
    //   async callback(doc) {
    //     // save the document as a PDF with name of Memes
    //     doc.save("Payment");
    //   }
    // });
    
    doc.html(<SupplierPDFLayout payment={props.payment}/>, {
    });

    doc.save("Payment");

    
  };

  return (
    <div>
      <button
        style={{
          cursor: "pointer",
          fontSize:'30px'
        }}
        onClick={handleGeneratePdf}
      >
        <DownloadOutlined />
      </button>
      {/* <div ref={certificateTemplateRef}>
        <SupplierPDFLayout payment={props.payment}/>
      </div> */}
    </div>
  );
};

export default GeneratePdf;
