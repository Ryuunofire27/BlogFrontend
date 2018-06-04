import React, { PureComponent } from 'react';
import CardsContent from '../cards-content/CardsContent';
import axios from 'axios';
class Home extends PureComponent {
  componentDidMount(){
    if(!this.props.posts){
      this.props.getPosts();
    }
  }

  initPost(){
    this.props.getPosts();
  }
  
  render(){
    return (
      <div>
        <CardsContent posts={this.props.posts}/>
      </div>
    );
  }
}

export default Home;