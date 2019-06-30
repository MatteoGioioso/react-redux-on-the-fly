import { baseArrayReducer, BaseArrayReducerMethods } from "../baseArrayReducer";

describe("BaseArrayReducer", function() {
  describe("Overrides", function() {
    class myCustomMethods extends BaseArrayReducerMethods {
      receiveMany = (state, payload) => "custom implementation";
    }

    it("should overrides method correctly", function() {
      const reducer = baseArrayReducer("CUSTOMER", null, myCustomMethods);
      const action = {
        type: "RECEIVE_CUSTOMERS",
        payload: ["1", "2", "3", "4"]
      };
      const result = reducer([], action);

      expect(result).toBe("custom implementation");
    });
  });
});
