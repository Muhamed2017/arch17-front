import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import prev from "./../images/HomePage/HomePageSlides/previos.png";
import next from "./../images/HomePage/HomePageSlides/next.png";
import { sliders_data } from "../images/cdnsrcs";
class HomeSlider extends Component {
 constructor(props) {
  super(props);
  this.state = {
   slides: [],
  };
 }

 render() {
  return (
   <>
    <Carousel
     className="home-page-slider"
     fade={true}
     slide={false}
     nextLabel={false}
     prevLabel={false}
     prevIcon={<img src={prev} alt={prev} width="26" height="26" />}
     nextIcon={<img src={next} alt={next} width="26" height="26" />}
    >
     {sliders_data?.map((slide, index) => {
      return (
       <Carousel.Item key={index} className="home-slide-item">
        <a href={slide.link && slide.link !== "null" ? slide.link : "#"}>
         <div
          className="home-slide-image"
          style={{ backgroundImage: "url(" + slide.image + ")" }}
         ></div>
        </a>
        <Carousel.Caption>
         {slide.title && slide.title !== "null" && (
          <h3
           style={{
            color:
             slide?.text_color && slide?.text_color !== "null" ? slide.text_color : "white",
           }}
          >
           {slide.title}
          </h3>
         )}
         {slide.desc && slide.desc !== "null" && (
          <p
           style={{
            color:
             slide?.text_color && slide?.text_color !== "null" ? slide.text_color : "white",
           }}
          >
           {slide.desc}
          </p>
         )}

         {/* {slide.button && slide.button !== "null" && slide.button !== "none" && (
          <button
           className="btn px-4 py-1"
           style={{
            color:
             slide?.color && slide?.color !== "null" ? slide.color : "white",

            borderColor:
             slide.color && slide.color !== "null" ? slide.color : "white",
           }}
          >
           {slide.button}
          </button>
         )} */}
        </Carousel.Caption>
       </Carousel.Item>
      );
     })}
    </Carousel>
   </>
  );
 }
}
export default HomeSlider;
