import React,{Component} from "react";
import { Row,Col } from "antd";
import "./statichelp.css"
import Footer from "../../components/Footer";
class AboutArch17 extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( <>
        <div className="procurement-wrapper aboutarch">
     <div id="" className="bg-white">

         <section id="pagehead" className="py-5 text-center">
        <Row span={24} justify="center">
         <Col md={13}>
          <h5 className="aboutarch-head mb-0">
            Welcome to Arch17
          </h5>
          <p className="main-desc aboutarch-desc">The World Network for Archeticture and Interior Designers</p>
          <p className="w-300 w-80 m-auto mb-4 mt-2 fs-15 aboutarch-desc2">
          Our Mission is to create a trusted source of design information for the building industry. Where people can reach high quality and reliable Design Services and products from china and all over the world.
          </p>
       
         </Col>
        </Row>
       </section>
       <section id="sec-head" className="lightbg">
       <div
       className="wide-view">
         <Row span={24}  gutter={12} justify="space-between">
         <Col
          md={{ span: 12 }}
         >
          <p className="side-head">
          What Is arch17 Network?
          </p>
          <p className="side-p w-80 mb-4 block fs-15">
          Arch17 is a professional social network for the Architecture industry worldwide. We connect people, projects, and products, giving the users a comprehensive solution <span>to get inspired , design and shop products. </span>
          </p>
          <p className="side-p w-80">
          Arch17 network consist of four sectors, <span>Arch17 Web Portal, 17 Design Club, Arch17 Magazine and 17 Design Lab,</span> they make up an active platform where the construction industry leaders – architects, designers, Brands, and customers – interact in a stimulating way.
          </p>
         </Col>
         <Col
          md={{ span: 12 }}
          xs={{span:24}}
          sm={{span:24}}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1674525672/Arch17_network_h6pjqp.png')",
            height: "500px",
            backgroundSize:"contain"
           }}
          ></div>
         </Col>
        </Row>
       </div>

        <div className="mobile-view">
        <Row span={24}  gutter={12} justify="space-between">
         <Col
          md={{ span: 12 }}
         >
          <p className="side-head">
          What Is arch17 Network?
          </p>
         
         </Col>
         <Col
          md={{ span: 12 }}
          xs={{span:24}}
          sm={{span:24}}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1674525672/Arch17_network_h6pjqp.png')",
            height: "500px",
            backgroundSize:"contain"
           }}
          ></div>
         </Col>
         <Col sm={24} xs={24}>
         <p className="side-p w-80 mb-4 block fs-15">
          Arch17 is a professional social network for the Architecture industry worldwide. We connect people, projects, and products, giving the users a comprehensive solution to <span>get inspired , design and shop products.</span>Arch17 network consist of four sectors, <span>Arch17 Web Portal, 17 Design Club, Arch17 Magazine and 17 Design Lab,</span> they make up an active platform where the construction industry leaders <span>– architects, designers, Brands, and customers –</span> interact in a stimulating way.
          </p>
          <p className="side-p w-80">
           Our mission is to optimize the work flow for the architecture
           projects from the creative phases to production and logistics
           management ensuring the products quality and best prices.
          </p>
         </Col>
        </Row>
        </div>
        
       </section>
       <section className="about-boxes">
        <Row span={24} gutter={{lg:14,md:14, sm:10}}>
            <Col lg={12}md={12} xs={24} sm={24} className="mb-3">
                <div className="box-content lightbg">
                <h6 className="box-head">arch17<span>.com</span></h6>
                <p className="desc">The architecture & Design Web Portal.<br/>
                Source Design ideas, news and products
                </p>
                <a className="learnmore" href="/arch17com">Learn more  </a>
                <div
              className="about-image"
              style={{
                backgroundImage:
                "url('https://res.cloudinary.com/azharuniversity/image/upload/v1674525674/Mask_Group_1_weltdc.png')",
           }}
          ></div>
                </div>

            </Col>
            <Col  md={12} xs={24} sm={24} className="mb-3">
            <div className="box-content lightbg">
            <h6 className="box-head">design<span>club</span></h6>
                <p className="desc">For designers and professionals in the industry</p>
                <a className="learnmore" href="/designaccountintro">Learn more</a>
            
                <div
           className="about-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1674683392/Mockup_copy_vbkwwq.png')",
           }}
          ></div>
            </div>
            </Col>
        </Row>
        <Row className="mt-0" span={24} gutter={{lg:16,md:16, sm:1}}>
       
        <Col   md={12} xs={24} sm={24} className="mb-3">
        <div className="box-content lightbg">

                <h6 className="box-head">design<span>selected</span> </h6>
                <p className="desc">A new guid to great architecture and interior style</p>
                <a className="learnmore" href="/designselected">Learn more</a>
          
                <div
           className="about-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1674525673/magazine_kr0k0k.png')",
           }}
          ></div>
</div>
            </Col>
            <Col md={12} xs={24} sm={24} className="mb-5">
        <div className="box-content lightbg">

            <h6 className="box-head">procurement<span id="tail">service</span></h6>
               
                <p className="desc">Source, quote and purchase Design products</p>
                <a className="learnmore" href="/procurementservice">Learn more</a>
               
                <div
           className="about-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1674525672/02_g0sv36.png')",
           }}
          ></div>
          </div>
            </Col>
        </Row>
       </section>
       </div>
       </div>
       <Footer/>
        </> );
    }
}
 
export default AboutArch17;