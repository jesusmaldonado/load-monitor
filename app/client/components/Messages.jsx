import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import moment from 'moment';

export default React.createClass({
  mixins: [PureRenderMixin],
  getErrorMessages(){
    return this.props.errorMessages || [];
  },
  getClearedMessages(){
    return this.props.clearedMessages || [];
  },
  getClearedTime(clearedMessage){
    return moment.unix(clearedMessage.get('loadClearTime')).format('H:mm:ss a');
  },
  getTime(errorMessage){
    return moment.unix(errorMessage.get('time')).format('H:mm:ss a');
  },
  render(){
    return <div className="message">
      <div className="errorMessages-container">
      <h2> Error Messages </h2>
      {
        this.getErrorMessages().reverse().map(errorMessage =>
          <div key={errorMessage} className="errorMessage">
            <h3> High load generated an alert -
            load = {errorMessage.get('average').toFixed(2)},
            triggered at {this.getTime(errorMessage)}
           </h3>
          </div>
      )}
      </div>
      <div className="clearedMessages-container">
      <h2> Cleared Messages </h2>
      {
        this.getClearedMessages().reverse().map(clearedMessage =>
          <div key={clearedMessage} className="clearedMessage">
            <h3> System recovered! -
            load = {clearedMessage.get('newAverage').toFixed(2)},
            triggered at {this.getClearedTime(clearedMessage)}
            {clearedMessage.get('priorErrors').map(errorMessage =>
              <div key={errorMessage} className="errorMessage completed">
                <h3> High load generated an alert -
                load = {errorMessage.get('average').toFixed(2)},
                triggered at {this.getTime(errorMessage)}
               </h3>
              </div>
            )}
           </h3>
          </div>
      )}
      </div>
    </div>;
  }
})
