import { FileLogger, LogLevel } from 'react-native-file-logger';
import Logger from '../Logger';

const logger = new Logger('LOADER');

export const loadFileLogger = () => {
  FileLogger.configure({
    captureConsole: true,
    dailyRolling: true,
    maximumNumberOfFiles: 10,
    formatter: logFormatter,
    logLevel: LogLevel.Debug,
  });

  logger.debug('initialize file logger was successful');
};

const logFormatter = (level: LogLevel, message: string): string => {
  var now = new Date();
  var logLevelNames = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
  var levelName = logLevelNames[level];
  return '|>  ' + now.toISOString() + ' [' + levelName + ']  |> ' + message;
};
