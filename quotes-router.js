// Import express
const express = require('express');

// Import quotes array and utility functions
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

// Create quotes router
const quotesRouter = express.Router();

// Route for getRandomQuote API
// Path: GET /api/quotes/random
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
// Path: GET /api/quotes
// Optional query paramter person, return all quotes if person is not provided
// Pass an empty array if the person is not included in the array
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

// Route for createQuote API
// Path: POST /api/quotes
// New quotes will be passed in a query string with two properties: quote with the quote text itself, and person with the person who is credited with saying the quote.
// This route should verify that both properties exist in the request query string and send a 400 response if it does not.
quotesRouter.post('/', (req, res, next) => {
  if (req.query.person && req.query.quote) {
    const newQuotePerson = req.query.person;
    const newQuoteText = req.query.quote;
    const newQuoteObj = {
      quote: newQuoteText,
      person: newQuotePerson
    };
    quotes.push(newQuoteObj);
    const newQuoteRes = {
      quote: newQuoteObj
    };
    res.send(newQuoteRes);
  } else {
    res.status(400).send('Please provide a valid person and quote.');
  };
});

// Export quotes router
module.exports = quotesRouter;