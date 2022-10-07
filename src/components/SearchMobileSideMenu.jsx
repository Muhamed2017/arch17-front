import React, { Component } from "react";
import { Drawer, Radio, Input } from "antd";
import { connect } from "react-redux";
import { setMenu } from "./../redux/actions/componentActions";
import { SearchOutlined } from "@ant-design/icons";

import { furniture, lightings } from "./NavigationBar";
import { Link } from "react-router-dom";

class SearchMobileSidMuen extends Component {
 constructor(props) {
  super(props);
  this.state = {
   search_list: false,
   searchValue: "",
   filteredFurniture: [],
   furniture: [],
   filteredBrands: [],
   filterProjects: [],
   filteredLightings: [],
   lightings: [],
   //    search_mobile: false,
   searchDataLoaded: false,
   selected: false,
   typeSelected: "",
   selected_search: "all",
   search_list_loading: false,
   status: "process",
   projects: [
    "Airport",
    "Animal & Hospital and Clinic",
    "Apartmant",
    "Bus Station",
    "Café",
    "Cathedral",
    "Chapal",
    "Churches",
    "Cinema",
    "City Planning",
    "Clinic",
    "Club",
    "Coffee shop",
    "Dorms",
    "Exhibit Design",
    "Football Stadium",
    "Furniture Design",
    "Garden & Plaza",
    "Grocery Store",
    "Gym & Fitness Design",
    "Home Design",
    "Hospital",
    "Hostel",
    "Hotel",
    "Restaurant",
    "House",
    "Housing",
    "Kid Garden",
    "Loft Appartment",
    "Lighting Design",
    "Material Design",
    "Master Plan",
    "Monastery",
    "Mosque",
    "Motel",
    "Mueseum",
    "Night Club",
    "Office",
    "Opera House",
    "Pavilion",
    "Penthouse",
    "Parmacy",
    "Port",
    "Praying Room",
    "Residence",
    "Sales Center",
    "Schoole",
    "Shopping Mall",
    "Show Room",
    "Spa & Sauna",
    "Store",
    "Super Market",
    "Swimming Pool",
    "Synagogue",
    "Tea House",
    "Tea Shop",
    "Temple",
    "Temporary Store",
    "Theater",
    "University & Institute",
   ],
   visible: this.props.visible,
   //    search_list_loading: false,
  };
 }
 showDrawer = () => {
  this.setState({
   visible: true,
  });
 };

 onClose = () => {
  this.props.dispatchSetMenu(false);
 };

 onChange = (e) => {
  //   setPlacement(e.target.value);
  console.log(e);
  this.setState({
   selected_search: e.target.value,
  });
 };

 searching = (value) => {
  console.log(this.state.search_list);
  console.log(value);
  this.setState({ searchValue: value });
  console.log(value);
  if (value.length > 0) {
   this.setState({ search_list: true });
   if (!this.state.searchDataLoaded) {
    this.setState({
     search_list_loading: true,
    });
   } else {
    console.log(this.state.searchData);
    this.setState({
     filteredFurniture: this.state.furniture?.filter((product) => {
      return product?.toLowerCase().includes(value.toLowerCase());
     }),
     filteredLightings: this.state.lightings?.filter((product) => {
      return product?.toLowerCase().includes(value.toLowerCase());
     }),
     filteredBrands: this.state.searchData?.brands?.filter((brand) => {
      return brand?.name?.toLowerCase().includes(value.toLowerCase());
     }),
     filterProjects: this.state.projects?.filter((project) => {
      return project?.toLowerCase().includes(value.toLowerCase());
     }),
    });
    return;
   }
  } else {
   this.setState({ search_list: false });
  }
 };

