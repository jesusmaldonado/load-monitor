import React from 'react';
import {connect} from 'react-redux';
import Graph from './Graph';
import Messages from './Messages';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as actionCreators from '../action_creators';
export const Load = React.createClass({
  mixins: [PureRenderMixin],
  render(){
    return (
      this.props.loads ?
      <div className="load-container">
        <Graph loads={this.props.loads} ref="graph" />
        <Messages errorMessages={this.props.errorMessages} ref="messages" clearedMessages={this.props.clearedMessages} />
      </div> :
      <div className="loader">Loading...</div>
    );
  }
})

function mapStateToProps(state) {
  return {
    loads: state.get('loads'),
    clearedMessages: state.get('clearedMessages'),
    errorMessages: state.get('errorMessages'),
    averages: state.get('averages')
  };
}

export const LoadContainer = connect(
  mapStateToProps,
  actionCreators
)(Load);
