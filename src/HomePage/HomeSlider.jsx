import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import prev from "./../images/HomePage/HomePageSlides/previos.png";
import next from "./../images/HomePage/HomePageSlides/next.png";
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
     prevIcon={<img src={prev} alt={prev} width="26" height="26" />}
     nextIcon={<img src={next} alt={next} width="26" height="26" />}
    >
     {this.props.slides?.map((slide, index) => {
      return (
       <Carousel.Item key={index} className="home-slide-item">
        <a href={slide.link && slide.link !== "null" ? slide.link : "#"}>
         <div
          className="home-slide-image"
          style={{ backgroundImage: "url(" + slide.slide_image + ")" }}
         ></div>
        </a>
        <Carousel.Caption>
         {slide.main_title && slide.main_title !== "null" && (
          <h3
           style={{
            color:
             slide?.color && slide?.color !== "null" ? slide.color : "white",
           }}
          >
           {slide.main_title}
          </h3>
         )}
         {slide.sub_title && slide.sub_title !== "null" && (
          <p
           style={{
            color:
             slide?.color && slide?.color !== "null" ? slide.color : "white",
           }}
          >
           {slide.sub_title}
          </p>
         )}

         {slide.button && slide.button !== "null" && slide.button !== "none" && (
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
         )}
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
