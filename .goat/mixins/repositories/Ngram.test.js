const Ngram = require("./Ngram");

const text = "Search";
const generatedNgram = Ngram.generate(text);
const simpleSubmission = {
  _id: "12345asdasdf",
  data: {
    name: "Pedro",
    lastName: "Cabrera",
    rut: "14.434.545-1"
  }
};
const fullText = ["rut"];
const fuzzy = ["name", "lastName"];

test("Undefined case", () => {
  const generatedNgram = Ngram.generate(undefined);
  expect(generatedNgram).toBe("");
});

test("Original text should not change", () => {
  expect(text).toBe("Search");
});

test("Should generate Ngram from Text", () => {
  expect(generatedNgram).toBe(
    "S Se Sea ear arc rch Sear earc arch Searc earch Search"
  );
});

test("Single character should return same character", () => {
  const text = "s";
  const generatedNgram = Ngram.generate(text);
  expect(generatedNgram).toBe("s");
});

test("Double character should return ngram", () => {
  const text = "sa";
  const generatedNgram = Ngram.generate(text);
  expect(generatedNgram).toBe("s sa");
});

test("Should Generate Ngram from array Submission", () => {
  const generatedNgram = Ngram.generateFromSubmissions({
    fullTextFields: fullText,
    fuzzySearchFields: fuzzy,
    submissions: [simpleSubmission]
  });
  expect(generatedNgram[0]).toHaveProperty("_ngram");
  expect(generatedNgram[0]._ngram).toBe(
    "14.434.545-1 P Pe Ped edr dro ro Pedr edro Pedro C Ca Cab abr bre rer era ra Cabr abre brer rera Cabre abrer brera Cabrer abrera Cabrera"
  );
});

test("Should Generate Ngram from single Submission", () => {
  const generatedNgram = Ngram.generateFromSubmissions({
    fullTextFields: fullText,
    fuzzySearchFields: fuzzy,
    submissions: simpleSubmission
  });
  expect(generatedNgram[0]).toHaveProperty("_ngram");
  expect(generatedNgram[0]._ngram).toBe(
    "14.434.545-1 P Pe Ped edr dro ro Pedr edro Pedro C Ca Cab abr bre rer era ra Cabr abre brer rera Cabre abrer brera Cabrer abrera Cabrera"
  );
});

test("Should Generate Ngram from array Submission", () => {
  const generatedNgram = Ngram.generateFromSubmissions({
    fullTextFields: fullText,
    fuzzySearchFields: fuzzy,
    submissions: [
      simpleSubmission,
      simpleSubmission,
      simpleSubmission,
      simpleSubmission
    ]
  });
  expect(generatedNgram[0]).toHaveProperty("_ngram");
  expect(generatedNgram[0]._ngram).toBe(
    "14.434.545-1 P Pe Ped edr dro ro Pedr edro Pedro C Ca Cab abr bre rer era ra Cabr abre brer rera Cabre abrer brera Cabrer abrera Cabrera"
  );
  expect(generatedNgram[2]).toHaveProperty("_ngram");
  expect(generatedNgram[2]._ngram).toBe(
    "14.434.545-1 P Pe Ped edr dro ro Pedr edro Pedro C Ca Cab abr bre rer era ra Cabr abre brer rera Cabre abrer brera Cabrer abrera Cabrera"
  );
});
