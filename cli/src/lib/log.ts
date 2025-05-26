import * as chalk from 'chalk';
import * as symbols from 'log-symbols';

function log(...args) {
  return console.log(...args);
}

log.info = function info(...args) {
  console.log();
  return console.error(chalk.gray(symbols.info, ...args));
};

log.success = function success(...args) {
  console.log();
  return console.info(chalk.cyan(symbols.success, ...args));
};

log.error = function error(...args) {
  console.log();
  return console.error(symbols.error, ...args);
};

log.warning = function warning(...args) {
  console.log();
  return console.warn(chalk.yellow(symbols.warning, ...args));
};

export default log;
