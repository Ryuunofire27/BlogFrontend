import React, { PureComponent } from 'react';
import axios from 'axios';

class Modal extends PureComponent{
  constructor(props){
    super(props);

    this.state = {
      value: '',
      urlImg: '',
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleImg = this.handleImg.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.setState({ value: this.props.value });
  }

  handleClick(e){
    e.preventDefault();
    this.props.changeClick();
  }

  handleImg(e){
    this.setState({ urlImg: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    axios
      .request({
        method: 'POST',
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        },
        baseURL: "http://localhost:8080/user/" + JSON.parse(localStorage.getItem("user"))._id + "/post"
      })
      .then(res => {
        if(res.data.msg) {
          alert(res.data.msg);
          this.props.changeClick();
        }
        if(res.data.err){
          alert(res.data.err);
        }
      })
      .catch( err => alert(err));
  }

  render(){
    return (
      <div className="editor-modal">
        <form className="editor-form" onSubmit={this.handleSubmit}>
          <button onClick={this.handleClick}>x</button>
          <span>Por favor llene este formulario antes de guardar el post</span>
          <img src={this.state.urlImg ? this.state.urlImg : 'https://cdn-images-1.medium.com/max/512/1*6kK9j74vyOmXYm1gN6ARhQ.png'} />
          <div>
            <label>Url de una imagen</label>
            <input type="text" name="img" onChange={this.handleImg}/>
          </div>
          <div>
            <label>Extract</label>
            <textarea placeholder="Un pequeño resumen o frase llamativa para leer el post" name="extract"/>
          </div>
          <input type="hidden" name="post" value={this.state.value} />
          <input type="submit" value="Guardar Post"/>
        </form>
      </div>
    );
  }
}

export default Modal;