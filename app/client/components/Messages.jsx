import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';
import ErrorMessage from './ErrorMessage';
import ClearedMessage from './ClearedMessage';

export default React.createClass({
  mixins: [PureRenderMixin],
  getErrorMessages(){
    return this.props.errorMessages || [];
  },
  getClearedMessages(){
    return this.props.clearedMessages || [];
  },
  render(){
    return <div className="message">
      <div className="errorMessages-container" ref="errorMessages">
        <h2> Error Messages </h2>
        {
          this.getErrorMessages().reverse().map(errorMessage =>
            <ErrorMessage key={errorMessage} errorMessage={errorMessage} />
        )}
      </div>
      <div className="clearedMessages-container" ref="clearedMessages">
        <h2> Cleared Messages </h2>
        {
          this.getClearedMessages().reverse().map(clearedMessage =>
            <ClearedMessage key={clearedMessage} clearedMessage={clearedMessage} />
        )}
      </div>
    </div>;
  }
})
