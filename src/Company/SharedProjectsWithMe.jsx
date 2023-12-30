import axios from "axios";
import React, { Component } from "react";
import { API } from "../utitlties";
import { Row, Col, Collapse, Modal } from "antd";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
// import { regionNames } from "../redux/constants";
import ProjectListItem from "./ProjectListItem";
const { Panel } = Collapse;
const { confirm } = Modal;

class SharedProjectsWithMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entity_id: this.props.entity_id,
      entity_name: this.props.entity_name,
      shared_with_me: {},
      shared_with_me_keys: [],
      shared_with_me_values: [],
      current_scope: "",
      shared: false,
      permission:null,
      vendor_id:null,
      vendor_name:null
    };
  }

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    axios
      .get(
        `${API}sharedwithme/${this.state.entity_name}/${this.state.entity_id}`
      )
      .then((response) => {
        console.log(response.data);
        this.setState({
          shared_with_me: response.data.shared_with_me,
          shared_with_me_keys: Object.keys(response.data.shared_with_me) ?? [],
          shared_with_me_values:
            Object.values(response.data.shared_with_me) ?? [],
        });
      });
  };
  onCollapseChange = (active_panel) => {
    if (active_panel === this.state.active_panel) {
      this.setState({
        active_panel: "",
      });
    } else {
      this.setState({
        active_panel,
      });
    }
    console.log(active_panel);
  };
  deleteModal = () => {
    confirm({
      title: `Do you Want to Remove Project form your shared list projects? `,
      icon: <ExclamationCircleFilled />,
      onOk: () => {
        const id = this.state.share_to_delete?.id;
        this.handleDeleteShare(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  handleDeleteShare = (id) => {
    axios.post(`${API}delete-share/${id}`).then((response) => {
      console.log(response);
      this.getData();
    });
  };
  render() {
    return (
      <>
        <div id="shared-with-me-tab">
          <div className="customized-table invoices-table ">
            <div className="header-row table-row">
              <div>Owner</div>
              <div>Contacts</div>
            </div>
            {this.state.shared_with_me_keys?.map((d, index) => {
              return (
                <Collapse
                  onChange={() => this.onCollapseChange(d)}
                  activeKey={this.state.active_panel}
                  className="inner-row"
                >
                  <Panel
                    header={
                      <div className="table-row data-row collabser-row relative">
                        <div>
                          <p className="main">{d}</p>
                          <p className="sec">
                            {
                              this.state.shared_with_me_values[index][0]
                                ?.owner_type
                            }
                          </p>
                        </div>

                        <div>
                          <p className="main">
                            {
                              this.state.shared_with_me_values[index][0]
                                ?.owner_email
                            }
                          </p>
                          <p className="sec">
                            {this.state.shared_with_me_values[index][0]
                              ?.owner_phone ??
                              `${this.state.shared_with_me_values[index][0]?.owner_country},${this.state.shared_with_me_values[index][0]?.owner_city}`}
                          </p>
                        </div>
                      </div>
                    }
                    key={d}
                    showArrow={false}
                  >
                    {this.state.shared_with_me_values[index]?.map((de) => {
                      return (
                        <div className="data-row relative table-row">
                          <div className="edit-delete">
                            <Row align={"middle"}>
                              <Col md={12}>
                                <DeleteOutlined
                                  onClick={() => {
                                    this.setState(
                                      {
                                        share_to_delete: de,
                                      },
                                      () => {
                                        this.deleteModal();
                                      }
                                    );
                                  }}
                                />
                              </Col>
                            </Row>
                          </div>
                          <div
                            className="pointer"
                            onClick={() => {
                              this.setState(
                                {
                                  project_id: de?.projectlist_id,
                                  shared: de?.scope !== "all",
                                  current_scope: de?.scope,
                                  permission:de?.permission,
                                  vendor_id:de?.vendor_id,
                                  vendor_name:de?.vendor_name
                                },
                                () => {
                                  this.setState({
                                    row_modal: true,
                                  });
                                }
                              );
                            }}
                          >
                            <p className="main">{de?.project_name}</p>
                            <p className="sec">{de?.pi_ci}</p>
                            <p className="sec">
                              {de?.project_date?.slice(0, 10)}
                            </p>
                          </div>
                          <div>
                            <p className="main"></p>
                          </div>
                          <div>
                            <p className="main"></p>
                            <p className="sec"></p>
                          </div>
                        </div>
                      );
                    })}
                  </Panel>
                </Collapse>
              );
            })}
          </div>
        </div>

        <Modal
          className="fullscreen"
          closable
          destroyOnClose
          open={this.state.row_modal}
          onCancel={() => {
            this.setState(
              {
                row_modal: false,
              },
              () => {
                this.getData();
              }
            );
          }}
        >
          <ProjectListItem
            shared={true}
            scope={this.state.current_scope}
            entity_name={this.state.entity_name}
            entity_id={this.state.entity_id}
            project_id={this.state.project_id}
            permission={this.state.permission}
            vendor_id={this.state.vendor_id}
            vendor_name={this.state.vendor_name}

          />
        </Modal>
      </>
    );
  }
}

export default SharedProjectsWithMe;
