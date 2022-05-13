const mongoose = require('mongoose');

mongoose
  .connect('mongodb+srv://pdellacassa:7deabril-@cluster0.tevzt.mongodb.net/library-project?retryWrites=true&w=majority')
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error('Error connecting to mongo', err));
