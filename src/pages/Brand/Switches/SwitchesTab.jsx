import React, { Component } from "react";
import {
 Row,
 Col,
 Collapse,
 Input,
 Progress,
 Modal,
 Select,
 Form,
 Button,
} from "antd";
import "./switches.css";
import axios from "axios";
import { customLabels } from "../../CreateBrandFinish";
import ReactFlagsSelect from "react-flags-select";
import { SiGoogledrive, SiBaidu } from "react-icons/si";
import { GrOnedrive } from "react-icons/gr";
import { AiOutlineDropbox, AiFillCloud } from "react-icons/ai";
import { API } from "./../../../utitlties";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
// update-switch
// switch_image
const { TextArea } = Input;
const areas = [
 {
  label: "Fabric",
  value: "Fabric",
 },
];
class SwitchesTab extends Component {
 constructor(props) {
  super(props);
  this.state = {
   switches: [],
   _to_edit: null,
   switch_groups: [],
   edit_switch_modal: false,
   index: 0,
   view_links_modal: false,
   active_group: null,
   to_edit_group_id: null,
   group_id: null,
   visible: false,
   country_missed: false,
   country: "",
   view_modal: false,
   add_modal: false,
   switch_code: "",
   switch_color: "",
   uploading: false,
   switch_preview: "",
   uploaded: 0,
   onedrive: this.props.onedrive ?? "",
   pcloud: this.props.pcloud ?? "",
   ggldrive: this.props.googledrive ?? "",
   drpbox: this.props.dropbox ?? "",
   baidu: this.props.baidu ?? "",
   edit_modal: false,
  };
 }

 onChange = (key) => {
  console.log(key);
 };

 openModal = () => {
  this.setState({
   visible: true,
  });
 };

 openPDFLinksModal = () => {
  this.setState({
   view_links_modal: true,
  });
 };
 openAddSwitchModal = (index, group_id) => {
  this.setState(
   {
    index,
    group_id,
    code: "",
    color: "",
    switch_preview: "",
    uploaded: 0,
    switch_image: "",
    switch_code: "",
    switch_color: "",
   },
   () => {
    this.setState({
     add_modal: true,
    });
   }
  );
 };

 addSwitch = (index, group_id) => {
  if (this.state.uploaded < 100) return;

  const fd = new FormData();
  const { switch_color, switch_code, switch_image } = this.state;
  fd.append("color", switch_color);
  fd.append("code", switch_code);
  fd.append("switch_image", switch_image);

  axios
   .post(`${API}add-switch/${group_id}`, fd)
   .then((response) => {
    console.log(response);
    const _switch = {
     color: switch_color,
     code: switch_code,
     switch_image,
     id: response.data?.switch?.id,
    };
    let switch_groups = this.state.switch_groups;
    switch_groups[index].switches.push(_switch);
    this.setState(
     {
      switch_groups,
     },
     () => {
      console.log(this.state.switch_groups);
      this.setState({
       add_modal: false,
      });
     }
    );
   })
   .catch((err) => {
    console.log(err);
   });
 };

 uploadSwitchImage = (e) => {
  let file = e.target.files[0];
  if (!file) return;

  this.setState({ switch_preview: URL.createObjectURL(file) });
  const fd = new FormData();
  fd.append("switch_image", file);
  const options = {
   onUploadProgress: (progressEvent) => {
    const { loaded, total } = progressEvent;
    let percent = Math.floor((loaded * 100) / total);
    console.log(`${loaded} kb of ${total} | ${percent}%`);
    console.log(percent);
    this.setState({
     uploaded: percent,
    });
    // }
   },
  };
  axios
   .post(`${API}upload-switch-photo`, fd, options)
   .then((response) => {
    this.setState({
     switch_image: response.data.path,
     uploading: false,
    });
   })
   .catch((err) => {
    console.log(err);
    this.setState({
     uploading: false,
    });
   });
 };

