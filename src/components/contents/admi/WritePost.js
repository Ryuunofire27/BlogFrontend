import React, { Component } from 'react';
class WritePost extends Component{

  constructor(){
    super();
    this.state = {
      value: ""
    }
  }
  handleChange(e){
    console.log(e.target);
  }
  render(){
    return (
      <div style={{height: '70vh'}}>
      </div>
    );
  }
}

export default WritePost;