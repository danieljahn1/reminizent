import React, { Component } from 'react';


class Jumbotron extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
      <Jumbotron>
        <h1 className="title">Reminizent</h1>
        <p className="body">This is where the text will go</p>
        <hr className="my-2" />
        <p className="lead">
          <button color="primary">Try</button>
        </p>
        <p className="lead">
          <button color="default">Learn More</button>
        </p>
      </Jumbotron>
    </div>
         )
    }
}
 
export default Jumbotron;