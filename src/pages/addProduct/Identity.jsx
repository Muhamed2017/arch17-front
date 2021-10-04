import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import ReactSelect from "react-select";
import ReactFlagsSelect from "react-flags-select";
import { productIdentity } from "../../redux/actions/addProductActions";
import { connect } from "react-redux";
import AsyncSelect from "react-select/async";
import { API } from "./../../utitlties";
import { Select, Divider, Input } from "antd";
import * as productClass from "./ProductClassifications";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

const { Option } = Select;

const colourStyles = {
 option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  return {
   ...styles,
   backgroundColor: "#fff",
   ":hover": {
    backgroundColor: "#EAEAEA",
   },
   ":focus": {
    backgroundColor: "#EAEAEA",
   },
  };
 },
 multiValue: (styles, { data }) => {
  return {
   ...styles,
   color: "#fff",
   backgroundColor: "#e41e15",
  };
 },
 multiValueLabel: (styles, { data }) => ({
  ...styles,
  color: "#fff",

  ":hover": {
   backgroundColor: "#000",
  },
 }),
 multiValueRemove: (styles, { data }) => ({
  ...styles,
  color: "#fff",
  ":hover": {
   backgroundColor: "#e8736f",
   color: "#fff",
  },
  ":focus": {
   backgroundColor: "#e8736f",
   borderColor: "#e8736f",
  },
 }),
};
const material_styles = {
 option: (provided, state) => ({
  ...provided,
  // fontWeight: state.bold == "Fuck" ? "bold" : "normal",
  // color: state.label == "Fuck" ? "red" : "blue",
  fontWeight: state.data.bold ?? "normal",
  // color: "red",
  // backgroundColor: state.data.color,
  // fontSize: state.selectProps.myFontSize
 }),
 singleValue: (provided, state) => ({
  ...provided,
  color: "red",
  fontWeight: state.color == "bold" ? "bold" : "normal",
 }),
};

const TagsOptions = [
 { value: "kitchen", label: "Kitchen" },
 { value: "bedroom", label: "Bedroom" },
 { value: "living room", label: "Living Room" },
 { value: "office", label: "Office" },
 { value: "general", label: "General" },
 { value: "wc", label: "WC" },
 { value: "park", label: "Park" },
 { value: "villa", label: "Villa" },
];

