import React, { Component } from "react";
import { Row, Col } from "antd";
import "./../helpPages/statichelp.css";
import "./../static_pages/help.css";
import Footer from "../../components/Footer";
const img1 =
  "https://res.cloudinary.com/azharuniversity/image/upload/v1661377860/Screen_Shot_2022-08-22_at_08.48.08_fr31oi.png";
const img2 =
  "https://res.cloudinary.com/azharuniversity/image/upload/v1661377836/Screen_Shot_2022-08-21_at_19.50.10_vdflbn.jpg";
const img3 =
  "https://res.cloudinary.com/azharuniversity/image/upload/v1661377833/Screen_Shot_2022-08-21_at_19.50.22_qz71qy.jpg";
const img4 =
  "https://res.cloudinary.com/azharuniversity/image/upload/v1661377833/Screen_Shot_2022-08-21_at_19.50.32_uua7o9.jpg";
const img5 =
  "https://res.cloudinary.com/azharuniversity/image/upload/v1661377844/Screen_Shot_2022-08-21_at_19.50.42_ck8jax.jpg";
const img6 =
  "https://res.cloudinary.com/azharuniversity/image/upload/v1661377834/Screen_Shot_2022-08-21_at_19.50.57_kmwawh.jpg";
class Arch17com extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <>
        <div className="procurement-wrapper arch17com">
          <div id="procurement" className="bg-white static-page ">
            <div className="hepl-container pb-1">
              <section id="pagehead" className="py-5 text-center">
                <Row span={24} justify="center">
                  <Col md={16}>
                    <h5 className="main-head mb-0 com">
                      arch17<span>.com</span>
                    </h5>
                    <p className="main-desc">
                      Source Design ideas, news and products
                    </p>
                    <Col md={24}>
                      <img
                        className="head-help-image"
                        src="https://res.cloudinary.com/azharuniversity/image/upload/v1674525672/Arch17_web_port_kn842s.png"
                      />
                    </Col>
                  </Col>
                </Row>
              </section>
              <section className="deisgner-help">
                <div className="wide-view">
                  <Row span={24} gutter={100} align="middle">
                    <Col
                      lg={{ span: 12, order: 3 }}
                      md={{ span: 12, order: 3 }}
                      xs={{ span: 24, order: 3 }}
                      sm={{ span: 24, order: 3 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525680/Search_design_i_qfx5nf.png")`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      xs={{ span: 24, order: 4 }}
                      sm={{ span: 24, order: 4 }}
                      lg={{ span: 12, order: 4 }}
                      md={{ span: 12, order: 4 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        Source Design Ideas, News, Trends and Products
                      </h6>
                      <p className="side-desc">
                        Arch17.com consists of two parts, Product sourcing,
                        where users can discover thousands of design products.
                        The online magazine where users can find design ideas
                        and inspirations in projects, Design blogs, and news.
                      </p>
                    </Col>
                    <Col
                      lg={{ span: 12, order: 5 }}
                      md={{ span: 12, order: 5 }}
                      xs={{ span: 24, order: 6 }}
                      sm={{ span: 24, order: 6 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        Find Furniture, Lighting and Materials
                      </h6>
                      <p className="side-desc">
                        Discover new Products for every type of project , Search
                        by space, type, style, material and price rang from our
                        online catalogue with Thousands of items from Dozens of
                        brands Our daily updated collections daily updated
                        collections.
                      </p>
                    </Col>
                    <Col
                      lg={{ span: 12, order: 6 }}
                      md={{ span: 12, order: 6 }}
                      xs={{ span: 24, order: 5 }}
                      sm={{ span: 24, order: 5 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525680/Search_products_efkxt6.png")`,
                        }}
                      ></div>
                    </Col>

                    <Col
                      lg={{ span: 12, order: 7 }}
                      md={{ span: 12, order: 7 }}
                      xs={{ span: 24, order: 7 }}
                      sm={{ span: 24, order: 7 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525674/High-Qulty_prod_rvngi0.png")`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      lg={{ span: 12, order: 8 }}
                      md={{ span: 12, order: 8 }}
                      xs={{ order: 7, span: 24 }}
                      sm={{ order: 7, span: 24 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        High-quality product and service
                      </h6>
                      <p className="side-desc">
                        We made it easy for buyers and designers worldwide to
                        reach and shop high-quality with affordable prices
                        products from china and all over the world, all brands
                        and manufacturers are vetted and only high-quality
                        products are listed.
                      </p>
                    </Col>

                    <Col
                      lg={{ span: 12, order: 9 }}
                      md={{ span: 12, order: 9 }}
                      xs={{ span: 24, order: 10 }}
                      sm={{ span: 24, order: 10 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        Request products catalogues and price online
                      </h6>
                      <p className="side-desc">
                        Request price Quote, material samples, and BIM / Cad
                        files for drawing and renders.
                      </p>
                    </Col>
                    <Col
                      lg={{ span: 12, order: 10 }}
                      md={{ span: 12, order: 10 }}
                      xs={{ span: 24, order: 9 }}
                      sm={{ span: 24, order: 9 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525679/Request_info_co_d3a4gw.png")`,
                        }}
                      ></div>
                    </Col>

                    <Col
                      lg={{ span: 12, order: 11 }}
                      md={{ span: 12, order: 11 }}
                      xs={{ order: 11, span: 24 }}
                      sm={{ order: 11, span: 24 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525680/Search_design_i_1_thl8bh.png")`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      lg={{ span: 12, order: 12 }}
                      md={{ span: 12, order: 12 }}
                      xs={{ span: 24, order: 12 }}
                      sm={{ span: 24, order: 12 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        Explore design projects and find the latest in the
                        industry
                      </h6>
                      <p className="side-desc">
                        On arch17 online magazine you can source ides for your
                        architecture and interior projects and Stay updated on
                        trends, projects and the latest collections from brands
                        and designers.
                      </p>
                    </Col>
                    <Col
                      lg={{ span: 12, order: 12 }}
                      md={{ span: 12, order: 12 }}
                      xs={{ span: 24, order: 11 }}
                      sm={{ span: 24, order: 11 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        Get in touch with designers And brands.
                      </h6>
                      <p className="side-desc">
                        Every project page includes three layers of information,
                        project content, designers contact and, featured
                        products and brands.
                      </p>
                    </Col>
                    <Col
                      lg={{ span: 12, order: 13 }}
                      md={{ span: 12, order: 13 }}
                      xs={{ span: 24, order: 12 }}
                      sm={{ span: 24, order: 12 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525674/Group_604_wzvkek.png")`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      lg={{ span: 12, order: 15 }}
                      md={{ span: 12, order: 15 }}
                      xs={{ span: 24, order: 14 }}
                      sm={{ span: 24, order: 14 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        Find Professionals and send Online Quote for your
                        projects
                      </h6>
                      <p className="side-desc">
                        Find designers and architects , and construction
                        companies online to design and renovate your home,
                        office and other properties. You can search
                        professionals by the service type, architecture,
                        interior design, landscape & More. For professionals
                        create your company page now
                      </p>
                    </Col>
                    <Col
                      lg={{ span: 12, order: 14 }}
                      md={{ span: 12, order: 14 }}
                      xs={{ span: 24, order: 15 }}
                      sm={{ span: 24, order: 15 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525672/04_gxp6ok.png")`,
                        }}
                      ></div>
                    </Col>
                    {/* <Col
                      lg={{ span: 12, order: 16 }}
                      md={{ span: 12, order: 16 }}
                      xs={{ span: 24, order: 17 }}
                      sm={{ span: 24, order: 17 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        Easy-to-use Features keeps You updated and organized
                      </h6>
                      <p className="side-desc">
                        Arch17 offers you a set of features that simplifies how
                        you find design ideas, source and buy design products
                        for your projects. Moreover, we help you collect your
                        sourcing in personalized collections and create your
                        online design library.{" "}
                      </p>
                    </Col>
                    <Col
                      lg={{ span: 12, order: 17 }}
                      md={{ span: 12, order: 17 }}
                      xs={{ span: 24, order: 16 }}
                      sm={{ span: 24, order: 16 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525681/Screen_Shot_202_anvv2l.png")`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      lg={{ span: 12, order: 19 }}
                      md={{ span: 12, order: 19 }}
                      xs={{ span: 24, order: 18 }}
                      sm={{ span: 24, order: 18 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        Multilingual Customer Care service
                      </h6>
                      <p className="side-desc">
                        Our Customer Care team includes architects, designers
                        and professionals backed by an international experience.
                        We take care of customers for both pre-sales and
                        after-sales, from product sourcing to providing tailored
                        quotations and suggesting the best shipping option.
                      </p>
                    </Col>
                    <Col
                      lg={{ span: 12, order: 18 }}
                      md={{ span: 12, order: 18 }}
                      xs={{ span: 24, order: 19 }}
                      sm={{ span: 24, order: 19 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525681/view-of-staff-i_wy9lhg.png")`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      lg={{ span: 13, order: 19 }}
                      md={{ span: 13, order: 19 }}
                      xs={{ span: 24, order: 20 }}
                      sm={{ span: 24, order: 20 }}
                      className="box"
                    >
                      <h6 className="mb-5">
                        Rely on our team of specialists to support you at all
                        stages
                      </h6>
                      <Row gutter={24} justify="space-between">
                        <Col md={12} xs={24} sm={24}>
                          <div className="content">
                            <img
                              className="box-icon inline-block"
                              src="https://res.cloudinary.com/azharuniversity/image/upload/v1674686012/layers_nbr5ko.png"
                              alt=""
                            />
                            <div className="inline-block">
                              <h4>Source Consaltants</h4>
                              <span>
                                Our team can help you to source products for
                                your projects and Create your FF&E
                                specification,Keeping it on time and in budget.
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col md={12} xs={24} sm={24}>
                          <div className="content">
                            <img
                              className="box-icon inline-block"
                              src="https://res.cloudinary.com/azharuniversity/image/upload/v1674686012/chat_sjkvlq.png"
                              alt=""
                            />
                            <div className="inline-block">
                              <h4>Communication</h4>
                              <span>
                                We handle all the communication between you and
                                all the manufactures and admins.
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col md={12} xs={24} sm={24}>
                          <div className="content">
                            <img
                              className="box-icon inline-block"
                              src="https://res.cloudinary.com/azharuniversity/image/upload/v1674686012/truck_ud0up6.png"
                              alt=""
                            />
                            <div className="inline-block">
                              <h4>Consolidated delivery</h4>
                              <span>
                                With best shipping prices, We’ll consolidate
                                orders from multiple suppliers and deliver when
                                required.
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col md={12} xs={24} sm={24}>
                          <div className="content">
                            <img
                              className="box-icon inline-block"
                              src="https://res.cloudinary.com/azharuniversity/image/upload/v1674686012/settings_d5kped.png"
                              alt=""
                            />
                            <div className="inline-block">
                              <h4>Installation</h4>
                              <span>
                                Our project managers will communicate with a
                                local installation workers and supervise them to
                                install all products on site.
                              </span>
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <Row className="mt-4" justify="start" gutter={15}>
                        <Col md={12}>
                          <a
                            href="/procurementservice#start-project"
                            className="text-white text-center mx-0"
                          >
                            Start new project{" "}
                          </a>
                        </Col>
                        <Col md={12}>
                          <a
                            href="#"
                            className="bg-transparent text-black decorated fs-18 mx-0"
                          >
                            Book A demo
                          </a>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      lg={{ span: 11, order: 20 }}
                      md={{ span: 11, order: 20 }}
                      xs={{ span: 24, order: 19 }}
                      sm={{ span: 24, order: 19 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525678/designers-worki_ft6fqh.png")`,
                        }}
                      ></div>
                    </Col> */}
                  </Row>
                </div>
                <div className="mobile-view">
                  <Row span={24} gutter={{sm:10,xs:10}} align="top">
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        Source Design Ideas, News, Trends and Products
                      </h6>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525680/Search_design_i_qfx5nf.png")`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box mb-5"
                    >
                      <p className="side-desc">
                        Arch17.com consists of two parts, Product sourcing,
                        where users can discover thousands of design products.
                        The online magazine where users can find design ideas
                        and inspirations in projects, Design blogs, and news.
                      </p>
                    </Col>

                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        Find Furniture, Lighting and Materials
                      </h6>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525680/Search_products_efkxt6.png")`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box mb-5"
                    >
                      <p className="side-desc">
                        Discover new Products for every type of project , Search
                        by space, type, style, material and price rang from our
                        online catalogue with Thousands of items from Dozens of
                        brands Our daily updated collections daily updated
                        collections.
                      </p>
                    </Col>

                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        High-quality product and service
                      </h6>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525674/High-Qulty_prod_rvngi0.png")`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box mb-5"
                    >
                      <p className="side-desc">
                        We made it easy for buyers and designers worldwide to
                        reach and shop high-quality with affordable prices
                        products from china and all over the world, all brands
                        and manufacturers are vetted and only high-quality
                        products are listed.
                      </p>
                    </Col>

                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        Request products catalogues and price online
                      </h6>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525679/Request_info_co_d3a4gw.png")`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box mb-5"
                    >
                      <p className="side-desc">
                        Request price Quote, material samples, and BIM / Cad
                        files for drawing and renders.
                      </p>
                    </Col>

                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        Explore design projects and find the latest in the
                        industry
                      </h6>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525680/Search_design_i_1_thl8bh.png")`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box mb-5"
                    >
                      <p className="side-desc">
                        On arch17 online magazine you can source ides for your
                        architecture and interior projects and Stay updated on
                        trends, projects and the latest collections from brands
                        and designers.
                      </p>
                    </Col>

                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        Get in touch with designers And brands.
                      </h6>
                    </Col>

                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525674/Group_604_wzvkek.png")`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box mb-5"
                    >
                      <p className="side-desc">
                        Every project page includes three layers of information,
                        project content, designers contact and, featured
                        products and brands.
                      </p>
                    </Col>

                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        Find Professionals and send Online Quote for your
                        projects
                      </h6>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525672/04_gxp6ok.png")`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box mb-5"
                    >
                      <p className="side-desc">
                        Find designers and architects , and construction
                        companies online to design and renovate your home,
                        office and other properties. You can search
                        professionals by the service type, architecture,
                        interior design, landscape & More. For professionals
                        create your company page now
                      </p>
                    </Col>

                    {/* <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        Easy-to-use Features keeps You updated and organized
                      </h6>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525681/Screen_Shot_202_anvv2l.png")`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box mb-5"
                    >
                      <p className="side-desc">
                        Arch17 offers you a set of features that simplifies how
                        you find design ideas, source and buy design products
                        for your projects. Moreover, we help you collect your
                        sourcing in personalized collections and create your
                        online design library.{" "}
                      </p>
                    </Col>

                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <h6 className="side-head">
                        Multilingual Customer Care service
                      </h6>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525681/view-of-staff-i_wy9lhg.png")`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box mb-5"
                    >
                      <p className="side-desc">
                        Our Customer Care team includes architects, designers
                        and professionals backed by an international experience.
                        We take care of customers for both pre-sales and
                        after-sales, from product sourcing to providing tailored
                        quotations and suggesting the best shipping option.
                      </p>
                    </Col>

                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <h6 className="mb-5">
                        Rely on our team of specialists to support you at all
                        stages
                      </h6>
                    </Col>

                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box"
                    >
                      <div
                        className="desimgbox"
                        style={{
                          backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1674525678/designers-worki_ft6fqh.png")`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      className="box mb-5"
                    >
                      <Row gutter={24} justify="space-between">
                        <Col md={12} xs={24} sm={24}>
                          <div className="content">
                            <img
                              className="box-icon inline-block"
                              src="https://res.cloudinary.com/azharuniversity/image/upload/v1674686012/layers_nbr5ko.png"
                              alt=""
                            />
                            <div className="inline-block">
                              <h4>Source Consaltants</h4>
                              <span>
                                Our team can help you to source products for
                                your projects and Create your FF&E
                                specification,Keeping it on time and in budget.
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col md={12} xs={24} sm={24}>
                          <div className="content">
                            <img
                              className="box-icon inline-block"
                              src="https://res.cloudinary.com/azharuniversity/image/upload/v1674686012/chat_sjkvlq.png"
                              alt=""
                            />
                            <div className="inline-block">
                              <h4>Communication</h4>
                              <span>
                                We handle all the communication between you and
                                all the manufactures and admins.
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col md={12} xs={24} sm={24}>
                          <div className="content">
                            <img
                              className="box-icon inline-block"
                              src="https://res.cloudinary.com/azharuniversity/image/upload/v1674686012/truck_ud0up6.png"
                              alt=""
                            />
                            <div className="inline-block">
                              <h4>Consolidated delivery</h4>
                              <span>
                                With best shipping prices, We’ll consolidate
                                orders from multiple suppliers and deliver when
                                required.
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col md={12} xs={24} sm={24}>
                          <div className="content">
                            <img
                              className="box-icon inline-block"
                              src="https://res.cloudinary.com/azharuniversity/image/upload/v1674686012/settings_d5kped.png"
                              alt=""
                            />
                            <div className="inline-block">
                              <h4>Installation</h4>
                              <span>
                                Our project managers will communicate with a
                                local installation workers and supervise them to
                                install all products on site.
                              </span>
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <Row className="mt-4" justify="start" gutter={15}>
                        <Col md={12}>
                          <a
                            href="/procurementservice#start-project"
                            className="text-white text-center mx-0"
                          >
                            Start new project{" "}
                          </a>
                        </Col>
                        <Col md={12}>
                          <a
                            href="#"
                            className="bg-transparent text-black decorated fs-18 mx-0"
                          >
                            Book A demo
                          </a>
                        </Col>
                      </Row>
                    </Col> */}
                  </Row>
                </div>
              </section>
              {/* <section className="howdoes">
                <h5>How Does it work ?</h5>
                <p>How to order products at arch17.com?</p>
                <div className="cols">
                  <Row gutter={{md:16,lg:16, sm:10,xs:10}}>
                    <Col className="sqr-wrapper" md={6} xs={12} sm={12}>
                      <div className="sqr">
                        <h6>Find Products</h6>
                        <p>
                          Find the products you desire and request quote through
                          the products page or communicate with our customer
                          Service through the online chat / whatsApp or WeChat.
                          Most of the products on arch17 are made-to-order and
                          available for customization
                        </p>
                        <img
                          src="https://res.cloudinary.com/azharuniversity/image/upload/v1674686013/search_husqbh.png"
                          alt=""
                        />
                      </div>
                    </Col>
                    <Col className="sqr-wrapper" md={6} xs={12} sm={12}>
                      <div className="sqr">
                        <h6>Receive the Quote</h6>
                        <p>
                          Receive instant Quote _ based on your custom
                          requirements _ including the delivery cost and leading
                          time.
                        </p>
                        <img
                          src="https://res.cloudinary.com/azharuniversity/image/upload/v1674686013/document_qbvs3i.png"
                          alt=""
                        />
                      </div>
                    </Col>
                    <Col className="sqr-wrapper" md={6} xs={12} sm={12}>
                      <div className="sqr">
                        <h6>Make the payment</h6>
                        <p>
                          Make the payment According to the payment terms. In
                          case products are Customized (Made-to-order), you will
                          pay 50% before delivery and the balance after
                          production and before delivery.
                        </p>
                        <img
                          src="https://res.cloudinary.com/azharuniversity/image/upload/v1674686012/hand_rju07y.png"
                          alt=""
                        />
                      </div>
                    </Col>
                    <Col className="sqr-wrapper" md={6} xs={12} sm={12}>
                      <div className="sqr">
                        <h6>Product Delivery</h6>
                        <p>
                          We Ship to every corner word wide. Thanks to our
                          logistics partners we are able to provide the best
                          shipping solution ensuring the best prices and
                          delivery time. For multiple suppliers orders to same
                          place We’ll consolidate orders from and deliver when
                          required.
                        </p>
                        <img
                          src="https://res.cloudinary.com/azharuniversity/image/upload/v1674686012/tracking_selx90.png"
                          alt=""
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </section> */}

              <a href="/signup" className="black-join mb-5">
                Join now
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Arch17com;
