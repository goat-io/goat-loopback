const SubmissionRepository = require("./Submission");

const singleSubmission = {
  id: "abcdefgh123123123123",
  data: {
    a: "b",
    c: "d"
  },
  someOther: "a",
  t: "b"
};
const arrayOfSubmissions = [
  singleSubmission,
  singleSubmission,
  singleSubmission,
  singleSubmission
];
const replaced = SubmissionRepository.replaceIds(singleSubmission);
const arrayReplaced = SubmissionRepository.replaceIds(arrayOfSubmissions);

test("Should replace ID on single Submission", () => {
  expect(replaced).toHaveProperty("_id");
  expect(replaced._id).toBe("abcdefgh123123123123");
});

test("Should not affect original object", () => {
  expect(singleSubmission).toHaveProperty("id");
  expect(singleSubmission.id).toBe("abcdefgh123123123123");
});

test("Should replace ID on array submission", () => {
  expect(arrayReplaced.length).toBe(4);
  expect(arrayReplaced[0]).toHaveProperty("_id");
  expect(arrayReplaced[0]._id).toBe("abcdefgh123123123123");
  expect(arrayReplaced[1]).toHaveProperty("_id");
  expect(arrayReplaced[1]._id).toBe("abcdefgh123123123123");
});

test("Should filter out unwanted keys", () => {
  const cleanedSub = SubmissionRepository.filterValidFields(singleSubmission);
  expect(cleanedSub.length).toBe(1);
  expect(cleanedSub[0]).toHaveProperty("_id");
  expect(cleanedSub[0]._id).toBe("abcdefgh123123123123");
  expect(typeof cleanedSub[0].someOther).toBe("undefined");
  expect(typeof cleanedSub[0].t).toBe("undefined");
  expect(typeof cleanedSub[0].id).toBe("undefined");
  expect(singleSubmission.t).toBe("b");
});
