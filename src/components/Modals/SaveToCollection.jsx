import {
 Form,
 Space,
 Col,
 Row,
 Button,
 Input,
 Divider,
 Spin,
 notification,
} from "antd";
import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "antd-country-phone-input/dist/index.css";
import "flagpack/dist/flagpack.css";
import axios from "axios";
import { connect } from "react-redux";
// import {A}
import { VscFolder, VscFolderActive } from "react-icons/vsc";
import { AiFillPlusCircle, AiFillHeart, AiFillFolder } from "react-icons/ai";
import {
 openProductRequestAction,
 closeProductRequestAction,
} from "../../redux/actions/addProductActions";
import { API } from "../../utitlties";
const SaveToCollection = (props) => {
 const [form] = Form.useForm();
 const [newCollection, setNewCollection] = useState("");
 const [collections, updateCollections] = useState([]);
 const [creatingCollection, setCreatingColelction] = useState(false);
 const [saving, setSaving] = useState(false);
 const [removing, setRemoving] = useState(false);
 const [fetching, setFetching] = useState(false);
 useEffect(() => {
  const fetchData = async () => {
   setFetching(true);
   axios
    // .get(`${API}allcollections/${props.user.uid}`)
    .get(`${API}folders/${props.user.uid}/${props.product.id}`)
    .then((res) => {
     console.log(res);
     updateCollections([...res.data.unsaved_in, ...res.data.saved_in]);
     setFetching(false);
    })
    .catch((err) => {
     console.log(err);
     setFetching(false);
    });
  };

  fetchData();
 }, []);

 const unSaveToCollectionRequest = (product_id, folder_id, index) => {
  setRemoving(true);
  const fd = new FormData();
  fd.append("product_id", product_id);
  fd.append("folder_id", folder_id);
  const _collections = collections;
  _collections[index].saved = false;
  axios
   .post(`${API}unsave`, fd)
   .then((response) => {
    console.log(response);
    setRemoving(false);
    updateCollections(_collections);
   })
   .catch((err) => {
    setRemoving(false);
   });
 };

 const saveToCollectionRequest = (product_id, folder_id, index) => {
  setSaving(true);
  const fd = new FormData();
  fd.append("product_id", product_id);
  fd.append("folder_id", folder_id);
  const _collections = collections;
  _collections[index].saved = true;
  axios
   .post(`${API}save`, fd)
   .then((response) => {
    console.log(response);
    setSaving(false);
    updateCollections(_collections);
    notification.open({
     message: "Notification Title",
     description:
      "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
     icon: (
      <div
       className="notoification-image"
       style={{ backgroundImage: `url(${props.cover})` }}
      ></div>
     ),
     style: {
      width: 600,
     },
    });
   })
   .catch((err) => {
    setSaving(false);
   });
 };

 const onFinish = (values) => {
  if (values.collection !== "") {
   setCreatingColelction(true);
   const fd = new FormData();
   fd.append("user_id", props.user.uid);
   fd.append("name", values.collection);
   axios
    .post(`${API}collection`, fd)
    .then((res) => {
     console.log(res);
     const { folder } = res.data;
     updateCollections([
      { name: folder.name, id: folder.id, saved: false },
      ...collections,
     ]);
     form.setFieldsValue({
      collection: "",
     });
     setNewCollection("");
     setCreatingColelction(false);
    })
    .catch((err) => {
     setCreatingColelction(false);
    });
  }
 };

 const onColelctionChange = (value) => {
  setNewCollection(value);
 };
 return (
  <>
   <Row className="collections-modal">
    <Col flex="300px">
     <div
      className="cover-wrapper"
      style={{ backgroundImage: `url(${props.cover})` }}
     ></div>
    </Col>
    <Col flex="10px">
     <Divider type="vertical" style={{ height: "100%" }} />
    </Col>
    <Col flex="auto">
     <p>Save To</p>
     <Divider type="horizontal" style={{ width: "100%" }} />
     <div className="collections-wrapper">
      <ul>
       <li>
        <span>
         <VscFolderActive /> Wishlist
        </span>
        <button>Save</button>
       </li>
       {fetching ? (
        <>
         <Spin
          style={{
           width: "100%",
          }}
          indicator={
           <LoadingOutlined
            style={{ fontSize: "22px", margin: "1px 3px 3px 8px" }}
            spin
           />
          }
         />
        </>
       ) : (
        <>
         {collections.map((col, index) => {
          return (
           <>
            <li key={col.id}>
             <span>
              {col.saved && (
               <>
                <AiFillFolder className="fav" />
               </>
              )}
              {!col.saved && (
               <>
                <VscFolder />
               </>
              )}
              {col.name}
             </span>

             {col.saved && (
              <>
               <button
                onClick={() =>
                 unSaveToCollectionRequest(props.product.id, col.id, index)
                }
               >
                Unsave
               </button>
              </>
             )}
             {!col.saved && (
              <>
               <button
                onClick={() =>
                 saveToCollectionRequest(props.product.id, col.id, index)
                }
               >
                Save
               </button>
              </>
             )}
            </li>
           </>
          );
         })}
         {/* {unsaved_in.map((col, index) => {
          return (
           <>
            <li key={col.id}>
             <span>
              <VscFolder />
              {col.name}
             </span>
             <button
              onClick={() =>
               saveToCollectionRequest(props.product.id, col.id, index)
              }
             >
              Save
             </button>
            </li>
           </>
          );
         })}
         {saved_in.map((col, index) => {
          return (
           <>
            <li key={col.id}>
             <span>
              <AiFillHeart className="fav" />
              {col.name}
             </span>
             <button
              onClick={() =>
               unSaveToCollectionRequest(props.product.id, col.id, index)
              }
             >
              Unsave
             </button>
            </li>
           </>
          );
         })} */}
        </>
       )}
      </ul>
     </div>
     <div>
      <Form
       form={form}
       layout="vertical"
       onFinish={onFinish}
       autoComplete="off"
      >
       <Form.Item name="collection">
        <Input
         placeholder="Create New Collection"
         size="large"
         value={newCollection}
         onChange={(e) => onColelctionChange(e.target.value)}
         prefix={
          <>
           <AiFillPlusCircle />
          </>
         }
        />
       </Form.Item>
       {newCollection !== "" && (
        <>
         <Form.Item className="create-btn">
          <Space>
           <Button htmlType="submit">
            CREATE
            {creatingCollection && (
             <>
              <Spin
               indicator={
                <LoadingOutlined
                 style={{ fontSize: 18, margin: "1px 3px 3px 8px" }}
                 spin
                />
               }
              />
             </>
            )}
           </Button>
          </Space>
         </Form.Item>
        </>
       )}
      </Form>
     </div>
    </Col>
   </Row>
  </>
 );
};

const mapDispatchToProps = (dispatch) => ({
 dispatchRequestOpen: () => dispatch(openProductRequestAction()),
 dispatchRequestClose: () => dispatch(closeProductRequestAction()),
});
const mapStateToProps = (state) => {
 return {
  requesting: state.addProduct.requesting,
  user: state.regularUser.info,
  isLoggedIn: state.regularUser.isLoggedIn,
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveToCollection);
