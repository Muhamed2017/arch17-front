import React, { Component, Suspense } from "react";
import { Img } from "react-image";

import { herors_data } from "../images/cdnsrcs";
class HeroSection extends Component {
 constructor(props) {
  super(props);
  this.state = {
  };
 }

 render() {
  return (
   <>
    {herors_data?.map((hero, index) => {
     return (
      <div key={index}>
       <div className="media-section-item">
        <Suspense fallback={<p> loading images from supsencd </p>}>
         <a href={hero.link && hero.link !== "null" ? hero.link : "#"}>
          <Img
           src={hero?.image}
           key={0}
           loader={<p> loading images from supsencd </p>}
           unloader={<button> failed </button>}
           className="img-fluid media-section-item-img"
          />
         </a>
        </Suspense>
        <div
         className="media-item-desc text-left pl-3 last-row"
         style={{
          color: hero.text_color && hero.text_color !== "null" ? hero.text_color : "white",
          //  hero?.color,
         }}
        >
         {hero?.title && hero?.title !== "null" && (
          <h3
           className="media-item-desc-heading"
           style={{
            color:
             //  color: hero?.color,
             hero.text_color && hero.text_color !== "null" ? hero.text_color : "white",
           }}
          >
           {hero?.title}
          </h3>
         )}

         {hero?.desc && hero?.desc !== "null" && (
          <p
           className="text-left w-100 m-0 d-block media-item-desc-desc  mg-p mb-3"
           style={{
            textAlign: "left",
            fontSize: "1.01rem !important",
           }}
          >
           {hero?.desc}
          </p>
         )}

         {/* {hero?.button && hero?.button !== "null" && hero?.button !== "none" && (
          <button
           className="btn py-1"
           style={{
            borderColor:
             hero.color && hero.color !== "null" ? hero.color : "white",
           }}
          >
           {hero?.button}
          </button>
         )} */}
        </div>
       </div>
      </div>
     );
    })}
   </>
  );
 }
}

export default HeroSection;
