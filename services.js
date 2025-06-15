const translator = require('open-google-translator')

const WordNet = require("node-wordnet");
const wordnet = new WordNet();
   
async function getTranslation(word)
{
    const data = await translator.TranslateLanguageData({
        fromLanguage: 'en',
        toLanguage: 'ne',
        listOfWordsToTranslate: [word]
    })
    return data
}


function getSynonyms(word) {
  
  return new Promise((resolve, reject) => {
    try{
    wordnet.lookup(word, (results) => {
      if (!results || results.length === 0) {
        return reject(new Error("No results found"));
      }

      const synonymsSet = new Set();
      results.forEach((result) => {
        result.synonyms.forEach((syn) => {
          if (syn.toLowerCase() !== word.toLowerCase()) {
            synonymsSet.add(syn);
          }
        });
      });

      resolve(Array.from(synonymsSet));
    });
  }
  catch{
    resolve([])
  }
  });
}

const fetchData = async(word) =>{
  // initial time
  const time1 = Date.now();
   const [synonyms,translation] = await Promise.all([getSynonyms(word),getTranslation(word)])
// final time
const time2 = Date.now();
// total time
const time = (time2 - time1)/1000;
console.log(time)
return {synonyms:synonyms,translation:translation[0].translation}
}

module.exports = fetchData
