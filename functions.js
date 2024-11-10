
import fs from 'node:fs';

/**
 *
 * @param { String } path - Path to files's folder
 * @returns { Promise[] } - Promises with names's files/folders
 */
function readDir(path) {
    return new Promise((resolve,reject) => {
        try {
            const data = fs.readdirSync(path);
            resolve(data);
        }
        catch(e) {
            reject(e);
        }
    })
}
/**
 *
 * @param { String } file - File name. Ex: my-json-file.json
 * @param { String } dataDir - Data's Directory. Ex: /your/path/to/datafolder/
 * @returns { Promise[] } - Promise with file's content
 */
function readFile(file, dataDir) {
    return new Promise((resolve,reject) => {
        try {
            const fileContext = fs.readFileSync(`${dataDir}/${file}`,'utf8');
            resolve(fileContext);
        }
        catch(e) {
            console.log(e)
            reject(e)
        }
    })
}

function readFiles(dataDir) {
    return function(data) {
        return Promise.all(data.map(file => readFile(file, dataDir)));
    }
}

function fileToJSON(data) {
    try {
        return JSON.parse(data);
    }
    catch(e) {
        return data;
    }
}

function fileToSTR(data) {
    return data.toString();
}

function convertFilesFormat(data) {
    return data.map(fileToJSON);
}

function getKey(data) {
    return data.map(jsonFile => jsonFile.news.content.text);
}

function filterByExtension(extension) {
    return function(dataPaths) {
        return dataPaths.filter(path => path.endsWith(extension));
    }
}

function removeHTMLTags(arr) {
    console.log('$$$$$$$')
    const regex = /<\/?(p|em|div|span|strong|br|ul|li|h[1-9]+|(a.*?)|(.*?))>/g;
    return arr.map(el => el.replace(regex,''))
}

function removeEmptylines(arr) {
    return arr.filter(el => el.trim() !== '')
}

function removeChars(chars) {
    return function(data) {
        return data.map(el => chars.reduce((acc,char) => acc.split(char).join(''), el))
    }
}
/**
 * Removes a folder and its contents.
 * @param {String} dataDir - The directory to be removed.
 */
function removeFolder(dataDir) {
    const isNotAFolder = (file) => !fs.lstatSync(`${dataDir}/${file}`).isDirectory();
    return function(data) {
        return Promise.all(data.filter(isNotAFolder))
    }
}
/**
 * Splits each element in the array by words.
 * @param {Array<String>} arr - The array of strings to be split.
 * @returns {Promise<Array<Array<String>>>} - A promise that resolves to an array of arrays of words.
 */
function splitByWords(arr) {
    return Promise.all(arr.map(el => el.split(' ')))
}
/**
 * Counts the occurrences of each word in the array.
 * @param {Array<Array<String>>} arr - The array of arrays of words.
 * @returns {Array<Object>} - An array of objects with word counts.
 */
function countWords(arr) {
    return arr.map(el => Object.values(el.reduce((group, word) => {
        const w = word.toLowerCase();
        const count = group[w] ? group[w].count + 1 : 1;
        group[w] = { element: w, count }
        return group;
    },{})));
}
/**
 * Sorts an array of objects by a specified attribute.
 * @param {String} attr - The attribute to sort by.
 * @returns Array[]
 */
function sortBy(attr) {
    return function(arr) {
        const desc = (a, b) => b[attr] - a[attr];
        return arr.map(el => el.sort(desc));
    }
}
/**
 * Saves the processed data as JSON files in the specified directory.
 * @param {String} dataDir - The directory to save the files in.
 * @returns {Function} - A function that takes an array of data and saves each element as a JSON file.
 */
function saveAs(dataDir) {
    return function(arr) {
        return arr.map((el,idx) => {
            try {
                fs.mkdir(`${dataDir}`, { recursive: true }, (err) => {
                    if (err) throw err;
                    fs.writeFileSync(`${dataDir}/${idx}.json`, JSON.stringify(el));
                });
            } catch (err) {
                console.error(err);
            }
        })
    }

}
export {
    readDir,
    filterByExtension,
    readFile,
    readFiles,
    fileToJSON,
    fileToSTR,
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
}