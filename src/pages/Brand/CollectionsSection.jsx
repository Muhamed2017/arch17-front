import React, { Component ,createRef} from "react";
import { Row, Col } from "antd";
import * as htmlToImage from 'html-to-image';
import axios from 'axios'
import { API } from "../../utitlties";


class CollectionsSection extends Component {
 constructor(props) {
  super(props);
  this.domEl= createRef()

  this.state = {
   collections: this.props.collections,
   LessCollections: this.props.collections?.slice(0, 4),
   expand: false,
  };
 }
 switchExpand = () => {
  this.setState({
   expand: !this.state.expand,
  });
 };
 filter =(node) => {
    return (node.tagName !== 'button');
  }
   setCollectionPreviewForShare = (id, rect_0, rect_1, rect_2) => {
    this.setState({
      rect_0,
      rect_1,
      rect_2,
    }, async ()=>{
     const dataBlob = await htmlToImage.toBlob(this.domEl.current);
  
      const fd = new FormData()
      fd.append('cover', dataBlob)
      axios.post(`${API}collection-cover/${id}`, fd).then((res)=>{
            console.log(res)
          })
   
      console.log(dataBlob)
    })
  
   
  }

 render() {
  return (
   <>
    <>
     <div className="wide-view">
      <Row span={24} gutter={{ lg: 25, md: 25, sm: 8, xs: 8 }} className="">
       <Col md={24} sm={24} xs={24}>
        <h6 className="">Collections</h6>
       </Col>
       {this.state.collections?.map((col, index) => {
        return (
         <Col
          lg={8}
          md={8}
          sm={12}
          xs={12}
          className="collection-col"
          key={index}
         >
          <a href={`/collection/${col.id}`} className="arch-link">
           <div>
            <div className="collection-box">
             <div
              className="rect rect-0"
              style={{
               backgroundImage: `url(${col.products.products_info.pics[0]})`,
              }}
             ></div>
             <div
              className="rect rect-1"
              style={{
               backgroundImage: `url(${col.products.products_info.pics[1]})`,
              }}
             ></div>
             <div
              className="rect rect-2"
              style={{
               backgroundImage: `url(${col.products.products_info.pics[2]})`,
              }}
             ></div>
              {/* <button
                    className="sharebtn"
                    onClick={(e) => {
                     e.preventDefault();
                     this.setState(
                      {
                    //    shareUrl: `https://www.arch17.com/${this.props?.creator_name?.replaceAll(" ","")}/${collection?.name?.replaceAll(" ","")}/${collection.id}`,
                       col,
                    //    sharable: "folder",
                      },
                      () => {
                       this.setCollectionPreviewForShare(col.id, col.products.products_info.pics[0], col.products.products_info.pics[1],col.products.products_info.pics[2])
                    //    this.openShareModal();

                      }
                     );
                    }}
                   >
                    Share
                   </button> */}
            </div>
            <div className="collection-text">
             {col.collection_name}
             <p className="products-count">{col.products.count} Products</p>
            </div>
           </div>
          </a>
         </Col>
        );
       })}
      </Row>
     </div>
     <div className="mobile-view">
      <Row span={24} gutter={{ lg: 25, md: 25, sm: 8, xs: 8 }} className="">
       <Col md={24} sm={24} xs={24}>
        <h6 className="">Collections</h6>
       </Col>
       {this.state.expand ? (
        <>
         {this.state.collections?.map((col, index) => {
          return (
           <Col
            lg={8}
            md={8}
            sm={12}
            xs={12}
            className="collection-col"
            key={index}
           >
            <a href={`/collection/${col.id}`} className="arch-link">
             <div>
              <div className="collection-box">
               <div
                className="rect rect-0"
                style={{
                 backgroundImage: `url(${col.products.products_info.pics[0]})`,
                }}
               ></div>
               <div
                className="rect rect-1"
                style={{
                 backgroundImage: `url(${col.products.products_info.pics[1]})`,
                }}
               ></div>
               <div
                className="rect rect-2"
                style={{
                 backgroundImage: `url(${col.products.products_info.pics[2]})`,
                }}
               ></div>
              </div>
              <div className="collection-text">
               {col.collection_name}
               <p className="products-count">{col.products.count} Products</p>
              </div>
             </div>
            </a>
           </Col>
          );
         })}
        </>
       ) : (
        <>
         {this.state.LessCollections?.map((col, index) => {
          return (
           <Col
            lg={8}
            md={8}
            sm={12}
            xs={12}
            className="collection-col"
            key={index}
           >
            <a href={`/collection/${col.id}`} className="arch-link">
             <div>
              <div className="collection-box">
               <div
                className="rect rect-0"
                style={{
                 backgroundImage: `url(${col.products.products_info.pics[0]})`,
                }}
               ></div>
               <div
                className="rect rect-1"
                style={{
                 backgroundImage: `url(${col.products.products_info.pics[1]})`,
                }}
               ></div>
               <div
                className="rect rect-2"
                style={{
                 backgroundImage: `url(${col.products.products_info.pics[2]})`,
                }}
               ></div>
              </div>
              <div className="collection-text">
               {col.collection_name}
               <p className="products-count">{col.products.count} Products</p>
              </div>
             </div>
            </a>
           </Col>
          );
         })}
        </>
       )}
      </Row>
      {this.state.collections?.length > 4 && (
       <p className="switch-expand" onClick={this.switchExpand}>
        {this.state.expand ? "SEE LESS" : "SEE MORE"}
       </p>
      )}
     </div>
    </>
     {/* share preview collection cover */}
     <>
    <div className="py-2" 
      style={{
        width:"600px",
        height:"315px",
        background:"#fff",
        position:"sticky",
        zIndex:-2
      }}
    ref={this.domEl} 
    >
    <div className="collection-box sects"
   
    style={{
      // height:"100%",
      paddingTop:"unset"
    }}
    >
                   <div
                    className="sect sect-0"
                    style={{
                     backgroundImage: `url(${this.state.rect_0})`,
                     backgroundSize:"cover"
                    }}
                   >
                    <div className="lyr"></div>
                   </div>
                   <div
                    className="sect sect-1"
                    style={{
                     backgroundImage: `url(${this.state.rect_1})`,
                     backgroundSize:"cover"

                    }}
                   >
                    <div className="lyr"></div>
                   </div>
                   <div
                    className="sect sect-2"
                    style={{
                     backgroundImage: `url(${this.state.rect_2})`,
                     backgroundSize:"cover"

                    }}
                   >
                    <div className="lyr"></div>
                   </div>
    </div>
    </div>
    </>
   </>
  );
 }
}

export default CollectionsSection;
