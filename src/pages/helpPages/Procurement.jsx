import React, { Component, createRef } from "react";
import { Row, Col, Carousel, Timeline } from "antd";
import { MdOutlineDesignServices } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/ti";
import "./Procurement.css";
class Procurement extends Component {
 constructor(props) {
  super(props);
  this.procurementCarousel = createRef();
  this.state = {
   slideIndex: 0,
  };
 }
 onChange = (e) => {
  console.log(e);
  this.setState({
   slideIndex: e,
  });
 };
 next = () => {
  this.procurementCarousel.current.next();
 };
 prev = () => {
  this.procurementCarousel.current.prev();
 };

 render() {
  return (
   <>
    <div id="procurement" className="bg-white">
     <div className="hepl-container">
      <section id="pagehead" className="py-5 text-center">
       <Row span={24} justify="center">
        <Col md={12}>
         <h5 className="main-head">Arch17</h5>
         <h5 className="main-head">Procurement service</h5>
         <p className="w-900">Source, quote and purchase Design product</p>
         <p className="w-400 w-90 m-auto my-4">
          Sourcing architecture products from the finest manufacturers in china
          is made easier and faster with Arch17. From Furniture, Decor and Rug
          to Materials, Lighting and construction products. We offer you a
          comprehensive procurement service from product sousing, purchasing,
          and shipping.
         </p>
         <Row span={24} gutter={12} className="btns">
          <Col md={8}>
           <div className="bg-black py-2 px-0 radius-5">Start New Project</div>
          </Col>
          <Col md={8}>
           <div className="py-2 px-0 decorated">Download full introduction</div>
          </Col>
          <Col md={8}>
           <div className="py-2 decorated">Contact us</div>
          </Col>
         </Row>
        </Col>
       </Row>
      </section>
      <section id="sec-head">
       <Row span={24} justify="space-between">
        <Col md={12}>
         <div
          style={{
           backgroundImage:
            "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654122398/main-04_qfe12u.jpg)",
           width: "450px",
           height: "450px",
           //    background: "#00F",
          }}
         ></div>
        </Col>
        <Col md={12}>
         <p className="side-head">Comprehensive Design & Purchasing service.</p>
         <p className="side-p w-80 mb-4 block">
          We offer design companies and customers around the world a
          comprehensive service from products sourcing, procurement and manage
          delivery.
         </p>
         <p className="side-p w-80">
          Our mission is to optimize the work flow for the architecture projects
          from the creative phases to production and logistics management
          ensuring the products quality and best prices.
         </p>
        </Col>
       </Row>
      </section>
      <section className="lightgray-bg">
       <Row justify="center">
        <Col md={15}>
         <p className="bold sec-head">
          Arch17 backed with a team of designers, logistics and experts in the
          industry, and we are ready to deliver different level of creative and
          procurement services for designers and end client between them and you
          can choose where you need our support
         </p>
        </Col>
       </Row>
       <Row span={24} justify="center" className="text-center mt-5">
        <Col md={8}>
         <div className="section-box">
          <p className="bold">Products sourcing</p>
          <p>
           You have a ready design. We can help you or your designer source
           design products for your projects, and create FF&E specification, and
           keep it on time and budget.
          </p>
         </div>
        </Col>
        <Col md={8}>
         <div className="section-box">
          <p className="bold">Interior Styling</p>
          <p color="#6c6c6c">
           From decorative accessories to rug and window-dressing, our creative
           team can help you to create a great space according to your style.
          </p>
         </div>
        </Col>
        <Col md={8}>
         <div className="section-box">
          <p className="bold">Design services</p>
          <p>
           You have an empty space and start from scratch. Our team can put
           together product options and create floor plans for your projects.
          </p>
         </div>
        </Col>
        <Col md={8}>
         <div className="section-box">
          <p className="bold">Accessories and OS&E Package</p>
          <p>
           From Appliances, to Cutlery, Kitchenware, and Bathroom Accessories
           Arch17 can offers a package according to your OS&E budget for home,
           office, and hotel.
          </p>
         </div>
        </Col>
        <Col md={8}>
         <div className="section-box">
          <p className="bold">Consolidated delivery</p>
          <p>
           With best shipping prices, We’ll consolidate orders from multiple
           suppliers and deliver when required.
          </p>
         </div>
        </Col>
        <Col md={8}>
         <div className="section-box">
          <p className="bold">Installation</p>
          <p>
           Our project managers will communicate with local installation workers
           and supervise them to install all products on site.
          </p>
         </div>
        </Col>
       </Row>
      </section>
      <section>
       <Row span={24} gutter={10} justify="center" align="stretch">
        <Col md={12}>
         <div
          style={{
           backgroundImage:
            "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654122398/main-04_qfe12u.jpg)",
           width: "450px",
           height: "450px",
           //    background: "#00F",
          }}
         ></div>
        </Col>
        <Col md={12}>
         <p className="bold side-head">
          Reach reliable High-quality design brands with affordable prices in
          china.
         </p>
         <p className="side-p w-80 mb-4 block">
          Instead of going online and struggling to communicate with Chinese
          suppliers, we made it easier for the designers to find and order
          design products, furniture, lighting and materials from China. All the
          brands on Arch17 are vetted and only high quality and original design
          products are listed.
         </p>
         <ul className="w-500">
          <li>Unique Designs</li>
          <li>Fine Materials</li>
          <li>Affordable Prices</li>
         </ul>
        </Col>
        <Col md={12}>
         <p className="bold side-head">Authorized seller</p>
         <p className="side-p w-80 mb-4 block">
          Arch17 is authorized seller and legal representative of over 300 high
          quality architecture products manufacturers and brands in china from
          furniture decoration and construction materials.
         </p>
        </Col>
        <Col md={12}>
         <div
          style={{
           width: "450px",
           height: "450px",
           //    background: "#00F",
          }}
         ></div>
        </Col>
       </Row>
      </section>
      <section id="products-grid" className="lightgray-bg">
       <h5 className="bold text-center">
        Comprehensive product sourcing & procurement.
       </h5>
       <p className="text-center w-50 mx-auto block second-p">
        Acrh17 offer architecture products from multi brands and manufacturer,
        furniture, lighting, decor, finishes materials and more.
       </p>
       <div id="inner-grid" className="mt-5">
        <Row className="center mb-30" gutter={30}>
         <Col flex={1 / 5}>
          <div
           className="grid-box"
           style={{
            backgroundImage:
             "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654227280/Group_871_gwpacq.png)",
           }}
          >
           <p className="image-text">Living Furniture</p>
          </div>
         </Col>
         <Col flex={1 / 5}>
          <div
           className="grid-box"
           style={{
            backgroundImage:
             "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654227275/Group_880_ott71z.png)",
           }}
          >
           <p className="image-text">Contract Furniture</p>
          </div>
         </Col>
         <Col flex={1 / 5}>
          <div
           className="grid-box"
           style={{
            backgroundImage:
             "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654227266/Group_890_yvvcdi.png)",
           }}
          >
           <p className="image-text">Office Furniture</p>
          </div>
         </Col>
         <Col flex={1 / 5}>
          <div
           className="grid-box"
           style={{
            backgroundImage:
             "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654227275/Group_904_sfle3g.png)",
           }}
          >
           <p className="image-text">Decor</p>
          </div>
         </Col>
         <Col flex={1 / 5}>
          <div
           className="grid-box"
           style={{
            backgroundImage:
             "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654227280/Group_897_edcnal.png)",
           }}
          >
           <p className="image-text">Outdoor Furniture</p>
          </div>
         </Col>
        </Row>
        <Row className="center mb-30" gutter={30}>
         <Col flex={1 / 5}>
          <div
           className="grid-box"
           style={{
            backgroundImage:
             "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654227280/Group_897_edcnal.png)",
           }}
          >
           <p className="image-text">Rug</p>
          </div>
         </Col>
         <Col flex={1 / 5}>
          <div
           className="grid-box"
           style={{
            backgroundImage:
             "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654227283/Group_912_qndout.png)",
           }}
          >
           <p className="image-text">Carpet Tiles</p>
          </div>
         </Col>
         <Col flex={1 / 5}>
          <div
           className="grid-box"
           style={{
            backgroundImage:
             "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654227298/Group_918_w5mdwq.png)",
           }}
          >
           <p className="image-text">Curtains</p>
          </div>
         </Col>
         <Col flex={1 / 5}>
          <div
           className="grid-box"
           style={{
            backgroundImage:
             "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654227292/Group_925_ceu1zz.png)",
           }}
          >
           <p className="image-text">Architecture Lighting</p>
          </div>
         </Col>
         <Col flex={1 / 5}>
          <div
           className="grid-box"
           style={{
            backgroundImage:
             "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654227297/Group_959_wmeegp.png)",
           }}
          >
           <p className="image-text">Decoration Lighting</p>
          </div>
         </Col>
        </Row>
        <Row className="center mb-30" gutter={30}>
         <Col flex={1 / 5}>
          <div
           className="grid-box"
           style={{
            backgroundImage:
             "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654227296/Group_968_s6nn1y.png)",
           }}
          >
           <p className="image-text">Acoustic Panels</p>
          </div>
         </Col>
         <Col flex={1 / 5}>
          <div
           className="grid-box"
           style={{
            backgroundImage:
             "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654227290/Group_950_pgofuf.png)",
           }}
          >
           <p className="image-text">PVC Flooring</p>
          </div>
         </Col>
         <Col flex={1 / 5}>
          <div
           className="grid-box"
           style={{
            backgroundImage:
             "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654227293/Group_941_pu7yz8.png)",
           }}
          >
           <p className="image-text">Ceramic & Porcelain Tiles</p>
          </div>
         </Col>
         <Col flex={1 / 5}>
          <div
           className="grid-box"
           style={{
            backgroundImage:
             "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654227284/Group_931_uy2opc.png)",
           }}
          >
           <p className="image-text">Bathroom</p>
          </div>
         </Col>
         <Col flex={1 / 5}>
          <div
           className="grid-box"
           style={{
            backgroundImage:
             "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654227302/Group_977_uwdf2i.png)",
           }}
          >
           <p className="image-text">Kitchen</p>
          </div>
         </Col>
        </Row>
       </div>
       <p className="bold underline dwnld text-center">
        Download complete catalogues
       </p>
      </section>
      <section>
       <Row span={24}>
        <Col md={12}>
         <p className="bold side-head">
          Need to customize products according to your design, We got you
          covered
         </p>
         <p className="side-p w-80">
          If you need to customize furniture or lighting products we will help
          you to manufacture your designs carefully according to your
          specifications, Design, Size and materials. Our team will take care of
          everything from Quotation, specifications to production ensuring the
          production alignment with your requirements before delivery.
         </p>
        </Col>
        <Col md={12}>
         <div
          style={{
           backgroundImage:
            "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654122398/main-04_qfe12u.jpg)",
           width: "450px",
           height: "450px",
           //    background: "#00F",
          }}
         ></div>
        </Col>
        <Col md={12}>
         <div
          style={{
           backgroundImage:
            "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654122398/main-04_qfe12u.jpg)",
           width: "450px",
           height: "450px",
           //    background: "#00F",
          }}
         ></div>
        </Col>
        <Col md={12}>
         <p className="bold side-head">Kitchen Design & Manufactry</p>
         <p className="side-p w-80">
          We help you to design and Manufactory kitchen With the finest
          materials and accessories, rugs materials and hardware per your choice
          from world best brands Half, Bloom Request Kitchen Quote
         </p>
        </Col>
       </Row>
      </section>
      <section>
       <h5 className="text-center">Arch17 Procurement Service Features</h5>
       <p className="text-center w-50 mx-auto mb-5 block second-p">
        Arch17 offer a reliable service covers all your needs before and after
        sellInsuring Production and delivery quality and best prices
       </p>
       <Row span={24} className="mt-4 pt-5">
        <Col md={12}>
         <div
          style={{
           backgroundImage:
            "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654122398/main-04_qfe12u.jpg)",
           width: "450px",
           height: "450px",
           //    background: "#00F",
          }}
         ></div>
        </Col>
        <Col md={12}>
         <p className="bold side-head">Pricing policy</p>
         <p className="side-p w-80 block">
          As arch17 authorized seller of the manufacturers and brands. It allow
          us to offer the exact factory price without add-on, Moreover since we
          could provide products from multi brands we have the capability to
          offer special prices for an inter project.
         </p>
        </Col>

        <Col md={12}>
         <p className="bold side-head">Budget engineering</p>
         <p className="side-p w-80 block">
          You have a set budget for your project. Let our team find the best
          high-quality items and negotiate prices with multi-brands for you
          keeping the inter project within your budget.
         </p>
        </Col>
        <Col md={12}>
         <div
          style={{
           backgroundImage:
            "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654122398/main-04_qfe12u.jpg)",
           width: "450px",
           height: "450px",
           //    background: "#00F",
          }}
         ></div>
        </Col>
        <Col md={12}>
         <div
          style={{
           backgroundImage:
            "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654122398/main-04_qfe12u.jpg)",
           width: "450px",
           height: "450px",
           //    background: "#00F",
          }}
         ></div>
        </Col>
        <Col md={12}>
         <p className="bold side-head">Quality Control</p>
         <p className="side-p w-80 block">
          Our team follow up with the multi manufacturing within and after the
          production to ensure the products quality and the alignment with the
          designers/clients, specification and before packaging we provide a
          full inspection for all the products with photos and videos and after
          the client confirmation, we follow up with products packaging to
          ensure the safe delivery.
         </p>
        </Col>
        <Col md={12}>
         <p className="bold side-head">On Book of warranty</p>
         <p className="side-p w-80 block">
          Weather you are buying single item or buying from multi-manufactory
          for an inter project arch17 offer you one book or warranty for all the
          items and arch17 will be always your one point of contact to
          communicate with all the manufactories.
         </p>
        </Col>
        <Col md={12}>
         <div
          style={{
           backgroundImage:
            "url(https://res.cloudinary.com/azharuniversity/image/upload/v1654122398/main-04_qfe12u.jpg)",
           width: "450px",
           height: "450px",
           //    background: "#00F",
          }}
         ></div>
        </Col>
       </Row>
      </section>
      <section id="procurement-slider">
       <p className="bold text-center fs-2">Cases Overview</p>
       <Carousel
        ref={this.procurementCarousel}
        autoplay
        afterChange={this.onChange}
        dots={false}
       >
        <div className="slide text-center">
         <div
          className="slide-img"
          style={{
           backgroundImage: `url(https://res.cloudinary.com/azharuniversity/image/upload/v1654119849/Screen_Shot_2022-05-29_at_11.04.54_s9anxx.png)`,
          }}
         ></div>
         <p className="bold"> Hospitality </p>
         <p> Pokaren Hotel . Guangzhou . Furniture by lightspace</p>
        </div>
        <div className="slide">
         <div
          className="slide-img"
          style={{
           backgroundImage: `url(https://res.cloudinary.com/azharuniversity/image/upload/v1654119741/Screen_Shot_2022-05-29_at_11.05.00_uygjzt.png)`,
          }}
         ></div>
         <p className="bold"> Hospitality2 </p>
         <p> Pokaren Hotel . Guangzhou . Furniture by lightspace</p>
        </div>
        <div className="slide">
         <div
          className="slide-img"
          style={{
           backgroundImage: `url(https://res.cloudinary.com/azharuniversity/image/upload/v1654119784/Screen_Shot_2022-05-29_at_11.05.12_rdyyzk.png)`,
          }}
         ></div>
         <p className="bold"> Hospitality3 </p>
         <p> Pokaren Hotel . Guangzhou . Furniture by lightspace</p>
        </div>
        <div className="slide">
         <div
          className="slide-img"
          style={{
           backgroundImage: `url(https://res.cloudinary.com/azharuniversity/image/upload/v1654119846/Screen_Shot_2022-05-29_at_11.05.20_i6o0i8.png)`,
          }}
         ></div>
         <p className="bold"> Hospitality4 </p>
         <p> Pokaren Hotel . Guangzhou . Furniture by lightspace</p>{" "}
        </div>
        <div className="slide">
         <div
          className="slide-img"
          style={{
           backgroundImage: `url(https://res.cloudinary.com/azharuniversity/image/upload/v1654119881/Screen_Shot_2022-05-29_at_11.05.24_gvuje4.png)`,
          }}
         ></div>
         <p className="bold"> Hospitality5 </p>
         <p> Pokaren Hotel . Guangzhou . Furniture by lightspace</p>{" "}
        </div>
        <div className="slide">
         <div
          className="slide-img"
          style={{
           backgroundImage: `url(https://res.cloudinary.com/azharuniversity/image/upload/v1654120497/Screen_Shot_2022-05-29_at_11.05.30_zofkbh.png)`,
          }}
         ></div>
         <p className="bold"> Hospitality6 </p>
         <p> Pokaren Hotel . Guangzhou . Furniture by lightspace</p>{" "}
        </div>
        <div className="slide">
         <div
          className="slide-img"
          style={{
           backgroundImage: `url(https://res.cloudinary.com/azharuniversity/image/upload/v1654119848/Screen_Shot_2022-05-29_at_11.05.35_eed2ep.png)`,
          }}
         ></div>
         <p className="bold"> Hospitality7 </p>
         <p> Pokaren Hotel . Guangzhou . Furniture by lightspace</p>{" "}
        </div>
        <div className="slide">
         <div
          className="slide-img"
          style={{
           backgroundImage: `url(https://res.cloudinary.com/azharuniversity/image/upload/v1654119915/Screen_Shot_2022-05-29_at_11.05.42_ogtypr.png)`,
          }}
         ></div>
         <p className="bold"> Hospitality8 </p>
         <p> Pokaren Hotel . Guangzhou . Furniture by lightspace</p>{" "}
        </div>
        <div className="slide">
         <div
          className="slide-img"
          style={{
           backgroundImage: `url(https://res.cloudinary.com/azharuniversity/image/upload/v1654119914/Screen_Shot_2022-05-29_at_11.05.47_amcauh.png)`,
          }}
         ></div>
         <p className="bold"> Hospitality9 </p>
         <p> Pokaren Hotel . Guangzhou . Furniture by lightspace</p>{" "}
        </div>
        <div className="slide">
         <div
          className="slide-img"
          style={{
           backgroundImage: `url(https://res.cloudinary.com/azharuniversity/image/upload/v1654120647/Screen_Shot_2022-05-29_at_11.05.53_cokkbu.png)`,
          }}
         ></div>
         <p className="bold"> Hospitality10 </p>
         <p> Pokaren Hotel . Guangzhou . Furniture by lightspace</p>{" "}
        </div>
       </Carousel>
       <p className="w-100 block text-center bold mt-4">
        {this.state.slideIndex + 1} / 10
       </p>
       <button className="next" onClick={this.next}>
        Next
       </button>
       <button className="previuos" onClick={this.prev}>
        Previous
       </button>
      </section>
      <section id="procurement-timeline" className="lightgray-bg">
       <h5 className="bold text-center">Work Timeline</h5>
       <p className="text-center w-50 mx-auto block second-p">
        Realize interior design project from sourcing, production to delivery in
        maximum 6 Weeks
       </p>
       <Timeline mode="alternate" className="mt-5">
        <Timeline.Item dot={<div className="timelinedot"></div>}>
         <p className="bold">Receive your Request</p>
         <p className="">
          Communicate with our team through the platform contact channels to
          provide us your project info and requirements
         </p>
        </Timeline.Item>
        <Timeline.Item dot={<div className="timelinedot"></div>}>
         <p className="bold">Source & Quotation 5 Days</p>
         <p className="">
          Communicate with our team through the platform contact channels to
          provide us your project info and requirements
         </p>
        </Timeline.Item>
        <Timeline.Item dot={<div className="timelinedot"></div>}>
         <p className="bold">Prepare & Send Materials Samples 3 - 5 days</p>
         <p className="">
          Prepare the material samples and create a design mood board based on
          the materials and products images
         </p>
        </Timeline.Item>
        <Timeline.Item dot={<div className="timelinedot"></div>}>
         <p className="bold">Production 5 - 30 days</p>
         <p className="">
          After paying the 50% deposit, the brands will start to produce the
          products based on your requirements. In case you choose products in
          stock, it will take up to 5 days only.
         </p>
        </Timeline.Item>
        <Timeline.Item dot={<div className="timelinedot"></div>}>
         <p className="bold">Products Inspection 3 days</p>
         <p className="">
          Our team will inspect the details of the product and send images and
          video for the final product to let designers confirm before delivery
         </p>
        </Timeline.Item>
        <Timeline.Item dot={<div className="timelinedot"></div>}>
         <p className="bold">Collect and Deliver 2 days</p>
         <p className="">
          Collect the products from multi companies and brands and prepare them
          for shipping FOB, CIF, Door to Door depends on your required shipping
          methods.
         </p>
        </Timeline.Item>
       </Timeline>
      </section>
      <section>
       <p className="fs-3 bold">
        Need start a new project or more informations? Get in touch with our
        team
       </p>
       <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit impedit
        neque nihil cupiditate nobis vero veniam accusamus quos, quis explicabo.
       </p>
      </section>
     </div>
    </div>
   </>
  );
 }
}

// Need to start a new project or, more
// Informations? Get in touch with our team.

// Contact us via live chat, WhatsApp, WeChat, Phone: +86 185 7599 9560 or fill out the form and we will get back to you as soon as possible.
export default Procurement;
