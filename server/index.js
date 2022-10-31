
const head = (title, description, url, preview)=>{
  return `<meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="theme-color" content="#000000" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0" />
    <link href="/static/css/2.10263ea2.chunk.css" rel="stylesheet">
    <link href="/static/css/main.8f199424.chunk.css" rel="stylesheet">
    <title>${title}</title>
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content=${title}>
    <meta property="og:description" content=${description}>
    <meta property="og:image" content=${preview}>
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content=${url}>
    <meta property="twitter:title" content=${title}>
    <meta property="twitter:description" content=${description}>
    <meta property="twitter:image" content=${preview}>`
}


const express = require("express");
const fs = require("fs");
const path = require("path");
const axios = require('axios')
const app = express();

const renderContent = (req, res) => {
  let endPointName=""
  let endPointID = req.originalUrl !=='/' ? req.originalUrl.split("/")[2] : 0
  if(req.originalUrl.includes('/product/')){
    endPointName='product-meta-tags';
  }
  else if(req.originalUrl.includes('/project/')){
    endPointName= 'project-meta-tags'

  }
  else if (req.originalUrl.includes('/brand/')){
    endPointName= 'brand-meta-tags'
  }
  //  axios.default.get(`https://dummyjson.com/products/${Math.floor(Math.random() * 10) + 1}`).then((response)=>{
   if(endPointName ==='product-meta-tags' || endPointName ==='project-meta-tags'|| endPointName ==='brand-meta-tags'){
    axios.default.get(`https://api.arch17.com/api/${endPointName}/${endPointID}`).then((response)=>{
    fs.readFile(
    path.resolve(__dirname, "../build/index.html"), "utf8", (err, htmlData) => {
      if (err) {
        return res.sendStatus(500);
      }
      const {name, preview}= response.data.entity

      const _head = head(name, name, response.data.url , preview)
     let withNewHead= htmlData.replace(/<head>[\s\S]*?<\/head>/, _head)
      return res.send(withNewHead);
    });
   })
   }else{
    fs.readFile(
    path.resolve(__dirname, "../build/index.html"), "utf8", (err, htmlData) => {
      if (err) {
        return res.sendStatus(500);
      }
      
      let _name ="Arch17";
      let _description = "Arch17 Furniture"
      let preview = "https://res.cloudinary.com/azharuniversity/image/upload/v1657521745/ykqzek9ylpcwtrakbxuv.jpg"

      const _head = head(_name, _description,  "https://www.arch17.com", preview)
     let withNewHead= htmlData.replace(/<head>[\s\S]*?<\/head>/, _head)
      return res.send(withNewHead);
    });
   }
}



app.use("^/$", renderContent); // step 2
app.use(express.static(path.resolve(__dirname, "../build"))); // step 3
app.use("*", renderContent); // step 2

// step 1
app.listen(8000, () => {
    console.log(`Listening on port ${8000}`);
});