 componentDidMount() {
  console.log(this.props.data);
  this.setState(
   {
    searchDataLoaded: true,
    searchData: this.props?.data,
    furniture,
    lightings,
    filteredFurniture: furniture,
    filteredLightings: lightings,
    filteredBrands: this.props.data?.brands,
    search_list_loading: false,
   },
   () => {
    this.setState({
     filteredFurniture: this.state.furniture?.filter((product) => {
      return product
       ?.toLowerCase()
       .includes(this.state.searchValue.toLowerCase());
     }),
     filteredLightings: this.state.lightings?.filter((product) => {
      return product
       ?.toLowerCase()
       .includes(this.state.searchValue.toLowerCase());
     }),
     filteredBrands: this.state.searchData?.brands?.filter((brand) => {
      return brand?.name
       ?.toLowerCase()
       .includes(this.state.searchValue.toLowerCase());
     }),

     myBrands: this.props.isLoggedIn
      ? this.state.searchData?.brands?.filter((brand) => {
         return brand.user_id === this.props.info?.uid;
        })
      : [],
    });
   }
  );
 }
 render() {
  return (
   <>
    <Drawer
     id="search-mobile-drawer"
     title={
      <>
       <Radio.Group
        defaultValue="all"
        buttonStyle="solid"
        onChange={this.onChange}
       >
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="products">Products</Radio.Button>
        <Radio.Button value="brands">Brands</Radio.Button>
        <Radio.Button value="projects">Magazine</Radio.Button>
       </Radio.Group>
       <Input
        size="large"
        placeholder="Search Products, Brands and Magazine"
        onChange={(e) => this.searching(e.target.value)}
        prefix={<SearchOutlined />}
       />
      </>
     }
     placement="left"
     closable={true}
     onClose={this.onClose}
     visible={this.props.visible}
     key="left"
     mask={false}
     width={"100%"}
     height={"100vw"}
    >
     {this.state.search_list && this.props.visible && (
      <>
       <div
        className="col-md-5"
        id="search-list"
        style={{
         position: "absolute",
         top: 45,
         width: "100%",
         right: 0,
         left: 0,
         minHeight: "250px",
         borderTopRightRadius: "2px",
         borderTopLeftRadius: "2px",
         background: "#fff",
         border: "1px solid #ddd",
         borderTop: "0",
        }}
       >
        {this.state.selected_search === "all" && this.state.searchDataLoaded && (
         <ul id="highlevelsearch">
          {this.state.filteredFurniture?.length > 0 && (
           <>
            <li>
             Furniture
             <ul className="inner-list">
              {this.state.filteredFurniture.map((product, index) => {
               if (index <= 13) {
                return (
                 <>
                  <a href={`/products?category=furniture&kinds=${product}`}>
                   <li
                    onClick={() => {
                     this.setState({
                      search_list: false,
                      searchValue: product,
                     });
                     console.log(product);
                     this.props.setSearchTerm(product);
                    }}
                   >
                    {product}
                   </li>
                  </a>
                 </>
                );
               }
              })}
             </ul>
            </li>
           </>
          )}
          {this.state.filteredLightings.length > 0 && (
           <>
            <li>
             Lightings
             <ul className="inner-list">
              {this.state.filteredLightings.map((product, index) => {
               if (index <= 15) {
                return (
                 <>
                  <a href={`/products?category=lighting&kinds=${product}`}>
                   <li
                    onClick={() => {
                     this.setState({
                      search_list: false,
                      searchValue: product,
                     });
                     console.log(product);
                     this.props.setSearchTerm(product);
                    }}
                   >
                    {product}
                   </li>
                  </a>
                 </>
                );
               }
              })}
             </ul>
            </li>
           </>
          )}
          {this.state.filteredBrands?.length > 0 && (
           <>
            <li>
             Brands
             <ul className="inner-list">
              {this.state.filteredBrands.map((brand, index) => {
               return (
                <>
                 <li>
                  <a href={`/brand/${brand.id}`}>{brand.name}</a>
                 </li>
                </>
               );
              })}
             </ul>
            </li>
           </>
          )}
          <li>
           {this.state.filterProjects.length > 0 && (
            <>
             Projects
             <ul className="inner-list">
              {this.state.filterProjects.map((project, index) => {
               return (
                <a href={`/magazine?types=${project}`}>
                 <li>{project}</li>
                </a>
               );
              })}
             </ul>
            </>
           )}
          </li>
         </ul>
        )}
        {this.state.selected_search === "brands" &&
         this.state.searchDataLoaded && (
          <ul>
           {this.state.filteredBrands?.length > 0 && (
            <>
             <li>
              Brands
              <ul className="inner-list">
               {this.state.filteredBrands.map((brand, index) => {
                return (
                 <>
                  <li>
                   <a href={`/brand/${brand.id}`}>{brand.name}</a>
                  </li>
                 </>
                );
               })}
              </ul>
             </li>
            </>
           )}
          </ul>
         )}
        {this.state.selected_search === "products" &&
         this.state.searchDataLoaded && (
          <ul>
           {this.state.filteredFurniture?.length > 0 && (
            <>
             <li>
              Furnitures
              <ul className="inner-list">
               {this.state.filteredFurniture.map((product, index) => {
                if (index <= 9) {
                 return (
                  <>
                   <Link
                    to={{
                     pathname: `/products/furniture/${product}`,
                     state: {
                      selected_kind: product,
                     },
                    }}
                   >
                    <li
                     onClick={() => {
                      this.setState({
                       search_list: false,
                       searchValue: product,
                      });
                      console.log(product);
                      this.props.setSearchTerm(product);
                     }}
                    >
                     {product}
                    </li>
                   </Link>
                  </>
                 );
                }
               })}
              </ul>
             </li>
            </>
           )}
           {this.state.filteredLightings.length > 0 && (
            <>
             <li>
              Lightings
              <ul className="inner-list">
               {this.state.filteredLightings.map((product, index) => {
                if (index <= 9) {
                 return (
                  <>
                   <Link
                    to={{
                     pathname: `/products/furniture/${product}`,
                     state: {
                      selected_kind: product,
                     },
                    }}
                   >
                    <li
                     onClick={() => {
                      this.setState({
                       search_list: false,
                       searchValue: product,
                      });
                      console.log(product);
                      this.props.setSearchTerm(product);
                     }}
                    >
                     {product}
                    </li>
                   </Link>
                  </>
                 );
                }
               })}
              </ul>
             </li>
            </>
           )}
          </ul>
         )}
        {this.state.selected_search === "projects" &&
         this.state.searchDataLoaded && (
          <ul>
           <li>
            Projects
            <ul className="inner-list">
             {this.state.filterProjects?.map((project, index) => {
              return <li key={index}>{project}</li>;
             })}
            </ul>
           </li>
          </ul>
         )}
       </div>
      </>
     )}
    </Drawer>
   </>
  );
 }
}
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  info: state.regularUser.info,
  visible: state.mcs.side_mobile_menu,
 };
};
const mapDispatchToProps = (dispatch) => ({
 dispatchSetMenu: (visible) => dispatch(setMenu(visible)),
});
export default connect(
 mapStateToProps,
 mapDispatchToProps
)(SearchMobileSidMuen);
