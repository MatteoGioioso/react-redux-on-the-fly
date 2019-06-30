import { BaseArrayReducerMethods } from "../baseArrayReducer";

describe("BaseArrayReducerMethods class", function() {
  let state;

  beforeEach(function() {
    state = [
      { id: "1", content: "stuff_1" },
      { id: "2", content: "stuff_2" },
      { id: "3", content: "stuff_3" },
      { id: "4", content: "stuff_4" },
      { id: "5", content: "stuff_5" },
      { id: "6", content: "stuff_6" },
      { id: "7", content: "stuff_7" },
      { id: "8", content: "stuff_8" },
      { id: "9", content: "stuff_9" },
      { id: "10", content: "stuff_10" }
    ];
  });

  it("should destroy multiple elements in array", function() {
    const payload = ["3", "4", "6"];
    const result = new BaseArrayReducerMethods().destroyMany(state, payload);

    expect(result).toHaveLength(7);
    expect(result).toMatchSnapshot();
  });

  it("should destroy multiple elements in array if one id does not math", function() {
    const payload = ["3", "4", "11"];
    const result = new BaseArrayReducerMethods().destroyMany(state, payload);

    expect(result).toHaveLength(8);
    expect(result).toMatchSnapshot();
  });

  it("should substitute one item in array", function() {
    const payload = { id: "5", content: "stuff_5_updated" };
    const result = new BaseArrayReducerMethods().substituteOne(state, payload);

    expect(result[4]).toEqual(payload);
    expect(result).toMatchSnapshot();
  });

  it("should not substitute a item in array, id does not match", function() {
    const payload = { id: "11", content: "stuff_11_updated" };
    const result = new BaseArrayReducerMethods().substituteOne(state, payload);

    expect(result).toMatchSnapshot();
  });
});