const desingersOptions = [
 {
  value: "muhamedgomaa",
  label: (
   <>
    <img
     className="designer-select"
     src="https://cdn.allfamous.org/people/avatars/fiona-zanetti-srcs-allfamous.org.jpg?v=56"
     alt=""
    />
    <p className="designer-name-select">Muhamed Gomaa</p>
   </>
  ),
 },
 {
  value: "mohamedmahdy",
  label: (
   <>
    <img
     className="designer-select"
     src="https://i.pinimg.com/originals/7d/21/f4/7d21f47169e4276a368266329abf8c79.jpg"
     alt=""
    />
    <p className="designer-name-select">Mohamed Mahdy</p>
   </>
  ),
 },
 {
  value: "hanymustafa",
  label: (
   <>
    <img
     className="designer-select"
     src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFRYYGBgaHBwZGhoYGhgYGhocGhgaGhoaGBocIS4lHB4rHxoYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQhISs0NDQ0MTQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAOAA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgMEAAIHAQj/xABAEAACAQIDBQUGAwcDAwUAAAABAgADEQQFIRIxQVFhBiJxgZETMqGxwdFCYvAHFCMzUnLxFYLhJJKiFlNzssL/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMABAX/xAAiEQADAQACAwEBAAMBAAAAAAAAAQIRITEDEkEEURMiYTL/2gAMAwEAAhEDEQA/ALAWSqswLNwICRgE2K6T1RNm3TGBwTWXXsF7w0txgx8WqNqZWzjOk2NDwjJ8ActsWXpUxVc09xJ0J68OU6L2Z7tBFbQ8pyRswO2SAN+hj/2Uq1XF33Scztay3krIxDlWXSAXsGMPle7ANVBtm8tRzwDcfi3OlNNrqRKy1drY9vSO0DvXhGFbCBs0qsrg7l0seHiZKni18lp5eBmjZh3Rp10/zBee4qnSUlnVDbQE2PkN8pdpe1yU6K06N2qH8Z90DnrvnNMRiGdi7sWY7yxuf10nNX5pulfRqlaMWD7SlH2izuNdNo/WS0+2VRGulNN9+8WJPjYiKZm4vLrxzu/QtadJwn7U63uthqZ4aO6/Qxkyf9oVJx/HT2Rva4O2m7na448LdZxeg1iLi8Z8uNMpYL3tNxud/MjX9cpeFpOliO30MWj32HVrAHukHRvdNxwNjFbtfQYvTKnTa19NIpZVmD4d9tCVJ36FlYcn7v2MY8dnyVgg9xwQSp48yp4iNU4KhD7TLZzfeCRAKUdtlXixA9Yb7VPtVWKm4B+MAliCGGhBuD1Eg9wsiznPZyvQPeQsp1DKCR523QQEINiCDyIsfSdtyTFGph0drE2F+MsvgKFQgtTQkaglRpPPX7nOqp5Rb/E2tRzTDYCoiI7oQptr9+U6z2YF6Cna0tB+YUVei62FgNOlpVybEMKSi/S0r4/1e3jdtcoR+Jukkads8MXoPsc9rxAMTeyrEYin429QZ0XEURUQofxAjTfrFnA9mKmGxFJyQ6FiN1iL7r84fwuqTb/pvLkLGPtzMliw5TyejhyaKoE3AmATa4EiOYdIKzLMggOsmzHHhFM5tn2aF2IBmGnks5tmxYmxgWpimfebzSjh2cXhjKspu2sCkpuA/CrZgW3Xj9lufJTQbtJVGRC1iJRxeTWHSUmWhKargZcJ2uSposvJU2jtc5zjA0ClW3CP2APdEDbbApS6L4gXtLWUUXudeB5HS0MV3VVLNuAuSek5Tn2ae2qMV0S+g59TMwygfjsSXcsfIcAOQ5CQCYbzW8Uc3BE3t1kSyRVmMbq3j5S9h8eyDT9dOXOVKaHgL+Ek2Df9feFNroDWhil2gYEbSAjmND8N/hL648OnvDa5bjfgbD/mLiIL7xceMl2fW97/AKtH9mBygtbbDg72G168fgZt2eCF/ZVFBD8ZRoO4bui4tax00E0aqUcON41H2kfJLqWhpeM6ZleXJhlKoTsk3seEsl2U3tpIMqxi4ikjhhtW1A5wZmuPdHRE3k/CeHlO2n2d8NevAyULbJvqDvEhfDKANnRZmHcgC/nJatiNIE2+EDqv+lvKEBY8bS/j0B2B1EAZRiijkbJKniBe3jGKk4dww3Ce7+XPRJLDi/VLVf0sezmSWZOo5cObY7MwpsDKyZiTxiiuKLvqdLwkuJAuBwEkkVwh7Q48kHWJ5uTC2cOSPOCFaxvFfYyHDs/l20l7Q3hKIVxKHZfHKFtC9R12o6EYVcWEHV2vpLb4gbO+DKlcX3xmZIoNhO/eMeAWwAgmnUUmGMLuk32M+gF2/wAWUooi6e0Yg/2gXPzE5yxjb+0TEXq00voqE+bNb5LE8mK+wz0SCeOk8vNlMwxr0EkV7cJdwGD22AjJhuz6nQjxit4FTon/AL2eU3TEE7zbyHxjlieyAYEpoeUX6+Q1EOoh9jNFRL9PW0uUlPHTykP7m6c/PUHoQeElD2AOzz8NOGt7eEZMVolAI1GyRfeLi3QjhJnXaHeHTWQpjFYG6kdQbf5F9OMgw+MI0Nyu4i+o5FTwPSNqBjDfZJFSsXdyigbjuPU62h2lj6VTEli4IA7sRsfjCmi2YHcx4i3IbjNMsrbLIfzD5zlv86qnW/CsW54Or06u1e1xwjF2fog0zcX1MSMVjmQqgG9b3jp2SctRBPX5mJ+b8/rTpj/o8yaSk0oOqO6242AhnDU9ld2+BsDTD4moT+E2+EPzvng4tbMmTLzI5j5ySsqk+Jm1PFbT2HGBKlU3PifnJcDVs4MhpXBmx+W3S8BYbLWZrGOuAYOmsF4qqtNrm0Zr6BM9w+TtTG0JWxGZFGsTLdXtApS2kVsXidtrzNr4ZJhqpnpta8qNnBMGMJX2oujYMuWZiWe0fcve6icsyhu+J0zKvdEGgYvdssEjVgbEsUA8NSdOuoiViaBRirbx8ROg9pdKjNxCC3na5ihmdEsu1e5UXPQfr6wbyU9f9UwQTLGEpbRtPcBhdtrcOMZqWWoi7tOczZlJ5kdDvW8/OOuHoxRwmc0qZsVYW5W+sastzijUsEcX5cYrlsdNJYE6YtPXwitfSW0QESZUhSAwBisoVtwHWBc47NbCM40AFyLa3/x8p0CnhbzXOsN/09QAXOw1h12TChWcao4UFgBx8/8AImmaWV3AUDXhu8PnLOS3YbR56H0MqZxpUcdbjpf/AJjfCf0C4ioT4S81AikG6g/GD6x1hPC4i9FkmQWPSP7XDUavFQFbzFvmBHXsxiFTDBmIA1+ZiB2QqbWGqIeGo9AfnGnswDVb2Z9xFvbmSf8AMaeiV9hzIagd3cbnYkeG4Q2xgfA0Nmo4XQA/SW8StT8JEZC6WvaCZBHsav8AUPSZDr/gT5+r4WxPjIqSd4Q5j03ylhqfekSwyZbV2UgnM0Lt0l5TsrKn7wNq0ZgSB4y+enAQ9QQNN6mH0gwyfIt1MPaVTh4XxSWlMiS9mdq8ctG2UUbOJ0rLh3ROfZaO+J0TLPdEaXpz+aVPRQ7R4e+yw3kFfHjbrp8op1qIUOPwlT3eINiPSOPbKkxwrsmjIVcEbxsnX4XiUtdqlMM5BNjuFr8NZqWMEVs4zbs9hxYkjjGZsLddN8F5elgLRlwKBrRWUlcClXwGIZjsBOikC/xmYnKWWmHqqqsDZgqsrqODcUYeY0nRBlSOAba8xK2Jy02ttN63+cZPEI55F7JMTXQhdsunC+pEZMdm5poHKO1xewGt5VyrBAVRyhTtbljOgClgotcJoSOXhMmFrAZhO3tPc9KoviNPWGx2goVkIUkMVOhFtwPGKeVdkrBilRy5HcJcoVP5hYh+HLjGl8I6YOp7ZUL7LIrJx27IttLi5I9eO+OsZN6cxSyIAOYHr3oHzFjttGHO8JsOicb6nmTAecUdhyOgMzXAu8gSpLOAbUjmJXqb5fyKjt1ADu4+ECGG7s4hp0GY6beg+UbuxRIqueBUCKVTEguEX3U084w9n8yFEtf8WzKR0RtjnhP5r+P0hFkvBmT1A7sw42+UNbMZdClb92HOeS1aZME+eMad8r0MHUvcIxE9aqCfOMGTOdm3Kc9VjO/weFeRPWDnw1UrYI3w+8H/AOk4nav7J/h950TC45eKi/hLJzED8IjJb9KP8ynjkT8Bg6wAvTYen3hBsG5HuN6RmTMuglinmnQR0v8Aoj/PzuHPMTkuIY6UnPpKv/pzE/8Asv8AD7zrtLG34CWlxAtuif41/R3blZhyPA9nMSrgmiwHl9454DCOqgMjCN61hJEcRlCRK2q7QnZxh2ai67J1UjdfhOdYanamo6TtOd4lUo1HNu6jHXjpu89043uXwiXwLMpdBHB7h4QvgK1jYwBg60N4IBjE0ZDVhMWLb4IbMXqVigYrs8NNZTxeJWke8SATv4eZ4ecjq0RUIelUXb6EekPZuEH8lpsz3O8GNmY1FRQ7C66XPK+nziLkVPEK9mF79LX6xkzlnNAoQNbX38Df5gQp4hKxsNYajTNioEo53UAKJ/US1uiD7lfSDezGOLoN/KSZwx/eU/tYfKUnkl5P9eBB7Q074lP7hF7tWlqx6qPrGHtDVtideFvnAna03dDzX6zUhZYqVIWypxTUu3EaSlh8OXbwl7MgoRV4wIZhLJnvrzN4yVKYCox4/e0VskOgjrWp3wityb/9D7x5JWMvZ/HBEBPGGznSdfQxbyvDbSqISGXdZtAEf9aTr6TIO/07qZkOsxwHD1bnXnG3I6ne8frElDYmM2R1tUP60nPa6PS/JXLQy1dDPBVnuJ96VS9oNxnc+i6mII0k1LEawZ7SbJU1jJiMacLXhJKsWMLiIXp1tJSWRuQulWTLWgqlVmmKzenTNncBrEhL94gch9YWRaB/bjMbItIHVyGboo3ep+UR98vZhiGquztvPDkOAEqrTtI1WsRlQNstDOWYg7Qg/EYe4kWFqlG19YEDobWbauCL3lSjgqYe7IfFTssPTeJcy2uj2Jh1MEjbwCDDIVWGmU4RNyYitz2SFuPhCWNolQt3dzfQNs6DyUX85cwGXqmqgCT0qau+uoX4mPm8E7tGmU4MItwLXJPmTrBmfvavSP8Ad8o0EWFhE7thWCPTY8z8o6n1WHNVOnpzbtFiGNd25NYDoJW7QuW2Cd+z9pazZbttnezk+V5T7QVLsvRYrb3CkrgqYFdkX5wfi6u056aQrVcLTFt9oDQ6wfAjJk24R2xNS2BA4ltP+4RIyTcJ0LszgRiTsvqlMXtwLE3+EeSVhjs57i35fSHTKGEohKjKu4aD0hBhGQDWZMtMhMfNBp6nxhfJntbofn/iV6tH5yTCaE+U5qeo9Dwy5pMc8SbhTzAlKpLCvempkFQ6RezubIlabq8rM4G+DsTm4GianmdB/wAxkiVeSZXIwLigouxAA3kwTmXa1/dod0f1kAsfAHcPj4QDXxDv7zX5DgPASI0+sdLDk8nndcLgIP2lxRteu4tyCr62GvnK9LMHFT2jsXYnvEm5YeJlZqR8ZHYiHCDpv6PqIrKGU3Ui4PSamlFvJc4NI7Ld5DvHFTzX7Rzw6K6h0IZTuI/W/pJVOFFWlD2UgxGEvDYwuu6X6eUFlvaKOK2FotewNvGNmWUMTYW2SOrW+kmweTKDc3jLgqNtI0i08XAu4vtUlM1KTt36dgw1AN1B0Y79TY+Ezsj2ip7Ll3UG5IFxuPKJPaPDlMRWuSzK7huZBO2p9GHrFZwA910F9x08bXl/XPpzN+x9L06gZQw3HWI37SPdpW4vb4GKmVdt62GX2S7DoG7qvtXUHgrA6Dprvm+ddqnxJTbohNhtrusWvpa2o+MZiFfOqOyEXoIv5v7/AJQ3mOcJVdCUZLW0Ot7coIzUbdQsouABpxt4SbT9ik1wDa79yUVl/FgbFxzlBZhkMWTtYAzrX7PKdqDNxZiTORZQbgCdk7C/yfWNJK+0X6I/jP4y6RKWH/nP4wjaMhSK0ySWmQhPnmp9Z4JDWPzmiPqJzaehKejNhcQPYm/Aym2MFt8pe2IRh4Qb7cwSi/k8mInzHGlu6OO/7QcDNC1zee3lFwcNU6essoQeIkoT/B+kpeU3p1Su4+Taj1jE8LGwbXX0PCZTIbTceR/Wsno1A27Q8uB8DxntbDbQuNGHHkYcBv8ASo9O0uZXmD0W20a3MHVT/cPrIkuwI3Ou8c5V2tk7Q1U7x8xA0HTquQZ7RxFke1OobAAnuOfytz6HXxjngKFhskTg1N7DaXVTwjh2d7Y1aVlY+1QabLnvqPyNv8jceEH+NfA/5H9OqLhxykqIBui/hu2mEYXLlD/S6tf1UEH1g7N+39FFIw4LvwLKyovU3sW8APOZQ9C6WCx27ZRjahX+hNq39Vj8dnZiZXN02hwYi3Ag/wDN4QxmJd2Z2JZ3NyTvJPGD6ibLOn5QfMWP3lMxYT3XpBj94I4hT8BJmqsgDKeGo4SDFaoh6W9CZPW9xDzEGdh/hNh66u6H1B59JlHEsGS+8u214AgAeG+Cwdk3Evu+tM8SB/8AY6+cyYGsLWcYYLSuP6/TUwEguYy1iGVwwvYk2MCrhwr/AJbbQ8P8wXOMM1qDWVJsgDiZ1zsN/J8zOQ5W9zfrOudhf5J8TNIlfAnh/wCc/jCcGYT+c/jChEZANLT2bWmQm0+bKv1mgm9b6zQTlPTRI9Tunwgyo0INB1TfDJPzPgjvNgZrPRKI5iQGSKJCDJU6awmJNi3MfEeYlzDYjg3kd4MgpPJv3e+q90/A+IjJCt/09xy7JWqvA2PX9bp4yAnT3KguPysN/wAfnNH2iChFr6W5N+EjodB5yLL6v4G53F+DD9Eec302cHuHc03KuLA6HpyIlx6RB7psZHnQuEPSbZfV2l/MvxXh6TJc4K3xpNSxRPdffJgesgxFO+o3zRX06xtzsHfQSw1Ib+UG0226z9Qw/wDG0t0atqZPW0H4M2qA8/rGp9IE/TUJekw4qb+R0P0m1I7VIflNvtJcOQPaA79VkeEpkI48/SJg+g6odZcC9+n/AGr82Mp1N8vj+Yg4BQfnFQzLz1Nah4WI85Xan/06PxG0PK4+vzkFepclRxJJPSE8GgKgH3dnZA57Q1PxlEvbgl/55IMmO6de7CP/AAj4mcky6nsnZ9J1vsIP4R8TERq+BbBH+M8MWgfBD+O8MRkKZaZMmQmPmmt9ZEJLW+siBnIz1UbGD641l4mU8UNY0k/J0QT0TyZGOY3BnomgmwhMSox5+ust0KzjhfwMorJ6TdYUwNBKtZ1NrhwNOB01HjqJVr09tRUX3hqw59R1lmjUHP1klWjoXTQ7yBuPgOco1oieFXEVtpFbyPiJVwNXYcHhxm9FwWKjc2oHJhy6b/WVag1iN86Ml8D7HW3DePCVsalhcTMHU206r8uMnxI2klO0T6ZWD3pD+4iRbVmWbYcdx15d4fKVybuB1iMdIvZglm2hx19RJsN/KYnjIMxe+yo3y0Rs07R19Fb4QBcd6XqrWa437Cged5VC3eT5gwDf7VH1+oiJcDkW1uQcT3j84So1iO9bXci/WBqb2ueJ+A4whhmOn9R/8V+80sFIJ0aeyyre52QT1uTc+p+U6v2D/lHxPznJsE225YblGwvWxBYzq/YI/wAI+J+Zjtc8E6fQYwX894XgbBH+O/jDImRkZMntp5CY+Z6x+civJKx3+MhBnIenJuJBiF0koM8rjSZGpagfMmGZeOch7NhNJsIQG4M3RjwkYMv5VllSu2zTXTix0UeJ+kxjWk5hDDYgXsfK2/4RyybsTQWxrM1RuI9xPQan1jtlmFo0gBSpog/KoHxA1hXkSA404dmWD2TtqrKDrqCLNfhfhx8pWxYBO0NzDaHnv+N59G16SVkanVUMjCzK2oN/kes472z7HPgwWW70L3R+KbVhsP52s24+OkOqujZgp4KsVYQ2LWuNx+EXAdYTwGJ/Cd0aX8FpfTY90t4WlDD1LOGhHGrBaL3gOsFcM08oJUiNq7GWcTVBFgQfAwXiDZz1t8pGrj9Wh9s4N66W6FI3ufjK2ZqQ5vxsw8LW+kYcr7PVquydkIG3GoyqT4KTtH0lHtblT4eqqtsm63VkO0rAE6X5g7xwiuk1gV2BEOv61MtCoQNke828ypTPGSUH715kwsNUmCkKNygDz3mdJ/ZnmO17Sid6AOp5q2hHkfmJyqm+t7wxkWavh6oqU2sw333MOKnoZVPeCNTnJ2bAn+O/lDgit2azBa7mqottbxvsRvF40CZARtMnl5kxj5irGQ3klfjIZyHpo3vN7XEhvJaZgGXJQqDWayfErYmQSi6OWljMns1nsIpey3BGo1tyjefoI/ZYy01CKLARaykBVFoVpVZKmykzwN2GxXWE8PiooYbEwvh8VxiaO0NNDEy/3HUo6hkYEMrAEEHeCDFejiYSw2LlJonUnOO3XYRsNevh7vhye8upalfmfxL+Y7r684jI9jPpmhUV1KsAykWIOoIOhBB3gicS/aH2V/cq+0gJoVSWT8h3tTJ6X06eBlexMBC1NtOolPDp378pXw9cobwjTKm7LuOvh0MdPSbXqa16YZten2+0aOyHZE1Q1Xumz7C31C2UMzsOPvKoB4m+6LTKLXPp8/hOg/s0xdWhUCuFOHqqWV9tSQVXUhQdomwIItcFRui2tTQPZg7KMea+JNDDtsUUDMzKxV6ttF/iDvKpZh7pGl+YAD/tHqkYhaR1FNAEYksxVgCNsnewsdTra1ySLw1lnZnGYRnejWwyMwZAtVl7wVrfi0BIAYeYNraqfapWevVd3Vn2yGKW2CqgKjJ3joQp0vppz0jKyu+B00+QFeGMnyKrXI2QEX+tr2/2j8Uq5ThlZrtqBw5+PSP2XV91tBGqsKTOl/JOxWFQA1A1VuO0SqeSKRp4kxywuTYYCww9ED/40+0AYDFRgwdeaaZnKJ8BlNOi+1SUIre8g92/AqPw6XBA03eZmU6bXltGuJea1HPc4+D2ZPZkYmfL1b6yGT1uMgnIz00eibpNBPVmGRmLXcZShCsLqekHtGkl5VyeTJkyMRL2AxxQ2Oqn4dRGCjXBsQbiKMs4XFsh01HKLU6NNYONDEWhTDYmKmHxqtuPlCNDEyTWFU9GhcTJ6OO6wGmJuJ77aYODrgsy3ay1n2DTG4d6Dm17MrWBKMpuGHxB6ExQw2IMLYbHRprBKk51m/YjF0bn2ftEH46Xf06r7w9IunaU2N1PEEW9RO94fHdZ5jcFh8QP41JH6kd4eDDWUVJk3JwpcYeIlmjmjKVKs6lSStjopIsSFOlyNDpqJ0XMv2bUnucNUKHgr95PDaHeHneI2cdmMRhifbUmC/1p30/7hu87R90T1/4EcP2wxF7syOdRtMmy1joVOxYEf3A77+Fd6tNy71gLsvcIuVB4XA3acRfX4Av3bipPzm5VipB15fYzYvqF4+EeBr7JjPgcZpFJaTXACm53CxufDnHrs92VZwGrmw/oXf8A7jw8B6ybRaWXMrxjO4VATztwj1gEIAvI8sy5KahUUKOQH6vC1KlMkZvSag8u4epwlZKcsIkpPDJ0tWFm8yV9tuk9lPZEfRn/2Q=="
     alt=""
    />
    <p className="designer-name-select">Hany Mustafa</p>
   </>
  ),
 },
];
// const collectionsOptions = [
//  {
//   value: "Classic",
//   label: (
//    <>
//     <div className="collection-option">
//      <p className="designer-name-select">Muhamed Gomaa</p>
//     </div>
//    </>
//   ),
//  },
//  {
//   value: "mohamedmahdy",
//   label: (
//    <>
//     <img
//      className="designer-select"
//      src="https://i.pinimg.com/originals/7d/21/f4/7d21f47169e4276a368266329abf8c79.jpg"
//      alt=""
//     />
//     <p className="designer-name-select">Mohamed Mahdy</p>
//    </>
//   ),
//  },
//  {
//   value: "hanymustafa",
//   label: (
//    <>
//     <img
//      className="designer-select"
//      src="data:image/jpeg;base64,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"
//      alt=""
//     />
//     <p className="designer-name-select">Hany Mustafa</p>
//    </>
//   ),
//  },
// ];
const collectionsOptions = [
 {
  label: "Colelction one",
  value: 1,
 },
 {
  label: "Collection Two",
  value: 2,
 },
];
const filterDesigners = (inputValue = "") => {
 return desingersOptions.filter((i) =>
  i.value.toLowerCase().includes(inputValue.toLowerCase())
 );
};

