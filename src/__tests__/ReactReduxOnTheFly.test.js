import ReactReduxOnTheFly from "../ReactReduxOnTheFly";
import { createStore } from "redux";
import { baseArrayReducer } from "../baseArrayReducer";
import { baseObjectReducer } from "../baseObjectReducer";

describe("ReactReduxOnTheFly main class", function() {
  let store, rrotf, asyncReducer;
  const staticReducers = {
    myStaticReducer: baseArrayReducer("STATIC_REDUCER")
  };

  beforeEach(function() {
    const options = {
      maxReducersNumber: 3
    };
    rrotf = new ReactReduxOnTheFly(staticReducers, options);
    const reducers = rrotf.asyncCombineReducers();
    store = createStore(reducers);
    store.asyncReducers = {};
    asyncReducer = baseObjectReducer("ASYNC_REDUCER");
  });

  it("should replace reducers", function() {
    rrotf.injectAsyncReducer(store, "test", asyncReducer);

    expect(store.asyncReducers["test"]).toEqual(asyncReducer);
  });

  it("should remove the first inserted reducer", function() {
    rrotf.injectAsyncReducer(store, "test_1", asyncReducer);
    rrotf.injectAsyncReducer(store, "test_2", asyncReducer);
    rrotf.injectAsyncReducer(store, "test_3", asyncReducer);

    expect(Object.keys(store.asyncReducers)).toHaveLength(3);

    rrotf.injectAsyncReducer(store, "test_4", asyncReducer);
    rrotf.asyncReducerManager(store);

    expect(Object.keys(store.asyncReducers)).toHaveLength(3);
    expect(store.asyncReducers["test_1"]).toBeUndefined();
  });
});
