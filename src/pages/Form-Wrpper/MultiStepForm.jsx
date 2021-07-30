import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import { Names } from "./stepForm/Names";
import { Address } from "./stepForm/Address";
import { Contact } from "./stepForm/Contact";
import { Review } from "./stepForm/Review";
import { Submit } from "./stepForm/Submit";
const defaultData = {
 name: "",
 kind: "",
 category: "",
 style: "",
 base: "",
 type: "",
 country: "",
 shape: "",
 seats: "",
 material: "",
 places_tags: "",
 is_outdoor: "",
 is_for_kids: false,
};
const steps = [
 { id: "names" },
 { id: "address" },
 { id: "contact" },
 { id: "review" },
 { id: "submit" },
];

const MultiStepForm = () => {
 const [formData, setForm] = useForm(defaultData);
 const { step, navigation } = useStep({
  steps,
  initialStep: 0,
 });

 const props = { formData, setForm, navigation };

 switch (step.id) {
  case "names":
   return <Names {...props} />;
  case "address":
   return <Address {...props} />;
  case "contact":
   return <Contact {...props} />;
  case "review":
   return <Review {...props} />;
  case "submit":
   return <Submit {...props} />;
  default:
   return "";
 }
};
export default MultiStepForm;