 onFinish = (values) => {
  console.log("Received values of form:", values);
  values.country = this.state.country;
  // if (!values.country || values?.country?.length < 1) {
  //  this.setState({ country_missed: true });
  // } else {
  const fd = new FormData();
  fd.append("name", values.name);
  fd.append("material", values.material);

  if (values.country) {
   fd.append("origin", values.country);
  }
  if (values.composition) {
   fd.append("composition", values.composition);
  }

  if (values.width) {
   fd.append("width", values.width);
  }
  if (values.weight) {
   fd.append("weight", values.weight);
  }
  if (values.per) {
   fd.append("per", values.per);
  }

  if (values.rubbing) {
   fd.append("rubbing", values.rubbing);
  }
  if (values.pilling) {
   fd.append("pilling", values.pilling);
  }
  if (values.flammability) {
   fd.append("flammability", values.flammability);
  }
  if (values.lightfastness) {
   fd.append("lightfastness", values.lightfastness);
  }
  if (values.cleaning) {
   fd.append("cleaning", values.cleaning);
  }
  if (values.notes) {
   fd.append("notes", values.notes);
  }
  axios
   .post(`${API}switch-group/${this.props.store_id}`, fd)
   .then((response) => {
    console.log(response);
    let _group = values;
    const {
     name,
     material,
     width,
     per,
     weight,
     lightfastness,
     flammability,
     pilling,
     cleaning,
     rubbing,
     notes,
     composition,
    } = values;
    console.log(_group);
    this.setState(
     {
      switch_groups: [
       ...this.state.switch_groups,
       {
        id: response.data.switch_group?.id,
        name,
        material,
        origin: values.country,
        width,
        per,
        weight,
        lightfastness,
        flammability,
        pilling,
        cleaning,
        rubbing,
        notes,
        composition,
        switches: [],
       },
      ],
     },
     () => {
      console.log(this.state.switches);
      this.setState({
       visible: false,
      });
     }
    );
   })
   .catch((err) => console.log(err));
  // }
 };
 handleUpdateFinish = (values) => {
  console.log("Received values of form:", values);
  values.country = this.state.country;
  const fd = new FormData();

  if (values.name) {
   fd.append("name", values.name);
  }
  if (values.material) {
   fd.append("material", values.material);
  }
  if (values.country) {
   fd.append("origin", values.country);
  }
  if (values.composition) {
   fd.append("composition", values.composition);
  }

  if (values.width) {
   fd.append("width", values.width);
  }
  if (values.weight) {
   fd.append("weight", values.weight);
  }
  if (values.per) {
   fd.append("per", values.per);
  }

  if (values.rubbing) {
   fd.append("rubbing", values.rubbing);
  }
  if (values.pilling) {
   fd.append("pilling", values.pilling);
  }
  if (values.flammability) {
   fd.append("flammability", values.flammability);
  }
  if (values.lightfastness) {
   fd.append("lightfastness", values.lightfastness);
  }
  if (values.cleaning) {
   fd.append("cleaning", values.cleaning);
  }
  if (values.notes) {
   fd.append("notes", values.notes);
  }
  axios
   .post(`${API}update-switch-group/${this.state.to_edit_group_id}`, fd)
   .then((response) => {
    console.log(response);
    let newGroup = response.data.switch_group;

    this.setState({
     switch_groups: this.state.switch_groups?.map((g) => {
      if (g.id === this.state.to_edit_group_id) {
       newGroup.switches = g.switches;
       // let response
       return newGroup;
      }
      return g;
     }),
    });
    this.setState({
     edit_modal: false,
    });
   })
   .catch((err) => console.log(err));
 };
 componentDidMount() {
  axios
   .get(`${API}groups/${this.props.store_id}`)
   .then((response) => {
    console.log(response);
    this.setState({
     switch_groups: response.data.switches_groups,
    });
   })
   .catch((err) => {
    console.log(err);
   });
 }

