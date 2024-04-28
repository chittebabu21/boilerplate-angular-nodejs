// import dependencies 
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

// configuration
const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.SERVER_URL
}));

const port = process.env.PORT || 8000;

// listen on port ~ npx nodemon app
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});