const generate = require("@goatlab/fluent/dist/core/Loopback/Generator/generate")
  .generate;
const rawForms = require("../src/forms.json");
const Formio = require("@goatlab/fluent/dist/Helpers/Formio").Formio;

const generator = async () => {
  await generate(rawForms, __dirname);
};

generator();
