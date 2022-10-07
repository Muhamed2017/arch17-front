import React, { Component } from "react";
import axios from "axios";
import SaveToCollection from "./../components/Modals/SaveToCollection";
import { connect } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { setSearchTerm } from "./../redux/actions/addProductActions";
import { LoadingOutlined } from "@ant-design/icons";
import "./Search.css";
import {
 vanillaSigninEmailPassword,
 signupFacebook,
 signupGoogle,
 signupEmailPassword,
} from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import { HiAdjustments } from "react-icons/hi";
import {
 kind_options,
 lighting_kinds as lighting_kind_optios,
 constructions_kind_options,
 bathroom_kind_options,
 decore_kind_options,
 furniture_materials,
 finishes_kind_options,
 kitchen_kind_options,
 revolving_door_types,
 f_moveble_door_types,
 wellness_kind_options,
 furniture_styles,
 lighting_styles,
 chair,
 beds,
 sofas,
 cabinet,
 benches,
 table,
 spotlights,
 lampshades,
 pendant_lamps,
 table_lamps,
 lighting_types,
 finishes_doors,
 finishes_partitions,
 finishes_rooflights,
 finishes_window_profiles,
 finishes_applied_on,
 lighting_installation,
 lighting_bulbTypes,
 lighitng_colorTemprature,
 bathroom_wshbasins_fixtures,
 bathroom_showers_bathtubs,
 bathroom_taps,
 bathroom_radiators,
 bathroom_remote_control_taps,
 bathroom_furniture,
 bathroom_lighting,
 bathroom_accessories,
 bathroom_laundry,
 bathroom_disabled,
 home_decore,
 textiles_decore,
 prints_decore,
 storage_decore,
 curtains_decore,
 plant_decore,
 pets_decore,
 kitchen_funiture,
 kitchen_appliances,
 kitchen_cooking_accessories,
 kitchen_dining_accessories,
 kitchen_textiles,
 kitchen_cookware,
 kitchen_skin_taps,
 wellness_spas,
 welness_gym_fintess,
 wellness_swimming_pools,
 constructions_structure,
 constructions_roofs,
 constructions_external_walls,
 constructions_paints_varnishes,
 constructions_home_automation,
} from "./addProduct/ProductClassifications";

import {
 Row,
 Col,
 Form,
 Menu,
 Layout,
 Checkbox,
 Dropdown,
 Button,
 Spin,
 Input,
 Tag,
 Modal as AntModal,
 Skeleton,
 Drawer,
} from "antd";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import { API } from "./../utitlties";

const { SubMenu } = Menu;
const { Sider } = Layout;

const types = {
 Chairs: chair.types,
 Beds: beds.types,
 Sofa: sofas.types,
 Cabinets: cabinet.types,
 Benches: benches.types,
 Table: table.types,
 "Pendant lamps": pendant_lamps.types,
 "Table lamps": table_lamps.types,
 "Home Decoration": home_decore.types,
 "Textiles and rugs": textiles_decore.types,
 "Art and prints": prints_decore.types,
 "Storage and space organization": storage_decore.tyoes,
 "Curtains & Blinds": curtains_decore.types,
 "Plant decorations": plant_decore.types,
 "Pet supplies": pets_decore.types,
 "Kitchen furniture": kitchen_funiture.types,
 "Sinks and kitchen taps": kitchen_skin_taps.types,
 "Kitchen appliances": kitchen_appliances.types,
 "Cooking accessories": kitchen_cooking_accessories.types,
 "Dining table accessories": kitchen_dining_accessories.types,
 "Kitchen Textiles": kitchen_textiles.types,
 "Cookware and Bakeware": kitchen_cookware.types,
 "Spas & Wellness": wellness_spas.types,
 "Swimming pools and equipment": wellness_swimming_pools.types,
 "Gym and fitness": welness_gym_fintess.types,
 Doors: finishes_doors.types,
 Partitions: finishes_partitions.types,
 Rooflights: finishes_rooflights.types,
 "Window profiles": finishes_window_profiles.types,
 Structures: constructions_structure.types,
 Roofs: constructions_roofs.types,
 "External walls and facades": constructions_external_walls.types,
 "Paints and varnishes": constructions_paints_varnishes.types,
 "Home automation and electrical systems": constructions_home_automation.types,
 "Washbasins and bathroom fixtures": bathroom_wshbasins_fixtures.types,
 "Showers and bathtubs": bathroom_showers_bathtubs.types,
 "Bathroom Taps": bathroom_taps.types,
 "Remote control taps": bathroom_remote_control_taps.types,
 "Bathroom furniture": bathroom_furniture.types,
 "Bathroom lighting": bathroom_lighting.types,
 "Bathroom accessories": bathroom_accessories.types,
 "Laundry and household cleaning": bathroom_laundry.types,
 "Disabled bathrooms": bathroom_disabled.types,
 "Bathroom radiators": bathroom_radiators.types,
};
const shapes = {
 Chairs: chair.shapes,
 Beds: beds.shapes,
 Sofa: sofas.shapes,
 Cabinets: cabinet.shapes,
 Benches: benches.shapes,
 Table: table.shapes,
 Spotlights: spotlights.shapes,
 Lampshades: lampshades.shapes,
};

const seats = {
 Chairs: chair.seats,
 Beds: beds.seats,
 Sofa: sofas.seats,
 Cabinets: cabinet.seats,
 Benches: benches.seats,
 Table: table.seats,
};
const bases = {
 Chairs: chair.bases,
 Beds: beds.bases,
 Sofa: sofas.bases,
 Cabinets: cabinet.bases,
 Benches: benches.bases,
 Table: table.bases,
};

class Search extends Component {
 constructor(props) {
  super(props);
  this.urlString = new URLSearchParams(window.location.search);
  this.state = {
   pageLoaded: false,
   signinPassword: "",
   loadMoreButtonShow: false,
   signingEmail: "",
   signupEmail: "",
   signupPassword: "",
   signupFname: "",
   signupLname: "",
   authFace: "",
   save_to_collection_modal: false,
   categories: [],
   materials: [],
   styles: [],
   shapes: [],
   seats: [],
   bases: [],
   price: [],
   types: [],
   finishesDoorTypes: [],
   doortypes: [],
   collapsed: false,
   products: [],
   fetching: false,
   selectedKindTitle: this.props.match.params?.category
    ? this.props.match?.params?.category?.charAt(0).toUpperCase() +
      this.props?.match?.params?.category?.slice(1)
    : null,
   selectedKindOptions: [],
   selectedStyleOptions: [],
   kind_types: [],
   test_types: [],
   kind_shapes: [],
   kind_seats: [],
   kind_bases: [],
   kinds: this.props?.match?.params?.type
    ? [
       this.props?.match?.params?.type?.charAt(0).toUpperCase() +
        this.props?.match?.params?.type?.slice(1),
      ]
    : [],
   selected_type: "",
   selected_shape: "",
   selected_base: "",
   selected_kind: this.props.searchTerm ?? "",
   kidsChecked: false,
   fileChecked: false,
   outdoorChecked: false,
   productFileKind: false,
   save_menu: false,
   kind_search_term: "",
   style_search_term: "",
   material_search_term: "",
   type_search_term: "",
   base_search_term: "",
   seat_search_term: "",
   shape_search_term: "",
   category_tags: this.props.match.params?.category
    ? [
       this.props?.match?.params?.category?.charAt(0).toUpperCase() +
        this.props?.match?.params?.category?.slice(1) ?? "All Categories",
      ]
    : ["All Categories"],
   kind_tags: [],
   type_tags: [this.props.match.params?.type ?? null],
   material_tags: [],
   style_tags: [],
   shape_tags: [],
   seats_tags: [],
   doorType_tags: [],
   tags: [
    this.props.match?.params?.category ?? "All Categories",
    this.props.match.params?.type ?? null,
   ],

   authModal: false,
   to_save_cover: "",
   to_save_productId: null,
   searched: false,
   lightingInstaallationsOptions: [],
   lightingColorTempOptions: [],
   lightingTypesOptions: [],
   lightingBulbTypes: [],
   lighting_types: [],
   applied_on: [],
   colorTempraturs: [],
   bulbTypes: [],
   installations: [],
   visible: false,
   page: 1,
   loadmore: false,
  };
 }

 saveToCollection = () => {
  if (!this.props.isLoggedIn) {
   this.setState({ authModal: true });
  } else {
   this.setState({
    save_to_collection_modal: true,
   });
  }
 };

 menu = (
  <Menu onClick={this.handleMenuClick}>
   <Menu.Item key="1">1st menu item</Menu.Item>
   <Menu.Item key="2" icon={<UserOutlined />}>
    2nd menu item
   </Menu.Item>
   <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
 );

