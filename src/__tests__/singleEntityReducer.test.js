import { singleEntityReducer } from "../singleEntityReducer";

describe("singleEntityReducer", () => {
  it("should update the reducer", function() {
    const action = {
      type: "RECEIVE_CUSTOMER",
      payload: { name: "updated name" }
    };
    const reducer = singleEntityReducer("CUSTOMER");
    const result = reducer({ name: "name" }, action);

    expect(result).toEqual(action.payload);
  });
});
