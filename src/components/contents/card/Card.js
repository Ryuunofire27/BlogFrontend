import React from 'react';
import { Link } from 'react-router-dom';
import MD from 'react-markdown';

function RouterLink(props){
  return (
    props.href.match(/^(http?:)?\/\//)
    ? <a href={props.href}>{props.children}</a>
    : <Link to={props.href}>{props.children}</Link>
  );
}

export const Card = (props) => {
  const postData = props.postData;
  return (
    <div className="card">
      <div className="card-img">
        <Link to={`/post/${postData._id}`}>
          <img src={ postData ? postData.img : ""}/>
        </Link>
      </div>
      <div className="card-content">
        {postData && <MD source={postData.extract} renderers={{Link: RouterLink}}/>}
      </div>
    </div>
  );
}