import React from 'react';
import { Home } from './home/Home';
import Login from './login/Login';
import { Post } from './posts/Post';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Register } from './register/Register';
import Editor from './editor/Editor';
import { AppContext } from '../AppContext';

export const Content = (props) => {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/login" component={() => <AppContext.Consumer>{app => <Login app={app} />}</AppContext.Consumer>}/>
          <Route exact path="/register" component={() => <AppContext.Consumer>{app => <Register app={app} />}</AppContext.Consumer>}/>
          <Route exact path="/profile/write" component={ () => props.user ? Editor : <Redirect to="/"/>} />
          <Route exact path="/post/:postId" component={ ({ match }) => <AppContext.Consumer>{app => <Post match={match} app={app}/>}</AppContext.Consumer>}/>}/>
        </Switch>
      </main>
    );
};
