import React, { Component, createRef } from "react";
import { Row, Col, Carousel as AntCarousel, Spin, BackTop } from "antd";
import "./addProject/Porject.css";
// import { convertFromRaw, EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import { IoIosMail } from "react-icons/io";
import { LoadingOutlined } from "@ant-design/icons";
import { ParallaxBanner } from "react-scroll-parallax";
import Carousel from "react-elastic-carousel";
import { IoIosArrowUp } from "react-icons/io";

import {
 FaPinterestP,
 FaFacebookF,
 FaVimeoV,
 FaTwitter,
 FaThumbsUp,
} from "react-icons/fa";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import { AiOutlinePlus } from "react-icons/ai";
import { API } from "./../utitlties";
import { Link } from "react-router-dom";
import { Grid, Sticky, Ref, Icon } from "semantic-ui-react";
import Footer from "./../components/Footer";

const { Column } = Grid;
class Project extends Component {
 constructor(props) {
  super(props);
  this.contextRef = createRef();
  this.carouselRef = createRef();
  this.brandCarousel = createRef();
  // this.goto = this.goto.bind(this);

  this.state = {
   products: [],
   content_state: null,
   project_id: this.props.match.params.id,
   project: {
    name: null,
    country: null,
    city: null,
    year: null,
   },
   designers: [],
   brands: [],
   similars: [],
   page: 0,
   productsPage: 1,
   productFetched: false,
   fetched: false,
   nextMorePage: true,
   nextMoreProductsPage: true,
   currentSlide: 1,
  };
 }

 fetchMoreSimilar = () => {
  const { page } = this.state;
  this.setState({
   fetching_more: true,
  });
  axios
   .get(
    `${API}moresimilars/${this.state.project.kind}/${this.state.project.type}?page=${page}`
   )
   .then((response) => {
    console.log(response);
    this.setState({
     similars: response.data.projects.data,
     fetching_more: false,
     page: this.state.page + 1,
     nextMorePage: response.data.next_page_url,
    });
   })
   .catch((error) => {
    console.log(error);
   });
 };
 fetchMoreProducts = () => {
  const { productsPage } = this.state;
  this.setState({
   fetching_products: true,
  });
  axios
   .get(`${API}moreprojects/${this.state.project_id}?page=${productsPage}`)
   .then((response) => {
    console.log(response);
    this.setState({
     products: response.data.projects.data,
     fetching_products: false,
     productsPage: this.state.productsPage + 1,
     nextMoreProductsPage: response.data.next_page_url,
     productFetched: true,
    });
   })
   .catch((error) => {
    console.log(error);
   });
 };
 componentDidMount() {
  axios
   .get(`${API}project/${this.state.project_id}`)
   .then((response) => {
    console.log(response.data);
    this.setState({
     fetched: true,
     project: response.data.project,
     products: response.data.products_tags,
     content_state: response.data.project.content,
     //  content_state: EditorState.createWithContent(
     //   convertFromRaw(JSON.parse(response.data.project.content))
     //  ),
     brands: response.data.brands,
     designers: response.data.designers,
     similars: response.data.similar,
    });
   })
   .catch((error) => {
    console.log(error);
   });

  // window.addEventListener("scroll", this.handleScroll);
 }

