import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { regionNames } from "./../../redux/constants";

import { API } from "./../../utitlties";
import { Tabs } from "antd";

const { TabPane } = Tabs;

class FollwingTab extends Component {
 constructor(props) {
  super(props);
  this.state = {
   stores: [],
   companies: [],
   designers: [],
  };
 }

 componentDidMount() {
  axios.get(`${API}userfollowings/${this.props.user_id}`).then((response) => {
   console.log(response);
   this.setState({
    stores: response.data.stores_followings,
    designers: response.data.designers_followings,
    companies: response.data.companies_followings,
   });
  });
 }
 render() {
  return (
   <div id="user-collection-tab user-tab profile-tab">
    <Container fluid>
     {this.state.designers?.length +
      this.state.companies?.length +
      this.state.stores?.length >
     0 ? (
      <Tabs type="" defaultActiveKey="">
       {this.state.stores?.length > 0 && (
        <TabPane tab="Stores" key="stores">
         <Row md={{ span: 12 }} className="my-4">
          {this.state.stores.map((store) => {
           return (
            <>
             <Col lg={4} sm={6} xs={12} className="collection-col">
              <a href={`/brand/${store.id}`}>
               <div className="collection-box mb-3">
                <div
                 className="rect rect-0"
                 style={{
                  backgroundImage: `url(${store.box.pics[0]})`,
                 }}
                ></div>
                <div
                 className="rect rect-1"
                 style={{ backgroundImage: `url(${store.box.pics[1]})` }}
                ></div>
                <div
                 className="rect rect-2"
                 style={{ backgroundImage: `url(${store.box.pics[2]})` }}
                ></div>
               </div>
               <div
                className="brand-img"
                style={{
                 backgroundSize: "contain",
                 backgroundRepeat: "no-repeat",
                 backgroundImage: store.logo ? `url(${store.logo}` : "",
                 fontSize: "2rem",
                 textAlign: "center",
                 fontWeight: "600",
                }}
               >
                {!store.logo && <>{store.name[0]}</>}
               </div>
               <div className="collection-text">
                <h5>
                 {store.name}
                 <p className="py-1">
                  {`${store.type?.toUpperCase()} | ${regionNames.of(
                   store?.country
                  )}`}
                 </p>
                </h5>
               </div>
              </a>
             </Col>
            </>
           );
          })}
         </Row>
        </TabPane>
       )}
       {this.state.designers?.length + this.state.companies?.length > 0 && (
        <TabPane tab="Designers" key="designers">
         <Row md={{ span: 12 }} className="my-4">
          {this.state.designers?.map((designer, index) => {
           return (
            <>
             <Col
              lg={4}
              sm={6}
              xs={12}
              className="collection-col"
              key={designer.id + index}
             >
              <a
               href={
                designer?.type === "company"
                 ? `/company/${designer?.id}`
                 : `/user/${designer?.uid}`
               }
               className="arch-link"
               key={designer.id + index}
              >
               <div>
                <div className="collection-box mb-3">
                 <div
                  className="rect rect-0 designer-rect"
                  style={{
                   backgroundImage:
                    designer?.type === "company"
                     ? `url(${
                        designer?.box?.pics[0] ||
                        designer?.box?.projects_covers[0]?.cover
                       })`
                     : `url(${
                        designer?.box?.products_covers[0] ||
                        designer?.box?.projects[0]?.cover
                       })`,
                  }}
                 ></div>
                 <div
                  className="rect rect-1 designer-rect"
                  style={{
                   backgroundImage:
                    designer?.type === "company"
                     ? `url(${
                        designer?.box?.projects_covers[1]?.cover ||
                        designer?.box?.pics[1]
                       })`
                     : `url(${
                        designer?.box?.projects[1]?.cover ||
                        designer?.box?.products_covers[1]
                       })`,
                  }}
                 ></div>
                 <div
                  className="rect rect-2 designer-rect"
                  style={{
                   // backgroundImage: `url(${brand.box?.pics[2]})`,
                   backgroundImage:
                    designer?.type === "company"
                     ? `url(${
                        designer?.box?.projects_covers[2]?.cover ||
                        designer?.box?.pics[2]
                       })`
                     : `url(${
                        designer?.box?.projects[2]?.cover ||
                        designer?.box?.products_covers[2]
                       })`,
                  }}
                 ></div>
                </div>
                <div
                 className="brand-img"
                 style={{
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${
                   designer?.photoURL || designer?.profile
                  }`,
                  fontSize: "2rem",
                  textAlign: "center",
                  fontWeight: "600",
                 }}
                ></div>

                <div className="collection-text">
                 <h5>
                  {designer?.name ?? designer?.displayName}

                  {designer && designer?.country && (
                   <>
                    <p className="py-1">
                     {designer?.type === "company"
                      ? `Design Company | ${regionNames
                         .of(designer?.country)
                         ?.replace(/mainland/gi, "")} ,  ${
                         designer?.city ?? ""
                        }`
                      : `Designer | ${regionNames
                         .of(designer?.country)
                         ?.replace(/mainland/gi, "")} , ${
                         designer?.city ?? ""
                        }`}
                    </p>
                   </>
                  )}
                 </h5>
                 <p className="products-count"></p>
                </div>
               </div>
              </a>
             </Col>
            </>
           );
          })}

          {this.state.companies?.map((designer, index) => {
           return (
            <>
             <Col
              lg={4}
              sm={6}
              xs={12}
              className="collection-col"
              key={designer.id + index}
             >
              <a
               href={
                designer?.type === "company"
                 ? `/company/${designer?.id}`
                 : `/user/${designer?.uid}`
               }
               className="arch-link"
               key={designer.id + index}
              >
               <div>
                <div className="collection-box mb-3">
                 <div
                  className="rect rect-0 designer-rect"
                  style={{
                   backgroundImage:
                    designer?.type === "company"
                     ? `url(${
                        designer?.box?.pics[0] ||
                        designer?.box?.projects_covers[0]?.cover
                       })`
                     : `url(${
                        designer?.box?.products_covers[0] ||
                        designer?.box?.projects[0]?.cover
                       })`,
                  }}
                 ></div>
                 <div
                  className="rect rect-1 designer-rect"
                  style={{
                   backgroundImage:
                    designer?.type === "company"
                     ? `url(${
                        designer?.box?.projects_covers[1]?.cover ||
                        designer?.box?.pics[1]
                       })`
                     : `url(${
                        designer?.box?.projects[1]?.cover ||
                        designer?.box?.products_covers[1]
                       })`,
                  }}
                 ></div>
                 <div
                  className="rect rect-2 designer-rect"
                  style={{
                   backgroundImage:
                    designer?.type === "company"
                     ? `url(${
                        designer?.box?.projects_covers[2]?.cover ||
                        designer?.box?.pics[2]
                       })`
                     : `url(${
                        designer?.box?.projects[2]?.cover ||
                        designer?.box?.products_covers[2]
                       })`,
                  }}
                 ></div>
                </div>
                <div
                 className="brand-img"
                 style={{
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${
                   designer?.photoURL || designer?.profile
                  }`,
                  fontSize: "2rem",
                  textAlign: "center",
                  fontWeight: "600",
                 }}
                ></div>

                <div className="collection-text">
                 <h5>
                  {designer?.name ?? designer?.displayName}

                  {designer && designer?.country && (
                   <>
                    <p className="py-1">
                     {designer?.type === "company"
                      ? `Design Company | ${regionNames
                         .of(designer?.country)
                         ?.replace(/mainland/gi, "")} ,  ${
                         designer?.city ?? ""
                        }`
                      : `Designer | ${regionNames
                         .of(designer?.country)
                         ?.replace(/mainland/gi, "")} , ${
                         designer?.city ?? ""
                        }`}
                    </p>
                   </>
                  )}
                 </h5>
                 <p className="products-count"></p>
                </div>
               </div>
              </a>
             </Col>
            </>
           );
          })}
         </Row>
        </TabPane>
       )}
      </Tabs>
     ) : (
      <p className="indicator py-5">You're not following any store yet</p>
     )}

     {/* <Row md={{ span: 12 }}>
      {this.state.stores?.length +
       this.state.designers?.length +
       this.state.companies?.length >
      0 ? (
       <>
        {this.state.stores?.length > 0 && (
         <>
          {this.state.stores.map((store) => {
           return (
            <>
             <Col lg={4} sm={6} xs={12} className="collection-col">
              <a href={`/brand/${store.id}`}>
               <div className="collection-box mb-3">
                <div
                 className="rect rect-0"
                 style={{
                  backgroundImage: `url(${store.box.pics[0]})`,
                 }}
                ></div>
                <div
                 className="rect rect-1"
                 style={{ backgroundImage: `url(${store.box.pics[1]})` }}
                ></div>
                <div
                 className="rect rect-2"
                 style={{ backgroundImage: `url(${store.box.pics[2]})` }}
                ></div>
               </div>
               <div
                className="brand-img"
                style={{
                 backgroundSize: "contain",
                 backgroundRepeat: "no-repeat",
                 backgroundImage: store.logo ? `url(${store.logo}` : "",
                 fontSize: "2rem",
                 textAlign: "center",
                 fontWeight: "600",
                }}
               >
                {!store.logo && <>{store.name[0]}</>}
               </div>
               <div className="collection-text">
                <h5>
                 {store.name}
                 <p className="py-1">
                  {`${store.type?.toUpperCase()} | ${regionNames.of(
                   store?.country
                  )}`}
                 </p>
                </h5>
               </div>
              </a>
             </Col>
            </>
           );
          })}
         </>
        )}

        {this.state.designers?.map((designer, index) => {
         return (
          <>
           <Col
            lg={4}
            sm={6}
            xs={12}
            className="collection-col"
            key={designer.id + index}
           >
            <a
             href={
              designer?.type === "company"
               ? `/company/${designer?.id}`
               : `/user/${designer?.uid}`
             }
             className="arch-link"
             key={designer.id + index}
            >
             <div>
              <div className="collection-box mb-3">
               <div
                className="rect rect-0 designer-rect"
                style={{
                 backgroundImage:
                  designer?.type === "company"
                   ? `url(${
                      designer?.box?.pics[0] ||
                      designer?.box?.projects_covers[0]?.cover
                     })`
                   : `url(${
                      designer?.box?.products_covers[0] ||
                      designer?.box?.projects[0]?.cover
                     })`,
                }}
               ></div>
               <div
                className="rect rect-1 designer-rect"
                style={{
                 backgroundImage:
                  designer?.type === "company"
                   ? `url(${
                      designer?.box?.projects_covers[1]?.cover ||
                      designer?.box?.pics[1]
                     })`
                   : `url(${
                      designer?.box?.projects[1]?.cover ||
                      designer?.box?.products_covers[1]
                     })`,
                }}
               ></div>
               <div
                className="rect rect-2 designer-rect"
                style={{
                 backgroundImage:
                  designer?.type === "company"
                   ? `url(${
                      designer?.box?.projects_covers[2]?.cover ||
                      designer?.box?.pics[2]
                     })`
                   : `url(${
                      designer?.box?.projects[2]?.cover ||
                      designer?.box?.products_covers[2]
                     })`,
                }}
               ></div>
              </div>
              <div
               className="brand-img"
               style={{
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${
                 designer?.photoURL || designer?.profile
                }`,
                fontSize: "2rem",
                textAlign: "center",
                fontWeight: "600",
               }}
              ></div>
              <div className="collection-text">
               <h5>
                {designer?.name ?? designer?.displayName}

                {designer && designer?.country && (
                 <>
                  <p className="py-1">
                   {designer?.type === "company"
                    ? `Design Company | ${regionNames
                       .of(designer?.country)
                       ?.replace(/mainland/gi, "")} ,  ${designer?.city ?? ""}`
                    : `Designer | ${regionNames
                       .of(designer?.country)
                       ?.replace(/mainland/gi, "")} , ${designer?.city ?? ""}`}
                  </p>
                 </>
                )}
               </h5>
               <p className="products-count"></p>
              </div>
             </div>
            </a>
           </Col>
          </>
         );
        })}
        {this.state.companies?.map((designer, index) => {
         return (
          <>
           <Col
            lg={4}
            sm={6}
            xs={12}
            className="collection-col"
            key={designer.id + index}
           >
            <a
             href={
              designer?.type === "company"
               ? `/company/${designer?.id}`
               : `/user/${designer?.uid}`
             }
             className="arch-link"
             key={designer.id + index}
            >
             <div>
              <div className="collection-box mb-3">
               <div
                className="rect rect-0 designer-rect"
                style={{
                 backgroundImage:
                  designer?.type === "company"
                   ? `url(${
                      designer?.box?.pics[0] ||
                      designer?.box?.projects_covers[0]?.cover
                     })`
                   : `url(${
                      designer?.box?.products_covers[0] ||
                      designer?.box?.projects[0]?.cover
                     })`,
                }}
               ></div>
               <div
                className="rect rect-1 designer-rect"
                style={{
                 backgroundImage:
                  designer?.type === "company"
                   ? `url(${
                      designer?.box?.projects_covers[1]?.cover ||
                      designer?.box?.pics[1]
                     })`
                   : `url(${
                      designer?.box?.projects[1]?.cover ||
                      designer?.box?.products_covers[1]
                     })`,
                }}
               ></div>
               <div
                className="rect rect-2 designer-rect"
                style={{
                 // backgroundImage: `url(${brand.box?.pics[2]})`,
                 backgroundImage:
                  designer?.type === "company"
                   ? `url(${
                      designer?.box?.projects_covers[2]?.cover ||
                      designer?.box?.pics[2]
                     })`
                   : `url(${
                      designer?.box?.projects[2]?.cover ||
                      designer?.box?.products_covers[2]
                     })`,
                }}
               ></div>
              </div>
              <div
               className="brand-img"
               style={{
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${
                 designer?.photoURL || designer?.profile
                }`,
                fontSize: "2rem",
                textAlign: "center",
                fontWeight: "600",
               }}
              ></div>
              <div className="collection-text">
               <h5>
                {designer?.name ?? designer?.displayName}

                {designer && designer?.country && (
                 <>
                  <p className="py-1">
                   {designer?.type === "company"
                    ? `Design Company | ${regionNames
                       .of(designer?.country)
                       ?.replace(/mainland/gi, "")} ,  ${designer?.city ?? ""}`
                    : `Designer | ${regionNames
                       .of(designer?.country)
                       ?.replace(/mainland/gi, "")} , ${designer?.city ?? ""}`}
                  </p>
                 </>
                )}
               </h5>
               <p className="products-count"></p>
              </div>
             </div>
            </a>
           </Col>
          </>
         );
        })}
       </>
      ) : (
       <>
        <p className="indicator py-5">You're not following any store yet</p>
       </>
      )}
     </Row> */}
    </Container>
   </div>
  );
 }
}

export default FollwingTab;
