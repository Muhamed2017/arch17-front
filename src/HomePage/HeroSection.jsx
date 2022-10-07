import React, { Component, Suspense } from "react";
import { Img } from "react-image";
import axios from "axios";
import { API } from "../utitlties";

class HeroSection extends Component {
 constructor(props) {
  super(props);
  this.state = {
   heros: [],
  };
 }

 //  componentDidMount() {
 //   console.log(this.props.homepage);
 //   this.setState({ fetching: true });

 //   axios.get(`${API}dashboard/homepage/heros`).then((response) => {
 //    console.log(response);
 //    const { slides } = response.data;
 //    this.setState({
 //     slides,
 //    });
 //   });
 //  }
 render() {
  return (
   <>
    {this.props.heros?.map((hero, index) => {
     return (
      <div key={index}>
       <div className="media-section-item">
        <Suspense fallback={<p> loading images from supsencd </p>}>
         <a href={hero.link && hero.link !== "null" ? hero.link : "#"}>
          <Img
           src={hero?.hero_image}
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
          color: hero.color && hero.color !== "null" ? hero.color : "white",
          //  hero?.color,
         }}
        >
         {hero?.main_title && hero?.main_title !== "null" && (
          <h3
           className="media-item-desc-heading"
           style={{
            color:
             //  color: hero?.color,
             hero.color && hero.color !== "null" ? hero.color : "white",
           }}
          >
           {hero?.main_title}
          </h3>
         )}

         {hero?.sub_title && hero?.sub_title !== "null" && (
          <p
           className="text-left w-100 m-0 d-block media-item-desc-desc  mg-p mb-3"
           style={{
            textAlign: "left",
            fontSize: "1.01rem !important",
           }}
          >
           {hero?.sub_title}
          </p>
         )}

         {hero?.button && hero?.button !== "null" && hero?.button !== "none" && (
          <button
           className="btn py-1"
           style={{
            borderColor:
             hero.color && hero.color !== "null" ? hero.color : "white",
           }}
          >
           {hero?.button}
          </button>
         )}
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
