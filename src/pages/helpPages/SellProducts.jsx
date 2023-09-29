import React, { Component } from 'react';
import {Row, Col, Timeline} from 'antd'
import Footer from '../../components/Footer';
class SellProducts extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( <div className='sellproductpage'>
            <div className="sellwrapper">
                <div className="head-text">
                    <h5>
                    Sell your product with arch17 team
                    </h5>
                    <p>We help you to reach qualified customers and sell your products through a multichannel selling</p>
                </div>
                <section id="sec-head">
        <Row span={24} justify="space-between">
         <Col
          md={{ span: 12, order: 1 }}
          sm={{ span: 24, order: 1 }}
          xs={{ span: 24, order: 1 }}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591857/Search_products_copy_ngjxbf.png')",
            width: "450px",
            height: "450px",
           }}
          ></div>
         </Col>
         <Col
          md={{ span: 12, order: 2 }}
          sm={{ span: 24, order: 2 }}
          xs={{ span: 24, order: 2 }}
         >
          <p className="side-head">
          Increases your opportunity to reach potential clients worldwide

          </p>
          <p className="side-p w-80 mb-4 block fs-15">
          Arch17 team includes sales, designers, and professionals. We help you to reach qualified customers through our Multichannel selling. We take care of everything from placing orders, shipping, and delivery. We also take care of Product delivery and team up with the logistics to ship your products anywhere globally, providing the best shipping prices and controlling the time.

          </p>
          <ul>
            <li>Multilingual customer care</li>
            <li>The best logistic partners and solutions for your brand</li>
            <li>Made-to-order production</li>
            <li>Multichannel selling</li>
          </ul>
         </Col>
        </Row>
       </section>
       
       <section className="howdoes">
              <h5>How Does it work ?</h5>
              <p>How to order products at arch17.com?</p>
              <div className="cols">
              <Row gutter={16}>
                <Col className="sqr-wrapper" md={6} xs={12} sm={12}>
                  <div className="sqr">
                    <h6>Find Products</h6>
                    <p>
                      Find the products you desire and request quote through the
                      products page or communicate with our customer Service
                      through the online chat / whatsApp or WeChat. Most of the
                      products on arch17 are made-to-order and available for
                      customization
                    </p>
                  <img src="https://res.cloudinary.com/azharuniversity/image/upload/v1674686013/search_husqbh.png" alt="" />
                  </div>
                </Col>
                <Col className="sqr-wrapper" md={6} xs={12} sm={12}>
                  <div className="sqr">
                    <h6>Receive the Quote</h6>
                    <p>
                      Receive instant Quote _ based on your custom requirements
                      _ including the delivery cost and leading time.
                    </p>
                    <img src="https://res.cloudinary.com/azharuniversity/image/upload/v1674686013/document_qbvs3i.png" alt="" />
                  </div>
                </Col>
                <Col className="sqr-wrapper" md={6} xs={12} sm={12}>
                  <div className="sqr">
                    <h6>Make the payment</h6>
                    <p>
                      Make the payment According to the payment terms. In case
                      products are Customized (Made-to-order), you will pay 50%
                      before delivery and the balance after production and
                      before delivery.
                    </p>
                    <img src="https://res.cloudinary.com/azharuniversity/image/upload/v1674686012/hand_rju07y.png" alt="" />
                  </div>
                </Col>
                <Col className="sqr-wrapper" md={6} xs={12} sm={12}>
                  <div className="sqr">
                    <h6>Product Delivery</h6>
                    <p>
                      We Ship to every corner word wide. Thanks to our logistics
                      partners we are able to provide the best shipping solution
                      ensuring the best prices and delivery time. For multiple
                      suppliers orders to same place We’ll consolidate orders
                      from and deliver when required.
                    </p>
                    <img src="https://res.cloudinary.com/azharuniversity/image/upload/v1674686012/tracking_selx90.png" alt="" />
                  </div>
                </Col>
              </Row>
              </div>
            </section>
            <section id="procurement-timeline" className="lightgray-bg">
        <h5 className="bold text-center main">Work Timeline</h5>
        <p className="text-center w-50 mx-auto block second-p fw-300">
         Realize interior design project from sourcing, production to delivery
         in maximum 6 Weeks
        </p>
        <Timeline  mode="alternate"   className="mt-5">
         <Timeline.Item dot={<div className="timelinedot"></div>}>
          <p className="bold">Online sell</p>
          <p className="">
          From the European to America, gulf and chines market, Our Sales Support the selling through the ordinary website visitors buyers.
          </p>
         </Timeline.Item>
         <Timeline.Item dot={<div className="timelinedot"></div>}>
          <p className="bold">Work With Designers</p>
          <p className="">
          We work with architects, designers, and design studios worldwide, helping them to realize interior and architecture projects faster. We support the designers in all the project’s steps, from product sourcing and Creating FF&E specifications, placing orders, and communicating with manufacturers to consolidate delivery and installation on site. Once you join arch17 selling, we will use your catalogs for their project sourcing.
          </p>
         </Timeline.Item>
         <Timeline.Item dot={<div className="timelinedot"></div>}>
          <p className="bold">Property owners</p>
          <p className="">
          In co-operation with real estate developers, we offer a service and products package with special prices to their property buyers. Arch17 package includes design service, renovation, and products, furniture, lighting, and materials. We offer this package in collaboration with brands, design, and construction companies on arch17.com. The packages are optimized for two types build to live and build to rent.
          </p>
         </Timeline.Item>
        
        </Timeline>
       </section>
            </div>

        <Footer/>
        </div> );
        
    }
}
 
export default SellProducts;