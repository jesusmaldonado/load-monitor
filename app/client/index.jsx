require('./style.css');
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, hashHistory} from 'react-router';
import io from 'socket.io-client';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {setState} from './action_creators';
import reducer from './reducer';
import App from './components/App';
import {LoadContainer} from './components/Load';
import remoteActionMiddleware from './remote_action_middleware';
// const socket = io(`${location.protocol}//${location.hostname}:8090`);
// socket.on('state', state =>
//   store.dispatch(setState(state))
// );

// const createStoreWithMiddleWare = applyMiddleware(
//   // remoteActionMiddleware(socket)
// )(createStore);

// const store = createStoreWithMiddleWare(reducer);
const store = createStore(reducer);
// store.dispatch(setState({
//   "loads": [
//     {
//       "load": 0.6599999999999999,
//       "time": 1473694874
//     }
//   ],
//   "averages": [
//     {
//       "interval": "2min",
//       "average": 1.5708333333333337
//     }
//   ],
//   "errorMessages": [
//     {
//       "time": 1473695314,
//       "average": 1.1341666666666665
//     },
//     {
//       "time": 1473695324,
//       "average": 1.2991666666666666
//     },
//     {
//       "time": 1473695334,
//       "average": 1.4633333333333336
//     },
//     {
//       "time": 1473695344,
//       "average": 1.5708333333333337
//     }
//   ],
//   "clearedMessages": [
//     {
//       "loadClearTime": 1473695174,
//       "priorErrors": [
//         {
//           "time": 1473695094,
//           "average": 1.0116666666666665
//         },
//         {
//           "time": 1473695104,
//           "average": 1.0591666666666668
//         },
//         {
//           "time": 1473695114,
//           "average": 1.1058333333333334
//         },
//         {
//           "time": 1473695124,
//           "average": 1.1383333333333334
//         },
//         {
//           "time": 1473695134,
//           "average": 1.1408333333333334
//         },
//         {
//           "time": 1473695144,
//           "average": 1.1366666666666665
//         },
//         {
//           "time": 1473695154,
//           "average": 1.1141666666666665
//         },
//         {
//           "time": 1473695164,
//           "average": 1.0616666666666668
//         }
//       ],
//       "newAverage": 0.9916666666666667
//     }
//   ]
// }));

