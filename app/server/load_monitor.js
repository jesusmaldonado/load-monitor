import filter from 'lodash';
import moment from 'moment';

export function LoadMonitor(options){
  this.loads = {};
  this.averages = {};
  this.errorMessages = [];
  this.clearedMessages = [];
  this.outputter = options["outputter"] || {};
}

LoadMonitor.prototype.addAlert = function (average) {
  let newWarning = {
    time: moment().unix(),
    average: average
  };
  this.errorMessages.push(newWarning);
};

LoadMonitor.prototype.clearAlerts = function(average){
  if (this.errorMessages.length > 1){
    this.clearedMessages.push({
      loadClearTime: moment().unix(),
      priorErrors: this.errorMessages,
      newAverage: average
    });
    this.errorMessages = [];
  } else {
    return;
  }
}


LoadMonitor.prototype.addLoad = function (load) {
  const date = moment().unix();
  this.loads[date] = load;
  this.removeTenMinutesAgo();
  const average = this.calculateAverage();
  this.averages['2min'] = average;
  if (average > 1){
    this.addAlert(average);
  } else {
    this.clearAlerts(average);
  }

  this.outputter.output({
    loads: this.loads,
    averages: this.averages,
    errorMessages: this.errorMessages,
    clearedMessages: this.clearedMessages
  });
}

LoadMonitor.prototype.calculateAverage = function(){
  let averageLoad = [];
  Object.keys(this.loads).forEach((time) => {
    const timeWithinTwoMinutes = moment
      .unix(time)
      .isBetween(moment().subtract(2, 'minutes'), moment());
    if (timeWithinTwoMinutes){
      averageLoad.push(this.loads[time]);
    }
  });
  const average = averageLoad.reduce((prev, curr) => prev + curr)/ averageLoad.length;
  return average;
};

LoadMonitor.prototype.removeTenMinutesAgo = function() {
  const tenMinutesAgo = moment().subtract(10, 'minutes');
  Object.keys(this.loads).forEach((time) => {
    if (moment.unix(time).isBefore(tenMinutesAgo)){
      delete this.loads[time];
    }
  });
}

LoadMonitor.prototype.parseLoad = function() {
  const spawn = require('child_process').spawn;
  const top = spawn('uptime');

  top.stdout.on('data', (data) => {
    const string = `${data}`
    const re = /load averages: ([0-9].[0-9]+)/ig;
    if (string.match(re) && string.match(re)[0]) {
      const match = string.match(re)[0].replace("load averages: ", "");
      let load;
      if (Number(match) > 1){
        load = Number(match) - 1;
      } else {
        load = Number(match);
      }
      this.addLoad(load);
    }
  });
}

LoadMonitor.prototype.monitorLoad = function() {
  this.parseLoad();
  setInterval(this.parseLoad.bind(this), 10000);
}
