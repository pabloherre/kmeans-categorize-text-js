const kmeans = require("node-kmeans");
const natural = require("natural");

const kMeansText = (
  data,
  groups = 2,
  excludeWords = [],
  onClusterize = console.log,
  onError = console.error,
) => {
  // Obtain all words, avoid repeated, less than 2 chars and excluded ones.-
  const allWords = data.reduce(
    (arr, el) =>
      arr.concat([
        ...new Set(
          el.text
            .split(" ")
            .filter(
              (t) =>
                t.length > 2 &&
                !excludeWords.some((x) => x === t.toLowerCase()),
            ),
        ),
      ]),
    [],
  );

  // Create the dataSet.-
  let dataSet = [];

  // The greatest set of words.-
  let greatest = 0;

  for (let i = 0; i < data.length; i++) {
    const split = [
      ...new Set(
        data[i].text
          .split(" ")
          .filter(
            (t) =>
              t.length > 2 && !excludeWords.some((x) => x === t.toLowerCase()),
          )
          .map((w) => w.toLowerCase()),
      ),
    ];

    if (split.length > greatest) {
      greatest = split.length;
    }

    let occurrence = {};
    for (let ii = 0; ii < split.length; ii++) {
      const word = split[ii];
      let count = 0;

      allWords.forEach((w) => {
        occurrence[word] = natural.JaroWinklerDistance(w, word, {
          ignoreCase: true,
        });
      });
    }
    dataSet[i] = {
      ...data[i],
      occurrence,
    };
  }

  // Fill empty spaces with 0.-
  for (let i = 0; i < greatest; i++) {
    for (let ii = 0; ii < dataSet.length; ii++) {
      let el = dataSet[ii];
      const keys = Object.keys(el.occurrence);
      if (!keys[i]) {
        el.occurrence[i] = 0;
      }
    }
  }

  // Create the data 2D-array (vectors) describing the data
  let vectors = [];
  for (let i = 0; i < dataSet.length; i++) {
    const el = dataSet[i];
    vectors[i] = Object.values(el.occurrence);
  }

  kmeans.clusterize(vectors, { k: groups }, (err, res) => {
    if (err) onError(err);
    else {
      const outputTmp = {};
      const output = {};
      res.forEach((out, i) => {
        outputTmp[i + 1] = {};
        let mostMentioned = "";
        out.cluster.forEach((cluster) => {
          const el = dataSet.find((e) => {
            return Object.values(e.occurrence).toString() == cluster.toString();
          });
          Object.keys(el.occurrence).forEach((k) => {
            if (
              !mostMentioned ||
              el.occurrence[mostMentioned] < el.occurrence[k]
            ) {
              mostMentioned = k;
            }
          });
          if (el) {
            outputTmp[i + 1][el.id] = el.text.toString();
          }
        });
        output[mostMentioned] = outputTmp[i + 1];
      });

      onClusterize(output);
    }
  });
};

module.exports = kMeansText;
exports.KMeansText = kMeansText;
