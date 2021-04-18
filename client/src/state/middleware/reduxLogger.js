/* UNCLASSIFIED */

// Defines text and colors used for each log
const config = {
  prevAct: {
      text: 'prev state',
      style: 'color: #9E9E9E; font-weight: bold;',
  },
  act: {
      text: 'action',
      style: 'color: #03A9F4; font-weight: bold;',
  },
  nextAct: {
      text: 'next action',
      style: 'color: #4CAF50; font-weight: bold;',
  },
};

// Any actions containing the below strings will not be logged
const doNotLog = [];

/**
* Log the state before, dispatched action, and state after.
* @param {Object} store - The redux store
* @param {Object} next - Dispatch function which is called then passed to the next middleware in line
* @param {Object} action - The action which was dispatched
*/
export default (store) => (next) => (action) => {
  let { prevAct, act, nextAct } = config;
  let result = null;
  let log = {};

  if (!doNotLog.some((el) => action.type.includes(el) || el.includes(action.type))) {
      /* Create snapshots of the data before action is dispatched */
      log.title = action.type;
      log.prev = store.getState();
      log.cur = action;
      /* Dispatch current action to the store */
      result = next(action);
      /* Create snapshot of the state after action completes */
      log.next = store.getState();

      /* Log results to the console */
      console.groupCollapsed(log.title);
      console.log('%c' + prevAct.text, prevAct.style, log.prev);
      console.log('%c' + act.text, act.style, log.cur);
      console.log('%c' + nextAct.text, nextAct.style, log.next);
      console.groupEnd();
      return result;
  }

  result = next(action);
  return result;
};
