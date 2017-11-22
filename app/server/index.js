import {Outputter} from './outputter';
import {LoadMonitor} from './load_monitor';
var a = new LoadMonitor({outputter: new Outputter()});
a.monitorLoad();
