import React, { Component } from 'react';
import CardsContent from '../cards-content/CardsContent';
import axios from 'axios';
class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      postData: null
    }
  }

  componentDidMount(){
    this.initPost();
  }
  initPost(){
    console.log(location);
    axios
      .get('http://localhost:8080/post')
      .then((res) => {
        this.setState({
          postData: res.data,
        });
      })
      .catch(err => console.log(err))
  }
  render(){
    console.log(this.props.postData);
    return (
      <div>
        <CardsContent postData={this.state.postData}/>
      </div>
    );
  }
}

export default Home;