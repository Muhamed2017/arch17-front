import { Component, createRef } from "react";
import { API } from "../utitlties";
import axios from "axios";
import { Carousel, Row } from "antd";
// import { RightOutlined, LeftOutlined } from "@ant-design/icons";
class HomeStores extends Component {
 constructor(props) {
  super(props);
  this.brandCarousel = createRef();

  this.state = {
   stores: [],
  };
 }
 next = () => {
  this.brandCarousel.current.next();
 };
 prev = () => {
  this.brandCarousel.current.prev();
 };
 componentDidMount() {
  axios.get(`${API}dashboard/homepage/stores`).then((response) => {
   console.log(response);
   const { stores } = response.data;
   this.setState({
    stores,
   });
  });
 }
 render() {
  return (
   <>
    {this.state.stores?.length > 0 && (
     <>
      <h2 className="right-home-text home-heading">
       <span className="compressed bold-compressed">brands</span>
      </h2>
      <p className="right-home-text">Explore catalogues by brands</p>
      <div className="stores-items wide-home-view">
       {this.state.stores?.map((store, idnex) => {
        return (
         <>
          {store.logo && store?.logo?.length > 5 && store.name ? (
           <a href={`/brand/${store?.id}`}>
            <div
             className="store-logo border text-center"
             style={{
              backgroundImage: "url(" + store.logo + ")",
             }}
             keys={idnex}
            ></div>
           </a>
          ) : (
           <a href={`/brand/${store?.id}`}>
            <div className="store-logo border text-center" keys={idnex}>
             {store?.name[0]}
            </div>
           </a>
          )}
         </>
        );
       })}
      </div>
      <div className="mobile-home-view">
       {/* <button className="custom-arrow prevarrow" onClick={this.next}>
        <RightOutlined />
       </button>
       <button className="custom-arrow nextarrow" onClick={this.prev}>
        <LeftOutlined />
       </button> */}
       <Carousel
        ref={this.brandCarousel}
        autoplay
        dots="slider-dots"
        swipe
        rows={2}
        slidesToShow={3}
        slidesPerRow={3}
        autoplaySpeed={6000}
        effect="fade"
        draggable
       >
        {this.state.stores?.map((store, idnex) => {
         return (
          <div>
           {store.logo && store?.logo?.length > 5 && store.name ? (
            <a href={`/brand/${store?.id}`} className="store-home-box">
             <div
              className="store-logo border text-center"
              style={{
               backgroundImage: "url(" + store.logo + ")",
              }}
             ></div>
            </a>
           ) : (
            <a href={`/brand/${store?.id}`}>
             <div className="store-logo border text-center" keys={idnex}>
              {store?.name[0]}
             </div>
            </a>
           )}
          </div>
         );
        })}
       </Carousel>
      </div>
      <Row>
       <a
        href="/brands"
        className="btn mt-5 seemore mb-5 mt-2"
        style={{ paddingTop: "17px !important" }}
       >
        See All Brands
       </a>
      </Row>
     </>
    )}
   </>
  );
 }
}

export default HomeStores;
