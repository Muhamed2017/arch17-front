import React, { Component, createRef } from "react";
import { Row, Col, Carousel, Spin } from "antd";
import "./addProject/Porject.css";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import { IoIosMail } from "react-icons/io";
import {
 LoadingOutlined,
 RightOutlined,
 LeftOutlined,
} from "@ant-design/icons";
import { ParallaxBanner } from "react-scroll-parallax";
import {
 FaPinterestP,
 FaFacebookF,
 FaVimeoV,
 FaTwitter,
 FaThumbsUp,
} from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { API } from "./../utitlties";
import { Link } from "react-router-dom";
import { Grid, Sticky, Ref } from "semantic-ui-react";
import Footer from "./../components/Footer";
const { Column } = Grid;
class Project extends Component {
 constructor(props) {
  super(props);
  this.contextRef = createRef();

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
   fetched: false,
   nextMorePage: true,
   currentSlide: 1,
  };
 }

 handleScroll = () => {};

 fetchMoreSimilar = () => {
  const { page } = this.state;
  this.setState({
   fetching_more: true,
  });
  axios
   .get(`${API}moresimilars/china/type1?page=${page}`)
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
 componentDidMount() {
  axios
   .get(`${API}project/${this.state.project_id}`)
   .then((response) => {
    console.log(response.data);
    this.setState({
     fetched: true,
     project: response.data.project,
     products: response.data.products_tags,
     content_state: EditorState.createWithContent(
      convertFromRaw(JSON.parse(response.data.project.content))
     ),
     brands: response.data.brands,
     designers: response.data.designers,
     similars: response.data.similar,
    });
   })
   .catch((error) => {
    console.log(error);
   });

  window.addEventListener("scroll", this.handleScroll);
 }

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
         style={{ aspectRatio: "2.5" }}
        />
       </div>
      </section>
      <section id="project-main">
       {/* <Ref innerRef={this.contextRef}> */}
       <Grid>
        <Grid.Row stretched>
         <Column width={1}>
          <Sticky context={this.contextRef} offset={55} pushing>
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
          <Column width={10} className="shifted-top">
           <div id="project-content">
            <h6>{this.state.project?.name}</h6>
            <p className="location">{`${this.state.project?.country} ${this.state.project?.city} | ${this.state.project?.year} | 455`}</p>

            <div className="editor-state my-3">
             {this.state.content_state && (
              <>
               <Editor
                editorState={this.state.content_state}
                wrapperClassName="rich-editor demo-wrapper"
                editorClassName="demo-editor cs-editor"
                readOnly
                toolbar={{
                 options: [],
                }}
               />
              </>
             )}
            </div>
           </div>
          </Column>
         </Ref>
         <Column width={5}>
          <Sticky context={this.contextRef} offset={55}>
           <div className="project-right-side">
            <div className="designers p-3">
             <p className="via">Designers</p>

             {this.state.designers?.map((d) => {
              return (
               <Row gutter={50} className="my-4" align="middle">
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
              );
             })}
             {this.state.designers?.length > 2 && (
              <p className="text-right bold p-3 ">See More</p>
             )}
            </div>
            <div className="brands p-4">
             <p className="via">Products by</p>
             <Carousel
              // afterChange={this.brandSlideChange}
              autoplay
              // pauseOnHover
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
                    <span>
                     <LeftOutlined />
                    </span>

                    {`${index + 1} / ${this.state.brands?.length} `}
                    <span>
                     <RightOutlined />
                    </span>
                   </p>
                  </div>
                 </div>
                </>
               );
              })}
             </Carousel>
            </div>
           </div>
          </Sticky>
         </Column>
        </Grid.Row>
       </Grid>
      </section>
     </div>
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
              <h5 className="product-store">{product.store_name.store_name}</h5>

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

       {this.state.products?.length > 4 && (
        <p className="text-right block w-100 bold text-underline roboto pointer">
         SEE MORE
        </p>
       )}
      </div>
     </section>

     <section id="similar-projects">
      <div className="inner-projects">
       <p className="py-2 mb-5 head">Similar Projects</p>
       <Row span={24} gutter={24}>
        {this.state.similars?.map((p) => {
         return (
          <Col md={8} className="mb-4">
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
          </Col>
         );
        })}
        {this.state.nextMorePage && !this.state.fetching_more && (
         <Col md={24}>
          <p
           className="block text-center bold text-underline roboto pointer"
           onClick={this.fetchMoreSimilar}
          >
           SEE MORE PROJECTS
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
     <Footer />
    </div>
   </>
  );
 }
}

export default Project;
