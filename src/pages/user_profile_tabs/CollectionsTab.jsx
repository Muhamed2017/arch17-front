import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class CollectionsTab extends Component {
 constructor(props) {
  super(props);
  this.state = {};
 }
 render() {
  return (
   <div id="user-collection-tab user-tab profile-tab">
    <Container fluid>
     <Row md={{ span: 12 }}>
      {Object.values(this.props.collections)?.length > 0 ? (
       <>
        {Object.values(this.props.collections).map((collection) => {
         return (
          <>
           <Col lg={4} sm={6} xs={12} className="collection-col">
            {collection.pics.ids.length > 0 ? (
             <>
              <a href={`/usercollection/${collection.id}`}>
               <div className="collection-box">
                <div
                 className="rect rect-0"
                 style={{ backgroundImage: `url(${collection.pics.pics[0]})` }}
                ></div>
                <div
                 className="rect rect-1"
                 style={{ backgroundImage: `url(${collection.pics.pics[1]})` }}
                ></div>
                <div
                 className="rect rect-2"
                 style={{ backgroundImage: `url(${collection.pics.pics[2]})` }}
                ></div>
               </div>
               <div className="collection-text">
                <h5>{collection.name}</h5>
                <p>
                 NO Topics . Created By Creator of the collection,
                 {collection.pics.count} Products
                </p>
               </div>
              </a>
             </>
            ) : (
             <>
              <div className="collection-box">
               <div
                className="rect rect-0"
                style={{ backgroundImage: `url(${collection.pics.pics[0]})` }}
               ></div>
               <div
                className="rect rect-1"
                style={{ backgroundImage: `url(${collection.pics.pics[1]})` }}
               ></div>
               <div
                className="rect rect-2"
                style={{ backgroundImage: `url(${collection.pics.pics[2]})` }}
               ></div>
              </div>
              <div className="collection-text">
               <h5>{collection.name}</h5>
               <p>EMPTY COLLECTION</p>
              </div>
             </>
            )}
           </Col>
          </>
         );
        })}
       </>
      ) : (
       <p className="indicator py-5">You don't have any collection yet!</p>
      )}
     </Row>
    </Container>
   </div>
  );
 }
}

export default CollectionsTab;
