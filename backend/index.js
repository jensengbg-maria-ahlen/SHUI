require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

const usersRoute = require('./routes/users');
const flowRoute = require('./routes/flow');
const authRoute = require('./routes/auth');

app.use('/users', usersRoute);
app.use('/flow', flowRoute);
app.use('/auth', authRoute);

const port = 3000;
app.listen(port, () => {
    console.log('Server is up and running on port ' + port + '!');
});