 flipToRegiseterFace = () => {
  this.setState({ authFace: "register-face" });
 };

 flipToSigninFace = () => {
  this.setState({ authFace: "signin-face" });
 };

 handleSigningIn = (email, password) => {
  this.setState({ signingIn: !this.props.isLoggedIn });
  this.props.dispatchRegularSignin(email, password);
 };

 handleRegularSignup = (fname, lname, email, password) => {
  this.props.dispatchRegularSignup(fname, lname, email, password, "regular");
 };

 onItemClick = () => {};

 fetchProducts = (loadmore = false) => {
  this.setState({
   fetching: true,
   loadmore,
   page: loadmore ? this.state.page + 1 : 1,
  }, ()=>{
     axios
   .get(
    `${API}search?filter[category]=${this.state.categories}
    &filter[kind]=${this.state.kinds}
    &filter[type]=${this.state.types}
    &filter[style]=${this.state.styles}
    &filter[material]=${this.state.materials}
    &filter[lighting_types]=${this.state.lighting_types}
    &filter[installations]=${this.state.installations}
    &filter[bulbTypes]=${this.state.bulbTypes}
    &filter[colorTempraturs]=${this.state.colorTempraturs}
    &filter[applied_on]=${this.state.applied_on}
    &filter[is_for_kids]=${this.state.kidsChecked ? "yes" : ""}
    &filter[product_file_kind]=${this.state.fileChecked ? "yes" : ""}
    &filter[is_outdoor]=${this.state.outdoorChecked ? "yes" : ""}&page=${
     this.state.page
    }`
   )
   .then((response) => {
    this.setState({
     products: loadmore
      ? [...this.state.products, ...response.data.products.data]
      : response.data.products.data,
     fetching: false,
     pageLoaded: true,
    //  page: loadmore ? response.data.products?.current_page + 1 : 1,
     loadMoreButtonShow: response.data.products?.data?.length >= 24,
    });
   });
  });
 
 };

 onCollapse = (collapsed) => {
  this.setState({ collapsed });
 };

 onCategoriesSelect = (items) => {
  this.setState(
   {
    categories: items.selectedKeys,
    selectedKindTitle: `${items.key}`,
    category_tags: [items.key],
    tags: [items.key],
   },
   () => {
    this.appendUrlParams();
    this.fetchProducts();
    console.log(items.selectedKeys);
   }
  );
  this.handleChangeKindsOptions(items.key);
 };

 handleChangeKindsOptions = (key) => {
  if (key.toLowerCase() === "furniture") {
   this.setState({
    selectedKindOptions: kind_options,
    selectedStyleOptions: furniture_styles,
    lightingTypesOptions: [],
   });
  } else if (key.toLowerCase() === "lighting") {
   this.setState({
    selectedKindOptions: lighting_kind_optios,
    selectedStyleOptions: lighting_styles,
    lightingTypesOptions: lighting_types,
   });
  } else if (key.toLowerCase() === "decore") {
   this.setState({
    selectedKindOptions: decore_kind_options,
    selectedStyleOptions: furniture_styles,
   });
  } else if (key.toLowerCase() === "finishes") {
   this.setState({
    selectedKindOptions: finishes_kind_options,
    selectedStyleOptions: furniture_styles,
   });
  } else if (key.toLowerCase() === "kitchen") {
   this.setState({
    selectedKindOptions: kitchen_kind_options,
    selectedStyleOptions: furniture_styles,
   });
  } else if (key.toLowerCase() === "wellness") {
   this.setState({
    selectedKindOptions: wellness_kind_options,
    selectedStyleOptions: furniture_styles,
   });
  } else if (key.toLowerCase() === "construction") {
   this.setState({
    selectedKindOptions: constructions_kind_options,
    selectedStyleOptions: furniture_styles,
   });
  } else if (key.toLowerCase() === "bathroom") {
   this.setState({
    selectedKindOptions: bathroom_kind_options,
    selectedStyleOptions: furniture_styles,
   });
  }
 };
 onCategoriesDeselect = (items) => {
  this.setState(
   {
    selectedKindTitle: null,
    categories: [],
    tags: ["All Categories"],
    category_tags: ["All Categories"],
   },
   () => {
    this.appendUrlParams();
    this.fetchProducts();
    window.history.pushState({}, null, "/products");
   }
  );
 };

 onKindDeselct = (items) => {
  // fitler  a NaN values
  let kinds = items.selectedKeys.filter((item) => {
   return typeof item === "string";
  });

  this.setState(
   {
    kinds,
    tags: [this.state.selectedKindTitle, ...kinds],
    kind_tags: [...kinds],
    test_types: kinds.map((kind) => {
     return types[`${kind}`];
    }),
    selected_kind: kinds,
   },
   () => {
    this.setState(
     {
      kind_types: this.state.test_types.flat(1),
     },
     () => {
      this.appendUrlParams();
      this.fetchProducts();
     }
    );
   }
  );
 };

 onMaterialsSelect = (items) => {
  this.setState(
   { materials: items.selectedKeys, material_tags: [...items.selectedKeys] },
   () => {
    this.appendUrlParams();
    this.fetchProducts();
   }
  );
 };

 onStylesSelect = (items) => {
  this.setState(
   { styles: items.selectedKeys, style_tags: [...items.selectedKeys] },
   () => {
    this.appendUrlParams();
    this.fetchProducts();
   }
  );
 };

 onKindSelect = (items) => {
  let kinds = items.selectedKeys.filter((item) => {
   return typeof item === "string";
  });
  if (kinds.includes("Pendant lamps")) {
   this.setState({
    kind_shapes: [...this.state.kind_shapes],
   });
  }

  this.setState(
   {
    kinds,
    selected_kind: items.selectedKeys,
    tags: [...this.state.tags, items.key],
    kind_tags: [...this.state.kind_tags, items.key],
    kind_types: [...this.state.kind_types, ...(types[`${items.key}`] ?? [])],
    kind_shapes: [...this.state.kind_shapes, ...(shapes[`${items.key}`] ?? [])],
    kind_seats: [...this.state.kind_seats, ...(seats[`${items.key}`] ?? [])],
    kind_bases: [...this.state.kind_bases, ...(bases[`${items.key}`] ?? [])],
   },
   () => {
    console.log(this.state.selected_kind);
    console.log(this.state.kinds);
    this.appendUrlParams();
    this.fetchProducts();
   }
  );
 };

 appendUrlParams = () => {
  const {
   kinds,
   selectedKindTitle,
   types,
   materials,
   //  shapes,
   styles,
  } = this.state;
  const _cats = selectedKindTitle ? `category=${selectedKindTitle}` : ``;
  const _kinds = kinds.length > 0 ? `&kinds=${kinds}` : ``;
  const _types = types?.length > 0 ? `&types=${types}` : ``;
  const _styles = styles?.length > 0 ? `&styles=${styles}` : ``;
  const _materials = materials?.length > 0 ? `&materials=${materials}` : ``;
  window.history.pushState(
   {},
   null,
   `/products?${_cats}${_kinds}${_types}${_materials}${_styles}`
  );
 };
 onTypeSelect = (items) => {
  if (items.selectedKeys.includes("Revolving entrance doors")) {
   this.setState({
    finishesDoorTypes: revolving_door_types,
   });
  } else if (items.selectedKeys.includes("Movable walls")) {
   this.setState({
    finishesDoorTypes: f_moveble_door_types,
   });
  }

  this.setState(
   {
    types: items.selectedKeys,
    selected_type: items.key,
    type_tags: [...items.selectedKeys],
    tags: [
     this.state.selectedKindTitle,
     ...this.state.kinds,
     ...items.selectedKeys,
    ],
   },
   () => {
    this.appendUrlParams();
    this.fetchProducts();
    console.log(this.state.selected_type);
    console.log(this.state.types);
   }
  );
 };

 onShapeSelect = (items) => {
  this.setState(
   {
    shapes: items.selectedKeys,
    selected_shape: items.key,
   },
   () => {
    this.fetchProducts();
   }
  );
 };

 onBaseSelect = (items) => {
  this.setState(
   {
    bases: items.selectedKeys,
    selected_base: items.key,
   },
   () => {
    this.fetchProducts();
    // console.log(this.state.selected_base);
   }
  );
 };

 onLightingTypesSelect = (items) => {
  this.setState(
   {
    lighting_types: items.selectedKeys,
   },
   () => {
    this.fetchProducts();
   }
  );
 };
 onSeatSelect = (items) => {
  this.setState(
   {
    seats: items.selectedKeys,
    selected_seat: items.key,
   },
   () => {
    this.fetchProducts();
   }
  );
 };
 onDoorTypeSelect = (items) => {
  this.setState(
   {
    doortypes: items.selectedKeys,
    doorType_tags: [...items.selectedKeys],
   },
   () => {
    this.fetchProducts();
   }
  );
 };
 onInstallationSelect = (items) => {
  this.setState(
   {
    installations: items.selectedKeys,
    installation_tags: [...items.selectedKeys],
   },
   () => {
    this.fetchProducts();
   }
  );
 };

