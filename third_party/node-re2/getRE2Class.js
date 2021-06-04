var EventEmitter = require('events');
var RE2Loader = require("../../").default;

var eventNames = {
  LOADED_EVENT: 'LOADED',
};

var events = new EventEmitter();
var isLoading = false;
var instance = null;

async function compileWasmModule() {
  isLoading = true;
  return RE2Loader().then((loadedInstance) => {
    instance = loadedInstance;
    isLoading = false;
    events.emit(eventNames.LOADED_EVENT);
  });
}

/**
 *
 * @returns {Promise<RE2>}
 */
async function getRE2Class() {
  return new Promise((resolve) => {
    if (instance !== null) {
      resolve(instance);

      return;
    }

    if (isLoading) {
      events.once(eventNames.LOADED_EVENT, () => {
        resolve(instance);
      });
    } else {
      compileWasmModule().then(() => {
        resolve(instance);
      });
    }
  });
}

module.exports = getRE2Class;