 onChange = (_, next) => {
  if (_.index >= this.state.designers.length / 2) {
   setTimeout(() => {
    this.carouselRef.current.goTo(0);
   }, 10000);
  }
 };
 next = () => {
  this.brandCarousel.current.next();
 };
 prev = () => {
  this.brandCarousel.current.prev();
 };
 render() {
  if (!this.state.fetched)
   return (
    <>
     <>
      <Spin
       size="large"
       indicator={
        <LoadingOutlined style={{ fontSize: "36px", color: "#000" }} spin />
       }
       style={{ position: "absolute", top: "40%", right: "50%" }}
      />
     </>
    </>
   );
  return (
   <>
    <div id="project-layout">
     <div id="project-page">
      <section id="cover">
       <div className="project-cover">
        <ParallaxBanner
         layers={[{ image: this.state.project?.cover, speed: -30 }]}
         className="cover-container"
         style={{ aspectRatio: "2.9" }}
        />
       </div>
      </section>
      <section id="project-main">
       <Grid>
        <Grid.Row centered>
         <Column mobile={2} tablet={2} computer={1}>
          <Sticky context={this.contextRef} offset={50} bottomOffset={0}>
           <div className="socials">
            <div>
             <FaFacebookF />
            </div>
            <div>
             <FaTwitter />
            </div>
            <div>
             <FaPinterestP />
            </div>
            <div>
             <FaVimeoV />
            </div>
            <div>
             <FaThumbsUp />
            </div>
            <div>
             <AiOutlinePlus />
            </div>
           </div>
          </Sticky>
         </Column>
         <Ref innerRef={this.contextRef}>
          <Column mobile={14} tablet={7} computer={10} className="shifted-top">
           <div id="project-content">
            <h6>{this.state.project?.name}</h6>
            <p className="location">{`${this.state.project?.country} ${this.state.project?.city} | ${this.state.project?.year} | 455`}</p>

            <div className="editor-state my-3">
             {this.state.content_state && (
              <>
               <CKEditor
                disabled={true}
                config={{
                 isReadOnly: true,
                 toolbar: [],
                }}
                editor={ClassicEditor}
                data={this.state.content_state}
               />
              </>
             )}
            </div>
           </div>
          </Column>
         </Ref>
         <Column mobile={14} tablet={7} computer={5}>
          {this.state.designers?.length > 0 && (
           <>
            <Sticky context={this.contextRef} offset={55}>
             <div className="project-right-side">
              <div className="designers p-3">
               <p className="via">Designers</p>
               <Carousel
                // ref={(ref) => (this.carouselRef = ref)}
                ref={this.carouselRef}
                verticalMode
                onChange={this.onChange}
                itemsToShow={2}
                itemsToScroll={1}
                showArrows={false}
                enableAutoPlay
                autoPlaySpeed={3000}
                pagination={false}
                // disableArrowsOnEnd={false}
               >
                {this.state.designers?.map((d, index) => {
                 return (
                  <>
                   <Row gutter={50} key={index} className="my-4" align="middle">
                    <Col md={7}>
                     <div
                      className="brand-slide-logo"
                      style={{
                       backgroundImage: `url(${d.avatar})`,
                      }}
                     >
                      {d.avatar && d.avatar?.length > 10 ? (
                       ""
                      ) : (
                       <p>{d.displayName[0]}</p>
                      )}
                     </div>
                    </Col>
                    <Col md={17}>
                     <p className="name my-0">{d.displayName}</p>
                     <p className="title my-0">{d.professions[0]}</p>
                     <div className="des-btns">
                      <button>
                       <IoIosMail />
                      </button>
                      <button>
                       <AiOutlinePlus /> Follow
                      </button>
                     </div>
                    </Col>
                   </Row>
                  </>
                 );
                })}
               </Carousel>
               {this.state.designers?.length > 2 && (
                <p
                 className="text-right bold p-3 "
                 onClick={() => {
                  this.setState({
                   designersToShow: 4,
                  });
                 }}
                >
                 See More
                </p>
               )}
              </div>
              {this.state.brands?.length > 0 && (
               <>
                <div className="brands p-4">
                 <p className="via">Products by</p>
                 <AntCarousel
                  ref={this.brandCarousel}
                  autoplay
                  dots={false}
                  swipe
                  swipeToSlide
                  autoplaySpeed={3000}
                  effect="fade"
                 >
                  {this.state.brands?.map((brand, index) => {
                   return (
                    <>
                     <div>
                      <div className="brand">
                       <Row gutter={50} className="my-3 mb-4" align="middle">
                        <Col md={7}>
                         <div
                          className="brand-slide-logo"
                          style={{
                           backgroundImage: `url(${brand.logo})`,
                          }}
                         >
                          {brand.logo && brand.logo?.length > 10 ? (
                           <></>
                          ) : (
                           <p>{brand.name[0]}</p>
                          )}
                         </div>
                        </Col>
                        <Col md={17}>
                         <p className="name my-0">{brand.name}</p>
                         <p className="title my-0">
                          {`${brand.type} | ${brand.country}`}{" "}
                          {brand.city ? `, ${brand.city}` : ""}
                         </p>
                         <div className="des-btns">
                          <button>
                           <IoIosMail />
                          </button>
                          <button>
                           <AiOutlinePlus /> Follow
                          </button>
                         </div>
                        </Col>
                       </Row>
                       <Row span={24} gutter={20}>
                        {brand?.products?.map((p) => {
                         return (
                          <Col md={8} className="mt-4">
                           <div
                            className="p-box"
                            style={{
                             backgroundImage: `url(${p.identity[0].preview_cover})`,
                            }}
                           >
                            <div className="sky"></div>
                           </div>
                          </Col>
                         );
                        })}
                       </Row>
                       {brand?.products?.length > 6 && (
                        <p className="text-right bold p-3">See More</p>
                       )}
                      </div>
                      <div className="slide-footer">
                       <p className="text-right bold">
                        <span onClick={this.prev}>
                         <Icon name="angle left" />
                        </span>

                        {`${index + 1} / ${this.state.brands?.length} `}
                        <span onClick={this.next}>
                         <Icon name="angle right" />
                        </span>
                       </p>
                      </div>
                     </div>
                    </>
                   );
                  })}
                 </AntCarousel>
                </div>
               </>
              )}
             </div>
            </Sticky>
           </>
          )}
         </Column>
        </Grid.Row>
       </Grid>
      </section>
     </div>
     {this.state.products?.length > 0 && (
      <>
       <section id="product-tags">
        <div className="products">
         <p className="py-2 mb-5 head">Products Used in this project …</p>
         <Row span={24} gutter={30}>
          {this.state.products?.map((product, index) => {
           return (
            <>
             <Col className="gutter-row mb-3" md={6}>
              <div className="product">
               <a href={`/product/${product.id}`}>
                <div
                 className="p-img"
                 style={{
                  background: `url(${product.preview_cover})`,
                 }}
                >
                 <div className="prlayer"></div>

                 <div
                  className="actns-btn svbtn"
                  onClick={(e) => {
                   e.preventDefault();
                   this.setState(
                    {
                     to_save_cover: product.preview_cover,
                     to_save_productId: product,
                    },
                    () => {
                     this.saveToCollection();
                    }
                   );
                  }}
                 >
                  Save +
                 </div>
                 {product.file.length > 0 ? (
                  <>
                   <div className="actns-btn file-btn cad">CAD</div>
                   <div className="actns-btn file-btn threeD">3D</div>
                  </>
                 ) : (
                  ""
                 )}
                </div>
               </a>

               <div className="lower-info">
                <h5 className="product-store">
                 {product.store_name.store_name}
                </h5>

                <p className="product-name">{product.name}</p>
                <div className="product-price">
                 {product.preview_price && product.preview_price > 0 ? (
                  <>
                   <span>¥ {product.preview_price}</span>
                  </>
                 ) : (
                  <>
                   <Link
                    to={{
                     pathname: `/product/${product.product_id}`,
                     state: {
                      request_price: true,
                     },
                    }}
                   >
                    REQUEST PRICE INFO
                   </Link>
                  </>
                 )}
                </div>
               </div>
              </div>
             </Col>
            </>
           );
          })}
         </Row>

         {this.state.products?.length > 1 && (
          <p
           className="text-right block w-100 bold text-underline roboto pointer"
           onClick={this.fetchMoreProducts}
          >
           {this.state.fetching_products ? (
            <>
             <Spin
              style={{
               width: "100%",
               margin: "auto",
               position: "relative",
              }}
              size="large"
              indicator={
               <LoadingOutlined
                style={{ fontSize: "40px", color: "#000" }}
                spin
               />
              }
             />
            </>
           ) : (
            <>{!this.state.productFetched && <>SEE MORE</>}</>
           )}
          </p>
         )}
        </div>
       </section>
      </>
     )}
     {this.state.similars?.length > 0 && (
      <>
       <section id="similar-projects">
        <div className="inner-projects px-2">
         <p className="py-2 mb-5 head">Similar Projects</p>
         <Row span={24} gutter={24} justify="center">
          {this.state.similars?.map((p) => {
           return (
            <Col xs={24} sm={12} md={8} className="mb-4">
             <a href={`/project/${p.id}`} className="box-link">
              <div className="project-col bg-white">
               <div
                className="project-image"
                style={{
                 backgroundImage: `url(${p.cover})`,
                }}
               ></div>
               <div className="info p-3">
                <p className="project-name">{p.name}</p>

                <div className="project-cover-footer">
                 <p className="m-0">{p.kind}</p>
                 <hr className="my-1 w-20" />
                 <p className="m-0">{p.type}</p>
                </div>
               </div>
              </div>
             </a>
            </Col>
           );
          })}
          {this.state.nextMorePage && !this.state.fetching_more && (
           <Col md={24}>
            <p
             className="block text-center bold text-underline roboto pointer"
             onClick={this.fetchMoreSimilar}
            >
             {this.state.similars.length > 4 && <>SEE MORE PROJECTS</>}
            </p>
           </Col>
          )}
          {this.state.fetching_more && (
           <>
            <Col md={24} className="">
             <Spin
              style={{
               width: "100%",
               margin: "auto",
               position: "relative",
               top: "-50px",
              }}
              size="large"
              indicator={
               <LoadingOutlined
                style={{ fontSize: "40px", color: "#000" }}
                spin
               />
              }
             />
            </Col>
           </>
          )}
         </Row>
        </div>
       </section>
      </>
     )}
     <Footer />
    </div>
    <BackTop visibilityHeight={2000}>
     <div
      style={{
       height: 40,
       width: 40,
       right: -10,
       bottom: -15,
       borderRadius: 4,
       backgroundColor: "#e41e15",
       color: "#fff",
       textAlign: "center",
       fontSize: 25,
       position: "absolute",
      }}
     >
      <IoIosArrowUp />
     </div>
    </BackTop>
   </>
  );
 }
}

export default Project;
