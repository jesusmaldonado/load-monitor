import React, { PureComponent } from 'react';
import moment from 'moment';

class ErrorMessage extends PureComponent {
  constructor(props){
    super(props);
  }
  getErrorMessage(){
    return this.props.errorMessage || {};
  }
  getTime(errorMessage){
    return moment.unix(errorMessage.get('time')).format('H:mm:ss a');
  }
  getClassNames(){
    let classNames = 'errorMessage'
    if (this.props.isMini){
      classNames = `${classNames} mini`;
    }
    return classNames;
  }
  render(){
    return (
      this.props.isMini ?
      <div key={this.getErrorMessage()} className={this.getClassNames()}>
        Load = {this.getErrorMessage().get('average').toFixed(2)},
        triggered at {this.getTime(this.getErrorMessage())}
      </div> :
      <div key={this.getErrorMessage()} className={this.getClassNames()}>
        <h3> High load generated an alert -
        Load = {this.getErrorMessage().get('average').toFixed(2)},
        Triggered at {this.getTime(this.getErrorMessage())}
       </h3>
      </div>
    );
  }
}

export default ErrorMessage;
