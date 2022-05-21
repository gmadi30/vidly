const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres')
const customers = require('./routes/customers');
const startUpDebugger = require('debug')('app:startup');

mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'))
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => startUpDebugger(`Listening port ${PORT}...`)); // export DEBUG=app:startup, [anotherDebug] || * for all.
