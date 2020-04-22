const nGram = require("n-gram");

module.exports = (() => {
  /**
   *
   * Generates a nGram based on a given text
   *
   * @param {string} text
   * @returns {string} generated nGram
   */
  const generate = text => {
    if (!text || text === "undefined ") {
      return "";
    }

    if (text.length === 1) {
      return text;
    }
    // Include 1st and 2nd characters on Ngram
    let nGramString = `${text[0]} ${text[0]}${text[1]}`;

    // Generate Ngram from N=3 for better search experience
    for (let i = 3; i <= text.length; i++) {
      let ngramArray = nGram(i)(text);
      nGramString = nGramString + " " + ngramArray.join(" ");
    }

    return nGramString;
  };

  /**
   *
   * Given an Object submission or an Array of submissions
   * It generates de corresponding nGrams for each one
   * depending if it has fullText or Fuzzy search
   * Returned elements will have a _ngram field.
   *
   * @param {Object} param
   * @param {Array} param.fullTextFields Fields to add as full text
   * @param {Array} param.fuzzySearchFields Fields to add as fuzzy search
   * @param {Array || Object} param.submissions description
   * @returns {Array} Submissions with nGram
   */
  const generateFromSubmissions = ({
    fullTextFields,
    fuzzySearchFields,
    submissions
  }) => {
    if (!submissions || submissions.length === 0) {
      throw new Error(
        "You must provide at least one submission to generate the Ngram"
      );
    }
    let _submissions = JSON.parse(JSON.stringify(submissions));

    if (!Array.isArray(submissions)) {
      _submissions = [_submissions];
    }

    return _submissions.map(s => {
      const fullTextString = fullTextFields.reduce((r, field) => {
        const text = `${s.data[field]} ` || "";
        r = `${r}${text} `;
        return r;
      }, "");

      const fullNGramString = fuzzySearchFields.reduce((r, field) => {
        const text = `${s.data[field]} ` || "";
        const nGramText = generate(text);
        r = `${r} ${nGramText}`;
        return r;
      }, "");

      s._ngram = `${fullTextString} ${fullNGramString}`
        .replace(/undefined/g, "")
        .replace(/\s\s+/g, " ")
        .trim();

      s._ngram = s._ngram
        .split(" ")
        .filter(function(item, i, allItems) {
          return i == allItems.indexOf(item);
        })
        .join(" ");

      return s;
    });
  };

  return Object.freeze({
    generate,
    generateFromSubmissions
  });
})();
