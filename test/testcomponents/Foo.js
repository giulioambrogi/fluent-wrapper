import React from 'react';

export default class Foo extends React.Component {

    render() {
      return (
        <div className="ciao">
          <h1>Title</h1>
          <form className="main">
            <input name="email" type="text" />
            <select name="age" />
            <button>ciao</button>
          </form>
        </div>
      );
    }
  }