store.dispatch(setState({
  "loads": [
    {
      "load": 0.6599999999999999,
      "time": 1473694874
    },
    {
      "load": 0.72,
      "time": 1473694884
    },
    {
      "load": 0.6000000000000001,
      "time": 1473694894
    },
    {
      "load": 0.51,
      "time": 1473694904
    },
    {
      "load": 0.51,
      "time": 1473694914
    },
    {
      "load": 0.42999999999999994,
      "time": 1473694924
    },
    {
      "load": 0.43999999999999995,
      "time": 1473694934
    },
    {
      "load": 0.3700000000000001,
      "time": 1473694944
    },
    {
      "load": 0.6799999999999999,
      "time": 1473694954
    },
    {
      "load": 0.8899999999999999,
      "time": 1473694964
    },
    {
      "load": 1.06,
      "time": 1473694974
    },
    {
      "load": 0.8200000000000001,
      "time": 1473694984
    },
    {
      "load": 0.8400000000000001,
      "time": 1473694994
    },
    {
      "load": 0.6399999999999999,
      "time": 1473695004
    },
    {
      "load": 0.76,
      "time": 1473695014
    },
    {
      "load": 0.72,
      "time": 1473695024
    },
    {
      "load": 0.75,
      "time": 1473695034
    },
    {
      "load": 1.0299999999999998,
      "time": 1473695044
    },
    {
      "load": 1.0299999999999998,
      "time": 1473695054
    },
    {
      "load": 1.48,
      "time": 1473695064
    },
    {
      "load": 1.48,
      "time": 1473695074
    },
    {
      "load": 1.3199999999999998,
      "time": 1473695084
    },
    {
      "load": 1.27,
      "time": 1473695094
    },
    {
      "load": 1.3900000000000001,
      "time": 1473695104
    },
    {
      "load": 1.4,
      "time": 1473695114
    },
    {
      "load": 1.0299999999999998,
      "time": 1473695124
    },
    {
      "load": 0.79,
      "time": 1473695134
    },
    {
      "load": 0.6699999999999999,
      "time": 1473695144
    },
    {
      "load": 0.48,
      "time": 1473695154
    },
    {
      "load": 0.3999999999999999,
      "time": 1473695164
    },
    {
      "load": 0.18999999999999995,
      "time": 1473695174
    },
    {
      "load": 1,
      "time": 1473695184
    },
    {
      "load": 0.15999999999999992,
      "time": 1473695194
    },
    {
      "load": 0.42999999999999994,
      "time": 1473695204
    },
    {
      "load": 0.44999999999999996,
      "time": 1473695214
    },
    {
      "load": 0.76,
      "time": 1473695224
    },
    {
      "load": 0.79,
      "time": 1473695234
    },
    {
      "load": 0.75,
      "time": 1473695244
    },
    {
      "load": 0.78,
      "time": 1473695254
    },
    {
      "load": 1.12,
      "time": 1473695264
    },
    {
      "load": 1.33,
      "time": 1473695274
    },
    {
      "load": 1.4300000000000002,
      "time": 1473695284
    },
    {
      "load": 1.67,
      "time": 1473695294
    },
    {
      "load": 1.7999999999999998,
      "time": 1473695304
    },
    {
      "load": 2.3,
      "time": 1473695314
    },
    {
      "load": 2.41,
      "time": 1473695324
    },
    {
      "load": 2.42,
      "time": 1473695334
    },
    {
      "load": 2.05,
      "time": 1473695344
    },
    {
      "load": 2.05,
      "time": 1473695345
    },
    {
      "load": 2.05,
      "time": 1473695346
    },
    {
      "load": 2.05,
      "time": 1473695347
    },
    {
      "load": 2.05,
      "time": 1473695348
    },
    {
      "load": 2.05,
      "time": 1473695349
    },
    {
      "load": 2.05,
      "time": 1473695350
    },
    {
      "load": 2.05,
      "time": 1473695351
    },
    {
      "load": 2.05,
      "time": 1473695352
    },
    {
      "load": 2.05,
      "time": 1473695353
    },
    {
      "load": 2.05,
      "time": 1473695354
    },
    {
      "load": 2.05,
      "time": 1473695355
    },
    {
      "load": 2.05,
      "time": 1473695356
    }
  ],
  "averages": [
    {
      "interval": "2min",
      "average": 1.5708333333333337
    }
  ],
  "errorMessages": [
    {
      "time": 1473695314,
      "average": 1.1341666666666665
    },
    {
      "time": 1473695324,
      "average": 1.2991666666666666
    },
    {
      "time": 1473695334,
      "average": 1.4633333333333336
    },
    {
      "time": 1473695344,
      "average": 1.5708333333333337
    }
  ],
  "clearedMessages": [
    {
      "loadClearTime": 1473695174,
      "priorErrors": [
        {
          "time": 1473695094,
          "average": 1.0116666666666665
        },
        {
          "time": 1473695104,
          "average": 1.0591666666666668
        },
        {
          "time": 1473695114,
          "average": 1.1058333333333334
        },
        {
          "time": 1473695124,
          "average": 1.1383333333333334
        },
        {
          "time": 1473695134,
          "average": 1.1408333333333334
        },
        {
          "time": 1473695144,
          "average": 1.1366666666666665
        },
        {
          "time": 1473695154,
          "average": 1.1141666666666665
        },
        {
          "time": 1473695164,
          "average": 1.0616666666666668
        }
      ],
      "newAverage": 0.9916666666666667
    }
  ]
}));


const routes = <Route component={App}>
  <Route path="/" component={LoadContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
