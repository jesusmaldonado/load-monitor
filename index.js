import filter from 'lodash';
import moment from 'moment';
class LoadMonitor {
  constructor() {
    this.loads = {}
  }
  addLoad(load) {
    const date = moment().unix();
    this.loads[date] = load;
    this.removeTenMinutesAgo();
  }
  removeTenMinutesAgo(){
    const tenMinutesAgo = moment().subtract(10, 'minutes');
    Object.keys(this.loads).forEach((time) => {
      if (moment.unix(time).isBefore(tenMinutesAgo)){
        delete this.loads[time];
      }
    });
  }
  parseLoad(){
    const spawn = require('child_process').spawn;
    const top = spawn('uptime');

    top.stdout.on('data', (data) => {
      const string = `${data}`
      const re = /load averages: ([0-9].[0-9]+)/ig;
      const match = string.match(re)[0].replace("load averages: ", "");
      const load = Number(match);
      this.addLoad(load);
    });

    top.stderr.on('data', (data) => {
      //add error logic
    });

    top.on('close', (code) => {
      //add close logic
    });
  }
  monitorLoad(){
    setInterval(this.parseLoad.bind(this), 1000);
  }
}
var a = new LoadMonitor();
a.monitorLoad();
