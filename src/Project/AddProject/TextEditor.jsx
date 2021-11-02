import React , {Component} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { config } from './editorConfig';

class TextEditor extends Component {
  render() {
    return (
      <Editor
      apiKey='lctm5x6zkllygemho9ydphcchwg8achniaqmel0a3av5gcw5' 
        initialValue={this.props.initialValue}
        init={config}
        onEditorChange={this.props.onEditorChange}
        onFocusIn={this.props.onFocusIn}
        ref={this.props.ref}
      />
    );
  }
}

export default TextEditor;
