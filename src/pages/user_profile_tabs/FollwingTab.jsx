import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class FollwingTab extends Component {
 constructor(props) {
  super(props);
  this.state = {};
 }
 render() {
  return (
   <div id="user-collection-tab user-tab profile-tab">
    <Container fluid>
     <Row md={{ span: 12 }}>
      {this.props.followed_stores.length > 0 ? (
       <>
        {this.props.followed_stores?.length > 0 && (
         <>
          {this.props.followed_stores.map((store) => {
           return (
            <>
             <Col lg={4} sm={6} xs={12} className="collection-col">
              <a href={`/brand/${store.id}`}>
               <div className="collection-box">
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
                <h5>{store.name}</h5>
                {`${store.type}, ${store.products.length} products`}
               </div>
              </a>
             </Col>
            </>
           );
          })}
         </>
        )}
       </>
      ) : (
       <>
        <p className="indicator py-5">You're not following any store yet</p>
       </>
      )}
     </Row>
    </Container>
   </div>
  );
 }
}

export default FollwingTab;
