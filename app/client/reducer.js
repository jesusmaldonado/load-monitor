import {Map} from 'immutable';

function setState(state, newState){
  console.log(newState);
  return state.merge(newState);
}

export default function reducer(state = Map(), action){
  switch(action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
  }
  return state;
}