 onColorTempratrueChange = (items) => {
  this.setState(
   {
    colorTempraturs: items.selectedKeys,
    // installation_tags: [...items.selectedKeys],
   },
   () => {
    this.fetchProducts();
   }
  );
 };
 onAppliedOnChange = (items) => {
  this.setState(
   {
    applied_on: items.selectedKeys,
   },
   () => {
    this.fetchProducts();
   }
  );
 };

 onBulbTypeSelect = (items) => {
  this.setState(
   {
    bulbTypes: items.selectedKeys,
   },
   () => {
    this.fetchProducts();
   }
  );
 };

 componentDidMount() {
  this.setState(
   {
    categories: this.urlString.get("category") ?? "",
    selectedKindTitle: this.urlString.get("category"),
    kinds: this.urlString.get("kinds")
     ? this.urlString.get("kinds")?.split(",")
     : [],
    category_tags: [this.urlString.get("category")] ?? [],
    kind_tags: this.urlString.get("kinds")
     ? this.urlString.get("kinds")?.split(",")
     : [],
    types: this.urlString.get("types")
     ? this.urlString.get("types")?.split(",")
     : [],
    type_tags: this.urlString.get("types")
     ? this.urlString.get("types")?.split(",")
     : [],

    materials: this.urlString.get("materials")
     ? this.urlString.get("materials")?.split(",")
     : [],
    material_tags: this.urlString.get("materials")
     ? this.urlString.get("materials")?.split(",")
     : [],
   },
   () => {
    this.fetchProducts();
   }
  );

  if (this.urlString.get("category")) {
   this.handleChangeKindsOptions(this.urlString.get("category"));
   if (this.urlString.get("kinds")) {
    let _types = this.urlString
     .get("kinds")
     ?.split(",")
     ?.map((k) => {
      return types[`${k}`];
     })
     .flat();
    let _shapes = this.urlString
     .get("kinds")
     ?.split(",")
     ?.map((k) => {
      return shapes[`${k}`];
     })
     .flat();
    console.log(_types);
    this.setState({
     kind_types: [...this.state.kind_types, ..._types],
     kind_shapes: [...this.state.kind_shapes, ..._shapes],
    });
   }
  } else {
   this.setState({
    selectedKindOptions: kind_options,
    selectedStyleOptions: furniture_styles,
    tags: ["All Categories"],
    category_tags: ["All Categories"],
   });
  }
 }
 onFilterChange = (values) => {};

 searchKind = (e) => {
  this.setState({
   kind_search_term: e.target.value,
  });
 };
 searchStyle = (e) => {
  this.setState({
   style_search_term: e.target.value,
  });
 };
 searchMaterial = (e) => {
  this.setState({
   material_search_term: e.target.value,
  });
 };
 searchType = (e) => {
  this.setState({
   type_search_term: e.target.value,
  });
 };
 searchShape = (e) => {
  this.setState({
   shape_search_term: e.target.value,
  });
 };
 searchBase = (e) => {
  this.setState({
   base_search_term: e.target.value,
  });
 };
 searchSeat = (e) => {
  this.setState({
   seat_search_term: e.target.value,
  });
 };

 handleClose = (removedTag) => {
  const tags = this.state.tags.filter((tag) => tag !== removedTag);
  this.setState({ tags });
 };

 onClearAll = () => {
  window.history.pushState({}, null, "/products");
  this.setState(
   {
    categories: [],
    kinds: [],
    types: [],
    styles: [],
    materials: [],
    tags: ["All Categories"],
    category_tags: ["All Categories"],
    type_tags: [],
    kind_tags: [],
    style_tags: [],
    material_tags: [],
    selected_kind: [],
    selectedKindTitle: null,
    bases: [],
    kind_types: [],
    kind_bases: [],
    kind_shapes: [],
    kind_seats: [],
    lighting_bulbTypes: [],
    lightingInstaallationsOptions: [],
    lightingColorTempOptions: [],
    installations: [],
    installation_tags: [],
    lightingtype_tags: [],
   },
   () => {
    this.fetchProducts();
   }
  );
 };

 onCloseTag = (tag_type, removedTag) => {
  const tags = this.state[tag_type].filter((tag) => tag !== removedTag);
  switch (tag_type) {
   case "category_tags":
    this.setState(
     {
      category_tags:
       this.state.category_tags.length < 1 ? tags : ["All Categories"],
      selectedKindTitle: null,
     },
     () => {
      window.history.pushState(
       {},
       null,
       this.state.category_tags.length < 1
        ? `/products`
        : `/products?category=${this.state.selectedKindTitle}`
      );
      this.fetchProducts();
     }
    );
    break;
   case "kind_tags":
    this.setState(
     {
      kind_tags: tags,
      kinds: this.state.kinds.filter((kind) => kind !== removedTag),
     },
     () => {
      this.appendUrlParams();
      this.fetchProducts();
     }
    );
    break;
   case "type_tags":
    this.setState(
     {
      type_tags: tags,
      types: this.state.types.filter((type) => type !== removedTag),
     },
     () => {
      this.appendUrlParams();
      this.fetchProducts();
     }
    );
    break;
   case "material_tags":
    this.setState(
     {
      material_tags: tags,
      materials: this.state.materials.filter(
       (material) => material !== removedTag
      ),
     },
     () => {
      this.appendUrlParams();
      this.fetchProducts();
     }
    );
    break;
   case "style_tags":
    this.setState(
     {
      style_tags: tags,
      styles: this.state.styles.filter((style) => style !== removedTag),
     },
     () => {
      this.appendUrlParams();

      this.fetchProducts();
     }
    );
    break;
   case "doorType":
    this.setState(
     {
      doorType_tags: tags,
      doortypes: this.state.doortypes.filter((style) => style !== removedTag),
     },
     () => {
      this.appendUrlParams();
      this.fetchProducts();
     }
    );
    break;
   default:
    break;
  }
 };

