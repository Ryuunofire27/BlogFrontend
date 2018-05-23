import React, { PureComponent } from 'react';
import Card from '../card/Card';

class CardsContent extends PureComponent{
  render(){
    return(
      <div className="card-container">
        <Card postData={this.props.postData}/>
        <Card postData={this.props.postData}/>
        <Card postData={this.props.postData}/>
        <Card postData={this.props.postData}/>
        <Card postData={this.props.postData}/>
        <Card postData={this.props.postData}/>
        <Card postData={this.props.postData}/>
        <Card postData={this.props.postData}/>
        <Card postData={this.props.postData}/>
        <Card postData={this.props.postData}/>
      </div>
    );
  }
}

export default CardsContent;