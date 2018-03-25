import React from 'react';

export default class Foo extends React.Component {

  constructor(props){
    super(props);
    this.state = {email:'giovanni@gmail.com'}
  }
    render() {
      return (
        <div className="ciao">
          <h1>Title</h1>
          <form className="main" onClick={this.props.formClickSpy}>
            <input name="email" type="text" onChange={this.props.changeSpy || (e=>this.setState({email:e.target.value}))} value={this.state.email}/>
            <select name="age" />
            <button onClick={this.props.buttonClickSpy}>ciao</button>
          </form>
          {this.props.children}
        </div>
      );
    }
  }