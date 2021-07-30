import { BiChevronRight } from "react-icons/bi";
const Kind = () => {
 return (
  <>
   <div id="add-product-one">
    <div className="add-wrapper">
     <h3 className="light-head">What Kind of product you want to add ?</h3>
     <div className="product-kinds">
      <a href="/identity">
       Furniture <BiChevronRight />
      </a>
      <a href="/identity">
       Lighting
       <span>
        <BiChevronRight />
       </span>
      </a>
      <a href="/identity">
       Decore
       <span>
        <BiChevronRight />
       </span>
      </a>
      <a href="/identity">
       Bathroom
       <span>
        <BiChevronRight />
       </span>
      </a>
      <a href="identity">
       Wellness
       <span>
        <BiChevronRight />
       </span>
      </a>
      <a href="identity">
       Kitchen
       <span>
        <BiChevronRight />
       </span>
      </a>
      <a href="identity">
       Finishes Materials
       <span>
        <BiChevronRight />
       </span>
      </a>
      <a href="/identity">
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
};

export default Kind;
