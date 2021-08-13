import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Kind = () => {
 const [added, setAdded] = useState(false);
 const [loading, setLoading] = useState(false);
 const [id, setId] = useState(null);
 const addProduct = (e) => {
  e.preventDefault();
  axios
   .post("https://arch17-front.herokuapp.com/api/addproduct", {
    kind: "Furniture",
   })
   .then((response) => {
    console.log(response.data.product.id);
    setId(response.data.product.id);
    setAdded(true);
   });
 };

 if (added) {
  return <Redirect to={{ pathname: `/identity/${id}` }} />;
 } else {
  return (
   <>
    <div id="add-product-one">
     <div className="add-wrapper">
      <h3 className="light-head">What Kind of product you want to add ?</h3>
      <div className="product-kinds">
       <a href="/identity" onClick={addProduct}>
        Furniture <BiChevronRight />
       </a>
       <a href="#" onClick={(e) => e.preventDefault}>
        Lighting
        <span>
         <BiChevronRight />
        </span>
       </a>
       <a href="#">
        Decore
        <span>
         <BiChevronRight />
        </span>
       </a>
       <a href="#">
        Bathroom
        <span>
         <BiChevronRight />
        </span>
       </a>
       <a href="#">
        Wellness
        <span>
         <BiChevronRight />
        </span>
       </a>
       <a href="#">
        Kitchen
        <span>
         <BiChevronRight />
        </span>
       </a>
       <a href="#">
        Finishes Materials
        <span>
         <BiChevronRight />
        </span>
       </a>
       <a href="#">
        Construction Products
        <span>
         <BiChevronRight />
        </span>
       </a>
      </div>
     </div>
    </div>
   </>
  );
 }
};
export default Kind;
