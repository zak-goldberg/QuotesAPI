const express = require('express');
const app = express();

const quotesRouter = require('./quotes-router.js');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server started up and listening on PORT ${PORT}`);
});

// use quoteRouter for paths like '/api/quotes'
app.use('/api/quotes', quotesRouter);