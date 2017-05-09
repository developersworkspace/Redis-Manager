// Imports
import * as path from 'path';
import * as winston from 'winston';

// Imports configuration
import { config } from './config';

let transportsArr = [];

if (config.logging.enabled) {
  transportsArr = [
    new (winston.transports.Console)({ level: 'debug' }),
    new (winston.transports.File)({
      filename: path.join(config.logging.path, 'feature-toggle-api.log'),
      level: 'debug',
    }),
  ];
}

const logger = new (winston.Logger)({
  transports: transportsArr,
});

export function getLogger(name: string) {

  let transportsNameArr = [];

  if (config.logging.enabled) {
    transportsNameArr = [
      new (winston.transports.Console)({ level: 'debug' }),
      new (winston.transports.File)({
        filename: path.join(config.logging.path, `feature-toggle-api-${name}.log`),
        level: 'debug',
      }),
    ];
  }

  return new (winston.Logger)({
    transports: transportsNameArr,
  });
}

// Exports
export { logger };
