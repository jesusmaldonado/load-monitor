import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument
} from 'react-dom/test-utils';
import {fromJS} from 'immutable';
import Message from "../../app/client/components/Messages";
import {expect} from 'chai';

describe('Messages', () => {
  let errorMessages = fromJS([
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
  ]);
  let emptyMessages = fromJS([])
  let clearedMessages = fromJS([
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
      }
    ],
    "newAverage": 0.9916666666666667
  }]);
  it('renders error messages and no cleared messages', () => {
    const component = renderIntoDocument(
      <Message
      errorMessages={errorMessages}
      clearedMessages={emptyMessages}/>
    )
    const errContainer = ReactDOM.findDOMNode(component.refs.errorMessages);
    const errArray = Array.prototype.slice.call(errContainer.querySelectorAll('.errorMessage'));
    const clearContainer = ReactDOM.findDOMNode(component.refs.clearedMessages);
    const clrArray = Array.prototype.slice.call(errContainer.querySelectorAll('.clearedMessage'));

    expect(errArray.length).to.equal(4);
    expect(clrArray.length).to.equal(0);

    expect(errArray[0].textContent).to.eql(' High load generated an alert - Load = 1.57, Triggered at 17:49:04 pm');
    expect(errArray[1].textContent).to.eql(' High load generated an alert - Load = 1.46, Triggered at 17:48:54 pm');
    expect(errArray[2].textContent).to.eql(' High load generated an alert - Load = 1.30, Triggered at 17:48:44 pm');
    expect(errArray[3].textContent).to.eql(' High load generated an alert - Load = 1.13, Triggered at 17:48:34 pm');
  });

  it('renders error messages and cleared messages', () => {
    const component = renderIntoDocument(
      <Message
      errorMessages={errorMessages}
      clearedMessages={clearedMessages}/>
    )
    const errContainer = ReactDOM.findDOMNode(component.refs.errorMessages);
    const errArray = Array.prototype.slice.call(errContainer.querySelectorAll('.errorMessage'));
    const clearContainer = ReactDOM.findDOMNode(component.refs.clearedMessages);
    const clearHeading = clearContainer.querySelector('.clearedMessage h3');
    const miniErrors = Array.prototype.slice.call(clearContainer.querySelectorAll('.clearedMessage .errorMessage.mini'));

    expect(errArray.length).to.equal(4);
    expect(miniErrors.length).to.equal(2);
    expect(clearHeading).to.be.ok;

    expect(errArray[0].textContent).to.eql(' High load generated an alert - Load = 1.57, Triggered at 17:49:04 pm');
    expect(errArray[1].textContent).to.eql(' High load generated an alert - Load = 1.46, Triggered at 17:48:54 pm');
    expect(errArray[2].textContent).to.eql(' High load generated an alert - Load = 1.30, Triggered at 17:48:44 pm');
    expect(errArray[3].textContent).to.eql(' High load generated an alert - Load = 1.13, Triggered at 17:48:34 pm');
    expect(clearHeading.textContent).to.eql(' System recovered! - load = 0.99, triggered at 17:46:14 pm');
    expect(miniErrors[0].textContent).to.eql('Load = 1.01, triggered at 17:44:54 pm');
    expect(miniErrors[1].textContent).to.eql('Load = 1.06, triggered at 17:45:04 pm');
  });
});
