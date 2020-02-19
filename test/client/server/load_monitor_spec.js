import {expect} from 'chai';
import {LoadMonitor} from '../../../app/server/load_monitor';
import timekeeper from 'timekeeper';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import React from 'react'
var time = new Date(1330688329321);
timekeeper.freeze(time);

describe('loadMonitor', () => {
  var loadMonitor;
  beforeEach(() => {
    loadMonitor = new LoadMonitor({});
  })

  describe('addAlert', () => {
    it('adds an alert', () => {
      loadMonitor.addAlert(2.3);
      loadMonitor.addAlert(2.5);
      expect(loadMonitor.errorMessages).to.eql([
        { time: 1330688329, average: 2.3 },
        { time: 1330688329, average: 2.5 }
      ]);
    })
  });

  describe('clearAlerts', () => {
    it('adds prior messages', () => {
      loadMonitor.addAlert(2.3);
      loadMonitor.addAlert(2.5);
      loadMonitor.clearAlerts(0.49);
      expect(loadMonitor.clearedMessages).to.eql([
        { loadClearTime: 1330688329,
          priorErrors: [
            { time: 1330688329, average: 2.3 },
            { time: 1330688329, average: 2.5 }
          ],
          newAverage: 0.49
        }
      ]);
      expect(loadMonitor.errorMessages).to.eql([]);
    });

    it('adds no cleared message if there are no error messages', () => {
      expect(loadMonitor.clearedMessages).to.eql([]);
      expect(loadMonitor.errorMessages).to.eql([]);
    });
  });
})
