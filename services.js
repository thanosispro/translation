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
  });
}

const fetchData = async(word) =>{
    let synonyms
    try{
        
 synonyms = await getSynonyms(word)
    }
    catch{
       
         synonyms = []
    }
const translation = await getTranslation(word)

return {synonyms:synonyms,translation:translation[0].translation}
}

module.exports = fetchData