const handleChange = (value) => {
 console.log(`selected ${value}`);
};
const collectionSelectFilter = (inputValue = "") => {
 return collectionsOptions.filter((i) =>
  i.value.toLowerCase().includes(inputValue.toLowerCase())
 );
};
const promiseOptions = (inputValue) =>
 new Promise((resolve) => {
  setTimeout(() => {
   resolve(filterDesigners(inputValue));
  }, 1000);
 });

const Identity = ({ ...props }) => {
 const [name, setName] = useState(props.identity.name ?? "");
 const [category, setCategory] = useState("Furniture");
 const [type, setType] = useState("");
 const [kind, setKind] = useState("");
 const [style, setStyle] = useState("");
 const [country, setCountry] = useState("");
 const [is_outdoor, setOutdoor] = useState("yes");
 const [brand_id, setBrandId] = useState(null);
 //  const [collectionValue, setCollectionValue] = useState("");
 const [product_file_kind, setFileType] = useState("");
 const [is_for_kids, setForKids] = useState("");
 const [places_tags, setTags] = useState([]);
 const [places_tags_label, setTagsLabel] = useState([]);
 const [styles, setStyles] = useState([]);
 //  const [styles_label, setStylesLabel] = useState([]);
 const [product_id, setId] = useState(props.id);
 const [inputValue, setInputValue] = useState("");

 const [types, setTypes] = useState([]);
 const [types_label, setTypesLabel] = useState([]);
 const [materials, setMaterials] = useState(["Wood"]);
 const [materials_label, setMaterialsLabel] = useState([]);
 const [shapes, setShapes] = useState(["Round"]);
 const [shapes_label, setShapesLabel] = useState([]);
 const [bases, setBases] = useState(["4-base"]);
 const [bases_label, setBasesLabel] = useState([]);
 const [seats, setSeats] = useState(["1-seater"]);
 const [seats_label, setSeatsLabel] = useState([]);
 const [furniture, setFurniture] = useState({});
 const [collections, setCollections] = useState([]);

 const fetchStoreCollections = (store_id) => {
  axios.get(`${API}collections/${store_id}`).then((response) => {
   console.log(response);
   setCollections(response.data.collections);
  });
 };
 const collect = (collection) => {
  console.log(typeof collection);

  if (typeof collection === "number") {
   const fd = new FormData();
   fd.append("colection_id", collection);
   fd.append("product_id", props.id);
   axios
    .post(`${API}add-to-collection`, fd)
    .then((response) => {
     console.log(response);
    })
    .catch((err) => console.log(err));
  } else {
   const fds = new FormData();
   fds.append("collection_name", collection);
   fds.append("product_id", props.id);
   fds.append("store_id", brand_id);
   axios
    .post(`${API}collect`, fds)
    .then((response) => {
     console.log(response);
    })
    .catch((err) => console.log(err));
  }
 };
 const getStoreId = () => {
  axios
   .get(`${API}store-id/${props.id}`)
   .then((response) => {
    setBrandId(response.data.store_id);
    fetchStoreCollections(response.data.store_id);
   })
   .catch((err) => console.log(err));
 };
 useEffect(() => {
  // console.log(types, shapes, styles, seats, bases, materials);
  setId(props.id);
  if (kind.value === "Chairs") {
   setFurniture(productClass.chair);
  } else if (kind.value === "Beds") {
   setFurniture(productClass.beds);
  } else if (kind.value === "Sofa") {
   setFurniture(productClass.sofas);
  } else if (kind.value === "Benches") {
   setFurniture(productClass.benches);
  } else if (kind.value === "Chests") {
   setFurniture(productClass.chests);
  } else if (kind.value === "Cabinets") {
   setFurniture(productClass.cabinet);
  } else if (kind.value === "Table") {
   setFurniture(productClass.table);
  } else if (kind.value === "Poufs") {
   setFurniture(productClass.poufs);
  } else if (kind.value === "Office") {
   setFurniture(productClass.office);
  } else if (kind.value === "Furniture components and hardware") {
   setFurniture(productClass.components_hardware);
  } else {
   setFurniture(productClass.empty);
  }
  if (brand_id) {
   return;
  } else {
   getStoreId();
  }
 });

 const onChangeCategory = (selectedOption) => {
  setCategory(selectedOption);
  console.log(`Option selected:`, selectedOption);
 };

 const onChangeKind = (selectedOption) => {
  setKind(selectedOption);
  // setFurniture({});
  // setBases([]);
  setShapesLabel([]);
  setBasesLabel([]);
  setSeatsLabel([]);
  setTypesLabel([]);

  console.log(`Option selected:`, selectedOption);
  setType("");
 };

 const onChangeBase = (selectedOption) => {
  setBasesLabel(selectedOption);
  setBases(
   Array.isArray(bases_label) ? selectedOption.map((x) => x.value) : []
  );
 };

 const onChangeSeats = (selectedOption) => {
  setSeatsLabel(selectedOption);
  setSeats(
   Array.isArray(seats_label) ? selectedOption.map((x) => x.value) : []
  );
 };

 const onChangeShape = (selectedOption) => {
  setShapesLabel(selectedOption);
  setShapes(
   Array.isArray(shapes_label) ? selectedOption.map((x) => x.value) : []
  );
 };

 const onChangeMaterial = (selectedOption) => {
  setMaterialsLabel(selectedOption);
  setMaterials(
   Array.isArray(materials_label) ? selectedOption.map((x) => x.value) : []
  );

  console.log(`Option selected:`, materials);
 };

 const onChangeForKids = (value) => {
  setForKids(value);
 };

 const onChangeFileType = (value) => {
  setFileType(value);
 };

 const onChangeProductTags = (selectedOption) => {
  setTagsLabel(selectedOption);
  setTags(
   Array.isArray(places_tags_label) ? selectedOption.map((x) => x.value) : []
  );

  console.log(`Option selected:`, places_tags);
 };

 const onChangeProductTypes = (selectedOption) => {
  setTypesLabel(selectedOption);
  setTypes(
   Array.isArray(types_label) ? selectedOption.map((x) => x.value) : []
  );
  console.log(`Option selected:`, types);
 };

 const onChangeStyle = (selectedOption) => {
  setStyle(selectedOption);
  console.log(`Option selected:`, selectedOption);
 };

 const handleIdentitySubmit = (e) => {
  props.dispatchAddIdentity(
   name,
   //  category.value,
   category,
   types,
   materials,
   country,
   seats,
   bases,
   shapes,
   kind.value,
   styles,
   places_tags,
   is_outdoor,
   is_for_kids,
   product_file_kind,
   product_id
  );
 };

 return (
  <div className="step-form identity">
   <button
    className="save-product-step-btn"
    style={{
     top: "-110px",
     height: "20px",
     background: props.loading ? "#898989" : "",
    }}
    onClick={handleIdentitySubmit}
   >
    {props.loading ? (
     <ClipLoader
      style={{ height: "20px" }}
      color="#ffffff"
      loading={props.loading}
      size={18}
     />
    ) : (
     "Save & Continue"
    )}
   </button>
   <Form>
    <div className="form-block">
     <Form.Group>
      <Form.Row>
       <Col>
        <Form.Label>
         Product Name
         {/* <Us />*/}
        </Form.Label>
        <Form.Control
         className="py-3"
         placeholder="Product name"
         value={name}
         onChange={(e) => {
          setName(e.target.value);
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
       {/* <Select */}
       <ReactSelect
        // options={SelectOptions}
        value="Furniture"
        placeholder="Furniture"
        isDisabled
        onChange={onChangeCategory}
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
       {/* <Select */}
       <ReactSelect
        options={productClass.kind_options}
        value={kind ?? ""}
        onChange={onChangeKind}
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
      {furniture.types?.length > 0 ? (
       <>
        <Form.Label
         column
         md={2}
         className="sub-label"
         onClick={() =>
          console.log(product_file_kind, is_for_kids, places_tags)
         }
        >
         Type
        </Form.Label>
        <Col md={4}>
         {/* <Select */}
         <ReactSelect
          isMulti
          // options={rightType}
          options={furniture.types}
          value={types_label}
          // onChange={onChangeType}
          onChange={onChangeProductTypes}
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
      {furniture.shapes?.length > 0 ? (
       <>
        <Form.Label column md={2} className="sub-label">
         Shape
        </Form.Label>
        <Col md={4}>
         {/* <Select */}
         <ReactSelect
          isMulti
          // options={rightShape}
          options={furniture.shapes}
          value={shapes_label}
          onChange={onChangeShape}
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
        options={productClass.furniture_styles}
        value={style ?? ""}
        onChange={onChangeStyle}
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
        // options={SelectOptions}
        options={productClass.furniture_materials}
        value={materials_label}
        onChange={onChangeMaterial}
        styles={material_styles}
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
      {furniture.bases?.length > 0 ? (
       <>
        <Form.Label column md={2} className="sub-label">
         Base
        </Form.Label>
        <Col md={4}>
         {/* <Select */}
         <ReactSelect
          isMulti
          options={furniture.bases}
          value={bases_label}
          onChange={onChangeBase}
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
      {furniture.seats?.length > 0 ? (
       <>
        <Form.Label column md={2} className="sub-label">
         Seats
        </Form.Label>
        <Col md={4}>
         {/* <Select */}
         <ReactSelect
          isMulti
          options={furniture.seats}
          value={seats_label}
          onChange={onChangeSeats}
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
       <Form.Check
        type="radio"
        label="yes"
        value="yes"
        name="formHorizontalRadios1"
        id="formHorizontalRadios1"
        onChange={(e) => onChangeForKids(e.target.value)}
       />
      </Col>
      <Col md={1}>
       <Form.Check
        type="radio"
        label="No"
        value="no"
        onChange={(e) => onChangeForKids(e.target.value)}
        name="formHorizontalRadios1"
        id="formHorizontalRadios2"
       />
      </Col>
      <Col md={12}>
       <p className="light">
        Please check on yes if this products made spicily for kids.
       </p>
      </Col>
     </Form.Group>
    </div>
    <Form.Group as={Row}>
     <Col md={7}>
      <Form.Label>Collections / Sereies</Form.Label>
      <div>
       <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Add to an existing collection or create a new one "
        onChange={handleChange}
        onSearch={(e) => console.log(e, collections)}
        onSelect={(e) => collect(e)}
        filterOption={(input, option) =>
         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        size="large"
       >
        {collections.map((collection) => {
         return (
          <Option key={collection.id} value={collection.id}>
           {collection.collection_name}
          </Option>
         );
        })}
       </Select>
      </div>
      {/* ,mountNode */}
      <p className="light">Collect each series’s products in one collection.</p>
     </Col>
    </Form.Group>
    <Form.Group as={Row}>
     <Col md={7}>
      <Form.Label>Designer</Form.Label>
      {/* <Form.Control placeholder="Search Designers by name or email" /> */}
      <AsyncSelect
       isMulti
       defaultOptions
       placeholder="Search"
       loadOptions={promiseOptions}
      />

      <p className="light">
       Search and tag the product’s designer, If you can’t in find the designer
       click here to invite.
      </p>
     </Col>
    </Form.Group>
    <Form.Group as={Row}>
     <Col md={12}>
      <Form.Label>Product Files</Form.Label>
     </Col>
     <Col md={1}>
      <Form.Check
       type="radio"
       label="CAD"
       value="cad"
       name="formHorizontalRadios3"
       id="formHorizontalRadios3"
       onChange={(e) => onChangeFileType(e.target.value)}
      />
     </Col>
     <Col md={1}>
      <Form.Check
       type="radio"
       label="3D"
       value="3d"
       name="formHorizontalRadios3"
       id="formHorizontalRadios4"
       onChange={(e) => onChangeFileType(e.target.value)}
      />
     </Col>
     <Col md={12}>
      <p className="light">
       Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti!
      </p>
     </Col>
    </Form.Group>
    <Form.Group>
     <Form.Row>
      <Col md={8}>
       <Form.Label>Product Tags </Form.Label>
       {/* <Select */}
       <ReactSelect
        closeMenuOnSelect={false}
        isMulti
        onChange={onChangeProductTags}
        value={places_tags_label}
        options={TagsOptions}
        styles={colourStyles}
       />
      </Col>
     </Form.Row>
    </Form.Group>
    <Form.Group as={Row}>
     <Col md={6} style={{ marginBottom: "100px" }}>
      <Form.Label>Product Country or Origin</Form.Label>
      <ReactFlagsSelect
       selected={country}
       selectedSize={20}
       optionsSize={20}
       searchable
       onSelect={(code, value) => {
        setCountry(code);
        console.log(code, value);
       }}
       //  countries={["United States", "GB", "FR", "DE", "IT", "NG"]}

       //  showSelectedLabel={false}
       //  showSecondarySelectedLabel={false}
       //  showOptionLabel={false}
       //  showSecondaryOptionLabel={false}
       // customLabels={{ AF: "Afghanistan", China: "China" }}
      />
     </Col>
    </Form.Group>
   </Form>
  </div>
 );
};

// export default Identity;

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
  places_tags,
  // productTags,
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
export default connect(mapStateToProps, mapDispatchToProps)(Identity);
