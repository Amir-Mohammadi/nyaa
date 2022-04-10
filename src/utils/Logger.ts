export enum LogLevel {
  Trace = 0,
  Debug = 1,
  Info = 2,
  Warning = 3,
  Error = 4,
}

class Logger {
  TAG: string;
  enable: boolean;
  logLevel: LogLevel;

  constructor(
    TAG: string = 'GENERAL',
    enable: boolean = true,
    logLevel: LogLevel = LogLevel.Trace,
  ) {
    this.TAG = TAG;
    this.enable = enable;
    this.logLevel = logLevel;
  }

  trace(message?: any, ...messages: any[]) {
    if (!this.enable || this.logLevel > LogLevel.Trace) return;

    console.debug(`|${this.TAG}|`, message, ...messages);
  }

  debug(message?: any, ...messages: any[]) {
    if (!this.enable || this.logLevel > LogLevel.Debug) return;

    console.debug(`|${this.TAG}|`, message, ...messages);
  }

  info(message?: any, ...messages: any[]) {
    if (!this.enable || this.logLevel > LogLevel.Info) return;

    console.info(`|${this.TAG}|`, message, ...messages);
  }

  warn(message?: any, ...messages: any[]) {
    if (!this.enable || this.logLevel > LogLevel.Warning) return;

    console.warn(`|${this.TAG}|`, message, ...messages);
  }

  error(message: any, ...messages: any[]) {
    if (!this.enable || this.logLevel > LogLevel.Error) return;

    console.error(`|${this.TAG}|`, message, ...messages);
  }

  jsonError(message: Object) {
    if (!this.enable || this.logLevel > LogLevel.Error) return;

    console.error(`|${this.TAG}|`, JSON.stringify(message, undefined, 2));
  }
}

export default Logger;
