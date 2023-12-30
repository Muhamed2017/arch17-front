import { Component, createRef } from "react";
import { API } from "../utitlties";
import axios from "axios";
import { Carousel, Row } from "antd";
import DraggingCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
    slidesToShow: 4,
    slidesPerScroll: 4,
    slidesToSlide: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToShow: 4,
    slidesPerScroll: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesPerScroll: 4,
    slidesToSlide: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2.5,
    slidesPerScroll: 4,
  },
};
class HomeStores extends Component {
  constructor(props) {
    super(props);
    this.brandCarousel = createRef();

    this.state = {
      stores: [],
      categories: [],
    };
  }
  next = () => {
    this.brandCarousel.current.next();
  };
  prev = () => {
    this.brandCarousel.current.prev();
  };
  componentDidMount() {
    axios.get(`${API}dashboard/homepage/storess`).then((response) => {
      console.log(response);
      const { stores, categories } = response.data;
      this.setState({
        stores,
        categories,
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

            <div className="store-boxes wide-home-view">
              <DraggingCarousel
                swipeable={false}
                draggable={false}
                autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlaySpeed={10000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                rewind={false}
                responsive={responsive}
                infinite={true}
                showDots={true}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {this.state.stores?.map((store, index) => {
                  return (
                    <>
                      <a
                        href={`/brand/${store.id}`}
                        key={store.id}
                        className="store-wrapper"
                      >
                        <div
                          key={store.id}
                          className="store bgr-cover"
                          style={{
                            backgroundImage: `url("${store.home_preview}")`,
                          }}
                        ></div>
                        <div
                          className="logo-box bgr-cover"
                          style={{ backgroundImage: `url("${store.logo}")` }}
                        ></div>
                      </a>
                      <a className="store-title" href={`/brand/${store.id}`}>
                        <p>{store?.name}</p>
                      </a>
                      <a className="store-cats" href={`/brand/${store.id}`}>
                        {/* <p>
             {store.categories?.map((cat) => {
              return <span key={cat.id}>{cat?.name}</span>;
             })}
            </p> */}
                        <p>{this.state.categories[index]}</p>
                      </a>
                    </>
                  );
                })}
              </DraggingCarousel>
            </div>
            <div className="mobile-home-view">
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
                        <a
                          href={`/brand/${store?.id}`}
                          className="store-home-box"
                        >
                          <div
                            className="store-logo border text-center"
                            style={{
                              backgroundImage: "url(" + store.logo + ")",
                            }}
                          ></div>
                        </a>
                      ) : (
                        <a href={`/brand/${store?.id}`}>
                          <div
                            className="store-logo border text-center"
                            keys={idnex}
                          >
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
                SEE ALL BRANDS
              </a>
            </Row>
          </>
        )}
      </>
    );
  }
}

export default HomeStores;
