// Import quotes array and utility functions
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const initialValue = [];
const allQuotes = quotes.reduce((accumulator, currentValue) => {
    accumulator.push(currentValue.quote);
    return accumulator;
  }, []
);

// console.log(allQuotes);
const testName = 'Grace Hopper';
const quotesByName = quotes
  .filter((element) => element.person == testName)
  .reduce((accumulator, currentValue) => {
    accumulator.push(currentValue.quote);
    return accumulator;
  }, []);

console.log(quotesByName);