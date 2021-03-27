require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.listen(6000, () => {
    console.log('Server is up and running on port 6000!');
});