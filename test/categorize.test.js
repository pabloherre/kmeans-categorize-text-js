const kMeansText = require("../index");
const dataSet = require("./dataSet");
const assert = require("assert");

describe("Main tests", function () {
  it("should categorize texts and console.log", function () {
    kMeansText(dataSet);
  });

  it("should categorize texts in three groups", function () {
    const groups = 3;
    kMeansText(dataSet, groups, [], (result) => {
      assert(Object.keys(result).length === groups);
    });
  });

  it("should exclude words", function () {
    const groups = 3;
    const excldeWords = ["dips"];

    kMeansText(dataSet, groups, excldeWords, (result) => {
      console.log(result);
      assert(Object.keys(result).includes("dips") === false);
    });
  });

  it("should fail with more groups than textx", function () {
    const groups = 30;

    kMeansText(dataSet, groups, [], null, (error) => {
      assert(error);
    });
  });
});
