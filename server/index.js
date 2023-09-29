
const head = (title, description, url, preview)=>{
  return `
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="theme-color" content="#000000" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0" />
    <link href="/static/css/2.10263ea2.chunk.css" rel="stylesheet" >
    <link href="/static/css/main.8f199424.chunk.css" rel="stylesheet" >
    <title>${title}</title>
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta Name="description" content="${description}" />
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${preview}">
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${url}">
    <meta property="twitter:title" content="${title}" />
    <meta property="twitter:description" content="${description}" />
    <meta property="twitter:image" content="${preview}" />
    </head>
`
}
const express = require("express");
const fs = require("fs");
const path = require("path");
const axios = require('axios')
const app = express();




const renderContent = (req, res) => {

  
  let endPointName=""
  let endPointID ;

  let collection_name, collection_owner, collection_id, collection_cover

if(req.originalUrl.includes('procurementservice')){
 endPointID =0
 endPointName="procurement-timeline"
} 
else{
  endPointName=""
  endPointID = req.originalUrl !=='/' ? req.originalUrl.split("/")[2] : 0
  if(req.originalUrl.includes('/product/')){
    endPointName='product-meta-tags';
  }
  else if(req.originalUrl.includes('/project/')){
    endPointName= 'project-meta-tags'

  }
  else if (req.originalUrl.includes('/brand/')){
    endPointName= 'brand-meta-tags'
  }

 else if (req.originalUrl.includes('/company/')){
  if(req.originalUrl.includes("/addproject/")){
    endPointName=""
  }
  else{
    endPointName= 'company-meta-tags'
  }
  }
else if (req.originalUrl.includes('/user/')){
    endPointName= 'user-meta-tags'
  }
  else if(req.originalUrl.includes('/collections/') && req.originalUrl.split("/")?.length > 4){
    const _urlArray = req.originalUrl.split("/")
    endPointName = "user-products-folders-meta-tags"
    collection_name = _urlArray[2]
    collection_id = _urlArray[4]
    collection_owner = _urlArray[1]
    collection_cover = `https://api.arch17.com/uploads/collections/cover_${collection_id}.png`
  }

  else if(req.originalUrl.includes('/set/') && req.originalUrl.split("/")?.length > 4){
    const _urlArray = req.originalUrl.split("/")
    endPointName = "user-products-boards-meta-tags"
    collection_name = _urlArray[2]
    collection_id = _urlArray[4]
    collection_owner = _urlArray[1]
    collection_cover = `https://api.arch17.com/uploads/collections/projects/cover_${collection_id}.png`
  }

  else if(req.originalUrl.includes('/collection/')){
    const _urlArray = req.originalUrl.split("/")
    endPointName = "collection-meta-tags"
    // collection_cover = `https://api.arch17.com/uploads/brandcollections/cover_${collection_id}.png`
  }
}

if (endPointName ==='product-meta-tags' || endPointName ==='project-meta-tags'|| endPointName ==='brand-meta-tags' || endPointName==='company-meta-tags' || endPointName==='user-meta-tags' ||endPointName==='collection-meta-tags'){
    axios.get(`https://api.arch17.com/api/${endPointName}/${endPointID}`).then((response)=>{
    fs.readFile(
    path.resolve(__dirname, "../build/index.html"), "utf8", (err, htmlData) => {
      if (err) {
        return res.sendStatus(500);
      }
      const {name, description, preview}= response.data.entity ||""

      let withNewHead= htmlData.replaceAll("_PREVIEW", preview).replaceAll("_DESC", name).replaceAll("_TITLE", name).replaceAll("_URL", response.data.url)

      return res.send(withNewHead);
    });
   })
}
else if (endPointName === 'procurement-timeline'){
 fs.readFile(
    path.resolve(__dirname, "../build/index.html"), "utf8", (err, htmlData) => {
      if (err) {
        return res.sendStatus(500);
      }
const name = "Architecture Procurement Service"
const description ="Architecture Procurement Service"
const preview = "https://res.cloudinary.com/azharuniversity/image/upload/v1674719655/Arch17_Procurementservice_copy_pkcciy.jpg"
      let withNewHead= htmlData.replaceAll("_PREVIEW", preview).replaceAll("_DESC", name).replaceAll("_TITLE", name).replaceAll("_URL", "https://www.arch17.com/procurementservice")

      return res.send(withNewHead);
    });

}

else if (endPointName ==="user-products-folders-meta-tags"){
  fs.readFile(
    path.resolve(__dirname, "../build/index.html"), "utf8", (err, htmlData) => {
      if (err) {
        return res.sendStatus(500);
      }
      const name = collection_name
      const title = `${collection_name} | Collection`
      const description = `${collection_name} collection By ${collection_owner} | Arch17`
      const preview = collection_cover
      let withNewHead= htmlData.replaceAll("_PREVIEW", preview).replaceAll("_DESC", description).replaceAll("_TITLE", name).replaceAll("_URL", `https://www.arch17.com/${collection_owner}/${collection_name}/collections/${collection_id}`)
      return res.send(withNewHead);
    });
}
else if (endPointName ==="user-products-boards-meta-tags"){
  fs.readFile(
    path.resolve(__dirname, "../build/index.html"), "utf8", (err, htmlData) => {
      if (err) {
        return res.sendStatus(500);
      }
      const name = collection_name
      const title = `${collection_name} | Collection`
      const description = `${collection_name} collected By ${collection_owner} | Arch17`
      const preview = collection_cover
      let withNewHead= htmlData.replaceAll("_PREVIEW", preview).replaceAll("_DESC", description).replaceAll("_TITLE", name).replaceAll("_URL", `https://www.arch17.com/${collection_owner}/${collection_name}/set/${collection_id}`)
      return res.send(withNewHead);
    });
}
else{
    fs.readFile(
    path.resolve(__dirname, "../build/index.html"), "utf8", (err, htmlData) => {
      if (err) {
        return res.sendStatus(500);
      }

       let _name ="Arch17";
      let _description = "Arch17 Furniture"
      let preview = "https://res.cloudinary.com/azharuniversity/image/upload/v1657521745/ykqzek9ylpcwtrakbxuv.jpg"
     let withNewHead= htmlData.replaceAll("_PREVIEW", preview).replaceAll("_DESC", _description).replaceAll("_TITLE", _name).replaceAll("_URL", "https://www.arch17.com")
      return res.send(withNewHead);
    });

   }


 


  }
  
//   app.get('/', function (req, res) {
    
//     if(req.header("host")=="arch17.com"){
//     res.redirect(req.protocol + "://"+'www.arch17.com');
//     console.log(req.header("host"))
//     }
//     else{
//       console.log(req.header("host"))
//       return ;
//     }
// });
app.use("^/$", renderContent); // step 2
app.use(express.static(path.resolve(__dirname, "../build"))); // step 3
app.use("*", renderContent); // step 2

// step 1
app.listen(8000, () => {
    console.log(`Listening on port ${8000}`);
});






