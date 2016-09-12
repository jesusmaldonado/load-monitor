import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';
import ErrorMessage from './ErrorMessage';

export default React.createClass({
  mixins: [PureRenderMixin],
  getClearedTime(clearedMessage){
    return moment.unix(clearedMessage.get('loadClearTime')).format('H:mm:ss a');
  },
  getClearedMessage(){
    return this.props.clearedMessage || {};
  },
  render(){
    return (
      <div key={this.getClearedMessage()} className="clearedMessage">
        <h3> System recovered! -
          load = {this.getClearedMessage().get('newAverage').toFixed(2)},
          triggered at {this.getClearedTime(this.getClearedMessage())}
        </h3>
        <div>
          <h3> Previous Errors </h3>
          {this.getClearedMessage().get('priorErrors').map(errorMessage =>
            <ErrorMessage key={errorMessage} errorMessage={errorMessage} isMini={true}/>
          )}
        </div>
      </div>
    );
  }
})
