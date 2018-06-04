import React from 'react';
import { Card } from '../card/Card';

export class CardsContent extends React.PureComponent {
  componentWillMount(){
    this.props.app.fn.getPosts();
  }
  render(){
    const posts = this.props.app.state.posts;
    return(
      <div className="card-container">
        {posts && posts.map((p) => {
          return <Card key={p._id} postData={p}/>
        })}
      </div>
    );
  }
};