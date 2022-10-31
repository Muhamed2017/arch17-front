const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const renderContent = (req, res) => {
    fs.readFile(
    path.resolve(__dirname, "../build/index.html"), "utf8", (err, htmlData) => {
      if (err) {
        return res.sendStatus(500);
      }
      let title = `<title>Title| Arch17</title>`
     let withNewHead= htmlData.replace(/<title>[\s\S]*?<\/title>/, title)
      return res.send(withNewHead);
    });
}


app.use("^/$", renderContent); // step 2
app.use(express.static(path.resolve(__dirname, "../build"))); // step 3
app.use("*", renderContent); // step 2

// step 1
app.listen(8000, () => {
    console.log(`Listening on port ${8000}`);
});