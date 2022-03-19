import React from "react";
import "./ProjectBox.css";
import { ImLocation } from "react-icons/im";

const ProjectBox = (props) => {
 return (
  <div className="project-box border">
   <div className="project-img">
    <img
     //  src={"https://www.arch17.com/data/projects/320/cover/img/cover.jpg"}
     src={props.imgUrl}
     alt="Project Cover"
     className="img-fluid "
    />
   </div>
   <div className="project-desc text-left" style={{ textAlign: "left" }}>
    <div className="project-name mb-2 mt-2">
     {/* <h4>A Neighborhood Candy-Sweet Bakery</h4> */}
     <h4>{props.name ?? "A Neighborhood Candy-Sweet Bakery"}</h4>
    </div>
    <div className="project-category">
     {/* <p className="mb-1"> Restaurant </p> */}
     <p className="mb-1">
      <ImLocation
       style={{
        display: "inline-block",
        verticalAlign: "center",
        margin: "2px 3px 3px -2px ",
       }}
      />
      {props.location ?? "Restaurant"}
     </p>
    </div>
    <div className="pl-3" style={{ width: "95%", margin: "auto" }}>
     <hr className="m-0 p-0 " />
    </div>
    <div className="project-type d-flex justify-content-start align-items-center">
     <p className="mr-1"> Interior design </p>{" "}
     <p className="mr-1 ml-1"> Architecture </p>{" "}
     <p className="mr-1 ml-1"> Restaurant </p>
    </div>
   </div>
  </div>
 );
};

export default ProjectBox;
