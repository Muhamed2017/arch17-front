import React, { Component } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import { API } from "../../utitlties";

class SharedWithPOM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entity_name: this.props.entity_name == "user" ? "People" : "company",
      entity_id: this.props.entity_id,
      shared_with: [],
      project_id: this.props.project_id,
    };
  }
  componentDidMount() {
    this.setState({
      loading: true,
    });
    axios
      .get(`${API}get-shared-with/${this.state.project_id}`)
      .then((response) => {
        console.log(response);
        this.setState({
          shared_with: response.data.shared_with_me,
          loading: false,
        });
      });
  }
  removeShare = (id) => {
    axios.post(`${API}delete-share/${id}`).then((response) => {
      console.log(response);
      this.setState({
        shared_with: this.state.shared_with?.filter((item) => {
          return item.id != id;
        }),
      });
    });
  };
  render() {
    return (
      <div className="shared_with">
        {this.state.shared_with?.map((share) => {
          return (
            <div className="shared-with-row relative">
              <Row align="middle">
                <Col md={5}>
                  <div
                    className="avatar"
                    style={{
                      backgroundImage: `url(${share?.manageable_profile})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    {(!share?.manageable_profile ||
                      share?.manageable_profile?.length < 10) && (
                      <span>{share?.manageable_name && share?.manageable_name[0]}</span>
                    )}
                  </div>
                </Col>
                <Col md={19}>
                  <p className="name">{share?.manageable_name}</p>
                  <p className="type">
                    {share?.manageable_type == "company" ? "Company" : "People"}
                  </p>
                  <p className="email">{share?.manageable_email}</p>
                </Col>
              </Row>
              <div
                className="remove-btn absolute arch-btn pointer"
                onClick={() => this.removeShare(share?.id)}
              >
                Remove
              </div>
            </div>
          );
        })}
        {this.state.shared_with?.length < 1 && !this.state.loading &&(
          <p className="emptys">Project is not shared with anyone</p>
        )}
      </div>
    );
  }
}

export default SharedWithPOM;
