import React, { PureComponent } from 'react';

class App extends PureComponent {
  constructor(props){
    super(props);
  }
  render(){
    return this.props.children;
  }
};

export default App;
