import React, { PureComponent } from 'react';
import ME from './MarkdownEditor';
import Modal from './Modal';

class Editor extends PureComponent{
  state = {
    elValue: null,
    value: '',
    isClicked: false,
    urlImg: null
  }

  changeClick = () => {
    this.setState({ isClicked: !this.state.isClicked });
  }


  setElValue = (el) => {
    this.setState({ elValue: el});
  }

  renderForm = () => {
    return this.state.isClicked ? <Modal changeClick={this.changeClick} value={this.state.elValue.value}/> : '';
  }

  render(){
    return (
      <div>
        {this.renderForm()}
        <ME setElValue={this.setElValue}/>
        <div>
          <div className="editor-options">
            <button onClick={this.changeClick}>Enviar</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;