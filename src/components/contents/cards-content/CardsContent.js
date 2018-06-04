import React, { PureComponent } from 'react';
import Card from '../card/Card';

class CardsContent extends PureComponent{
  render(){
    return(
      <div className="card-container">
        {this.props.posts ? this.props.posts.map((p) => {
          return <Card key={p._id} postData={p}/>
        }):  <div></div>}
      </div>
    );
  }
}

export default CardsContent;