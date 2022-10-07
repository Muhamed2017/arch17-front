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
import { VscFolder, VscFolderActive } from "react-icons/vsc";
import { AiFillPlusCircle, AiFillFolder } from "react-icons/ai";
import {
 openProductRequestAction,
 closeProductRequestAction,
} from "../../redux/actions/addProductActions";
import { API } from "../../utitlties";
const SaveToBoard = (props) => {
 const [form] = Form.useForm();
 const [newBoard, setNewBoard] = useState("");
 const [boards, updateBoards] = useState([]);
 const [creatingCollection, setCreatingBoard] = useState(false);
 const [saving, setSaving] = useState(false);
 const [removing, setRemoving] = useState(false);
 const [fetching, setFetching] = useState(false);
 useEffect(() => {
  const fetchData = async () => {
   setFetching(true);
   axios
    .get(`${API}boards/${props.user.uid}/${props.project.id}`)
    .then((res) => {
     console.log(res);
     updateBoards([...res.data.unsaved_in, ...res.data.saved_in]);
     setFetching(false);
    })
    .catch((err) => {
     console.log(err);
     setFetching(false);
    });
  };

  fetchData();
 }, []);

 const unSaveToCollectionRequest = (project_id, board_id, index) => {
  setRemoving(true);
  const fd = new FormData();
  fd.append("project", project_id);
  fd.append("board_id", board_id);
  const _boards = boards;
  _boards[index].saved = false;
  axios
   .post(`${API}unsaveproject`, fd)
   .then((response) => {
    console.log(response);
    setRemoving(false);
    updateBoards(_boards);
   })
   .catch((err) => {
    setRemoving(false);
   });
 };

 const saveToCollectionRequest = (project_id, board_id, index) => {
  setSaving(true);
  const fd = new FormData();
  fd.append("project_id", project_id);
  fd.append("board_id", board_id);
  const _boards = boards;
  _boards[index].saved = true;
  axios
   .post(`${API}saveproject`, fd)
   .then((response) => {
    console.log(response);
    setSaving(false);
    updateBoards(_boards);
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
  if (values.board !== "") {
   setCreatingBoard(true);
   const fd = new FormData();
   fd.append("user_id", props.user.uid);
   fd.append("name", values.board);
   axios
    .post(`${API}board`, fd)
    .then((res) => {
     console.log(res);
     const { board } = res.data;
     updateBoards([
      { name: board.name, id: board.id, saved: false },
      ...boards,
     ]);
     form.setFieldsValue({
      board: "",
     });
     setNewBoard("");
     setCreatingBoard(false);
    })
    .catch((err) => {
     setCreatingBoard(false);
    });
  }
 };

 const onBoardChange = (value) => {
  setNewBoard(value);
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
       {/* <li>
        <span>
         <VscFolderActive /> Wishlist
        </span>
        <button>Save</button>
       </li> */}
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
         {boards.map((col, index) => {
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
                 unSaveToCollectionRequest(props.project.id, col.id, index)
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
                 saveToCollectionRequest(props.project.id, col.id, index)
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
       <Form.Item name="board">
        <Input
         placeholder="Create New Collection"
         size="large"
         value={newBoard}
         onChange={(e) => onBoardChange(e.target.value)}
         prefix={
          <>
           <AiFillPlusCircle />
          </>
         }
        />
       </Form.Item>
       {newBoard !== "" && (
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

export default connect(mapStateToProps, mapDispatchToProps)(SaveToBoard);