 openEditGroupModal = (group) => {
  this.setState(
   {
    active_group: group,
    to_edit_group_id: group.id,
   },
   () => {
    this.setState({
     edit_modal: true,
    });
   }
  );
 };
 handleDeleteGroup = (group) => {
  if (!group?.id) return;

  let id = group?.id;
  axios.post(`${API}delete-swg/${id}`).then((response) => {
   console.log(response);
   this.setState(
    {
     switch_groups: this.state.switch_groups?.filter((g) => {
      return g.id !== id;
     }),
    },
    () => {
     this.setState({
      edit_modal: false,
     });
    }
   );
  });
 };
 handleAddPDFLinks = () => {
  const { ggldrive, baidu, onedrive, drpbox, pcloud } = this.state;
  const fd = new FormData();
  if (ggldrive.length > 0) {
   fd.append("googledrive", ggldrive);
  }
  if (baidu.length > 0) {
   fd.append("baidu", baidu);
  }
  if (pcloud.length > 0) {
   fd.append("pcloud", pcloud);
  }
  if (onedrive.length > 0) {
   fd.append("onedrive", onedrive);
  }
  if (drpbox.length > 0) {
   fd.append("dropbox", drpbox);
  }

  axios.post(`${API}storelinks/${this.props.store_id}`, fd).then((response) => {
   console.log(response);
   this.setState({
    pdf_modal: false,
   });
  });
 };
 handleDeleteSwitch = (group, sw) => {
  console.log(sw);
  if (!sw) return;

  axios.post(`${API}delete-sw/${sw.id}`).then((response) => {
   console.log(response);
   const tempSwitch_groups = [...this.state.switch_groups];
   const index = tempSwitch_groups.findIndex((item) => group.id === item.id);
   const item = tempSwitch_groups[index];
   item.switches = group.switches?.filter((s) => {
    return s.id !== sw.id;
   });
   const row = tempSwitch_groups[index];
   tempSwitch_groups.splice(index, 1, { ...item, ...row });
   this.setState({
    switch_groups: tempSwitch_groups,
   });
  });
 };
 openEditSwitchModal = (s, index) => {
  this.setState(
   {
    index,
    _to_edit: s,
    switch_code: s?.code,
    uploaded: 100,
    switch_color: s?.color,
    switch_preview: s?.switch_image,
    switch_image: s?.switch_image,
   },
   () => {
    this.setState({
     edit_switch_modal: true,
    });
   }
  );
 };
 handleEditSwitch = (s, row_index) => {
  if (this.state.uploaded < 100) return;

  const fd = new FormData();
  fd.append("code", this.state.switch_code);
  fd.append("color", this.state.switch_color);
  fd.append("switch_image", this.state.switch_image);
  const sw_index = this.state.switch_groups[row_index].switches.findIndex(
   (sw) => sw.id === s.id
  );
  let switch_group = this.state.switch_groups;
  switch_group[row_index].switches[sw_index].code = this.state.switch_code;
  switch_group[row_index].switches[sw_index].color = this.state.switch_color;
  switch_group[row_index].switches[
   sw_index
  ].switch_image = this.state.switch_image;
  axios
   .post(`${API}update-switch/${s?.id}`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     switch_group,
     edit_switch_modal: false,
     switch_image: "",
     switch_color: "",
     switch_code: "",
    });
   })
   .catch((err) => {
    console.log(err);
   });
 };
 render() {
  const { visible } = this.state;
  return (
   <div id="brand-swithes-tab">
    <div className="tab-btn-row">
     {this.props.isOwner ? (
      <>
       <button className="add-group-btn" onClick={this.openModal}>
        Add Switch Group
       </button>
       <button
        onClick={() => {
         this.setState({
          pdf_modal: true,
         });
        }}
        className="download-btn"
       >
        Add Switch PDF
       </button>
      </>
     ) : (
      <button
       onClick={this.openPDFLinksModal}
       //  disabled={true}
       className="download-btn"
      >
       Download Switch PDF
      </button>
     )}
    </div>
    <Collapse
     defaultActiveKey={["0"]}
     onChange={this.onChange}
     expandIconPosition="right"
    >
     {this.state.switch_groups?.map((g, index) => {
      return (
       <Panel
        header={
         <div className="switch-header">
          <p className="my-0">{g.name}</p>
          <p>
           <span className="mtrl">{g.material}</span>{" "}
           <span
            className="tail"
            onClick={(e) => {
             e.stopPropagation();
             this.setState(
              {
               active_group: g,
              },
              () => {
               this.setState({
                view_modal: true,
               });
              }
             );
            }}
           >
            Switch Info
           </span>
           {this.props.isOwner && (
            <span
             className="tail"
             onClick={(e) => {
              e.stopPropagation();

              this.openEditGroupModal(g);
             }}
            >
             Settings
            </span>
           )}
          </p>
         </div>
        }
        key={index}
       >
        <Row span={24} gutter={30} className="py-4">
         {g.switches?.map((s) => {
          return (
           <Col md={3} sm={8} xs={8} className="my-4 sw-col">
            <div
             className="sw-img"
             style={{ backgroundImage: `url("${s.switch_image}")` }}
            ></div>
            <p className="sw-code mt-2 mb-0">{s.code}</p>
            <p className="sw-color">{s.color}</p>
            {this.props.isOwner && (
             <div className="sw-btns">
              <button onClick={() => this.handleDeleteSwitch(g, s)}>
               <DeleteOutlined />
              </button>
              <button onClick={() => this.openEditSwitchModal(s, index)}>
               <EditOutlined />
              </button>
             </div>
            )}
           </Col>
          );
         })}
         {this.props.isOwner && (
          <Col
           md={4}
           onClick={() => this.openAddSwitchModal(index, g.id)}
           className="my-4"
          >
           <div className="add-switch-btn-plus">
            <span>+</span>
           </div>
           <p className="my-2 text-center">Add Switch </p>
          </Col>
         )}
        </Row>
       </Panel>
      );
     })}
    </Collapse>

    <Modal
     footer={false}
     width={500}
     className="switch-group-modal"
     style={{
      top: 25,
     }}
     centered={false}
     closable
     visible={visible}
     destroyOnClose
     onCancel={() => {
      this.setState({
       visible: false,
      });
     }}
     title="Add Switch Group"
    >
     <div className="form-wrapper">
      <Form
       size="large"
       name="dynamic_form_complex"
       onFinish={this.onFinish}
       autoComplete="off"
       bodyStyle={{
        overflowY: "scroll",
       }}
       style={{
        textAlign: "left",
       }}
      >
       <Form.Item
        name={"name"}
        rules={[
         {
          required: true,
         },
        ]}
       >
        <Input placeholder="Switch Name" />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 24,
        }}
        name="material"
        rules={[
         {
          required: true,
          message: "Switch Type is required",
         },
        ]}
       >
        <Select options={areas} placeholder="Switch Type" />
       </Form.Item>

       <Row span={24} className="my-3">
        <Col md={20}>
         <p>
          <span className="bold">Switch Info</span> are optional, You can add
          the available data{" "}
         </p>
        </Col>
       </Row>

       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        label="Composition"
        name={"composition"}
       >
        <Input />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        label="Origin"
       >
        <ReactFlagsSelect
         selected={this.state.country}
         selectedSize={14}
         optionsSize={18}
         searchable
         customLabels={customLabels}
         placeholder="Select Country *"
         onSelect={(code) => {
          this.setState({ country: code });
         }}
        />
        {/* {!this.state.country && this.state.country_missed && (
         <>
          <p style={{ color: "red" }}>country is required</p>
         </>
        )} */}
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"width"}
        label="Width"
       >
        <Input placeholder="" />
       </Form.Item>
       <Row span={24} gutter={12} className="px-0 mr-0 ml-0">
        <Col md={14}>
         <Form.Item
          wrapperCol={{
           span: 15,
          }}
          labelCol={{
           span: 9,
          }}
          name={"weight"}
          label="Weight"
         >
          <Input placeholder="" />
         </Form.Item>
        </Col>

        <Col md={10}>
         <Form.Item
          labelCol={{
           span: 9,
          }}
          wrapperCol={{
           span: 15,
          }}
          name={"per"}
          label="Grams per"
         >
          <Select>
           <Select.Option key={"Sqaure per meter"} value="Square per meter">
            Sqaure per meter
           </Select.Option>
           <Select.Option key={"Cubic per meter"} value="Cubic per meter">
            Cubic per meter
           </Select.Option>
          </Select>
         </Form.Item>
        </Col>
       </Row>

       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"lightfastness"}
        label="Lightfastness"
       >
        <Input placeholder="" />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"rubbing"}
        label="Rubbing"
       >
        <Input placeholder="" />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"pilling"}
        label="Pilling"
       >
        <Input placeholder="" />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"cleaning"}
        label="Cleaning"
       >
        <Input placeholder="" />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"flammabitiy"}
        label="Flammabitiy"
       >
        <TextArea placeholder="" />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"notes"}
        label="Notes"
       >
        <TextArea placeholder="" />
       </Form.Item>
       <Form.Item>
        <Button type="primary" htmlType="submit">
         Submit
        </Button>
       </Form.Item>
      </Form>
     </div>
    </Modal>

    <Modal
     visible={this.state.pdf_modal}
     footer={false}
     className="switch-group-modal upload-file-modal"
     centered={false}
     closable
     destroyOnClose
     onCancel={() => {
      this.setState({
       pdf_modal: false,
      });
     }}
     title="Add PDF Links"
    >
     <p style={{ width: "100%", fontWeight: "500", fontFamily: "Roboto" }}>
      Add File Download Link
     </p>

     <Row gutter={16} className="mb-3 mt-3">
      <Col className="gutter-row" span={7}>
       <Button
        type="primary"
        className="drivebtn"
        icon={<GrOnedrive />}
        style={{ width: "100%" }}
        size="large"
       >
        OneDrive
       </Button>
      </Col>
      <Col className="gutter-row" span={17} style={{ background: "" }}>
       <Input
        placeholder=""
        size="large"
        value={this.state.onedrive}
        onChange={(e) => {
         this.setState({ onedrive: e.target.value });
         console.log(e.target.value);
        }}
       />
      </Col>
     </Row>

     <Row gutter={16} className="mb-3">
      <Col className="gutter-row" span={7}>
       <Button
        type="primary"
        style={{ width: "100%" }}
        size="large"
        className="drivebtn"
        icon={<SiGoogledrive />}
       >
        Google Drive
       </Button>
      </Col>
      <Col className="gutter-row" span={17} style={{ background: "" }}>
       <Input
        placeholder=""
        size="large"
        value={this.state.ggldrive}
        onChange={(e) => {
         this.setState({ ggldrive: e.target.value });
         console.log(e.target.value);
        }}
       />
      </Col>
     </Row>
     <Row gutter={16} className="mb-3">
      <Col className="gutter-row" span={7}>
       <Button
        type="primary"
        style={{ width: "100%" }}
        icon={<AiOutlineDropbox />}
        size="large"
        className="drivebtn"
       >
        Dropbox
       </Button>
      </Col>
      <Col className="gutter-row" span={17} style={{ background: "" }}>
       <Input
        placeholder=""
        size="large"
        value={this.state.drpbox}
        onChange={(e) => this.setState({ drpbox: e.target.value })}
       />
      </Col>
     </Row>
     <Row gutter={16} className="mb-3">
      <Col className="gutter-row" span={7}>
       <Button
        type="primary"
        style={{ width: "100%" }}
        icon={<SiBaidu />}
        size="large"
        className="drivebtn"
       >
        Baidu Drive
       </Button>
      </Col>
      <Col className="gutter-row" span={17} style={{ background: "" }}>
       <Input
        placeholder=""
        size="large"
        value={this.state.baidu}
        onChange={(e) => this.setState({ baidu: e.target.value })}
       />
      </Col>
     </Row>
     <Row gutter={16} className="mb-3">
      <Col className="gutter-row" span={7}>
       <Button
        type="primary"
        style={{ width: "100%" }}
        icon={<AiFillCloud />}
        size="large"
        className="drivebtn"
       >
        Pcloud
       </Button>
      </Col>
      <Col className="gutter-row" span={17} style={{ background: "" }}>
       <Input
        placeholder=""
        size="large"
        value={this.state.pcloud}
        onChange={(e) => this.setState({ pcloud: e.target.value })}
       />
      </Col>
     </Row>
     <Button onClick={this.handleAddPDFLinks}>ADD</Button>
    </Modal>
    <Modal
     footer={false}
     width={350}
     destroyOnClose
     centered={true}
     visible={this.state.add_modal}
     onCancel={() => {
      this.setState(
       {
        switch_code: "",
        switch_color: "",
        switch_preview: "",
        switch_image: "",
        index: 0,
       },
       () => {
        this.setState({
         add_modal: false,
        });
       }
      );
     }}
     title="Add Switch"
     closable
    >
     <Row span={24} justify="center">
      <Col md={12} className="mb-4">
       <div
        className="add-switch-btn-plus"
        style={{
         backgroundImage: `url("${this.state.switch_preview}")`,
         //  filter: this.state.uploaded < 100 ? "brightness(0.75)" : "none",
        }}
       >
        {this.state.switch_preview?.length < 1 && <span>+</span>}
        <input type="file" onChange={this.uploadSwitchImage} />
        {this.state.switch_preview && this.state.uploaded < 100 && (
         <Progress
          width={50}
          strokeWidth={10}
          strokeColor={"#000"}
          type="circle"
          percent={this.state.uploaded}
          style={{
           position: "absolute",
           top: "50%",
           left: "50%",
           transform: "translate(-50%, -50%)",
           zIndex: 6,
          }}
         />
        )}
       </div>
       <p className="upload-switch-photo my-3">Upload Switch Photo</p>
      </Col>
      <Col md={24} className="mb-2">
       <Input
        placeholder="Switch Code"
        size="large"
        onChange={(e) => {
         this.setState({ switch_code: e.target.value });
        }}
        value={this.state.switch_code}
       />
      </Col>
      <Col md={24}>
       <Input
        size="large"
        placeholder="Switch Color"
        onChange={(e) => {
         this.setState({ switch_color: e.target.value });
        }}
        value={this.state.switch_color}
       />
      </Col>
     </Row>
     <p className="colors my-2">Yellow, Green, Blue, ...</p>
     <Row justify="end">
      <Col md={4}>
       <button
        className="switch-add-btn"
        onClick={() => this.addSwitch(this.state.index, this.state.group_id)}
       >
        Add
       </button>
      </Col>
     </Row>
    </Modal>

    {/* update modal */}
    <Modal
     footer={false}
     width={500}
     className="switch-group-modal"
     style={{
      top: 25,
     }}
     centered={false}
     closable
     visible={this.state.edit_modal}
     destroyOnClose
     onCancel={() => {
      this.setState({
       edit_modal: false,
      });
     }}
     title="Add Switch Group"
    >
     <div className="form-wrapper">
      <Form
       size="large"
       name="update-group"
       onFinish={this.handleUpdateFinish}
       autoComplete="off"
       bodyStyle={{
        overflowY: "scroll",
       }}
       style={{
        textAlign: "left",
       }}
      >
       <Form.Item name={"name"} initialValue={this.state.active_group?.name}>
        <Input placeholder="Switch Name" />
       </Form.Item>
       <Form.Item
        initialValue={"Fabric"}
        wrapperCol={{
         span: 24,
        }}
        name="material"
       >
        <Select options={areas} placeholder="Switch Type" />
       </Form.Item>

       <Row span={24} className="my-3">
        <Col md={20}>
         <p>
          <span className="bold">Switch Info</span> are optional, You can add
          the available data{" "}
         </p>
        </Col>
       </Row>

       <Form.Item
        initialValue={this.state.active_group?.composition}
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        label="Composition"
        name={"composition"}
       >
        <Input />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        label="Origin"
       >
        <ReactFlagsSelect
         selected={this.state.country || this.state.active_group?.origin}
         selectedSize={14}
         optionsSize={18}
         searchable
         customLabels={customLabels}
         placeholder="Select Country *"
         onSelect={(code) => {
          this.setState({ country: code });
         }}
        />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"width"}
        label="Width"
        initialValue={this.state.active_group?.width}
       >
        <Input placeholder="" />
       </Form.Item>
       <Row span={24} gutter={12} className="px-0 mr-0 ml-0">
        <Col md={14}>
         <Form.Item
          initialValue={this.state.active_group?.weight}
          wrapperCol={{
           span: 15,
          }}
          labelCol={{
           span: 9,
          }}
          name={"weight"}
          label="Weight"
         >
          <Input placeholder="" />
         </Form.Item>
        </Col>

        <Col md={10}>
         <Form.Item
          initialValue={this.state.active_group?.per}
          labelCol={{
           span: 9,
          }}
          wrapperCol={{
           span: 15,
          }}
          name={"per"}
          label="Grams per"
         >
          <Select>
           <Select.Option key={"Sqaure per meter"} value="Square per meter">
            Sqaure per meter
           </Select.Option>
           <Select.Option key={"Cubic per meter"} value="Cubic per meter">
            Cubic per meter
           </Select.Option>
          </Select>
         </Form.Item>
        </Col>
       </Row>

       <Form.Item
        initialValue={this.state.active_group?.lightfastness}
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"lightfastness"}
        label="Lightfastness"
       >
        <Input placeholder="" />
       </Form.Item>
       <Form.Item
        initialValue={this.state.active_group?.rubbing}
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"rubbing"}
        label="Rubbing"
       >
        <Input placeholder="" />
       </Form.Item>
       <Form.Item
        initialValue={this.state.active_group?.pilling}
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"pilling"}
        label="Pilling"
       >
        <Input placeholder="" />
       </Form.Item>
       <Form.Item
        initialValue={this.state.active_group?.cleaning}
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"cleaning"}
        label="Cleaning"
       >
        <Input placeholder="" />
       </Form.Item>
       <Form.Item
        initialValue={this.state.active_group?.flammability}
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"flammability"}
        label="Flammability"
       >
        <TextArea placeholder="" />
       </Form.Item>
       <Form.Item
        initialValue={this.state.active_group?.notes}
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"notes"}
        label="Notes"
       >
        <TextArea placeholder="" />
       </Form.Item>
       <Form.Item>
        <Button type="primary" htmlType="submit">
         Submit
        </Button>
       </Form.Item>
      </Form>
      <p
       className="delete-btn"
       onClick={() => {
        this.handleDeleteGroup(this.state.active_group);
       }}
      >
       Delete Switch Group
      </p>
     </div>
    </Modal>
    <Modal
     visible={this.state.view_modal}
     title={
      <h2>
       <span className="bolder">{this.state.active_group?.name}</span>.{" "}
       {this.state.active_group?.material}
      </h2>
     }
     footer={false}
     width={500}
     className="switch-group-modal"
     style={{
      top: 25,
     }}
     centered={false}
     destroyOnClose
     onCancel={() => {
      this.setState({
       active_group: null,
       view_modal: false,
      });
     }}
     closable
    >
     <div className="p-2">
      {this.state.active_group?.composition && (
       <Row span={24} gutter={12} className="mb-2">
        <Col md={6}>
         <span className="bold">Composition</span>
        </Col>
        <Col md={18}>
         <span>{this.state.active_group?.composition}</span>
        </Col>
       </Row>
      )}
      {this.state.active_group?.origin && (
       <Row span={24} gutter={12} className="mb-2">
        <Col md={6}>
         <span className="bold">Origin</span>
        </Col>
        <Col md={18}>
         <span>{this.state.active_group?.origin}</span>
        </Col>
       </Row>
      )}
      {this.state.active_group?.weight && (
       <Row span={24} gutter={12} className="mb-2">
        <Col md={6}>
         <span className="bold">Weight</span>
        </Col>
        <Col md={18}>
         <span>
          {`${this.state.active_group?.weight} Grams per ${this.state.active_group?.per}`}{" "}
         </span>
        </Col>
       </Row>
      )}
      {this.state.active_group?.width && (
       <Row span={24} gutter={12} className="mb-2">
        <Col md={6}>
         <span className="bold">width</span>
        </Col>
        <Col md={18}>
         <span>{this.state.active_group?.width} CM</span>
        </Col>
       </Row>
      )}
      {this.state.active_group?.lightfastness && (
       <Row span={24} gutter={12} className="mb-2">
        <Col md={6}>
         <span className="bold">lightfastness</span>
        </Col>
        <Col md={18}>
         <span>{this.state.active_group?.lightfastness}</span>
        </Col>
       </Row>
      )}
      {this.state.active_group?.rubbing && (
       <Row span={24} gutter={12} className="mb-2">
        <Col md={6}>
         <span className="bold">Rubbing</span>
        </Col>
        <Col md={18}>
         <span>{this.state.active_group?.rubbing}</span>
        </Col>
       </Row>
      )}
      {this.state.active_group?.pilling && (
       <Row span={24} gutter={12} className="mb-2">
        <Col md={6}>
         <span className="bold">Pilling</span>
        </Col>
        <Col md={18}>
         <span>{this.state.active_group?.pilling}</span>
        </Col>
       </Row>
      )}
      {this.state.active_group?.cleaning && (
       <Row span={24} gutter={12} className="mb-2">
        <Col md={6}>
         <span className="bold">Cleaning</span>
        </Col>
        <Col md={18}>
         <span>{this.state.active_group?.cleaning}</span>
        </Col>
       </Row>
      )}
      {this.state.active_group?.flammability && (
       <Row span={24} gutter={12} className="mb-2">
        <Col md={6}>
         <span className="bold">Flammability</span>
        </Col>
        <Col md={18}>
         <span>{this.state.active_group?.flammability}</span>
        </Col>
       </Row>
      )}
      {this.state.active_group?.notes && (
       <Row span={24} gutter={12} className="mb-2">
        <Col md={6}>
         <span className="bold">Notes</span>
        </Col>
        <Col md={18}>
         <span>{this.state.active_group?.notes}</span>
        </Col>
       </Row>
      )}
     </div>
    </Modal>
    <Modal
     width={250}
     closable
     onCancel={() => {
      this.setState({ view_links_modal: false });
     }}
     footer={false}
     destroyOnClose
     visible={this.state.view_links_modal}
     title="Download Switch PFD File"
    >
     <Row span={24}>
      {this.state.ggldrive?.length > 0 && (
       <Col md={24} className="mb-2">
        <a
         className="pdf-link"
         href={this.state.ggldrive}
         target="_blank"
         rel="noreferrer"
        >
         <SiGoogledrive /> Google Drive
        </a>
       </Col>
      )}
      {this.state.onedrive?.length > 0 && (
       <Col md={24} className="mb-2">
        <a
         className="pdf-link"
         href={this.state.onedrive}
         target="_blank"
         rel="noreferrer"
        >
         <GrOnedrive /> One Drive
        </a>
       </Col>
      )}
      {this.state.drpbox?.length > 0 && (
       <Col md={24} className="mb-2">
        <a
         className="pdf-link"
         href={this.state.drpbox}
         target="_blank"
         rel="noreferrer"
        >
         <AiOutlineDropbox /> Dropbox
        </a>
       </Col>
      )}
      {this.state.baidu?.length > 0 && (
       <Col md={24} className="mb-2">
        <a
         className="pdf-link"
         href={this.state.baidu}
         target="_blank"
         rel="noreferrer"
        >
         <SiBaidu /> Baidu
        </a>
       </Col>
      )}
      {this.state.pcloud?.length > 0 && (
       <Col md={24} className="mb-2">
        <a
         className="pdf-link"
         href={this.state.pcloud}
         target="_blank"
         rel="noreferrer"
        >
         <AiFillCloud /> Pcloud
        </a>
       </Col>
      )}
     </Row>
    </Modal>

    {/* editModal */}

    <Modal
     footer={false}
     width={350}
     destroyOnClose
     centered={true}
     visible={this.state.edit_switch_modal}
     onCancel={() => {
      this.setState(
       {
        switch_code: "",
        switch_color: "",
        switch_preview: "",
        switch_image: "",
        index: 0,
       },
       () => {
        this.setState({
         edit_switch_modal: false,
        });
       }
      );
     }}
     title="Edit Switch"
     closable
    >
     <Row span={24} justify="center">
      <Col md={12} className="mb-4">
       <div
        className="add-switch-btn-plus"
        style={{
         backgroundImage: `url("${this.state.switch_preview}")`,
         //  filter: this.state.uploaded < 100 ? "brightness(0.75)" : "none",
        }}
       >
        {this.state.switch_preview?.length < 1 && <span>+</span>}
        <input type="file" onChange={this.uploadSwitchImage} />
        {this.state.switch_preview && this.state.uploaded < 100 && (
         <Progress
          width={50}
          strokeWidth={10}
          strokeColor={"#000"}
          type="circle"
          percent={this.state.uploaded}
          style={{
           position: "absolute",
           top: "50%",
           left: "50%",
           transform: "translate(-50%, -50%)",
           zIndex: 6,
          }}
         />
        )}
       </div>
       <p className="upload-switch-photo my-3">Upload Switch Photo</p>
      </Col>
      <Col md={24} className="mb-2">
       <Input
        placeholder="Switch Code"
        size="large"
        onChange={(e) => {
         this.setState({ switch_code: e.target.value });
        }}
        value={this.state.switch_code}
       />
      </Col>
      <Col md={24}>
       <Input
        size="large"
        placeholder="Switch Color"
        onChange={(e) => {
         this.setState({ switch_color: e.target.value });
        }}
        value={this.state.switch_color}
       />
      </Col>
     </Row>
     {/* <p className="colors my-2">Yellow, Green, Blue, ...</p> */}
     <Row justify="end">
      <Col md={4} className="mt-3">
       <button
        // disabled={this.state.uploaded < 100 && this.state.uploading}
        className="switch-add-btn"
        onClick={() =>
         //  this.handleEditSwitch(this.state.index, this.state.group_id)
         this.handleEditSwitch(this.state._to_edit, this.state.index)
        }
       >
        Edit
       </button>
      </Col>
     </Row>
    </Modal>
   </div>
  );
 }
}

export default SwitchesTab;
