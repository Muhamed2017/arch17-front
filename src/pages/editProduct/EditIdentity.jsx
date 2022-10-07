import { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";
import ReactSelect from "react-select";
import ReactFlagsSelect from "react-flags-select";
import { Row as AntRow, Col as AntCol, Checkbox, Select } from "antd";
import * as productClass from "./../addProduct/ProductClassifications";
import ClipLoader from "react-spinners/ClipLoader";
import * as cnst from "./../addProduct/Identity";
import { productIdentity } from "./../../redux/actions/addProductActions";
import { connect } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { PlusOutlined } from "@ant-design/icons";
import { collectionSelectStyles } from "./../addProduct/Identity";
import axios from "axios";
import { customLabels } from "../CreateBrandFinish";
import { API } from "./../../utitlties";
const { Option } = Select;

class EditIdentity extends Component {
 constructor(props) {
  super(props);
  this.state = {
   designers: [],
   selected_designers: this.props?.selected_designers?.map((d) => {
    return d.id;
   }),
   name: this.props?.data?.name,
   category: this.props?.category,
   kindsOptions: [],
   type: "",
   styles_label: [],
   collectionValue: "",
   style: [],
   furniture: {},
   selected_collections: [],
   seats_label: [],
   seats: [],
   bases: ["4-base"],
   bases_label: [],
   shapes_label: [],
   shapes: [],
   materials_label: [],
   materials: [],
   types_label: [],
   types: [],
   product_id: this.props?.data?.product_id ?? this.props.id,
   places_tags_label: [],
   places_tags: [],
   country: this.props?.data?.country ?? "",
   is_outdoor: "yes",
   brand_id: null,
   product_file_kind: this.props?.data?.product_file_kind,

   is_for_kids: this.props?.data?.is_for_kids ?? "no",

   for_kids: this.props?.data?.is_for_kids == "yes" ? true : false,
   collections: this.props.collections ?? [],
   styles: [],
   kind: {
    label: this.props?.data?.kind,
    value: this.props?.data?.kind,
   },

   selectedMaterials: [],
   default_collections: this.props?.selected_collections ?? [],
   lighting_types: [],
   lighting_shapes: [],
   lighting_types_label: [],
   colorTemp_label: [],
   installation_label: [],
   bulbType_label: [],
   finishes_applied_label: [],
   finishes_applies: [],
   lightingTypes: [],
   installation_options: [],
   installations: [],
   colorTempratureOptions: [],
   colorTempratures: [],
   bulbTypeOptions: [],
   bulbTypes: [],
  };
 }
 places_tags_label = [];
 places_tags = [];
 collections = [];
 selected_collections = [];
 filterDesigners = (inputValue = "") => {
  return cnst.desingersOptions.filter((i) =>
   i.value.toLowerCase().includes(inputValue.toLowerCase())
  );
 };

 onChangeCategory = (selectedOption) => {
  this.setState({ category: selectedOption });
  console.log(`Option selected:`, selectedOption);
 };

 onChangeKind = (selectedOption) => {
  this.setState(
   {
    kind: selectedOption,
    shapes_label: [],
    bases_label: [],
    seats_label: [],
    types_label: [],
    type: "",
   },
   () => {
    if (this.state.kind?.value === "Chairs") {
     this.setState({ furniture: productClass.chair });
     console.log(productClass);
    } else if (this.state.kind?.value === "Beds") {
     this.setState({ furniture: productClass.beds });
    } else if (this.state.kind?.value === "Sofa") {
     console.log(productClass.sofas);
     this.setState({ furniture: productClass.sofas });
    } else if (this.state.kind?.value === "Benches") {
     this.setState({ furniture: productClass.benches });
    } else if (this.state.kind?.value === "Chests") {
     this.setState({ furniture: productClass.chests });
    } else if (this.state.kind?.value === "Cabinets") {
     this.setState({ furniture: productClass.cabinet });
     console.log(productClass.sofas);
    } else if (this.state.kind?.value === "Table") {
     this.setState({ furniture: productClass.table });
    } else if (this.state.kind?.value === "Poufs") {
     this.setState({ furniture: productClass.poufs });
    } else if (this.state.kind?.value === "Office") {
     this.setState({ furniture: productClass.office });
    } else if (this.state.kind?.value === "Furniture components and hardware") {
     this.setState({ furniture: productClass.components_hardware });
    } else if (this.state.kind?.value === "Pendant lamps") {
     this.setState({ furniture: productClass.pendant_lamps });
    } else if (this.state.kind?.value === "Floor lamps") {
     this.setState({ furniture: productClass.floor_lamps });
    } else if (this.state.kind?.value === "Street lamps") {
     this.setState({ furniture: productClass.street_lamps });
    } else if (this.state.kind?.value === "Table lamps") {
     this.setState({ furniture: productClass.table_lamps });
    } else if (this.state.kind?.value === "Lampshades") {
     this.setState({ furniture: productClass.lampshades });
    } else if (this.state.kind?.value === "Spotlights") {
     this.setState({ furniture: productClass.spotlights });
    } else if (this.state.kind?.value === "Home Decoration") {
     this.setState({ furniture: productClass.home_decore });
    } else if (this.state.kind?.value === "Textiles and rugs") {
     this.setState({ furniture: productClass.textiles_decore });
    } else if (this.state.kind?.value === "Art and prints") {
     this.setState({ furniture: productClass.prints_decore });
    } else if (this.state.kind?.value === "Storage and space organization") {
     this.setState({ furniture: productClass.storage_decore });
    } else if (this.state.kind?.value === "Curtains & Blinds") {
     this.setState({ furniture: productClass.curtains_decore });
    } else if (this.state.kind?.value === "Plant decorations") {
     this.setState({ furniture: productClass.plant_decore });
    } else if (this.state.kind?.value === "Pet supplies") {
     this.setState({ furniture: productClass.pets_decore });
    } else if (this.state.kind?.value === "Doors") {
     this.setState({ furniture: productClass.finishes_doors });
    } else if (this.state.kind?.value === "Rooflights") {
     this.setState({ furniture: productClass.finishes_rooflights });
    } else if (this.state.kind?.value === "Partitions") {
     this.setState({ furniture: productClass.finishes_partitions });
    } else if (this.state.kind?.value === "Window profiles") {
     this.setState({ furniture: productClass.finishes_window_profiles });
    } else if (this.state.kind?.value === "Spas & Wellness") {
     this.setState({
      furniture: productClass.wellness_spas,
     });
    } else if (this.state.kind?.value === "Swimming pools and equipment") {
     this.setState({
      furniture: productClass.wellness_swimming_pools,
     });
    } else if (this.state.kind?.value === "Gym and fitness") {
     this.setState({
      furniture: productClass.welness_gym_fintess,
     });

     //  }
    } else if (this.state.kind?.value === "Kitchen furniture") {
     this.setState({ furniture: productClass.kitchen_funiture });
    } else if (this.state.kind?.value === "Sinks and kitchen taps") {
     this.setState({ furniture: productClass.kitchen_skin_taps });
    } else if (this.state.kind?.value === "Kitchen appliances") {
     this.setState({ furniture: productClass.kitchen_appliances });
    } else if (this.state.kind?.value === "Cooking accessories") {
     this.setState({ furniture: productClass.kitchen_cooking_accessories });
    } else if (this.state.kind?.value === "Dining table accessories") {
     this.setState({ furniture: productClass.kitchen_dining_accessories });
    } else if (this.state.kind?.value === "Kitchen Textiles") {
     this.setState({ furniture: productClass.kitchen_textiles });
    } else if (this.state.kind?.value === "Cookware and Bakeware") {
     this.setState({ furniture: productClass.kitchen_cookware });
    } else if (this.state.kind?.value === "Washbasins and bathroom fixtures") {
     this.setState({
      furniture: productClass.bathroom_wshbasins_fixtures,
     });
    } else if (this.state.kind?.value === "Showers and bathtubs") {
     this.setState({
      furniture: productClass.bathroom_showers_bathtubs,
     });
    } else if (this.state.kind?.value === "Bathroom Taps") {
     this.setState({
      furniture: productClass.bathroom_taps,
     });
    } else if (this.state.kind?.value === "Remote control taps") {
     this.setState({
      furniture: productClass.bathroom_remote_control_taps,
     });
    } else if (this.state.kind?.value === "Bathroom furniture") {
     this.setState({
      furniture: productClass.bathroom_furniture,
     });
    } else if (this.state.kind?.value === "Bathroom lighting") {
     this.setState({
      furniture: productClass.bathroom_lighting,
     });
    } else if (this.state.kind?.value === "Bathroom accessories") {
     this.setState({
      furniture: productClass.bathroom_accessories,
     });
    } else if (this.state.kind?.value === "Laundry and household cleaning") {
     this.setState({
      furniture: productClass.bathroom_laundry,
     });
    } else if (this.state.kind?.value === "Disabled bathrooms") {
     this.setState({
      furniture: productClass.bathroom_disabled,
     });
    } else if (this.state.kind?.value === "Bathroom radiators") {
     this.setState({
      furniture: productClass.bathroom_radiators,
     });
    } else if (this.state.kind?.value === "Structures") {
     this.setState({ furniture: productClass.constructions_structure });
    } else if (this.state.kind?.value === "Roofs") {
     this.setState({ furniture: productClass.constructions_roofs });
    } else if (this.state.kind?.value === "External walls and facades") {
     this.setState({ furniture: productClass.constructions_external_walls });
    } else if (this.state.kind?.value === "Paints and varnishes") {
     this.setState({ furniture: productClass.constructions_paints_varnishes });
    } else if (
     this.state.kind?.value === "Home automation and electrical systems"
    ) {
     this.setState({ furniture: productClass.constructions_home_automation });
    } else {
     this.setState({ furniture: productClass.empty });
    }
   }
  );
  console.log(`Option selected:`, selectedOption);
 };

 onChangeBase = (selectedOption) => {
  this.setState({
   bases_label: selectedOption,
   bases: Array.isArray(this.state.bases_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 onChangeSeats = (selectedOption) => {
  this.setState({
   seats_label: selectedOption,
   seats: Array.isArray(this.state.seats_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 onChangeInstallations = (selectedOption) => {
  this.setState({
   installation_label: selectedOption,
   installations: Array.isArray(this.state.installation_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };
 onChangeColorTemprature = (selectedOption) => {
  this.setState({
   colorTemp_label: selectedOption,
   colorTempratures: Array.isArray(this.state.colorTemp_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 onChangeBulbTypes = (selectedOption) => {
  this.setState({
   bulbType_label: selectedOption,
   bulbTypes: Array.isArray(this.state.seats_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 onChangeFinishesApplied = (selectedOption) => {
  this.setState({
   finishes_applied_label: selectedOption,
   finishes_applies: Array.isArray(this.state.finishes_applied_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 onChangeLightingTypes = (selectedOption) => {
  this.setState({
   lighting_types_label: selectedOption,
   lightingTypes: Array.isArray(this.state.lighting_types_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 onChangeShape = (selectedOption) => {
  this.setState({
   shapes_label: selectedOption,
   shapes: Array.isArray(this.state.shapes_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 onChangeMaterial = (selectedOption) => {
  this.setState({
   materials_label: selectedOption,
   materials: Array.isArray(this.state.materials_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 onChangeForKids = (value) => {
  this.setState({ for_kids: value.target.checked });
  this.setState({ is_for_kids: value.target.checked ? "yes" : "no" });
  console.log(this.state.for_kids);
 };

 onChangeFileType = (value) => {
  this.setState({ product_file_kind: value });
 };

 onChangeProductTags = (selectedOption) => {
  this.setState({
   places_tags_label: selectedOption,
   places_tags: Array.isArray(this.state.places_tags_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };
 onChangeCollections = (selectedCollection) => {
  this.setState({
   selected_collections: selectedCollection,
  });
 };
 onChangeProductTypes = (selectedOption) => {
  this.setState({
   types_label: selectedOption,
   types: Array.isArray(this.state.types_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 onChangeStyle = (selectedOption) => {
  this.setState({
   styles_label: selectedOption,
   styles: Array.isArray(this.state.materials_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 promiseOptions = (inputValue) =>
  new Promise((resolve) => {
   setTimeout(() => {
    resolve(cnst.filterDesigners(inputValue));
   }, 1000);
  });

 createStoreCollectionAttach = (name) => {
  const fd = new FormData();
  fd.append("collection_name", name);
  fd.append("product_id", this.props.id);
  fd.append("store_id", this.props.store.id);
  //   console.log(this.props.store.id);
  axios.post(`${API}brandcollection`, fd).then((response) => {
   console.log(response);
  });
 };
 attachExistStoreCollection = (id) => {
  //   console.log(id);
  const fd = new FormData();
  fd.append("product_id", this.props.id);
  fd.append("collection_id", id);
  axios.post(`${API}brandcollect`, fd).then((response) => {
   console.log(response);
  });
 };

 handleIdentitySubmit = (e) => {
  this.props.dispatchAddIdentity(
   this.state.name,
   this.state.category,
   JSON.stringify(this.state.types_label),
   JSON.stringify(this.state.materials_label),
   this.state.country,
   JSON.stringify(this.state.seats_label),
   JSON.stringify(this.state.bases_label),
   JSON.stringify(this.state.shapes_label),
   this.state.kind.value,
   JSON.stringify(this.state.styles_label),

   JSON.stringify(this.state.lighting_types_label),
   JSON.stringify(this.state.installation_label),

   JSON.stringify(this.state.colorTemp_label),
   JSON.stringify(this.state.bulbType_label),
   JSON.stringify(this.state.finishes_applied_label),

   this.state.places_tags,
   this.state.is_outdoor,
   this.state.is_for_kids,
   this.state.product_file_kind,
   this.state.product_id
  );
  console.log(this.state);
 };
 onDesignersChange = (value) => {
  console.log(`selected ${value}`);
 };

 handleAddDesigner = (e) => {
  const fd = new FormData();
  fd.append("product_id", this.state.product_id);
  fd.append("user_id", e);
  axios.post(`${API}adddesignerproduct`, fd).then((res) => {
   console.log(res);
  });
 };
 componentDidMount() {
  console.log(this.props);
  axios.get(`${API}designers`).then((res) => {
   const des = res.data.designers;
   console.log(res.data.designers);
   this.setState({
    designers: Object.values(des),
    // selected_designers: des.map((d) => {
    //  return d.id;
    // }),
   });
  });
  console.log(this.state.for_kids);
  console.log(this.state.is_for_kids);
  this.props?.data?.places_tags?.map((m) => {
   this.places_tags_label.push({ label: m, value: m });
   return this.places_tags.push(m);
  });

  this.props?.collections?.map((collection, index) => {
   this.collections.push({
    value: collection.collection_name,
    label: (
     <>
      <p onClick={() => this.attachExistStoreCollection(collection.id)}>
       {collection.collection_name}
      </p>
     </>
    ),
   });
  });
  this.setState({
   kindsOptions: productClass.kind_options,
   places_tags_label: this.places_tags_label,
   materials_label: this.props.data.material,
   materials: this.props.data.material,
   types_label: this.props.data.type,
   types: this.props.data.type,
   seats_label: this.props.data.seats,
   seats: this.props.data.seats,
   lighting_types_label: this.props.data.lighting_types,
   installation_label: this.props.data.installations,
   colorTemp_label: this.props.data.colorTempratures,
   bulbType_label: this.props.data.bulbTypes,
   finishes_applied_label: this.props.data.applied_on,
   shapes_label: this.props.data.shape,
   shapes: this.props.data.shape,
   bases_label: this.props.data.base,
   bases: this.props.data.base,
   styles_label: this.props.data.style,
   styles: this.props.data.style,
   places_tags: this.props.data.places_tags,
   collections: this.collections,
   selected_collections: this.selected_collections,
   is_for_kids: this.props.data?.is_for_kids ?? "no",
   for_kids: this.props.data.is_for_kids === "yes" ? true : false,
   furniture_styles:
    this.state.category == "Lighting"
     ? productClass.lighting_styles
     : productClass.furniture_styles,
  });

  console.log(this.state.selectedMaterials);
  if (this.state.category === "Lighting") {
   this.setState({
    kindsOptions: productClass.lighting_kinds,
    furniture: productClass.empty,
    lighting_types: productClass.lighting_types,
    furniture_styles: productClass.lighting_styles,
    installation_options: productClass.lighting_installation,
    colorTempratureOptions: productClass.lighitng_colorTemprature,
    bulbTypeOptions: productClass.lighting_bulbTypes,
   });

   if (this.state.kind?.value === "Pendant lamps") {
    this.setState({ furniture: productClass.pendant_lamps });
   } else if (this.state.kind?.value === "Pendant lamps") {
    this.setState({ furniture: productClass.pendant_lamps });
   } else if (this.state.kind?.value === "Floor lamps") {
    this.setState({ furniture: productClass.floor_lamps });
   } else if (this.state.kind?.value === "Street lamps") {
    this.setState({ furniture: productClass.street_lamps });
   } else if (this.state.kind?.value === "Table lamps") {
    this.setState({ furniture: productClass.table_lamps });
   } else if (this.state.kind?.value === "Lampshades") {
    this.setState({ furniture: productClass.lampshades });
   } else if (this.state.kind?.value === "Spotlights") {
    this.setState({ furniture: productClass.spotlights });
   }
  } else if (this.state.kind?.value === "Home Decoration") {
   this.setState({ furniture: productClass.home_decore });
  } else if (this.state.kind?.value === "Textiles and rugs") {
   this.setState({ furniture: productClass.textiles_decore });
  } else if (this.state.kind?.value === "Art and prints") {
   this.setState({ furniture: productClass.prints_decore });
  } else if (this.state.kind?.value === "Storage and space organization") {
   this.setState({ furniture: productClass.storage_decore });
  } else if (this.state.kind?.value === "Curtains & Blinds") {
   this.setState({ furniture: productClass.curtains_decore });
  } else if (this.state.kind?.value === "Plant decorations") {
   this.setState({ furniture: productClass.plant_decore });
  } else if (this.state.kind?.value === "Pet supplies") {
   this.setState({ furniture: productClass.pets_decore });
  } else if (this.state.category === "Decore") {
   this.setState({
    furniture: productClass.empty,
    kindsOptions: productClass.decore_kind_options,
   });
  } else if (this.state.category === "Finishes") {
   this.setState({
    furniture: productClass.empty,
    kindsOptions: productClass.finishes_kind_options,
    finishes_applied_on: productClass.finishes_applied_on,
   });
   if (this.state.kind?.value === "Doors") {
    this.setState({ furniture: productClass.finishes_doors });
   } else if (this.state.kind?.value === "Rooflights") {
    this.setState({ furniture: productClass.finishes_rooflights });
   } else if (this.state.kind?.value === "Partitions") {
    this.setState({ furniture: productClass.finishes_partitions });
   } else if (this.state.kind?.value === "Window profiles") {
    this.setState({ furniture: productClass.finishes_window_profiles });
   }
  } else if (this.state.category === "Kitchen") {
   this.setState({
    furniture: productClass.empty,
    kindsOptions: productClass.kitchen_kind_options,
   });

   if (this.state.kind?.value === "Kitchen furniture") {
    this.setState({ furniture: productClass.kitchen_funiture });
   } else if (this.state.kind?.value === "Sinks and kitchen taps") {
    this.setState({ furniture: productClass.kitchen_skin_taps });
   } else if (this.state.kind?.value === "Kitchen appliances") {
    this.setState({ furniture: productClass.kitchen_appliances });
   } else if (this.state.kind?.value === "Cooking accessories") {
    this.setState({ furniture: productClass.kitchen_cooking_accessories });
   } else if (this.state.kind?.value === "Dining table accessories") {
    this.setState({ furniture: productClass.kitchen_dining_accessories });
   } else if (this.state.kind?.value === "Kitchen Textiles") {
    this.setState({ furniture: productClass.kitchen_textiles });
   } else if (this.state.kind?.value === "Cookware and Bakeware") {
    this.setState({ furniture: productClass.kitchen_cookware });
   }
   //  Spas & Wellness
  } else if (this.state.category === "Wellness") {
   this.setState({
    furniture: productClass.empty,
    kindsOptions: productClass.wellness_kind_options,
   });
   if (this.state.kind?.value === "Spas & Wellness") {
    this.setState({
     furniture: productClass.wellness_spas,
    });
   } else if (this.state.kind?.value === "Swimming pools and equipment") {
    this.setState({
     furniture: productClass.wellness_swimming_pools,
    });
   } else if (this.state.kind?.value === "Gym and fitness") {
    this.setState({
     furniture: productClass.welness_gym_fintess,
    });
   }
  } else if (this.state.category === "Construction") {
   this.setState({
    kindsOptions: productClass.constructions_kind_options,
    furniture: productClass.empty,
   });
   if (this.state.kind?.value === "Structures") {
    this.setState({ furniture: productClass.constructions_structure });
   } else if (this.state.kind?.value === "Roofs") {
    this.setState({ furniture: productClass.constructions_roofs });
   } else if (this.state.kind?.value === "External walls and facades") {
    this.setState({ furniture: productClass.constructions_external_walls });
   } else if (this.state.kind?.value === "Paints and varnishes") {
    this.setState({ furniture: productClass.constructions_paints_varnishes });
   } else if (
    this.state.kind?.value === "Home automation and electrical systems"
   ) {
    this.setState({ furniture: productClass.constructions_home_automation });
   }
  } else if (this.state.category === "Bathroom") {
   this.setState({
    kindsOptions: productClass.bathroom_kind_options,
    furniture: productClass.empty,
   });
   if (this.state.kind?.value === "Washbasins and bathroom fixtures") {
    this.setState({
     furniture: productClass.bathroom_wshbasins_fixtures,
    });
   } else if (this.state.kind?.value === "Showers and bathtubs") {
    this.setState({
     furniture: productClass.bathroom_showers_bathtubs,
    });
   } else if (this.state.kind?.value === "Bathroom Taps") {
    this.setState({
     furniture: productClass.bathroom_taps,
    });
   } else if (this.state.kind?.value === "Remote control taps") {
    this.setState({
     furniture: productClass.bathroom_remote_control_taps,
    });
   } else if (this.state.kind?.value === "Bathroom furniture") {
    this.setState({
     furniture: productClass.bathroom_furniture,
    });
   } else if (this.state.kind?.value === "Bathroom lighting") {
    this.setState({
     furniture: productClass.bathroom_lighting,
    });
   } else if (this.state.kind?.value === "Bathroom accessories") {
    this.setState({
     furniture: productClass.bathroom_accessories,
    });
   } else if (this.state.kind?.value === "Laundry and household cleaning") {
    this.setState({
     furniture: productClass.bathroom_laundry,
    });
   } else if (this.state.kind?.value === "Disabled bathrooms") {
    this.setState({
     furniture: productClass.bathroom_disabled,
    });
   } else if (this.state.kind?.value === "Bathroom radiators") {
    this.setState({
     furniture: productClass.bathroom_radiators,
    });
   }
  } else if (this.state.kind?.value === "Chairs") {
   this.setState({ furniture: productClass.chair });
  } else if (this.state.kind?.value === "Beds") {
   this.setState({ furniture: productClass.beds });
  } else if (this.state.kind?.value === "Sofa") {
   console.log(productClass.sofas);
   this.setState({ furniture: productClass.sofas });
  } else if (this.state.kind?.value === "Benches") {
   this.setState({ furniture: productClass.benches });
  } else if (this.state.kind?.value === "Chests") {
   this.setState({ furniture: productClass.chests });
  } else if (this.state.kind?.value === "Cabinets") {
   this.setState({ furniture: productClass.cabinet });
   console.log(productClass.sofas);
  } else if (this.state.kind?.value === "Table") {
   this.setState({ furniture: productClass.table });
  } else if (this.state.kind?.value === "Poufs") {
   this.setState({ furniture: productClass.poufs });
  } else if (this.state.kind?.value === "Office") {
   this.setState({ furniture: productClass.office });
  } else if (this.state.kind?.value === "Furniture components and hardware") {
   this.setState({ furniture: productClass.components_hardware });
  } else {
   this.setState({ furniture: productClass.empty });
  }
 }
 render() {
  return (
   <div className="step-form identity">
    <div
     className="next-wrapper"
     style={{
      top: "80px",
     }}
    >
     <div
      className="next-inner"
      style={{
       maxWidth: "1010px",
      }}
     >
      <button
       // className="save-product-step-btn next-btn"
       className="next-btn"
       style={{
        top: "-110px",
        //  height: "20px",
        background: this.props.loading ? "#898989" : "",
       }}
       onClick={this.handleIdentitySubmit}
      >
       {this.props.loading ? (
        <ClipLoader
         style={{ height: "20px" }}
         color="#ffffff"
         loading={this.props.loading}
         size={18}
        />
       ) : (
        "Save & Continue"
       )}
      </button>
     </div>
    </div>
    <Form>
     <div className="form-block">
      <Form.Group>
       <Form.Row>
        <Col>
         <Form.Label>Product Name</Form.Label>
         <Form.Control
          className="py-3"
          placeholder="Product name"
          value={this.state.name}
          onChange={(e) => {
           this.setState({ name: e.target.value });
          }}
         />
        </Col>
       </Form.Row>
      </Form.Group>
     </div>
     <div className="form-block">
      <Form.Group as={Row}>
       <Form.Label column md={12} className="mb-4">
        Product Category
       </Form.Label>
       <Form.Label column md={2} className="sub-label">
        Category *
       </Form.Label>
       <Col md={4}>
        <ReactSelect
         // value="Furniture"
         value={this.state.category}
         // placeholder="Furniture"
         placeholder={this.state.category}
         isDisabled
         onChange={this.onChangeCategory}
         theme={(theme) => ({
          ...theme,
          colors: {
           ...theme.colors,
           primary25: "#f5f0f0",
           primary: "#e41e15",
           primary50: "#f5f0f0",
          },
         })}
        />
       </Col>
       <Form.Label column md={2} className="sub-label">
        Kind
       </Form.Label>
       <Col md={4}>
        <ReactSelect
         options={this.state.kindsOptions}
         value={this.state.kind}
         onChange={this.onChangeKind}
         theme={(theme) => ({
          ...theme,
          colors: {
           ...theme.colors,
           primary25: "#f5f0f0",
           primary: "#e41e15",
           primary50: "#f5f0f0",
          },
         })}
        />
       </Col>
       {this.state.furniture.types?.length > 0 ? (
        <>
         <Form.Label
          column
          md={2}
          className="sub-label"
          onClick={() =>
           console.log(
            this.state.product_file_kind,
            this.state.is_for_kids,
            this.state.places_tags
           )
          }
         >
          Type
         </Form.Label>
         <Col md={4}>
          <ReactSelect
           isMulti
           options={this.state.furniture.types}
           value={this.state.types_label}
           onChange={this.onChangeProductTypes}
           theme={(theme) => ({
            ...theme,
            colors: {
             ...theme.colors,
             primary25: "#f5f0f0",
             primary: "#e41e15",
             primary50: "#f5f0f0",
            },
           })}
          />
         </Col>
        </>
       ) : (
        <></>
       )}
       {this.state.furniture?.shapes?.length > 0 ||
       this.state.lighting_shapes?.length > 0 ? (
        <>
         <Form.Label column md={2} className="sub-label">
          Shape
         </Form.Label>
         <Col md={4}>
          {/* <Select */}
          <ReactSelect
           isMulti
           // options={rightShape}
           options={
            this.state.furniture.shapes

            //  this.state.category === "Furniture"
            //   ? this.state.furniture.shapes
            //   : this.state.lighting_shapes
           }
           value={this.state.shapes_label}
           onChange={this.onChangeShape}
           theme={(theme) => ({
            ...theme,
            colors: {
             ...theme.colors,
             primary25: "#f5f0f0",
             primary: "#e41e15",
             primary50: "#f5f0f0",
            },
           })}
          />
         </Col>
        </>
       ) : (
        <></>
       )}
       <Form.Label column md={2} className="sub-label">
        Style
       </Form.Label>
       <Col md={4}>
        {/* <Select */}
        <ReactSelect
         isMulti
         // options={productClass.furniture_styles}
         options={
          this.state.furniture_styles
          //  productClass.furniture_styles
          //  this.state.category === "Furniture"
          //   ? productClass.furniture_styles
          //   : productClass.lighting_styles
         }
         value={this.state.styles_label}
         onChange={this.onChangeStyle}
         theme={(theme) => ({
          ...theme,
          colors: {
           ...theme.colors,
           primary25: "#f5f0f0",
           primary: "#e41e15",
           primary50: "#f5f0f0",
          },
         })}
        />
       </Col>
       <Form.Label column md={2} className="sub-label">
        Material
       </Form.Label>
       <Col md={4}>
        {/* <Select */}
        <ReactSelect
         isMulti
         options={productClass.furniture_materials}
         value={this.state.materials_label}
         onChange={this.onChangeMaterial}
         styles={this.state.material_styles}
         theme={(theme) => ({
          ...theme,
          colors: {
           ...theme.colors,
           primary25: "#f5f0f0",
           primary: "#e41e15",
           primary50: "#f5f0f0",
          },
         })}
        />
       </Col>
       {this.state.furniture?.bases?.length > 0 ? (
        <>
         <Form.Label column md={2} className="sub-label">
          Base
         </Form.Label>
         <Col md={4}>
          {/* <Select */}
          <ReactSelect
           isMulti
           options={this.state.furniture.bases}
           value={this.state.bases_label}
           onChange={this.onChangeBase}
           theme={(theme) => ({
            ...theme,
            colors: {
             ...theme.colors,
             primary25: "#f5f0f0",
             primary: "#e41e15",
             primary50: "#f5f0f0",
            },
           })}
          />
         </Col>
        </>
       ) : (
        <></>
       )}
       {this.state.furniture.seats?.length > 0 ? (
        <>
         <Form.Label column md={2} className="sub-label">
          Seats
         </Form.Label>
         <Col md={4}>
          {/* <Select */}
          <ReactSelect
           isMulti
           options={this.state.furniture.seats}
           value={this.state.seats_label}
           onChange={this.onChangeSeats}
           theme={(theme) => ({
            ...theme,
            colors: {
             ...theme.colors,
             primary25: "#f5f0f0",
             primary: "#e41e15",
             primary50: "#f5f0f0",
            },
           })}
          />
         </Col>
        </>
       ) : (
        <></>
       )}
       {this.state.lighting_types?.length > 0 ? (
        <>
         <Form.Label column md={2} className="sub-label">
          Lighting Types
         </Form.Label>
         <Col md={4}>
          {/* <Select */}
          <ReactSelect
           isMulti
           options={this.state.lighting_types}
           value={this.state.lighting_types_label}
           onChange={this.onChangeLightingTypes}
           theme={(theme) => ({
            ...theme,
            colors: {
             ...theme.colors,
             primary25: "#f5f0f0",
             primary: "#e41e15",
             primary50: "#f5f0f0",
            },
           })}
          />
         </Col>
        </>
       ) : (
        <></>
       )}
       {this.state.installation_options?.length > 0 ? (
        <>
         <Form.Label column md={2} className="sub-label">
          Installations
         </Form.Label>
         <Col md={4}>
          {/* <Select */}
          <ReactSelect
           isMulti
           options={this.state.installation_options}
           value={this.state.installation_label}
           onChange={this.onChangeInstallations}
           theme={(theme) => ({
            ...theme,
            colors: {
             ...theme.colors,
             primary25: "#f5f0f0",
             primary: "#e41e15",
             primary50: "#f5f0f0",
            },
           })}
          />
         </Col>
        </>
       ) : (
        <></>
       )}
       {this.state.colorTempratureOptions?.length > 0 ? (
        <>
         <Form.Label
          column
          md={2}
          className="sub-label"
          style={{ fontSize: ".75rem" }}
         >
          Color Temprature
         </Form.Label>
         <Col md={4}>
          {/* <Select */}
          <ReactSelect
           isMulti
           options={this.state.colorTempratureOptions}
           value={this.state.colorTemp_label}
           onChange={this.onChangeColorTemprature}
           theme={(theme) => ({
            ...theme,
            colors: {
             ...theme.colors,
             primary25: "#f5f0f0",
             primary: "#e41e15",
             primary50: "#f5f0f0",
            },
           })}
          />
         </Col>
        </>
       ) : (
        <></>
       )}
       {this.state.bulbTypeOptions?.length > 0 ? (
        <>
         <Form.Label column md={2} className="sub-label">
          Bulb Types
         </Form.Label>
         <Col md={4}>
          {/* <Select */}
          <ReactSelect
           isMulti
           options={this.state.bulbTypeOptions}
           value={this.state.bulbType_label}
           onChange={this.onChangeBulbTypes}
           theme={(theme) => ({
            ...theme,
            colors: {
             ...theme.colors,
             primary25: "#f5f0f0",
             primary: "#e41e15",
             primary50: "#f5f0f0",
            },
           })}
          />
         </Col>
        </>
       ) : (
        <></>
       )}
       {this.state.finishes_applied_on?.length > 0 ? (
        <>
         <Form.Label column md={2} className="sub-label">
          Applied On
         </Form.Label>
         <Col md={4}>
          {/* <Select */}
          <ReactSelect
           isMulti
           options={this.state.finishes_applied_on}
           value={this.state.finishes_applied_label}
           onChange={this.onChangeFinishesApplied}
           theme={(theme) => ({
            ...theme,
            colors: {
             ...theme.colors,
             primary25: "#f5f0f0",
             primary: "#e41e15",
             primary50: "#f5f0f0",
            },
           })}
          />
         </Col>
        </>
       ) : (
        <></>
       )}
      </Form.Group>
     </div>
     <div className="form-blc">
      <Form.Group as={Row}>
       <Col md={12}>
        <Form.Label>Is this Product made for kids ? (Required)</Form.Label>
       </Col>
       <Col md={1}>
        <Checkbox
         onChange={(e) => this.onChangeForKids(e)}
         value={this.state.for_kids}
         checked={this.state.for_kids ? true : false}
        >
         Yes
        </Checkbox>
       </Col>
       {/* <Col md={1}></Col> */}

       <Col md={12}>
        <p className="light">
         Please check on yes if this products made spicily for kids.
        </p>
       </Col>
      </Form.Group>
     </div>
     <Form.Group as={Row}>
      <Col md={5}>
       <Form.Label>Collections / Sereies</Form.Label>
       <div>
        <CreatableSelect
         isMulti
         closeMenuOnSelect={false}
         defaultValue={this.state.default_collections}
         styles={collectionSelectStyles}
         createOptionPosition={"first"}
         formatCreateLabel={(input) => {
          return (
           <>
            <AntRow
             justify="space-between"
             style={{
              borderBottom: "1px solid #f5f5f5",
              minHeight: "38px",
             }}
            >
             <AntCol span={12} className="mb-4">
              <p className="crt">
               Create:
               <span
                style={{
                 fontWeight: "900",
                }}
               >
                {` ${input}`}
               </span>
              </p>
             </AntCol>
             <AntCol span={4} className="mb-4">
              <button
               className="collect-new"
               onClick={() => {
                console.log(input);
                this.createStoreCollectionAttach(input);
               }}
              >
               <PlusOutlined />
              </button>
             </AntCol>
            </AntRow>
           </>
          );
         }}
         options={this.collections}
        />
       </div>
       <p className="light">
        Collect each series’s products in one collection.
       </p>
      </Col>
     </Form.Group>
     {this.state.designers && this.state.designers?.length > 0 && (
      <>
       <Form.Group as={Row}>
        <Col md={7} className="designerselect">
         <Form.Label>Designer</Form.Label>
         <Select
          mode="multiple"
          style={{ width: "100%" }}
          size="large"
          defaultValue={this.state.selected_designers}
          onChange={this.onDesignersChange}
          optionLabelProp="label"
          onSelect={this.handleAddDesigner}
         >
          {this.state?.designers?.map((d) => {
           return (
            <Option value={d?.id} label={d?.displayName}>
             <div className="designer-option-item">
              <div
               className="desimg"
               style={{
                backgroundImage: `url(${d?.photoURL})`,
               }}
              ></div>
              <p>{d?.displayName}</p>
             </div>
            </Option>
           );
          })}
         </Select>

         <p className="light">
          Search and tag the product’s designer, If you can’t in find the
          designer click here to invite.
         </p>
        </Col>
       </Form.Group>
      </>
     )}
     <Form.Group>
      <Form.Row>
       <Col md={8}>
        <Form.Label>Product Tags </Form.Label>
        {/* <Select */}
        <ReactSelect
         closeMenuOnSelect={false}
         isMulti
         onChange={this.onChangeProductTags}
         value={this.state.places_tags_label}
         options={productClass.placesTags}
         styles={cnst.colourStyles}
        />
       </Col>
      </Form.Row>
     </Form.Group>
     <Form.Group as={Row}>
      <Col md={6} style={{ marginBottom: "100px" }}>
       <Form.Label>Product Country or Origin</Form.Label>
       <ReactFlagsSelect
        selected={this.state.country}
        selectedSize={20}
        optionsSize={20}
        searchable
        customLabels={customLabels}
        onSelect={(code) => {
         this.setState({ country: code });
        }}
       />
      </Col>
     </Form.Group>
    </Form>
   </div>
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
 dispatchAddIdentity: (
  name,
  category,
  type,
  material,
  country,
  seats,
  bases,
  shape,
  kind,
  style,
  lighting_types,
  installations,
  colorTempratures,
  bulbTypes,
  applied_on,

  places_tags,
  is_outdoor,
  is_for_kids,
  product_file_kind,
  id
 ) =>
  dispatch(
   productIdentity(
    name,
    category,
    type,
    material,
    country,
    seats,
    bases,
    shape,
    kind,
    style,
    lighting_types,
    installations,
    colorTempratures,
    bulbTypes,
    applied_on,
    places_tags,
    is_outdoor,
    is_for_kids,
    product_file_kind,
    id
   )
  ),
});
const mapStateToProps = (state) => {
 return {
  loading: state.addProduct.loading,
  identity: state.addProduct.identity,
  tabIndex: state.addProduct.tabIndex,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditIdentity);
