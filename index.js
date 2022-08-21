const express = require('express');
const User = require('./routes/user');
const Auth = require('./routes/auth');
const Category = require('./routes/categories');
const Product = require('./routes/product');


const mongoose = require('mongoose');
const dotenv = require('dotenv')
const app = express();

dotenv.config(); 


mongoose.connect(process.env.DB_CONNECTION)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


app.use(express.json());

app.use('/api/user',User);
app.use('/api/auth',Auth);
app.use('/api/category',Category);
app.use('/api/product',Product);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

