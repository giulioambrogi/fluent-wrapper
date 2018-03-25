import React from 'react';

export default class Toast extends React.Component {

    render() {
      return (
        <div className="toast">
            <h2>Hello I am a toast</h2>
            {this.props.message && <p>{this.props.message}</p>}
        </div>
      );
    }
  }