 handleInputConfirm = () => {
  const { inputValue } = this.state;
  let { tags } = this.state;
  if (inputValue && tags.indexOf(inputValue) === -1) {
   tags = [...tags, inputValue];
  }
  this.setState({
   tags,
   inputVisible: false,
   inputValue: "",
  });
 };
 render() {
  return (
   <>
    <div id="search-page">
     <Row span={24} style={{ position: "relative" }}>
      <Col
       lg={5}
       md={4}
       sm={6}
       xs={0}
       style={{ background: "" }}
       className="only-wide"
      >
       <Sider
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        width={"100%"}
        className="site-layout-background"
        style={{ background: "#fff" }}
       >
        <div id="tags">
         <p>Filters</p>

         {this.state.category_tags.map((cat_tag) => {
          if (cat_tag) {
           return (
            <>
             <Tag
              closable={!cat_tag == "All Categories"}
              onClose={(e) => {
               e.preventDefault();
               this.onCloseTag("category_tags", cat_tag);
              }}
             >
              {cat_tag}
             </Tag>
            </>
           );
          }
         })}
         {this.state.kind_tags.map((kind_tag) => {
          if (kind_tag) {
           return (
            <>
             <Tag
              closable
              onClose={(e) => {
               e.preventDefault();
               this.onCloseTag("kind_tags", kind_tag);
              }}
             >
              {kind_tag}
             </Tag>
            </>
           );
          }
         })}
         {this.state.type_tags.map((type_tag) => {
          if (type_tag) {
           return (
            <>
             <Tag
              closable
              onClose={(e) => {
               e.preventDefault();
               this.onCloseTag("type_tags", type_tag);
              }}
             >
              {type_tag}
             </Tag>
            </>
           );
          }
         })}
         {this.state.doorType_tags.map((type_tag) => {
          if (type_tag) {
           return (
            <>
             <Tag
              closable
              onClose={(e) => {
               e.preventDefault();
               this.onCloseTag("doorType", type_tag);
              }}
             >
              {type_tag}
             </Tag>
            </>
           );
          }
         })}
         {this.state.material_tags.map((mat_tag) => {
          if (mat_tag) {
           return (
            <>
             <Tag
              closable
              onClose={(e) => {
               e.preventDefault();
               this.onCloseTag("material_tags", mat_tag);
              }}
             >
              {mat_tag}
             </Tag>
            </>
           );
          }
         })}
         {this.state.style_tags.map((style_tag) => {
          if (style_tag) {
           return (
            <>
             <Tag
              closable
              onClose={(e) => {
               e.preventDefault();
               this.onCloseTag("style_tags", style_tag);
              }}
             >
              {style_tag}
             </Tag>
            </>
           );
          }
         })}
         {this.state.category_tags.length + this.state.type_tags.length > 0 &&
          this.state.category_tags[0] != "All Categories" &&
          (this.props?.match?.params?.category ? (
           <>
            <Link
             to={{
              pathname: `/products`,
             }}
             style={{
              fontSize: ".7rem",
              fontWeight: "600",
              textDecoration: "underline",
             }}
             onClick={this.onClearAll}
            >
             Clear All
            </Link>
           </>
          ) : (
           <>
            <button
             style={{
              fontSize: ".7rem",
              fontWeight: "600",
              textDecoration: "underline",
             }}
             onClick={this.onClearAll}
            >
             Clear All
            </button>
           </>
          ))}
        </div>
        <Form onFieldsChange={this.onFilterChange}>
         <Menu
          mode="inline"
          onSelect={this.onCategoriesSelect}
          onDeselect={this.onCategoriesDeselect}
          selectedKeys={this.state.selectedKindTitle}
          defaultOpenKeys={["categories"]}
          defaultSelectedKeys={[
           this.props.match.params.category?.charAt(0).toUpperCase() +
            this.props.match.params.category?.slice(1),
          ]}
          style={{ height: "100%", borderRight: 0, width: "100%" }}
         >
          <div>
           <SubMenu
            key="categories"
            title="All Categories"
            onTitleClick={this.onItemClick}
           >
            <Menu.Item key="furniture">Furniture</Menu.Item>
            <Menu.Item key="lighting">Lighting</Menu.Item>
            <Menu.Item key="decore">Decore</Menu.Item>
            <Menu.Item key="kitchen">Kitchen</Menu.Item>
            <Menu.Item key="bathroom">Bathroom</Menu.Item>
            <Menu.Item key="wellness">Wellness</Menu.Item>
            <Menu.Item key="finishes">Finishes</Menu.Item>
            <Menu.Item key="construction">Construction</Menu.Item>
           </SubMenu>
          </div>
         </Menu>
         {this.state.selectedKindTitle && (
          <>
           <Menu
            mode="inline"
            multiple={true}
            onSelect={this.onKindSelect}
            onDeselect={this.onKindDeselct}
            selectedKeys={this.state.kinds}
            defaultSelectedKeys={[
             this.props.match.params.type?.charAt(0).toUpperCase() +
              this.props.match.params.type?.slice(1),
            ]}
           >
            <div>
             <SubMenu
              key="kinds"
              title={`All ${this.state.selectedKindTitle}`}
              className="scrollable-menu"
             >
              <Menu.Item
               disabled={true}
               style={{ height: "45px !important" }}
               className="search"
              >
               <Input
                allowClear
                size="large"
                style={{ width: "100%", margin: "10px auto" }}
                placeholder={`Search ${this.state.selectedKindTitle}`}
                onChange={this.searchKind}
               />
              </Menu.Item>

              {this.state.selectedKindOptions.map((option, index) => {
               if (
                option.value
                 .toLowerCase()
                 .includes(this.state.kind_search_term.toLowerCase())
               ) {
                return (
                 <>
                  <Menu.Item key={option.value}>{option.value}</Menu.Item>
                 </>
                );
               }
              })}
             </SubMenu>
            </div>
           </Menu>
          </>
         )}
         {this.state.kind_types.length > 0 && (
          <>
           <>
            <Menu
             mode="inline"
             multiple={true}
             selectedKeys={this.state.types}
             onSelect={this.onTypeSelect}
             onDeselect={this.onTypeSelect}
            >
             <div>
              <SubMenu key="types" title="Types" className="scrollable-menu">
               <Menu.Item
                disabled={true}
                style={{ height: "45px !important" }}
                className="search"
               >
                <Input
                 allowClear
                 size="large"
                 style={{ width: "100%", margin: "10px auto" }}
                 placeholder={`Search ${this.state.selectedKindTitle} Types`}
                 onChange={this.searchType}
                />
               </Menu.Item>
               {this.state.kind_types.map((type, index) => {
                if (type) {
                 if (
                  type.value
                   .toLowerCase()
                   .includes(this.state.type_search_term.toLowerCase())
                 ) {
                  return (
                   <>
                    <Menu.Item key={type.value}>{type.value}</Menu.Item>
                   </>
                  );
                 }
                }
               })}
              </SubMenu>
             </div>
            </Menu>
           </>
          </>
         )}
         {this.state.finishesDoorTypes.length > 0 && (
          <>
           <Menu
            mode="inline"
            multiple={true}
            selectedKeys={this.state.doortypes}
            onSelect={this.onDoorTypeSelect}
            onDeselect={this.onDoorTypeSelect}
           >
            <div>
             <SubMenu
              key="door_types"
              title="Door Type"
              className="scrollable-menu"
             >
              {this.state.finishesDoorTypes.map((doorType, index) => {
               if (doorType) {
                return (
                 <>
                  <Menu.Item key={doorType.value}>{doorType.value}</Menu.Item>
                 </>
                );
               }
              })}
             </SubMenu>
            </div>
           </Menu>
          </>
         )}
         {this.state.kind_shapes.length > 0 && (
          <>
           <Menu
            mode="inline"
            multiple={true}
            onSelect={this.onShapeSelect}
            onDeselect={this.onShapeSelect}
           >
            <div>
             <SubMenu key="shapes" title="Shapes" className="scrollable-menu">
              <Menu.Item
               disabled={true}
               style={{ height: "45px !important" }}
               className="search shapes"
              >
               <Input
                allowClear
                size="large"
                style={{ width: "100%", margin: "10px auto" }}
                placeholder={`Search ${this.state.selectedKindTitle} Shapes`}
                onChange={this.searchShape}
               />
              </Menu.Item>
              {this.state.kind_shapes.map((shape, index) => {
               if (
                shape?.value
                 .toLowerCase()
                 .includes(this.state.shape_search_term.toLowerCase())
               ) {
                return (
                 <>
                  <Menu.Item key={shape?.value}>{shape?.value}</Menu.Item>
                 </>
                );
               }
              })}
             </SubMenu>
            </div>
           </Menu>
          </>
         )}
         <Menu
          mode="inline"
          multiple={true}
          selectedKeys={this.state.materials}
          onSelect={this.onMaterialsSelect}
          onDeselect={this.onMaterialsSelect}
         >
          <div>
           <SubMenu
            key="materials"
            title="Materials"
            className="scrollable-menu"
           >
            <Menu.Item
             disabled={true}
             style={{ height: "45px !important" }}
             className="search"
            >
             <Input
              allowClear
              size="large"
              style={{ width: "100%", margin: "10px auto" }}
              placeholder={`Search ${this.state.selectedKindTitle} Materials`}
              onChange={this.searchMaterial}
             />
            </Menu.Item>
            {furniture_materials.map((material, index) => {
             if (
              material.value
               .toLowerCase()
               .includes(this.state.material_search_term.toLowerCase())
             ) {
              return (
               <>
                <Menu.Item key={material.value}>{material.value}</Menu.Item>
               </>
              );
             }
            })}
           </SubMenu>
          </div>
         </Menu>
         {this.state.selectedStyleOptions.length > 0 && (
          <>
           <Menu
            mode="inline"
            multiple={true}
            selectedKeys={this.state.styles}
            onSelect={this.onStylesSelect}
            onDeselect={this.onStylesSelect}
           >
            <div>
             <SubMenu key="styles" title="Style" className="scrollable-menu">
              <Menu.Item
               disabled={true}
               style={{ height: "45px !important" }}
               className="search"
              >
               <Input
                allowClear
                size="large"
                style={{ width: "100%", margin: "10px auto" }}
                placeholder={`Search ${this.state.selectedKindTitle} Styles`}
                onChange={this.searchStyle}
               />
              </Menu.Item>
              {this.state.selectedStyleOptions.map((style, index) => {
               if (
                style.value
                 .toLowerCase()
                 .includes(this.state.style_search_term.toLowerCase())
               ) {
                return (
                 <>
                  <Menu.Item key={style.value}>{style.value}</Menu.Item>
                 </>
                );
               }
              })}
             </SubMenu>
            </div>
           </Menu>
          </>
         )}

         {this.state.kind_bases.length > 0 && (
          <>
           <>
            <Menu
             mode="inline"
             multiple={true}
             onSelect={this.onBaseSelect}
             onDeselect={this.onBaseSelect}
            >
             <div>
              <SubMenu key="bases" title="Bases" className="scrollable-menu">
               <Menu.Item
                disabled={true}
                style={{ height: "45px !important" }}
                className="search"
               >
                <Input
                 allowClear
                 size="large"
                 style={{ width: "100%", margin: "10px auto" }}
                 placeholder={`Search ${this.state.selectedKindTitle} Bases`}
                 onChange={this.searchBase}
                />
               </Menu.Item>
               {this.state.kind_bases.map((base, index) => {
                if (
                 base.value
                  .toLowerCase()
                  .includes(this.state.base_search_term.toLowerCase())
                ) {
                 return (
                  <>
                   <Menu.Item key={base.value}>{base.value}</Menu.Item>
                  </>
                 );
                }
               })}
              </SubMenu>
             </div>
            </Menu>
           </>
          </>
         )}
         {this.state.kind_seats.length > 0 && (
          <>
           <>
            <Menu
             mode="inline"
             multiple={true}
             onSelect={this.onSeatSelect}
             onDeselect={this.onSeatSelect}
            >
             <div>
              <SubMenu key="seats" title="Seats" className="scrollable-menu">
               <Menu.Item
                disabled={true}
                style={{ height: "45px !important" }}
                className="search"
               >
                <Input
                 allowClear
                 size="large"
                 style={{ width: "100%", margin: "10px auto" }}
                 placeholder={`Search ${this.state.selectedKindTitle} Seats`}
                 onChange={this.searchSeat}
                />
               </Menu.Item>
               {this.state.kind_seats.map((seat, index) => {
                if (
                 seat.value
                  .toLowerCase()
                  .includes(this.state.seat_search_term.toLowerCase())
                ) {
                 return (
                  <>
                   <Menu.Item key={seat.value}>{seat.value}</Menu.Item>
                  </>
                 );
                }
               })}
              </SubMenu>
             </div>
            </Menu>
           </>
          </>
         )}
         {this.state.selectedKindTitle?.toLowerCase() === "lighting" && (
          <>
           <Menu
            mode="inline"
            multiple={true}
            onSelect={this.onLightingTypesSelect}
            onDeselect={this.onLightingTypesSelect}
           >
            <div>
             <SubMenu
              key="lighting_types"
              title="Lighting Types"
              className="scrollable-menu"
             >
              {lighting_types.map((type, index) => {
               return (
                <>
                 <Menu.Item key={type.value}>{type.value}</Menu.Item>
                </>
               );
              })}
             </SubMenu>
            </div>
           </Menu>
           <Menu
            mode="inline"
            multiple={true}
            onSelect={this.onInstallationSelect}
            selectedKeys={this.state.installations}
            onDeselect={this.onInstallationSelect}
           >
            <div>
             <SubMenu
              key="installation"
              title="Installation"
              className="scrollable-menu"
             >
              {lighting_installation.map((ins, index) => {
               return (
                <>
                 <Menu.Item key={ins.value}>{ins.value}</Menu.Item>
                </>
               );
              })}
             </SubMenu>
            </div>
           </Menu>
           <Menu
            mode="inline"
            multiple={true}
            onSelect={this.onColorTempratrueChange}
            onDeselect={this.onColorTempratrueChange}
           >
            <div>
             <SubMenu
              key="colortemp"
              title="Color Temprature"
              className="scrollable-menu"
             >
              {lighitng_colorTemprature.map((color, index) => {
               return (
                <>
                 <Menu.Item key={color.value}>{color.value}</Menu.Item>
                </>
               );
              })}
             </SubMenu>
            </div>
           </Menu>
           <Menu
            mode="inline"
            multiple={true}
            onSelect={this.onBulbTypeSelect}
            onDeselect={this.onBulbTypeSelect}
           >
            <SubMenu
             key="bulbtypes"
             title="Blub Type"
             className="scrollable-menu"
            >
             {lighting_bulbTypes.map((bulb, index) => {
              return (
               <>
                <Menu.Item key={bulb.value}>{bulb.value}</Menu.Item>
               </>
              );
             })}
            </SubMenu>
           </Menu>
          </>
         )}
         {this.state.selectedKindTitle?.toLowerCase() === "finishes" && (
          <>
           <Menu
            mode="inline"
            multiple={true}
            //  onSelect={this.onSeatSelect}
            //  onDeselect={this.onSeatSelect}
           >
            <div>
             <SubMenu
              key="finishes_applied"
              title="Applied On"
              className="scrollable-menu"
             >
              {finishes_applied_on.map((opt, index) => {
               return (
                <>
                 <Menu.Item key={opt?.value}>{opt?.value}</Menu.Item>
                </>
               );
              })}
             </SubMenu>
            </div>
           </Menu>
          </>
         )}
        </Form>
       </Sider>
      </Col>
      <Col lg={19} md={20} sm={18} xs={24} className="px-3">
       {!this.state.visible && (
        <Row span={24} className="filter-checks">
         <Col md={12}>
          <div className="checkboxes">
           <Checkbox
            value={this.state.kidsChecked}
            onChange={(e) => {
             this.setState(
              {
               kidsChecked: e.target.checked,
              },
              () => {
               this.fetchProducts();
              }
             );
            }}
            style={{
             lineHeight: "32px",
             marginRight: "10px",
             borderRadius: "15px",
             padding: "0px 15px",
             //  border: "0.5px solid #EAEAEA",
             border: "0.5px solid #d3d3d3",
            }}
           >
            For Kids
           </Checkbox>
           <Checkbox
            value={this.state.fileChecked}
            onChange={(e) => {
             this.setState(
              {
               fileChecked: e.target.checked,
              },
              () => {
               this.fetchProducts();
              }
             );
             console.log(e);
            }}
            style={{
             lineHeight: "32px",
             marginRight: "25px",
             borderRadius: "25px",
             padding: "0px 15px",
             border: "0.5px solid #d3d3d3",

             //  border: "0.5px solid #EAEAEA",
            }}
           >
            3D / Cad
           </Checkbox>
          </div>
         </Col>
         <Col md={12} className="sorts">
          <div
           style={{
            display: "grid",
            gridTemplateColumns: "auto auto ",
            justifyContent: "flex-end",
           }}
          >
           <Dropdown overlay={this.menu}>
            <Button
             style={{
              border: "none",
              boxShadow: "none",
              fontSize: ".9rem",
              fontWeight: "600",
              textAlign: "right",
             }}
            >
             Room /Space
             <CaretDownOutlined />
            </Button>
           </Dropdown>
           <Dropdown overlay={this.menu}>
            <Button
             style={{
              border: "none",
              boxShadow: "none",
              fontSize: ".9rem",
              textAlign: "right",
              fontWeight: "600",
             }}
            >
             Sort By <CaretDownOutlined />
            </Button>
           </Dropdown>
          </div>
         </Col>
        </Row>
       )}
       {this.state.fetching && !this.state.loadmore && (
        <>
         <Spin
          size="large"
          className="load-data-spinner"
          indicator={
           <LoadingOutlined style={{ fontSize: "36px", color: "#000" }} spin />
          }
         />
        </>
       )}
       <Row
        gutter={{
         lg: 24,
         md: 24,
         sm: 12,
         xs: 12,
        }}
        className="my-3 search-wrapper"
       >
        {(!this.state.fetching || this.state.loadmore) &&
         // !this.state.loadmore &&

         this.state.products?.map((product, index) => {
          if (product.preview_cover) {
           return (
            <>
             <Col
              className="gutter-row mb-4"
              lg={8}
              md={8}
              sm={12}
              xs={12}
              key={product?.id}
             >
              <div className="product">
               <a href={`/product/${product?.product_id}`}>
                <div
                 className="p-img"
                 style={{
                  background: `url(${product?.preview_cover})`,
                 }}
                >
                 <div className="prlayer"></div>
                 <div
                  className="actns-btn svbtn"
                  onClick={(e) => {
                   e.preventDefault();
                   this.setState(
                    {
                     to_save_cover: product?.preview_cover,
                     to_save_productId: product,
                    },
                    () => {
                     this.saveToCollection();
                    }
                   );
                  }}
                 >
                  Save +
                 </div>
                 {product?.file?.length > 0 ? (
                  <>
                   <div className="actns-btn file-btn cad">CAD</div>
                   <div className="actns-btn file-btn threeD">3D</div>
                  </>
                 ) : (
                  ""
                 )}
                </div>
               </a>

               <h5 className="product-store">
                {product?.store_name?.store_name}
               </h5>

               {/* <p className="product-name">{product?.identity[0]?.name}</p> */}
               {/* <p className="product-name">{product?.identity[0]?.name?.s}</p> */}
               {product?.name?.length < 40 ? (
                <p className="product-name">{product?.name}</p>
               ) : (
                <p className="product-name">{`${product?.name?.slice(
                 0,
                 35
                )}...`}</p>
               )}
               <div className="product-price">
                {product?.preview_price && product?.preview_price > 0 ? (
                 <>
                  <span>¥ {product?.preview_price}</span>
                 </>
                ) : (
                 <Link
                  to={{
                   pathname: `/product/${product?.product_id}`,
                   state: {
                    request_price: true,
                   },
                  }}
                 >
                  REQUEST PRICE INFO
                 </Link>
                )}
               </div>
              </div>
             </Col>
            </>
           );
          }
         })}
        {this.state.loadMoreButtonShow && (
         <Col xs={24}>
          <button
           className="loadmore-search"
           onClick={() => {
            this.fetchProducts(true);
           }}
          >
           {this.state.fetching ? (
            <Spin
             size="large"
             indicator={
              <LoadingOutlined
               style={{ fontSize: "24px", color: "#fff" }}
               spin
              />
             }
            />
           ) : (
            "LOAD MORE"
           )}
          </button>
         </Col>
        )}
        {this.state.products.length < 1 &&
         !this.state.fetching &&
         this.state.pageLoaded && (
          <>
           <p
            style={{
             position: "absolute",
             top: "50%",
             right: "50%",
             fontSize: "2rem",
             fontWeight: "500",
             fontFamily: "Roboto",
            }}
           >
            0 Results
           </p>
          </>
         )}
       </Row>
       {!this.state.pageLoaded && (
        <>
         <Row
          gutter={{
           lg: 24,
           md: 24,
           sm: 12,
           xs: 12,
          }}
          className="my-3"
         >
          <Col className="gutter-row mb-3" lg={8} md={8} sm={12} xs={12}>
           <div
            style={{
             width: "100%",
             overflow: "hidden",
            }}
           >
            <Skeleton.Avatar
             active={true}
             //  size={"80%"}
             shape={"square"}
             block={true}
            />
           </div>
          </Col>
          <Col className="gutter-row mb-3" lg={8} md={8} sm={12} xs={12}>
           <div
            style={{
             //  width: "100%",
             overflow: "hidden",
            }}
           >
            <Skeleton.Avatar
             active={true}
             //  size={"100%"}
             shape={"square"}
             block={true}
            />
           </div>
          </Col>
          <Col className="gutter-row mb-3" lg={8} md={8} sm={12} xs={12}>
           <div
            style={{
             width: "100%",
             overflow: "hidden",
            }}
           >
            <Skeleton.Avatar
             active={true}
             //  size={350}
             shape={"square"}
             block={true}
            />
           </div>
          </Col>
          <Col className="gutter-row mb-3" lg={8} md={8} sm={12} xs={12}>
           <div
            style={{
             width: "100%",
             overflow: "hidden",
            }}
           >
            <Skeleton.Avatar
             active={true}
             //  size={350}
             shape={"square"}
             block={true}
            />
           </div>
          </Col>
          <Col className="gutter-row mb-3" lg={8} md={8} sm={12} xs={12}>
           <div
            style={{
             width: "100%",
             overflow: "hidden",
            }}
           >
            <Skeleton.Avatar
             active={true}
             size={350}
             shape={"square"}
             block={true}
            />
           </div>
          </Col>
          <Col className="gutter-row mb-3" lg={8} md={8} sm={12} xs={12}>
           <div
            style={{
             width: "100%",
             overflow: "hidden",
            }}
           >
            <Skeleton.Avatar
             active={true}
             size={350}
             shape={"square"}
             block={true}
            />
           </div>
          </Col>
         </Row>
        </>
       )}
      </Col>
     </Row>

     <button
      id="sticky-filter"
      className="only-mobile"
      onClick={() => {
       this.setState({ visible: true });
      }}
     >
      <HiAdjustments /> Filters
     </button>
     <Drawer
      id="filter-mobile-drawer"
      placement="left"
      // closable={true}
      closable={false}
      onClose={() => {
       this.setState({ visible: false });
      }}
      visible={this.state.visible}
      key="left"
      mask={false}
      width={"100%"}
      height={"100vw"}
     >
      <Sider
       collapsed={this.state.collapsed}
       onCollapse={this.onCollapse}
       width={"100%"}
       className="site-layout-background"
       style={{ background: "#fff" }}
      >
       <div id="tags">
        <div className="filter-head">
         <p>Filters</p>
         <p className="done" onClick={() => this.setState({ visible: false })}>
          Done
         </p>
        </div>

        {this.state.category_tags?.map((cat_tag) => {
         if (cat_tag) {
          return (
           <>
            <Tag
             closable={!cat_tag == "All Categories"}
             onClose={(e) => {
              e.preventDefault();
              this.onCloseTag("category_tags", cat_tag);
             }}
            >
             {cat_tag}
            </Tag>
           </>
          );
         }
        })}
        {this.state.kind_tags.map((kind_tag) => {
         if (kind_tag) {
          return (
           <>
            <Tag
             closable
             onClose={(e) => {
              e.preventDefault();
              this.onCloseTag("kind_tags", kind_tag);
             }}
            >
             {kind_tag}
            </Tag>
           </>
          );
         }
        })}
        {this.state.type_tags.map((type_tag) => {
         if (type_tag) {
          return (
           <>
            <Tag
             closable
             onClose={(e) => {
              e.preventDefault();
              this.onCloseTag("type_tags", type_tag);
             }}
            >
             {type_tag}
            </Tag>
           </>
          );
         }
        })}
        {this.state.doorType_tags.map((type_tag) => {
         if (type_tag) {
          return (
           <>
            <Tag
             closable
             onClose={(e) => {
              e.preventDefault();
              this.onCloseTag("doorType", type_tag);
             }}
            >
             {type_tag}
            </Tag>
           </>
          );
         }
        })}
        {this.state.material_tags.map((mat_tag) => {
         if (mat_tag) {
          return (
           <>
            <Tag
             closable
             onClose={(e) => {
              e.preventDefault();
              this.onCloseTag("material_tags", mat_tag);
             }}
            >
             {mat_tag}
            </Tag>
           </>
          );
         }
        })}
        {this.state.style_tags.map((style_tag) => {
         if (style_tag) {
          return (
           <>
            <Tag
             closable
             onClose={(e) => {
              e.preventDefault();
              this.onCloseTag("style_tags", style_tag);
             }}
            >
             {style_tag}
            </Tag>
           </>
          );
         }
        })}
        {this.state.category_tags.length + this.state.type_tags.length > 0 &&
         this.state.category_tags[0] !== "All Categories" &&
         (this.props?.match?.params?.category ? (
          <>
           <Link
            to={{
             pathname: `/products`,
            }}
            style={{
             fontSize: ".7rem",
             fontWeight: "600",
             textDecoration: "underline",
            }}
            onClick={this.onClearAll}
           >
            Clear All
           </Link>
          </>
         ) : (
          <>
           <button
            style={{
             fontSize: ".7rem",
             fontWeight: "600",
             textDecoration: "underline",
            }}
            onClick={this.onClearAll}
           >
            Clear All
           </button>
          </>
         ))}
       </div>
       <Form onFieldsChange={this.onFilterChange}>
        <Menu
         mode="inline"
         onSelect={this.onCategoriesSelect}
         onDeselect={this.onCategoriesDeselect}
         selectedKeys={this.state.selectedKindTitle}
         defaultOpenKeys={["categories"]}
         defaultSelectedKeys={[
          this.props.match.params.category?.charAt(0).toUpperCase() +
           this.props.match.params.category?.slice(1),
         ]}
         style={{ height: "100%", borderRight: 0, width: "100%" }}
        >
         <div>
          <SubMenu
           key="categories"
           title="All Categories"
           onTitleClick={this.onItemClick}
          >
           <Menu.Item key="furniture">Furniture</Menu.Item>
           <Menu.Item key="lighting">Lighting</Menu.Item>
           <Menu.Item key="decore">Decore</Menu.Item>
           <Menu.Item key="kitchen">Kitchen</Menu.Item>
           <Menu.Item key="bathroom">Bathroom</Menu.Item>
           <Menu.Item key="wellness">Wellness</Menu.Item>
           <Menu.Item key="finishes">Finishes</Menu.Item>
           <Menu.Item key="construction">Construction</Menu.Item>
          </SubMenu>
         </div>
        </Menu>
        {this.state.selectedKindTitle && (
         <>
          <Menu
           mode="inline"
           multiple={true}
           onSelect={this.onKindSelect}
           onDeselect={this.onKindDeselct}
           selectedKeys={this.state.kinds}
           defaultSelectedKeys={[
            this.props.match.params.type?.charAt(0).toUpperCase() +
             this.props.match.params.type?.slice(1),
           ]}
          >
           <div>
            <SubMenu
             key="kinds"
             title={`All ${this.state.selectedKindTitle}`}
             className="scrollable-menu"
            >
             <Menu.Item
              disabled={true}
              style={{ height: "45px !important" }}
              className="search"
             >
              <Input
               allowClear
               size="large"
               style={{ width: "100%", margin: "10px auto" }}
               placeholder={`Search ${this.state.selectedKindTitle}`}
               onChange={this.searchKind}
              />
             </Menu.Item>

             {this.state.selectedKindOptions.map((option, index) => {
              if (
               option.value
                .toLowerCase()
                .includes(this.state.kind_search_term.toLowerCase())
              ) {
               return (
                <>
                 <Menu.Item key={option.value}>{option.value}</Menu.Item>
                </>
               );
              }
             })}
            </SubMenu>
           </div>
          </Menu>
         </>
        )}
        {this.state.kind_types.length > 0 && (
         <>
          <>
           <Menu
            mode="inline"
            multiple={true}
            selectedKeys={this.state.types}
            onSelect={this.onTypeSelect}
            onDeselect={this.onTypeSelect}
           >
            <div>
             <SubMenu key="types" title="Types" className="scrollable-menu">
              <Menu.Item
               disabled={true}
               style={{ height: "45px !important" }}
               className="search"
              >
               <Input
                allowClear
                size="large"
                style={{ width: "100%", margin: "10px auto" }}
                placeholder={`Search ${this.state.selectedKindTitle} Types`}
                onChange={this.searchType}
               />
              </Menu.Item>
              {this.state.kind_types.map((type, index) => {
               if (type) {
                if (
                 type.value
                  .toLowerCase()
                  .includes(this.state.type_search_term.toLowerCase())
                ) {
                 return (
                  <>
                   <Menu.Item key={type.value}>{type.value}</Menu.Item>
                  </>
                 );
                }
               }
              })}
             </SubMenu>
            </div>
           </Menu>
          </>
         </>
        )}
        {this.state.finishesDoorTypes.length > 0 && (
         <>
          <Menu
           mode="inline"
           multiple={true}
           selectedKeys={this.state.doortypes}
           onSelect={this.onDoorTypeSelect}
           onDeselect={this.onDoorTypeSelect}
          >
           <div>
            <SubMenu
             key="door_types"
             title="Door Type"
             className="scrollable-menu"
            >
             {this.state.finishesDoorTypes.map((doorType, index) => {
              if (doorType) {
               return (
                <>
                 <Menu.Item key={doorType.value}>{doorType.value}</Menu.Item>
                </>
               );
              }
             })}
            </SubMenu>
           </div>
          </Menu>
         </>
        )}
        {this.state.kind_shapes.length > 0 && (
         <>
          <Menu
           mode="inline"
           multiple={true}
           onSelect={this.onShapeSelect}
           onDeselect={this.onShapeSelect}
          >
           <div>
            <SubMenu key="shapes" title="Shapes" className="scrollable-menu">
             <Menu.Item
              disabled={true}
              style={{ height: "45px !important" }}
              className="search shapes"
             >
              <Input
               allowClear
               size="large"
               style={{ width: "100%", margin: "10px auto" }}
               placeholder={`Search ${this.state.selectedKindTitle} Shapes`}
               onChange={this.searchShape}
              />
             </Menu.Item>
             {this.state.kind_shapes.map((shape, index) => {
              if (
               shape?.value
                .toLowerCase()
                .includes(this.state.shape_search_term.toLowerCase())
              ) {
               return (
                <>
                 <Menu.Item key={shape?.value}>{shape?.value}</Menu.Item>
                </>
               );
              }
             })}
            </SubMenu>
           </div>
          </Menu>
         </>
        )}
        <Menu
         mode="inline"
         multiple={true}
         selectedKeys={this.state.materials}
         onSelect={this.onMaterialsSelect}
         onDeselect={this.onMaterialsSelect}
        >
         <div>
          <SubMenu
           key="materials"
           title="Materials"
           className="scrollable-menu"
          >
           <Menu.Item
            disabled={true}
            style={{ height: "45px !important" }}
            className="search"
           >
            <Input
             allowClear
             size="large"
             style={{ width: "100%", margin: "10px auto" }}
             placeholder={`Search ${this.state.selectedKindTitle} Materials`}
             onChange={this.searchMaterial}
            />
           </Menu.Item>
           {furniture_materials.map((material, index) => {
            if (
             material.value
              .toLowerCase()
              .includes(this.state.material_search_term.toLowerCase())
            ) {
             return (
              <>
               <Menu.Item key={material.value}>{material.value}</Menu.Item>
              </>
             );
            }
           })}
          </SubMenu>
         </div>
        </Menu>
        {this.state.selectedStyleOptions.length > 0 && (
         <>
          <Menu
           mode="inline"
           multiple={true}
           selectedKeys={this.state.styles}
           onSelect={this.onStylesSelect}
           onDeselect={this.onStylesSelect}
          >
           <div>
            <SubMenu key="styles" title="Style" className="scrollable-menu">
             <Menu.Item
              disabled={true}
              style={{ height: "45px !important" }}
              className="search"
             >
              <Input
               allowClear
               size="large"
               style={{ width: "100%", margin: "10px auto" }}
               placeholder={`Search ${this.state.selectedKindTitle} Styles`}
               onChange={this.searchStyle}
              />
             </Menu.Item>
             {this.state.selectedStyleOptions.map((style, index) => {
              if (
               style.value
                .toLowerCase()
                .includes(this.state.style_search_term.toLowerCase())
              ) {
               return (
                <>
                 <Menu.Item key={style.value}>{style.value}</Menu.Item>
                </>
               );
              }
             })}
            </SubMenu>
           </div>
          </Menu>
         </>
        )}

        {this.state.kind_bases.length > 0 && (
         <>
          <>
           <Menu
            mode="inline"
            multiple={true}
            onSelect={this.onBaseSelect}
            onDeselect={this.onBaseSelect}
           >
            <div>
             <SubMenu key="bases" title="Bases" className="scrollable-menu">
              <Menu.Item
               disabled={true}
               style={{ height: "45px !important" }}
               className="search"
              >
               <Input
                allowClear
                size="large"
                style={{ width: "100%", margin: "10px auto" }}
                placeholder={`Search ${this.state.selectedKindTitle} Bases`}
                onChange={this.searchBase}
               />
              </Menu.Item>
              {this.state.kind_bases.map((base, index) => {
               if (
                base.value
                 .toLowerCase()
                 .includes(this.state.base_search_term.toLowerCase())
               ) {
                return (
                 <>
                  <Menu.Item key={base.value}>{base.value}</Menu.Item>
                 </>
                );
               }
              })}
             </SubMenu>
            </div>
           </Menu>
          </>
         </>
        )}
        {this.state.kind_seats.length > 0 && (
         <>
          <>
           <Menu
            mode="inline"
            multiple={true}
            onSelect={this.onSeatSelect}
            onDeselect={this.onSeatSelect}
           >
            <div>
             <SubMenu key="seats" title="Seats" className="scrollable-menu">
              <Menu.Item
               disabled={true}
               style={{ height: "45px !important" }}
               className="search"
              >
               <Input
                allowClear
                size="large"
                style={{ width: "100%", margin: "10px auto" }}
                placeholder={`Search ${this.state.selectedKindTitle} Seats`}
                onChange={this.searchSeat}
               />
              </Menu.Item>
              {this.state.kind_seats.map((seat, index) => {
               if (
                seat.value
                 .toLowerCase()
                 .includes(this.state.seat_search_term.toLowerCase())
               ) {
                return (
                 <>
                  <Menu.Item key={seat.value}>{seat.value}</Menu.Item>
                 </>
                );
               }
              })}
             </SubMenu>
            </div>
           </Menu>
          </>
         </>
        )}
        {this.state.selectedKindTitle?.toLowerCase() === "lighting" && (
         <>
          <Menu
           mode="inline"
           multiple={true}
           onSelect={this.onLightingTypesSelect}
           onDeselect={this.onLightingTypesSelect}
          >
           <div>
            <SubMenu
             key="lighting_types"
             title="Lighting Types"
             className="scrollable-menu"
            >
             {lighting_types.map((type, index) => {
              return (
               <>
                <Menu.Item key={type.value}>{type.value}</Menu.Item>
               </>
              );
             })}
            </SubMenu>
           </div>
          </Menu>
          <Menu
           mode="inline"
           multiple={true}
           onSelect={this.onInstallationSelect}
           selectedKeys={this.state.installations}
           onDeselect={this.onInstallationSelect}
          >
           <div>
            <SubMenu
             key="installation"
             title="Installation"
             className="scrollable-menu"
            >
             {lighting_installation.map((ins, index) => {
              return (
               <>
                <Menu.Item key={ins.value}>{ins.value}</Menu.Item>
               </>
              );
             })}
            </SubMenu>
           </div>
          </Menu>
          <Menu
           mode="inline"
           multiple={true}
           onSelect={this.onColorTempratrueChange}
           onDeselect={this.onColorTempratrueChange}
          >
           <div>
            <SubMenu
             key="colortemp"
             title="Color Temprature"
             className="scrollable-menu"
            >
             {lighitng_colorTemprature.map((color, index) => {
              return (
               <>
                <Menu.Item key={color.value}>{color.value}</Menu.Item>
               </>
              );
             })}
            </SubMenu>
           </div>
          </Menu>
          <Menu
           mode="inline"
           multiple={true}
           onSelect={this.onBulbTypeSelect}
           onDeselect={this.onBulbTypeSelect}
          >
           <SubMenu
            key="bulbtypes"
            title="Blub Type"
            className="scrollable-menu"
           >
            {lighting_bulbTypes.map((bulb, index) => {
             return (
              <>
               <Menu.Item key={bulb.value}>{bulb.value}</Menu.Item>
              </>
             );
            })}
           </SubMenu>
          </Menu>
         </>
        )}
        {this.state.selectedKindTitle?.toLowerCase() === "finishes" && (
         <>
          <Menu
           mode="inline"
           multiple={true}
           //  onSelect={this.onSeatSelect}
           //  onDeselect={this.onSeatSelect}
          >
           <div>
            <SubMenu
             key="finishes_applied"
             title="Applied On"
             className="scrollable-menu"
            >
             {finishes_applied_on.map((opt, index) => {
              return (
               <>
                <Menu.Item key={opt?.value}>{opt?.value}</Menu.Item>
               </>
              );
             })}
            </SubMenu>
           </div>
          </Menu>
         </>
        )}
       </Form>
      </Sider>
     </Drawer>
    </div>

    {/* signup/signin modals */}
    <Modal
     size="lg"
     className="auth-modal"
     show={this.state.authModal}
     onHide={() => this.setState({ authModal: false })}
     aria-labelledby="example-modal-sizes-title-lg"
     centered
    >
     <Modal.Body>
      <div className={`flip-box`}>
       <div className={`flip-box-inner ${this.state.authFace}`}>
        <div className="flip-box-front p-5">
         <h2 className="auth-modal-head">Sign in</h2>
         <Row gutter>
          <Col span={24} className="gutter-row my-1">
           <Button
            className="w-100 f-auth-modal"
            size="large"
            onClick={() => {
             this.props.dispatchFacebookSignup();
             this.setState({ authModal: false });
            }}
           >
            <div className="auth-btn-cntr">
             <div className="auth-icon" style={{ color: "#1256ad" }}>
              <FaFacebookF />
             </div>
             <p>Login with Facebook</p>
            </div>
           </Button>
          </Col>
         </Row>
         <Row className="gutter-row my-1">
          <Col span={24}>
           <Button
            className="w-100 g-auth-modal"
            size="large"
            onClick={() => {
             this.props.dispatchGoogleSignup();
             this.setState({ authModal: false });
            }}
           >
            <div className="auth-btn-cntr">
             <div className="auth-icon">
              <FcGoogle />
             </div>
             <p>Login with Google</p>
            </div>
           </Button>
          </Col>
         </Row>
         <div className="form-separator"></div>
         <Row className="gutter-row mb-2">
          <Col span={24} style={{ background: "" }}>
           <Input
            placeholder="email"
            size="large"
            onChange={(e) => this.setState({ signingEmail: e.target.value })}
           />
          </Col>
         </Row>
         <Row className="gutter-row">
          <Col span={24} style={{ background: "" }}>
           <Input
            placeholder="password"
            size="large"
            type="password"
            onChange={(e) => this.setState({ signinPassword: e.target.value })}
           />
          </Col>
         </Row>
         <Row>
          <Col span={24}>
           <Button
            size="large"
            className="w-100 r-auth-modal"
            onClick={() => {
             this.handleSigningIn(
              this.state.signingEmail,
              this.state.signinPassword
             );
            }}
           >
            {this.state.signingIn && !this.props.isLoggedIn ? (
             <>
              <HashLoader color="#ffffff" loading={true} css={{}} size={35} />
             </>
            ) : (
             <>Login</>
            )}
            {/* Login */}
           </Button>
          </Col>
          <Col span={24}>
           <div className="w-100 link-bold">forget your password?</div>
          </Col>
         </Row>
         <Row>
          <Col span={24}>
           <div className="auth-modal-footer">
            Don't have an account yet?
            <span
             className="link-bold black"
             onClick={this.flipToRegiseterFace}
            >
             Subscribe
            </span>
           </div>
          </Col>
         </Row>
        </div>
        <div className={`flip-box-back p-5 ${this.state.authFace}`}>
         {/* <h2>JOIN ARCH17</h2> */}
         <h2 className="auth-modal-head">Sign up</h2>
         <Row gutter>
          <Col span={24} className="gutter-row my-1">
           <Button
            className="w-100 f-auth-modal"
            size="large"
            onClick={() => {
             this.props.dispatchFacebookSignup();
             this.setState({ authModal: false });
            }}
           >
            <div className="auth-btn-cntr">
             <div className="auth-icon" style={{ color: "#1256ad" }}>
              <FaFacebookF />
             </div>
             <p>Signup with Facebook</p>
            </div>
           </Button>
          </Col>
         </Row>
         <Row className="gutter-row my-1">
          <Col span={24}>
           <Button
            className="w-100 g-auth-modal"
            size="large"
            onClick={() => {
             this.props.dispatchGoogleSignup();
             this.setState({ authModal: false });
            }}
           >
            <div className="auth-btn-cntr">
             <div className="auth-icon">
              <FcGoogle />
             </div>
             <p>Signup with Google</p>
            </div>
           </Button>
          </Col>
         </Row>
         <div className="form-separator"></div>
         <Row gutter={16} span={24} className="gutter-row mb-2">
          <Col span={12}>
           <Input
            placeholder="First Name"
            size="large"
            // value={this.state.signupFname}
            onChange={(e) => this.setState({ signupFname: e.target.value })}
           />
          </Col>
          <Col span={12} style={{ background: "" }}>
           <Input
            placeholder="Last name"
            size="large"
            onChange={(e) => this.setState({ signupLname: e.target.value })}
           />
          </Col>
         </Row>
         <Row className="gutter-row mb-2">
          <Col span={24} style={{ background: "" }}>
           <Input
            placeholder="email"
            size="large"
            onChange={(e) => this.setState({ signupEmail: e.target.value })}
           />
          </Col>
         </Row>
         <Row className="gutter-row">
          <Col span={24} style={{ background: "" }}>
           <Input
            placeholder="password"
            size="large"
            type="password"
            onChange={(e) => this.setState({ signupPassword: e.target.value })}
           />
          </Col>
         </Row>
         <Row>
          <Col span={24}>
           <Button
            size="large"
            className="w-100 r-auth-modal"
            onClick={() => {
             this.handleRegularSignup(
              this.state.signupFname,
              this.state.signupLname,
              this.state.signupEmail,
              this.state.signupPassword
             );
            }}
           >
            Create an Account
           </Button>
          </Col>
         </Row>
         <Row>
          <Col span={24}>
           <div className="auth-modal-footer">
            Already have an account?
            <span className="link-bold black" onClick={this.flipToSigninFace}>
             Login
            </span>
           </div>
          </Col>
         </Row>
         {/* <AntButton onClick={this.flipToSigninFace}>Join</AntButton> */}
        </div>
       </div>
      </div>
     </Modal.Body>
    </Modal>

    <AntModal
     title={this.state.save_to_collection_modal}
     width={700}
     className="request-modal"
     visible={this.state.save_to_collection_modal}
     destroyOnClose={true}
     footer={false}
     closeIcon={
      <>
       <div onClick={() => this.setState({ save_to_collection_modal: false })}>
        X
       </div>
      </>
     }
     okButtonProps={{ hidden: true }}
     cancelButtonProps={{ hidden: true }}
     requestType={this.state.request_modal_type}
    >
     <SaveToCollection
      cover={this.state.to_save_cover}
      product={this.state.to_save_productId}
     />
    </AntModal>
   </>
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
 dispatchRegularSignup: (fname, lname, email, password, method) =>
  dispatch(signupEmailPassword(fname, lname, email, password, method)),
 dispatchRegularSignin: (email, password) =>
  dispatch(vanillaSigninEmailPassword(email, password)),
 dispatchFacebookSignup: () => dispatch(signupFacebook()),
 dispatchGoogleSignup: () => dispatch(signupGoogle()),
 setSearchTerm: (term) => dispatch(setSearchTerm(term)),
});
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  requesting: state.addProduct.requesting,
  searchTerm: state.addProduct.searchTerm,
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
