// Import express
const express = require('express');

// Import quotes array and utility functions
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

// Create quotes router
const quotesRouter = express.Router();

// Route for getRandomQuote API
// Path: /api/quotes/random
quotesRouter.get('/random', (req, res, next) => {
  const randomQuoteObject = getRandomElement(quotes);
  const quoteResponse = {
    quote : randomQuoteObject
  };
  res.send(quoteResponse);
});

// Function to take an array of quote objects and flatten to an array of just quotes
const flattenQuoteArray = (accumulator, currentValue) => {
    accumulator.push(currentValue.quote);
    return accumulator;
  };

// Route for getQuoteByPerson API
// Path: /api/quotes
// Optional query paramter person
quotesRouter.get('/', (req, res, next) => {
  const responseObject = {};
// Check if there are query parameters
  if (req.query.person) {
    const queryPerson = req.query.person;
    // create a single array of all of the names in the quote object
    const allNames = quotes.reduce((accumulator, currentValue) => {
      accumulator.push(currentValue.person);
      return accumulator;
    }, []);
    // check to see if provided name is in the allNames array
    if (allNames.indexOf(queryPerson) !== -1) {
      // filter to quote objects associated with the name and reduce into a single array to return
      const quotesByName = quotes
        .filter((element) => element.person == queryPerson)
        .reduce(flattenQuoteArray, []);
      responseObject.quotes = quotesByName;
      res.send(responseObject);
    } else {
      // if the name is not in the array, return a 404  
        res.status(404).send('Provided person does not have a quote in our database.');
    }
  } else {
    // if no person specified, return all quotes
    // reduce into a single array of just quotes
    const allQuotes = quotes.reduce(flattenQuoteArray, []);
    responseObject.quotes = allQuotes;
    res.send(responseObject);
  }
});

// Export quotes router
module.exports = quotesRouter;