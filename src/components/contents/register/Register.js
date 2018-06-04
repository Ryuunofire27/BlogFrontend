import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export const Register = (props) => {
    return props.app.state.user ? <Redirect to="/"/> : <div className="register">
          <form onSubmit={props.app.fn.handlerRegister}>
            <input type="file" name="img"/>
            <div>
              <label>Nombres</label>
              <input type="text" name="name" required/>
            </div>
            <div>
              <label>Apellidos</label>
              <input type="text" name="lastName" required/>
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" required/>
            </div>
            <div>
              <label>Usuario</label>
              <input type="text" name="username" required/>
            </div>
            <div>
              <label>Password</label>
              <input type="password" name="password" required/>
            </div>
            <div>
              <label>Repeat Password</label>
              <input type="password" name="repassword" required/>
            </div>
            <input type="submit" value="Registrarse"/>
          </form>
        </div>
    ;
  }