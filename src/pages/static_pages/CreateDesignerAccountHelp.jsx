import React, { Component } from "react";
import { Row, Col } from "antd";
import Footer from "../../components/Footer";
import "./help.css";
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
class CrateDesignerAccountHelp extends Component {
  render() {
    return (
      <>
        <div className="static-outer">
          <div className="static-page deisgner-help">
            <div className="head-section mt-0">
              <h5>
                design<span>club</span>
              </h5>
              <p>
                The world professional network for the architecture industry
              </p>
              <a href="/designeraccount" className="px-5 py-1">
                Join Now
              </a>
            </div>
            <div className="wide-view">
              <Row span={24} gutter={100} align="middle">
                <Col
                  md={{ span: 12, order: 1 }}
                  lg={{ span: 12, order: 1 }}
                  xs={{ span: 24, order: 2 }}
                  sm={{ span: 24, order: 2 }}
                  className="box"
                >
                  <h6>For Archeticts & Designers</h6>
                  <p>
                    By joining 17 design club designers and architects get
                    specified on arch17.com, allowing them to get special
                    services, obtain special pricing, showcase their work
                    online, Spread their creative ideas, connect with their team
                    and partners, and get discovered by a new client.
                  </p>
                </Col>
                <Col
                  md={{ span: 12, order: 2 }}
                  lg={{ span: 12, order: 2 }}
                  xs={{ span: 24, order: 1 }}
                  sm={{ span: 24, order: 1 }}
                  className="box"
                >
                  <div
                    className="desimgbox"
                    style={{
                      backgroundImage: `url(${img1})`,
                    }}
                  ></div>
                </Col>

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
                      backgroundImage: `url(${img2})`,
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
                  <h6>An exclusive network for architecture world.</h6>
                  <p>
                    17 design club is an exclusive membership for the
                    architects, designers, and professionals in the Architecture
                    and Design field, worldwide. The designclub allows us to
                    grow our cultural and technical patrons’ network,
                    representing the best reference for arch17.
                  </p>
                </Col>
                <Col
                  lg={{ span: 12, order: 5 }}
                  md={{ span: 12, order: 5 }}
                  xs={{ span: 24, order: 6 }}
                  sm={{ span: 24, order: 6 }}
                  className="box"
                >
                  <h6>Grow Business</h6>
                  <p>
                    The designclub allows the architecture industry leaders _
                    architects, interior designers, products designers,
                    manufacturers, decoration, construction companies, and
                    property developers _ to extend their professional network
                    and keep them connected online and offline to find new
                    partners and clients. We Also create different design
                    communities in different cities worldwide to reach the local
                    experts easily.
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
                      backgroundImage: `url(${img3})`,
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
                      backgroundImage: `url(${img4})`,
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
                  <h6>Events</h6>
                  <p>
                    17 Designclub goes beyond the web with a full calendar of
                    events, meeting tours, technical meetings, national,
                    international exhibitions, and design salons. A way to
                    stimulate the comparison with the sector experts, with the
                    emerging talents, and to transfer experience and knowledge.
                  </p>
                </Col>

                <Col
                  lg={{ span: 12, order: 9 }}
                  md={{ span: 12, order: 9 }}
                  xs={{ span: 24, order: 10 }}
                  sm={{ span: 24, order: 10 }}
                  className="box"
                >
                  <h6>Focus On Fair</h6>
                  <p>
                    The design club will have a dedicated and complete focus,
                    stand by stand-on different design fairs worldwide from the
                    design angle to allow designers and manufacturers worldwide
                    to learn more and enable the participant on these events to
                    get a better exposure beyond the fair place and time.
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
                      backgroundImage: `url(${img5})`,
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
                      backgroundImage: `url(${img6})`,
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
                  <h6>Brands-Business Orientation</h6>
                  <p>
                    With 17 designclub we empower Brands and manufacturers
                    worldwide to reach the right professional audience quickly.
                  </p>
                </Col>
              </Row>
            </div>
            <div className="mobile-view">
              <Row span={24} gutter={{ md: 100, xs: 20 }} align="top">
                <Col
                  md={{ span: 12 }}
                  lg={{ span: 12 }}
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  className="box"
                >
                  <h6>For Archeticts & Designers</h6>
                </Col>

                <Col
                  md={{ span: 12 }}
                  lg={{ span: 12 }}
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  className="box"
                >
                  <div
                    className="desimgbox"
                    style={{
                      backgroundImage: `url(${img1})`,
                    }}
                  ></div>
                </Col>
                <Col
                  md={{ span: 12 }}
                  lg={{ span: 12 }}
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  className="box mb-5"
                >
                  <p>
                    By joining 17 design club designers and architects get
                    specified on arch17.com, allowing them to get special
                    services, obtain special pricing, showcase their work
                    online, Spread their creative ideas, connect with their team
                    and partners, and get discovered by a new client.
                  </p>
                </Col>

                <Col className="box" xs={24} sm={24}>
                  <h6>An exclusive network for architecture world.</h6>
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
                      backgroundImage: `url(${img2})`,
                    }}
                  ></div>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  lg={{ span: 12 }}
                  md={{ span: 12 }}
                  className="box mb-5"
                >
                  <p>
                    17 design club is an exclusive membership for the
                    architects, designers, and professionals in the Architecture
                    and Design field, worldwide. The designclub allows us to
                    grow our cultural and technical patrons’ network,
                    representing the best reference for arch17.
                  </p>
                </Col>

                <Col xs={24} sm={24} className="box">
                  <h6>Grow Business</h6>
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
                      backgroundImage: `url(${img3})`,
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
                  <p>
                    The designclub allows the architecture industry leaders _
                    architects, interior designers, products designers,
                    manufacturers, decoration, construction companies, and
                    property developers _ to extend their professional network
                    and keep them connected online and offline to find new
                    partners and clients. We Also create different design
                    communities in different cities worldwide to reach the local
                    experts easily.
                  </p>
                </Col>

                <Col className="box" xs={24} sm={24}>
                  <h6>Events</h6>
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
                      backgroundImage: `url(${img4})`,
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
                  <p>
                    17 Designclub goes beyond the web with a full calendar of
                    events, meeting tours, technical meetings, national,
                    international exhibitions, and design salons. A way to
                    stimulate the comparison with the sector experts, with the
                    emerging talents, and to transfer experience and knowledge.
                  </p>
                </Col>

                <Col className="box" xs={24} sm={24}>
                  <h6>Focus On Fair</h6>
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
                      backgroundImage: `url(${img5})`,
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
                  <p>
                    The design club will have a dedicated and complete focus,
                    stand by stand-on different design fairs worldwide from the
                    design angle to allow designers and manufacturers worldwide
                    to learn more and enable the participant on these events to
                    get a better exposure beyond the fair place and time.
                  </p>
                </Col>

                <Col className="box" xs={24} sm={24}>
                  <h6>Brands-Business Orientation</h6>
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
                      backgroundImage: `url(${img6})`,
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
                  <p>
                    With 17 designclub we empower Brands and manufacturers
                    worldwide to reach the right professional audience quickly.
                  </p>
                </Col>
              </Row>
            </div>
            <a className="px-5 py-1 my-5" href="/designeraccount">
              Join Now
            </a>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default CrateDesignerAccountHelp;
