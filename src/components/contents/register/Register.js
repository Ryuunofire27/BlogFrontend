import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends PureComponent{
  constructor(props){
    super(props);
    this.state = {
      img: null,
      name: null,
      lastName: null,
      email: null,
      username: null,
      password: null,
      repassword: null,
    };

    this.handlerInputChange = this.handlerInputChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  handlerInputChange(e){
    this.setState({
      [e.target.name]: e.target.name == "img" ? e.target.files[0] : e.target.value
    });
  }

  handlerSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    axios
      .request({
        method: 'POST',
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        },
        baseURL: "http://localhost:8080/user"
      })
      .then(res => console.log(res.data))
      .catch( err => console.log(err));
  }

  render(){
    return (
      <div className="register">
        <form onSubmit={this.handlerSubmit} method="POST" encType="multipart/form-data">
          <input type="file" name="img" onChange={this.handlerInputChange}/>
          <div>
            <label>Nombres</label>
            <input type="text" name="name" onChange={this.handlerInputChange} required/>
          </div>
          <div>
            <label>Apellidos</label>
            <input type="text" name="lastName" onChange={this.handlerInputChange} required/>
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" onChange={this.handlerInputChange} required/>
          </div>
          <div>
            <label>Usuario</label>
            <input type="text" name="username" onChange={this.handlerInputChange} required/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" onChange={this.handlerInputChange} required/>
          </div>
          <div>
            <label>Repeat Password</label>
            <input type="password" name="repassword" onChange={this.handlerInputChange} required/>
          </div>
          <input type="submit" value="Registrarse"/>
        </form>
      </div>
    );
  }
}

export default Register;