import { combineReducers } from "redux";

export default class ReactReduxOnTheFly {
  constructor(staticReducers, options = {}) {
    this._staticReducers = staticReducers;
    this._options = options;
    this.MAX_ASYNC_REDUCERS_STACK = this._options.maxReducersNumber || 30;
  }

  asyncCombineReducers(asyncReducers) {
    return combineReducers({
      ...this._staticReducers,
      ...asyncReducers
    });
  }

  asyncReducerManager(store) {
    const asyncReducersStack = Object.keys(store.asyncReducers);

    if (asyncReducersStack.length > this.MAX_ASYNC_REDUCERS_STACK) {
      this.ejectAsyncReducer(store, asyncReducersStack[0]);
    }
  }

  /**
   * injectAsyncReducer
   * @param {object} store
   * @param {string} name
   * @param {function} asyncReducer
   */
  injectAsyncReducer(store, name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(this.asyncCombineReducers(store.asyncReducers));
  }

  ejectAsyncReducer(store, name) {
    delete store.asyncReducers[name];
    store.replaceReducer(this.asyncCombineReducers(store.asyncReducers));
  }
}
