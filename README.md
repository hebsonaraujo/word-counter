# Texts Processing Project

This project processes text files in different formats (JSON, CSV, TXT) and generates an output with the word count.

# Functional Programming Concepts
This project uses several functional programming concepts, including:

- Pure Functions: Most functions in this project are pure, meaning they do not have side effects and return the same output given the same input.
- Higher-Order Functions: Functions like filterByExtension, readFiles, and saveAs return other functions or take functions as arguments.
- Immutability: The project avoids mutating data directly. Instead, it creates new data structures with the desired changes.
- Function Composition: The project chains multiple functions together to create a pipeline of transformations on the text data.

## Usage

To run the project, use the command:
```sh
node app.js
```

## Main
- readDir: Reads the directory and returns a list of files.
- filterByExtension: Filters files by extension.
- readFiles: Reads the content of the files.
- convertFilesFormat: Converts the content of the files to JSON.
- getKey: Extracts the text from JSON files.
- removeHTMLTags: Removes HTML tags from the text.
- removeEmptylines: Removes empty lines from the text.
- removeChars: Removes specific characters from the text.
- splitByWords: Splits the text into words.
- countWords: Counts the frequency of words.
- sortBy: Sorts the words by count.
- saveAs: Saves the output as JSON files.

## Example Output

The output of the processing will be saved in the output/files folder as JSON files, containing the word count.

