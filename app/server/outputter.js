import { LoadServer } from '../../server'
export function Outputter(){
  this.server = new LoadServer()
}

Outputter.prototype.output = function(monitorResp){
  let { loads, averages, errorMessages, clearedMessages } = monitorResp;

  let response = {loads: [], averages: []};
  Object.keys(loads).forEach((time) => {
    response["loads"].push({
      load: loads[time],
      time: Number(time)
    })
  });
  Object.keys(averages).forEach((time) => {
    response["averages"].push({
      interval: time,
      average: averages[time]
    });
  })
  response["errorMessages"] = errorMessages;
  response["clearedMessages"] = clearedMessages;
  this.server.emit(response);
}
