const express = require('express');
const cors = require('cors');
const products = require('./products')
const mogoose = require('mongoose');
const app = express();
const register = require('./routes/register');
const login = require('./routes/login');
const stripe = require('./routes/stripe');


require('dotenv').config();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  }));

app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/stripe', stripe);
 
app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.get('/products', (req, res) => {
    res.send(products);
})


const port = process.env.PORT || 5001;

const uri = process.env.DB_URI;

app.listen(port, console.log(`Server running on port ${port}`)); 

mogoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Connection failed', err.message);
})