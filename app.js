import {
    readDir,
    filterByExtension,
    readFiles,
    convertFilesFormat,
    getKey,
    removeHTMLTags,
    removeEmptylines,
    removeChars,
    removeFolder,
    splitByWords,
    countWords,
    sortBy,
    saveAs
} from './functions.js'
import path  from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname,'data','files');

const saveDataOutPut = path.join(__dirname,'output','files');

const chars = ['(',')','[',']','*','-',',',':','.','"','\'','?'];
const joinContent = content =>  content.join('\n');
const splitLines = fullText => fullText.split('\n');

try {
    readDir(dataDir)
    .then(filterByExtension('json'))
    .then(removeFolder(dataDir))
    .then(readFiles(dataDir))
    .then(convertFilesFormat)
    .then(getKey)
    .then(joinContent)
    .then(splitLines)
    .then(removeEmptylines)
    .then(removeHTMLTags)
    .then(removeChars(chars))
    .then(splitByWords)
    .then(countWords)
    .then(sortBy('count'))
    .then(saveAs(saveDataOutPut))
    .then(console.log)
    .catch(err => console.log('err:',err));
  } catch (err) {
    console.error(err);
}
