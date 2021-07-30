import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Checkbox, FormControlLabel } from "@material-ui/core";

export const Names = ({ formData, setForm, navigation }) => {
 const {
  name,
  category,
  type,
  kind,
  style,
  base,
  material,
  seats,
  shape,
  country,
  places_tags,
  //   is_outdoor,
  is_for_kids,
 } = formData;
 const posting = (
  name,
  kind,
  category,
  type,
  material,
  style,
  base,
  seats,
  shape,
  country,
  places_tags,
  //   is_outdoor,
  is_for_kids
 ) => {
  axios
   .post("http://127.0.0.1:8000/api/identity", {
    name: name,
    category: category,
    type: type,
    material: material,
    country: country,
    seats: seats,
    shape: shape,
    kind: kind,
    style: style,
    base: base,
    places_tags: ["places_tags"],
    // is_outdoor: is_outdoor,
    is_for_kids: "yes",
   })
   .then((response) => {
    navigation.next();
    console.log(response);
    console.log(formData);
   })
   .catch((error) => {
    console.log(error.errors);
    console.log(formData);
   });
 };
 return (
  <Container maxWidth="md">
   <h3>Product Name</h3>
   <TextField
    label="Product Name"
    name="name"
    value={name}
    onChange={setForm}
    margin="normal"
    variant="outlined"
    autoComplete="off"
    fullWidth
   />

   <FormControl style={{ width: "100%" }}>
    <InputLabel id="demo-customized-select-label">Category</InputLabel>
    <Select
     labelId="demo-customized-select-label"
     id="demo-customized-select"
     name="category"
     onChange={setForm}
     fullWidth
     value={category}
     //  onChange={handleChange}
     //   input={<BootstrapInput />}
    >
     <MenuItem value="">
      <em>None</em>
     </MenuItem>
     <MenuItem value={"category1"}>Ten</MenuItem>
     <MenuItem value={"category2"}>Twenty</MenuItem>
     <MenuItem value={"category3"}>Thirty</MenuItem>
    </Select>
   </FormControl>

   <FormControl style={{ width: "100%" }}>
    <InputLabel id="demo-customized-select-label">Kind</InputLabel>
    <Select
     labelId="demo-customized-select-label"
     id="demo-customized-select"
     fullWidth
     name="kind"
     onChange={setForm}
     value={kind}
     //   input={<BootstrapInput />}
    >
     <MenuItem value="">
      <em>None</em>
     </MenuItem>
     <MenuItem value={"ten"}>Ten</MenuItem>
     <MenuItem value={"20"}>Twenty</MenuItem>
     <MenuItem value={"30"}>Thirty</MenuItem>
    </Select>
   </FormControl>
   <FormControl style={{ width: "100%" }}>
    <InputLabel id="demo-customized-select-label">Type</InputLabel>
    <Select
     labelId="demo-customized-select-label"
     id="demo-customized-select"
     name="type"
     fullWidth
     value={type}
     onChange={setForm}
     //   input={<BootstrapInput />}
    >
     <MenuItem value="">
      <em>None</em>
     </MenuItem>
     <MenuItem value={"10"}>Ten</MenuItem>
     <MenuItem value={"20"}>Twenty</MenuItem>
     <MenuItem value={"30"}>Thirty</MenuItem>
    </Select>
   </FormControl>
   <FormControl style={{ width: "100%" }}>
    <InputLabel id="demo-customized-select-label">Shape</InputLabel>
    <Select
     labelId="demo-customized-select-label"
     id="demo-customized-select"
     fullWidth
     name="shape"
     value={shape}
     onChange={setForm}
     //   input={<BootstrapInput />}
    >
     <MenuItem value="">
      <em>None</em>
     </MenuItem>
     <MenuItem value={"10"}>Ten</MenuItem>
     <MenuItem value={"20"}>Twenty</MenuItem>
     <MenuItem value={"30"}>Thirty</MenuItem>
    </Select>
   </FormControl>
   <FormControl style={{ width: "100%" }}>
    <InputLabel id="demo-customized-select-label">Syle</InputLabel>
    <Select
     labelId="demo-customized-select-label"
     id="demo-customized-select"
     fullWidth
     name="style"
     value={style}
     onChange={setForm}
     //   input={<BootstrapInput />}
    >
     <MenuItem value="">
      <em>None</em>
     </MenuItem>
     <MenuItem value={"10"}>Ten</MenuItem>
     <MenuItem value={"20"}>Twenty</MenuItem>
     <MenuItem value={"30"}>Thirty</MenuItem>
    </Select>
   </FormControl>
   <FormControl style={{ width: "100%" }}>
    <InputLabel id="demo-customized-select-label">Material</InputLabel>
    <Select
     labelId="demo-customized-select-label"
     id="demo-customized-select"
     fullWidth
     name="material"
     value={material}
     onChange={setForm}
    >
     <MenuItem value="">
      <em>None</em>
     </MenuItem>
     <MenuItem value={"10"}>Ten</MenuItem>
     <MenuItem value={"20"}>Twenty</MenuItem>
     <MenuItem value={"30"}>Thirty</MenuItem>
    </Select>
   </FormControl>

   <FormControl style={{ width: "100%" }}>
    <InputLabel id="demo-customized-select-label">Base</InputLabel>
    <Select
     labelId="demo-customized-select-label"
     id="demo-customized-select"
     fullWidth
     value={base}
     name="base"
     onChange={setForm}
     //   input={<BootstrapInput />}
    >
     <MenuItem value="">
      <em>None</em>
     </MenuItem>
     <MenuItem value={"10"}>Ten</MenuItem>
     <MenuItem value={"20"}>Twenty</MenuItem>
     <MenuItem value={"30"}>Thirty</MenuItem>
    </Select>
   </FormControl>
   <FormControl style={{ width: "100%" }}>
    <InputLabel id="demo-customized-select-label">Seats</InputLabel>
    <Select
     labelId="demo-customized-select-label"
     id="demo-customized-select"
     fullWidth
     value={seats}
     name="seats"
     onChange={setForm}
     //   input={<BootstrapInput />}
    >
     <MenuItem value="">
      <em>None</em>
     </MenuItem>
     <MenuItem value={"10"}>Ten</MenuItem>
     <MenuItem value={"20"}>Twenty</MenuItem>
     <MenuItem value={"30"}>Thirty</MenuItem>
    </Select>
   </FormControl>
   <FormControl style={{ width: "100%" }}>
    <InputLabel id="demo-customized-select-label">Country</InputLabel>
    <Select
     labelId="demo-customized-select-label"
     id="demo-customized-select"
     fullWidth
     name="country"
     value={country}
     onChange={setForm}
    >
     <MenuItem value="">
      <em>None</em>
     </MenuItem>
     <MenuItem value={"10"}>Ten</MenuItem>
     <MenuItem value={"20"}>Twenty</MenuItem>
     <MenuItem value={"30"}>Thirty</MenuItem>
    </Select>
   </FormControl>

   <FormControl style={{ width: "100%" }}>
    <InputLabel id="demo-customized-select-label">Tags</InputLabel>
    <Select
     labelId="demo-customized-select-label"
     id="demo-customized-select"
     fullWidth
     name="places_tags"
     value={places_tags}
     onChange={setForm}
    >
     <MenuItem value="">
      <em>None</em>
     </MenuItem>
     <MenuItem value={"10"}>Ten</MenuItem>
     <MenuItem value={"20"}>Twenty</MenuItem>
     <MenuItem value={"30"}>Thirty</MenuItem>
    </Select>
   </FormControl>
   {/* <FormControlLabel
    style={{ width: "100%" }}
    control={
     <Checkbox
      // checked={state.checkedB}
      onChange={setForm}
      value={"SS"}
      name="is_outdoor"
      color="primary"
     />
    }
    label="is this outdoor furniture"
   /> */}
   <FormControlLabel
    style={{ width: "100%" }}
    control={
     <Checkbox
      // checked={state.checkedB}
      onChange={setForm}
      name="is_for_kids"
      //   value={is_for_kids}
      color="primary"
     />
    }
    label="is this made for kids? (required)"
   />

   <Button
    variant="contained"
    fullWidth
    color="primary"
    style={{ marginTop: "1rem" }}
    onClick={() =>
     posting(
      name,
      kind,
      category,
      type,
      material,
      style,
      base,
      seats,
      shape,
      country,
      //   is_outdoor,
      is_for_kids
     )
    }
   >
    Next
   </Button>
  </Container>
 );
};
