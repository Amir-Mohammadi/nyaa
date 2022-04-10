class Throttle {
  interval: number;
  lastSendTime: number;

  constructor(interval: number = 300) {
    this.lastSendTime = 0;
    this.interval = interval;
  }

  send(callBack: Function) {
    if (Date.now() - this.lastSendTime >= this.interval) {
      callBack();
      this.lastSendTime = Date.now();
    }
  }
}
export default Throttle;
