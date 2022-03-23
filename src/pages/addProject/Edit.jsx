import React, { Component } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/third_party/image_tui.min.js";
import "froala-editor/css/third_party/image_tui.min.css";
import "froala-editor/js/plugins/files_manager.min.js";
import "froala-editor/js/plugins/image_manager.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/css/plugins/image_manager.min.css";
import "froala-editor/js/plugins/file.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/markdown.min.js";
import "froala-editor/js/plugins/quick_insert.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/css/plugins/emoticons.min.css";

import "froala-editor/css/plugins/quick_insert.min.css";

import "froala-editor/js/third_party/font_awesome.min.js";
class Edit extends Component {
 constructor(props) {
  super(props);
  this.editorRef = React.createRef();
  this.state = {
   model: {},
  };
 }

 render() {
  return (
   <>
    {/* <button onClick={this.handleTest}>Click</button>/ */}
    {/* tag="textarea" */}

    <div id="editor">
     <FroalaEditorComponent
      ref={this.editorRef}
      config={{
       placeholderText: "Fuck here",
       imageDefaultAlign: "left",
       imageDefaultMargin: 20,
       imageDefaultWidth: 800,
       imageManagerPageSize: 2,
       quickInsertButtons: ["image", "video", "ol", "hr"],
       pluginsEnabled: [
        //     "align",
        // "charCounter",
        //     "codeBeautifier",
        //     "colors",
        //     "draggable",
        //     "video",
        //     "file",
        "imageTUI",
        "image",
        //     "imageManager",
        //     "fontFamily",
        "fontSize",
        // "emoticons",
        //     "paragraphFormat",
        //     "paragraphStyle",
        "lists",
        "quickInsert",
        "filesManager",
        "file",
        "video",
       ],
       events: {
        focus: function (e, editor) {
         console.log(this.editorRef);
        },
        keydown: (e) => {
         console.log(e, "clicked");
        },
        //    }
       },
      }}
      onModelChange={(model) =>
       this.setState({ model }, () => console.log(this.state.model))
      }
      //   <FroalaEditorImg/>
     />
    </div>
   </>
  );
 }
}

export default Edit;
